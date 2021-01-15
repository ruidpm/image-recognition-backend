import { detectFaces, detectText, recognizeCelebrities } from "../RekognitionRepository";

export const queryParameterToRequestMapper: Mapper = {
  "faces": detectFaces,
  "celebrities": recognizeCelebrities,
  "text": detectText
}

interface Mapper {
  [prop: string]: any;
}