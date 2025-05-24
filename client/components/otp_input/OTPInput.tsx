"use client";

import React, { useRef, useEffect } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

interface OTPInputProps {
  name: string;
  length?: number;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
}

const isDigit = (char: string) => /^\d$/.test(char);

const OTPInput: React.FC<OTPInputProps> = ({
  name,
  length = 4,
  setValue,
  watch,
}) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const otp = watch(name) || "";

  // Distribute values when pasting
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("Text")
      .replace(/\D/g, "")
      .slice(0, length);
    if (!pasted) return;

    const otpArr = Array.from({ length }).map((_, idx) => pasted[idx] || "");
    const newOtp = otpArr.join("");
    setValue(name, newOtp, { shouldValidate: true });

    const nextIndex = Math.min(pasted.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const val = e.target.value;
    if (!isDigit(val) && val !== "") return;

    const otpArr = otp.split("");
    otpArr[index] = val;
    const newOtp = otpArr.join("").padEnd(length, "");
    setValue(name, newOtp, { shouldValidate: true });

    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const isCtrlOrCmd = e.ctrlKey || e.metaKey;

    // Allow Ctrl+V (paste), Ctrl+C, Cmd+V, etc.
    if (isCtrlOrCmd && ["v", "c", "x", "a"].includes(e.key.toLowerCase())) {
      return;
    }

    if (e.key === "Backspace") {
      e.preventDefault();
      const otpArr = otp.split("");
      if (otpArr[index]) {
        otpArr[index] = "";
        setValue(name, otpArr.join("").padEnd(length, ""), {
          shouldValidate: true,
        });
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        const prevOtp = otp.split("");
        prevOtp[index - 1] = "";
        setValue(name, prevOtp.join("").padEnd(length, ""), {
          shouldValidate: true,
        });
      }
    } else if (
      !isDigit(e.key) &&
      !["Tab", "ArrowLeft", "ArrowRight"].includes(e.key)
    ) {
      e.preventDefault(); // Block all other keys except digits and navigation
    }
  };

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  return (
    <div className="flex gap-2 justify-center items-center ">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => void (inputRefs.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={otp[i] || ""}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={i === 0 ? handlePaste : undefined}
          className="w-12 h-12 text-center text-xl border border-primary rounded focus:outline-none focus:ring-2 ring-primary"
        />
      ))}
    </div>
  );
};

export default OTPInput;
