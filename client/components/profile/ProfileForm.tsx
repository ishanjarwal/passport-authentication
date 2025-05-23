import { UserCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

const ProfileForm = () => {
  return (
    <div>
      <form>
        <div className="space-y-12">
          <div className="border-b border-foreground-muted/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm/6 font-medium text-foreground"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <UserCircleIcon aria-hidden="true" className="size-20" />
                  <button
                    type="button"
                    className="rounded-md bg-background-muted px-2.5 py-1.5 text-sm font-semibold text-foreground shadow-xs ring-1 ring-foreground-muted/10 ring-inset hover:bg-primary cursor-pointer"
                  >
                    Change
                  </button>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm/6 font-medium text-foreground"
                >
                  Name
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-background-muted pl-3 outline-1 -outline-offset-1 outline-foreground-muted/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="janesmith"
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-foreground placeholder:text-foreground-muted/50 focus:outline-none sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-foreground"
                >
                  Password
                </label>
                <div className="mt-2 flex items-center space-x-2 w-full">
                  <div className="flex w-full items-center rounded-md bg-background-muted pl-3 outline-1 -outline-offset-1 outline-foreground-muted/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-primary">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder=""
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-foreground placeholder:text-foreground-muted/50 focus:outline-none sm:text-sm/6"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-primary/75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Change
                  </button>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm/6 font-medium text-foreground"
                >
                  About
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full rounded-md bg-background-muted px-3 py-1.5 text-base text-foreground outline-1 -outline-offset-1 outline-foreground-muted/10 placeholder:text-foreground-muted/50 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm/6 text-gray-600">
                  Write a few sentences about yourself.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm/6 font-semibold text-foreground"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-primary/75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
