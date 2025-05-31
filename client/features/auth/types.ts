export type InfoTypeValues =
  | "info"
  | "warning"
  | "error"
  | "success"
  | "neutral"
  | "fail";

export interface ErrorPayload {
  status: InfoTypeValues;
  message: string;
}
