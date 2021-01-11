import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import analyzeImage from "../Controllers/analyzeImage";

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> =>
  analyzeImage(event);