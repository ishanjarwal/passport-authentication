import { classNames } from "@/utils/classNames";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import React from "react";

interface Props {
  message: string;
  type?: "err" | "warning" | "success";
}

const icons = {
  err: <XCircleIcon />,
  warning: <ExclamationCircleIcon />,
  success: <CheckCircleIcon />,
};

const InfoBox = ({ message, type = "err" }: Props) => {
  return (
    <div
      className={classNames(
        "sm:mx-auto sm:w-full sm:max-w-sm p-4 rounded-lg border",
        type == "err" && "border-red-500 bg-red-400/10",
        type == "warning" && "border-yellow-500 bg-yellow-400/10",
        type == "success" && "border-green-500 bg-green-400/10"
      )}
    >
      <p
        className={classNames(
          "text-sm flex justify-start items-center space-x-2",
          type == "err" && "text-red-500 ",
          type == "warning" && "text-yellow-500 ",
          type == "success" && "text-green-500 "
        )}
      >
        <span className="size-6">{icons[type]}</span>
        <span>{message}</span>
      </p>
    </div>
  );
};

export default InfoBox;
