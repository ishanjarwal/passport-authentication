"use client";
import InfoBox from "@/components/infobox/InfoBox";
import OTPInput from "@/components/otp_input/OTPInput";
import {
  resendOTP,
  resetInfo,
  selectAuthState,
  verifyUser,
} from "@/features/auth/authSlice";
import { AppDispatch } from "@/redux/store";
import { classNames } from "@/utils/classNames";
import { updateSearchParam } from "@/utils/updateSearchParam";
import { VerifySchema, VerifyValues } from "@/validations/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const VerifyForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { info, loading } = useSelector(selectAuthState);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [changeEmail, setChangeEmail] = useState<boolean>(false);
  const {
    register,
    trigger,
    formState: { errors, isValid },
    handleSubmit,
    watch,
    setValue,
  } = useForm<VerifyValues>({
    resolver: zodResolver(VerifySchema),
    defaultValues: { email: email ? email : undefined, otp: "" },
    mode: "onChange",
  });

  const onSubmit = (data: VerifyValues) => {
    dispatch(verifyUser(data));
  };

  const handleResendOTP = async () => {
    const isValidEmail = await trigger("email");
    if (isValidEmail) dispatch(resendOTP({ email: watch("email") }));
  };

  const router = useRouter();
  useEffect(() => {
    if (!email) {
      router.push("/account/profile");
    }
  }, [email, router]);

  useEffect(() => {
    if (errors.email) {
      setChangeEmail(true);
    }
  }, [errors.email, changeEmail]);

  useEffect(() => {
    let timeout: any;
    if (info?.type === "success") {
      timeout = setTimeout(() => {
        router.push("/account/profile");
      }, 1000);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [info]);

  useEffect(() => {
    return () => {
      dispatch(resetInfo({}));
    };
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {info && (
          <div>
            <InfoBox type={info.type} message={info.message} />
          </div>
        )}
        <div>
          <label
            htmlFor="otp"
            className="block text-sm/6 font-medium text-foreground mx-auto text-center"
          >
            OTP
          </label>
          {errors.otp && (
            <p className="text-red-400 text-xs text-center">
              {errors.otp.message}
            </p>
          )}
          <div className="mt-2">
            <OTPInput name="otp" setValue={setValue} watch={watch} length={4} />{" "}
          </div>
        </div>

        <div>
          {changeEmail && (
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-foreground"
              >
                Email address
              </label>
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email.message}</p>
              )}
              <div className="mb-2 mt-1">
                <input
                  {...register("email")}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={classNames(
                    "block w-full rounded-md bg-background-muted px-3 py-1.5 text-base text-foreground outline-1 -outline-offset-1 outline-foreground-muted placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6",
                    errors.email && "outline-red-500 outline-2"
                  )}
                />
              </div>
            </div>
          )}
          {changeEmail ? (
            <button
              type="button"
              className="flex w-full cursor-pointer justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-primary/80hover:text-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              onClick={async () => {
                const isValidEmail = await trigger("email");
                if (isValidEmail) {
                  updateSearchParam("email", watch("email"));
                  setChangeEmail(false);
                }
              }}
            >
              Done
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="flex w-full disabled:brightness-75 disabled:cursor-not-allowed cursor-pointer justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-primary/80hover:text-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {!loading ? "Verify" : <Loader2 className="animate-spin" />}
            </button>
          )}
          {!changeEmail && (
            <p className="mx-auto text-center mt-2 text-sm">
              <span>{email}</span>
              <span
                className="text-primary underline ms-2 cursor-pointer"
                onClick={() => setChangeEmail(true)}
              >
                Change
              </span>
            </p>
          )}
        </div>
      </form>

      <p className="mt-10 text-center text-sm/6 text-foreground-muted">
        Didn't recieve OTP?{" "}
        <button
          onClick={handleResendOTP}
          className="font-semibold text-primary hover:text-primary/80 underline"
        >
          Resend
        </button>
      </p>
    </div>
  );
};

export default VerifyForm;
