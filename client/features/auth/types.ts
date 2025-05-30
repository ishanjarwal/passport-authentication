export type InfoTypeValues =
  | "info"
  | "warning"
  | "error"
  | "success"
  | "neutral";

export interface ErrorPayload {
  status: InfoTypeValues;
  message: string;
}
