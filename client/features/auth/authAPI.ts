import { env } from "@/env";
import axios from "axios";

export async function registerUserAPI(data: {
  name: string;
  email: string;
  password: string;
}) {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${env.NEXT_PUBLIC_BASE_URL}/user`;
      const { name, email, password } = data;
      const response = await axios.post(url, { name, email, password });
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
}

export async function verifyUserAPI(data: { email: string; otp: string }) {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${env.NEXT_PUBLIC_BASE_URL}/user/verify-email`;
      const { email, otp } = data;
      const response = await axios.post(url, { email, otp });
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
}

export async function resendOTPAPI(data: { email: string }) {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${env.NEXT_PUBLIC_BASE_URL}/user/resend-otp`;
      const { email } = data;
      const response = await axios.post(url, { email });
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
}

export async function loginUserAPI(data: { email: string; password: string }) {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${env.NEXT_PUBLIC_BASE_URL}/user/login`;
      const { email, password } = data;
      const response = await axios.post(url, { email, password });
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
}
