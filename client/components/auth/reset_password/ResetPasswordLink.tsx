"use client";
import InfoBox from "@/components/infobox/InfoBox";
import {
  resetInfo,
  resetPasswordLink,
  selectAuthState,
} from "@/features/auth/authSlice";
import { AppDispatch } from "@/redux/store";
import { EmailSchema, EmailValues } from "@/validations/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const ResetPasswordLink = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, info, user, initialized } = useSelector(selectAuthState);
  const searchParams = useSearchParams();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<EmailValues>({
    defaultValues: { email: "" },
    resolver: zodResolver(EmailSchema),
  });

  const onSubmit = (data: EmailValues) => {
    dispatch(resetPasswordLink(data));
  };

  useEffect(() => {
    setValue("email", user?.email || searchParams.get("email") || "");
  }, [user]);

  useEffect(() => {
    if (initialized) {
      dispatch(resetInfo({}));
    }
    return () => {
      dispatch(resetInfo({}));
    };
  }, [initialized]);

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
            htmlFor="email"
            className="block text-sm/6 font-medium text-foreground"
          >
            Email address
          </label>
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
          <div className="mt-2">
            <input
              {...register("email")}
              type="email"
              className="block w-full rounded-md bg-background-muted px-3 py-1.5 text-base text-foreground outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="flex w-full disabled:brightness-75 disabled:cursor-not-allowed cursor-pointer justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-primary/80hover:text-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {!loading ? "Send Link" : <Loader2 className="animate-spin" />}
          </button>
        </div>

        <p className="mt-10 text-center text-sm/6 text-foreground-muted">
          Didn't recieve a link ?{" "}
          <button
            type="submit"
            className="font-semibold text-primary hover:text-primary/80"
          >
            Resend
          </button>
        </p>
      </form>
    </div>
  );
};

export default ResetPasswordLink;
