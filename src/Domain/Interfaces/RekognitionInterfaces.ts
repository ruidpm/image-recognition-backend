import { Rekognition } from "aws-sdk"

const client = new Rekognition();

// const requests = {
//   detectFaces: "detectFaces",
//   recognizeCelebrities: "recognizeCelebrities"
// }

// export interface RequestTypes {
//     // eslint-disable-next-line @typescript-eslint/ban-types
//     [request: string]: Function
// }

export const requestTypes = {
  detectFaces: client.detectFaces,
  recognizeCelebrities: client.recognizeCelebrities
}