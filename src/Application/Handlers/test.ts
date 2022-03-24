import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { SNS } from "aws-sdk";

const topic = process.env.SMS_TOPIC;

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> =>
{
  if (!event.body) {
    return {
      statusCode: 200,
      body: JSON.stringify({ error: "Where the body at?" })
    };
  }

  let message;
  
  try {
    message = JSON.parse(event.body).message;
  } catch (e: any) {
    return {
      statusCode: 200,
      body: JSON.stringify({ error: e.message })
    };
  }

  const sns = new SNS();
  const params: SNS.Types.PublishInput = {
    Message: message,
    TopicArn: topic,
  };


  await sns.publish(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({ message: `${message} sent` })
  };
}