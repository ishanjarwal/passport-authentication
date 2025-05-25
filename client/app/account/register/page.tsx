import RegisterForm from "@/components/auth/register/RegisterForm";
import ProtectFromLoggedInUser from "@/components/protected/ProtectFromLoggedInUser";
import Link from "next/link";

const page = () => {
  return (
    <ProtectFromLoggedInUser>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="/logo.png"
            className="mx-auto sm:h-32 h-24 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-foreground">
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <RegisterForm />
          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already a member?{" "}
            <Link
              href="/account/login"
              className="font-semibold text-primary hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </ProtectFromLoggedInUser>
  );
};

export default page;
