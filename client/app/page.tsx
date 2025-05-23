import Navbar from "@/components/navbar/Navbar";

const Home = () => {
  return (
    <div className="min-h-full">
      <Navbar />

      <header className="bg-background-muted shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            PassportJS Authentication System
          </h1>
          <p className="text-foreground-muted">
            A simple yet secured passport js jwt based authentication system
            that can be used with any kind of express application.
          </p>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"></div>
      </main>
    </div>
  );
};

export default Home;
