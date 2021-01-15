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
  const { detect } = event.queryStringParameters;
  const detectParameters = detect?.split(",");
  const requestPromises = detectParameters?.filter(parameter => 
    //@ts-ignore
    queryParameterToRequestMapper[parameter])
    .map(async (parameter) => 
    //@ts-ignore
      await queryParameterToRequestMapper[parameter](imageName)
    );

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