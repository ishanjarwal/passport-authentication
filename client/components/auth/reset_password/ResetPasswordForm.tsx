"use client";
import InfoBox from "@/components/infobox/InfoBox";
import {
  resetInfo,
  resetPassword,
  selectAuthState,
} from "@/features/auth/authSlice";
import { AppDispatch } from "@/redux/store";
import {
  ResetPasswordSchema,
  ResetPasswordValues,
} from "@/validations/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ResetPasswordForm = ({ token }: { token: string }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, info } = useSelector(selectAuthState);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ResetPasswordValues>({
    defaultValues: { password: "", password_confirmation: "" },
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordValues) => {
    const sendable = { ...data, token };
    dispatch(resetPassword(sendable));
  };

  useEffect(() => {
    let timeout: any;
    if (info?.type === "success") {
      toast.success(info.message);
      timeout = setTimeout(() => {
        router.push("/account/login");
      }, 1500);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [info?.type]);

  useEffect(() => {
    dispatch(resetInfo({}));
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {info && info?.type !== "neutral" && (
          <div>
            <InfoBox type={info.type} message={info.message} />
          </div>
        )}
        <div>
          <label
            htmlFor="email"
            className="block text-sm/6 font-medium text-foreground"
          >
            New Password
          </label>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
          <div className="mt-2">
            <input
              {...register("password")}
              type="password"
              className="block w-full rounded-md bg-background-muted px-3 py-1.5 text-base text-foreground outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm/6 font-medium text-foreground"
          >
            Confirm Password
          </label>
          {errors.password_confirmation && (
            <p className="text-red-500 text-sm">
              {errors.password_confirmation.message}
            </p>
          )}
          <div className="mt-2">
            <input
              {...register("password_confirmation")}
              type="password"
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
            {!loading ? "Confirm" : <Loader2 className="animate-spin" />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
