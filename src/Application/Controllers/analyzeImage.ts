/* eslint-disable @typescript-eslint/ban-ts-comment */
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import queryParameterToRequestMapper from "../../Infrastructure/utils/queryParameterToRequestMapper";
import createApiResponse from "../utils/createApiResponse";

export default async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  if (!event.queryStringParameters) {
    return createApiResponse(400, { error: "Malformed request, missing query parameters" })
  }

  if (!event.pathParameters?.imageName) {
    return createApiResponse(400, { error: "Malformed request, missing image name" })
  }
  
  const imageName = event.pathParameters.imageName;
  const { analyze } = event.queryStringParameters;
  const analyzeParameters = analyze?.split(",");
  //@ts-ignore
  const requestPromises = analyzeParameters?.reduce(async (acc, curr) => {
    //@ts-ignore
    if (queryParameterToRequestMapper[curr]) {
      //@ts-ignore
      acc.push(await queryParameterToRequestMapper[curr](imageName));
    }
    return acc;
  }, []);

  if (!requestPromises?.length) {
    return createApiResponse(400, { error: "No valid request parameters" })
  }

  let result: unknown;
  try {
    result = await Promise.all(requestPromises);
  } catch (error) {
    return createApiResponse(500, { error })
  }

  return createApiResponse(200, { result })
}