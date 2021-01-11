import getEnvironmentVariable from "../Application/utils/getEnvironmentVariable";

const bucket = getEnvironmentVariable("IMAGES_BUCKET");

// eslint-disable-next-line @typescript-eslint/ban-types
export const analyze = async (imageName: string, analyzeFunction: Function) => {
  const params = {
    Image: {
      S3Object: {
        Bucket: bucket,
        Name: imageName
      }
    }
  }

  try {
    return await analyzeFunction(params).promise();
  } catch (error) {
    throw error;
  }
}