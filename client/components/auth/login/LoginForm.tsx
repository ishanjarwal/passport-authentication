"use client";
import { classNames } from "@/utils/classNames";
import { LoginSchema, LoginValues } from "@/validations/validation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const LoginForm = () => {
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
    console.log("Valid data:", data);
    toast.error("Your data is valid !!!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:hover:bg-primary/50 disabled:bg-primary/50"
          disabled={!isValid}
        >
          Sign in
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
