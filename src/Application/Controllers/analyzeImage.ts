import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { Rekognition } from "aws-sdk";
import getEnvironmentVariable from "../utils/getEnvironmentVariable";

const bucket = getEnvironmentVariable("IMAGES_BUCKET");

export default async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  const imageName = event.pathParameters?.imageName;

  const client = new Rekognition();
  const params = {
    Image: {
      S3Object: {
        Bucket: bucket,
        Name: imageName
      }
    }
  }

  let result: Rekognition.DetectFacesResponse | undefined;
  try {
    result = await client.detectFaces(params).promise();
  } catch (error) {
    console.log(JSON.stringify(error))
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ imageName, result })
  };
}