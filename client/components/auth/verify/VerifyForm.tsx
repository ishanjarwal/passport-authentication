import OTPInput from "@/components/otp_input/OTPInput";
import React from "react";

const VerifyForm = () => {
  return (
    <div>
      <form action="#" method="POST" className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm/6 font-medium text-foreground mx-auto text-center"
          >
            OTP
          </label>
          <div className="mt-2">
            <OTPInput />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-primary/80hover:text-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Verify
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm/6 text-foreground-muted">
        Didn't recieve OTP?{" "}
        <a
          href="#"
          className="font-semibold text-primary hover:text-primary/80"
        >
          Resend
        </a>
      </p>
    </div>
  );
};

export default VerifyForm;
