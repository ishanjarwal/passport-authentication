"use client";
import InfoBox from "@/components/infobox/InfoBox";
import {
  loginUser,
  resetInfo,
  selectAuthState,
} from "@/features/auth/authSlice";
import { useResetInfoOnMount } from "@/hooks/useResetInfoOnMount";
import { AppDispatch } from "@/redux/store";
import { classNames } from "@/utils/classNames";
import toastEmitter from "@/utils/toastEmitter";
import { LoginSchema, LoginValues } from "@/validations/validation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const LoginForm = () => {
  useResetInfoOnMount();
  const { info, loading } = useSelector(selectAuthState);
  const dispatch = useDispatch<AppDispatch>();
  const [password, setPassword] = useState<boolean>(true);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<LoginValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
  });

  const onSubmit = (data: LoginValues) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (info?.type === "success") {
      console.log("toast should be emitted");
      toastEmitter("success", info.message, dispatch);
    }
  }, [dispatch, info]);

  return (
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
          Email
        </label>
        {errors.email && (
          <p className="text-red-400 text-xs">{errors.email.message}</p>
        )}
        <div className="mt-2">
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

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm/6 font-medium text-foreground"
          >
            Password
          </label>
        </div>
        {errors.password && (
          <p className="text-red-400 text-xs">{errors.password.message}</p>
        )}
        <div className="mt-2 relative">
          <span
            onClick={() => setPassword(!password)}
            className="absolute top-1/2 -translate-y-1/2 right-2 text-foreground z-[1] cursor-pointer"
          >
            {password ? (
              <EyeIcon className="size-6" />
            ) : (
              <EyeSlashIcon className="size-6" />
            )}
            {/*  */}
          </span>
          <input
            {...register("password")}
            id="password"
            name="password"
            type={password ? "password" : "text"}
            autoComplete="current-password"
            className={classNames(
              "block w-full rounded-md bg-background-muted px-3 py-1.5 text-base text-foreground outline-1 -outline-offset-1 outline-foreground-muted placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6",
              errors.password && "outline-red-500 outline-2"
            )}
          />
        </div>
        <div className="flex justify-end mt-2">
          <Link
            href={"/account/reset-password"}
            className="text-primary text-sm font-bold hover:underline"
          >
            Forgot Password ?
          </Link>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="flex w-full disabled:brightness-75 disabled:cursor-not-allowed cursor-pointer justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-primary/80hover:text-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {!loading ? "Login" : <Loader2 className="animate-spin" />}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
