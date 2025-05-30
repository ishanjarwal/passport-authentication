import ResetPasswordForm from "@/components/auth/reset_password/ResetPasswordForm";
import ResetPasswordLink from "@/components/auth/reset_password/ResetPasswordLink";
import ProtectFromLoggedInUser from "@/components/protected/ProtectFromLoggedInUser";

type Props = {
  searchParams: Promise<{ tk?: string }>;
};

const page = async ({ searchParams }: Props) => {
  const { tk: token } = await searchParams;
  return (
    <div className="flex min-h-[calc(100vh-120px)] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="/logo.png"
          className="mx-auto sm:h-32 h-24 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-foreground">
          {token
            ? "Reset your account Password"
            : "Send Password reset link to your email"}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {token ? (
          <ResetPasswordForm token={token as string} />
        ) : (
          <ResetPasswordLink />
        )}
      </div>
    </div>
  );
};

export default page;
