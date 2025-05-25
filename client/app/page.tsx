import Navbar from "@/components/navbar/Navbar";

const Home = () => {
  return (
    <div>
      <header className="bg-background-muted shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold tracking-tight text-foreground">
            PassportJS Authentication System
          </h1>
          <p className="text-foreground-muted">
            A simple yet secured passport js jwt based authentication system
            that can be used with any kind of express application.
          </p>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="bg-background text-foreground min-h-screen mx-auto space-y-10">
            {/* Introduction */}
            <section>
              <h1 className="text-5xl font-bold mb-4">🛂 Introduction</h1>
              <p className="text-foreground-muted text-lg">
                This project is a minimal and extensible authentication system
                built with <strong>Passport.js</strong>, aimed at simplifying
                user login flows using local and OAuth strategies. Whether
                you're building a personal app or a production-grade platform,
                this boilerplate gives you a clean foundation to get started
                quickly.
              </p>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-2xl font-semibold mb-3">✨ Features</h2>
              <ul className="list-disc list-inside text-foreground-muted space-y-1">
                <li>Plug-and-play authentication with Passport.js</li>
                <li>Local login and registration</li>
                <li>OAuth integration with Google and GitHub</li>
                <li>Clean and minimal folder structure</li>
                <li>Tailwind CSS-based styling</li>
              </ul>
            </section>

            {/* Tech Stack */}
            <section>
              <h2 className="text-2xl font-semibold mb-3">🧰 Tech Stack</h2>
              <ul className="list-disc list-inside text-foreground-muted space-y-1">
                <li>Node.js</li>
                <li>Express.js</li>
                <li>Passport.js</li>
                <li>MongoDB (with Mongoose)</li>
                <li>Tailwind CSS</li>
              </ul>
            </section>

            {/* Dependencies */}
            <section>
              <h2 className="text-2xl font-semibold mb-3">📦 Dependencies</h2>
              <ul className="list-disc list-inside text-foreground-muted space-y-1">
                <li>
                  <code>express</code> – Web framework for Node.js
                </li>
                <li>
                  <code>passport</code> – Authentication middleware
                </li>
                <li>
                  <code>passport-local</code> – Local strategy for Passport
                </li>
                <li>
                  <code>passport-google-oauth20</code> – Google OAuth 2.0
                  strategy
                </li>
                <li>
                  <code>passport-github2</code> – GitHub OAuth strategy
                </li>
                <li>
                  <code>mongoose</code> – MongoDB object modeling
                </li>
                <li>
                  <code>bcrypt</code> – Password hashing
                </li>
                <li>
                  <code>dotenv</code> – Environment variable loader
                </li>
              </ul>
            </section>

            {/* Documentation Link */}
            <section>
              <h2 className="text-2xl font-semibold mb-3">📚 Documentation</h2>
              <p className="text-foreground-muted">
                You can find the full documentation and setup guide on the{" "}
                <a
                  href="https://github.com/yourusername/passport-auth-project"
                  className="text-primary underline hover:opacity-80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub repository
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
