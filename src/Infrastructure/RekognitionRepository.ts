import getEnvironmentVariable from "../Application/utils/getEnvironmentVariable";
import { Rekognition } from "aws-sdk"

const client = new Rekognition();
const bucket = getEnvironmentVariable("IMAGES_BUCKET");

const wrapper = async <T extends (...args: any[]) => any>(imageName: string, func: T) => {
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    try {
      return await func({
        Image: {
          S3Object: {
            Bucket: bucket,
            Name: imageName
          }
        }
      }).promise();
    } catch (error) {
      console.log(JSON.stringify(error.message))
      throw error;
    }
  }
}

export const detectFaces = async (imageName: string) => wrapper(imageName, client.detectFaces);
export const recognizeCelebrities = async (imageName: string) => wrapper(imageName, client.recognizeCelebrities);
