"use client";
import { InfoTypeValues } from "@/features/auth/types";
import { classNames } from "@/utils/classNames";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import React, { ReactNode } from "react";

interface Props {
  message: string;
  type?: InfoTypeValues;
}

const icons: Record<string, ReactNode> = {
  error: <XCircleIcon />,
  fail: <XCircleIcon />,
  warning: <ExclamationCircleIcon />,
  success: <CheckCircleIcon />,
};

const InfoBox = ({ message, type = "error" }: Props) => {
  return (
    <div
      className={classNames(
        "sm:mx-auto sm:w-full sm:max-w-sm p-4 rounded-lg border",
        (type == "error" || type == "fail") && "border-red-500 bg-red-400/10",
        type == "warning" && "border-yellow-500 bg-yellow-400/10",
        type == "success" && "border-green-500 bg-green-400/10",
        type == "info" && "bg-primary/10 border-primary"
      )}
    >
      <p
        className={classNames(
          "text-sm flex justify-start items-center space-x-2",
          (type == "error" || type == "fail") && "text-red-500 ",
          type == "warning" && "text-yellow-500 ",
          type == "success" && "text-green-500 ",
          type == "info" && "text-primary"
        )}
      >
        <span className="size-6">{icons[type]}</span>
        <span className="capitalize">{message}</span>
      </p>
    </div>
  );
};

export default InfoBox;
