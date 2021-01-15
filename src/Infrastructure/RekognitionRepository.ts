import getEnvironmentVariable from "../Application/utils/getEnvironmentVariable";
import { Rekognition } from "aws-sdk"
import { DetectFacesResponse, DetectTextResponse, RecognizeCelebritiesResponse } from "aws-sdk/clients/rekognition";

const client = new Rekognition();
const bucket = getEnvironmentVariable("IMAGES_BUCKET");

const wrapper = async (imageName: string, func: any) => {
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

export const detectFaces = async (imageName: string): Promise<DetectFacesResponse> => 
  await wrapper(imageName, client.detectFaces.bind(client));

export const recognizeCelebrities = async (imageName: string): Promise<RecognizeCelebritiesResponse> =>
  await wrapper(imageName, client.recognizeCelebrities.bind(client));

export const detectText = async (imageName: string): Promise<DetectTextResponse> =>
  await wrapper(imageName, client.detectText.bind(client));
