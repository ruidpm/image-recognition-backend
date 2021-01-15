import { detectFaces, detectText, recognizeCelebrities } from "../RekognitionRepository";

export default {
  "faces": detectFaces,
  "celebrities": recognizeCelebrities,
  "text": detectText
}