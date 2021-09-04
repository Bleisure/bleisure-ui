import { Nullable } from "../types/types";

export default function returnString(string: Nullable<string | number>, alternative: string | number = '') {
  return string
    ? string
    : alternative
}