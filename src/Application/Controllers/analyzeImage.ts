import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { requestTypes } from "../../Domain/Interfaces/RekognitionInterfaces";
import { analyze } from "../../Infrastructure/RekognitionRepository";

export default async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  const imageName = event.pathParameters?.imageName;

  let result;
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    result = Promise.all([await analyze(imageName!, requestTypes.detectFaces)]);
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