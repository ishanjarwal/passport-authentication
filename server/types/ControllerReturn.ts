export interface ControllerReturn<T = any> {
  status: "fail" | "success" | "error";
  message?: string;
  body?: T;
}
