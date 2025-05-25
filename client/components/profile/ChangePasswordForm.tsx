"use client";
import { changePassword, selectAuthState } from "@/features/auth/authSlice";
import { AppDispatch } from "@/redux/store";
import {
  ChangePasswordSchema,
  ChangePasswordValues,
} from "@/validations/validation";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const ChangePasswordForm = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (state: boolean) => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { info, loading } = useSelector(selectAuthState);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<ChangePasswordValues>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const onSubmit = (data: ChangePasswordValues) => {
    dispatch(changePassword(data));
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-background/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative border border-foreground/10 transform overflow-hidden rounded-lg bg-background text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left900 w-full">
                    <DialogTitle
                      as="h3"
                      className="text-xl font-semibold text-foreground"
                    >
                      Change account password
                    </DialogTitle>
                    <div className="mt-2 flex flex-col space-y-4">
                      <div className="flex flex-col items-start">
                        <label
                          htmlFor="email"
                          className="block text-sm/6 font-medium text-foreground"
                        >
                          New Password
                        </label>
                        {errors.password && (
                          <p className="text-red-500 text-sm">
                            {errors.password.message}
                          </p>
                        )}
                        <div className="mt-2 w-full">
                          <input
                            {...register("password")}
                            id="password"
                            name="password"
                            type="password"
                            className="block w-full rounded-md bg-background-muted px-3 py-1.5 text-base text-foreground outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col items-start">
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
                        <div className="mt-2 w-full">
                          <input
                            {...register("password_confirmation")}
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            className="block w-full rounded-md bg-background-muted px-3 py-1.5 text-base text-foreground outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-background px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="submit"
                  disabled={loading}
                  onClick={() => {
                    if (isValid) setOpen(false);
                  }}
                  className="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-xs hover:brightness-90 sm:ml-3 sm:w-auto cursor-pointer"
                >
                  {!loading ? "Confirm" : <Loader2 className="animate-spin" />}
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-background-muted px-3 py-2 text-sm font-semibold text-foreground shadow-xs hover:brightness-90 sm:mt-0 sm:w-auto cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ChangePasswordForm;
