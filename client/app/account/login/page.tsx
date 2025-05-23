import LoginForm from "@/components/auth/login/LoginForm";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="/logo.png"
          className="mx-auto sm:h-32 h-24 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-foreground">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <LoginForm />
        <p className="mt-10 text-center text-sm/6 text-foreground-muted">
          Not a member?{" "}
          <Link
            href="/account/register"
            className="font-semibold text-primary hover:text-primary/80"
          >
            Register Now!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
