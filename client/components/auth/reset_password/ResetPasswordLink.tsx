import React from "react";

const ResetPasswordLink = () => {
  return (
    <div>
      <form action="#" method="POST" className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm/6 font-medium text-foreground"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="block w-full rounded-md bg-background-muted px-3 py-1.5 text-base text-foreground outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-primary/80hover:text-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Send Link
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm/6 text-foreground-muted">
        Didn't recieve a link ?{" "}
        <a
          href="#"
          className="font-semibold text-primary hover:text-primary/80"
        >
          Resend
        </a>
      </p>
    </div>
  );
};

export default ResetPasswordLink;
