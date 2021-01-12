import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { detectFaces, recognizeCelebrities } from "../../Infrastructure/RekognitionRepository";

export default async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  const imageName = event.pathParameters?.imageName;

  let result: unknown;
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    result = Promise.all([await detectFaces(imageName!), await recognizeCelebrities(imageName!)]);
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ result })
  };
}