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
      const response = await axios.post(
        url,
        { email, password },
        { withCredentials: true }
      );
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
}

export async function userProfileAPI() {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${env.NEXT_PUBLIC_BASE_URL}/user/me`;
      const response = await axios.get(url, { withCredentials: true });
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
}

export async function logoutUserAPI() {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${env.NEXT_PUBLIC_BASE_URL}/user/logout`;
      const response = await axios.get(url, { withCredentials: true });
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
}

export async function updateUserAPI(data: { name: string; bio: string }) {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${env.NEXT_PUBLIC_BASE_URL}/user/`;
      const { name, bio } = data;
      const response = await axios.put(
        url,
        { name, bio },
        { withCredentials: true }
      );
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
}

export async function changePasswordAPI(data: {
  password: string;
  password_confirmation: string;
}) {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${env.NEXT_PUBLIC_BASE_URL}/user/change-password`;
      const { password, password_confirmation } = data;
      const response = await axios.post(
        url,
        { password, password_confirmation },
        { withCredentials: true }
      );
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
}

export async function resetPasswordAPI(data: {
  token: string;
  password: string;
  password_confirmation: string;
}) {
  return new Promise(async (resolve, reject) => {
    try {
      const { token, password, password_confirmation } = data;
      const url = `${env.NEXT_PUBLIC_BASE_URL}/user/reset-password/${token}`;
      const response = await axios.post(
        url,
        { password, password_confirmation },
        { withCredentials: true }
      );
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
}
