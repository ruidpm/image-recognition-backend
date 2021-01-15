import { APIGatewayProxyResult } from "aws-lambda";

/**
 * Creates an API response.
 * @param {number} statusCode - The status code for the response.
 * @param {Record<string, unknown>} message - The message to include in the response.
 * @returns {APIGatewayProxyResult} Returns a response
 */
export default (statusCode: number, message: Record<string, unknown>): APIGatewayProxyResult => ({
  statusCode,
  body: JSON.stringify({ message }),
  headers: {
    "Content-Type": "application/json"
  }
});