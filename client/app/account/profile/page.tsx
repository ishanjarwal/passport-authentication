import Navbar from "@/components/navbar/Navbar";
import ProfileForm from "@/components/profile/ProfileForm";
import ProtectedRoute from "@/components/protected/ProtectedRoute";

const page = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-full">
        <header className="bg-background-muted shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Your Profile
            </h1>
            <p className="mt-1 text-sm/6 text-foreground-muted">
              This information is only available to signed in user. Here you can
              view and update your details.
            </p>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
            <ProfileForm />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};
export default page;
