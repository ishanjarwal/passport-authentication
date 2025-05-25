const page = () => {
  return (
    <div>
      <header className="bg-background-muted shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Documentation
          </h1>
          <p className="text-foreground-muted">
            Here is a comprehensive documentation on how to use this project and
            integrate it with any app for providing authentication.
          </p>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="bg-background text-foreground min-h-screen px-6 py-12 max-w-3xl mx-auto space-y-10">
            {/* Introduction */}
            <section>
              <h1 className="text-3xl font-bold mb-4">
                📘 Project Documentation
              </h1>
              <p className="text-foreground-muted text-lg">
                This guide provides the complete documentation for setting up
                and using the Passport.js authentication project. It covers
                installation, environment setup, and API specifications.
              </p>
            </section>

            {/* Installation */}
            <section>
              <h2 className="text-2xl font-semibold mb-3">⚙️ Installation</h2>
              <p className="text-foreground-muted mb-4">
                The project is structured into two main directories:{" "}
                <code className="bg-background-muted text-foreground px-1 rounded">
                  client
                </code>{" "}
                and{" "}
                <code className="bg-background-muted text-foreground px-1 rounded">
                  server
                </code>
                .
              </p>
              <ol className="list-decimal list-inside text-foreground-muted space-y-2">
                <li>
                  Clone the repository:
                  <pre className="bg-background-muted text-foreground p-4 rounded mt-2 text-sm">
                    <code>
                      git clone
                      https://github.com/yourusername/passport-auth-project
                    </code>
                  </pre>
                </li>
                <li>
                  Install dependencies:
                  <pre className="bg-background-muted text-foreground p-4 rounded mt-2 text-sm">
                    <code>
                      {`cd client
npm install

cd ../server
npm install`}
                    </code>
                  </pre>
                </li>
                <li>
                  Add environment variables for both directories:
                  <pre className="bg-background-muted text-foreground p-4 rounded mt-2 text-sm">
                    <code>
                      {`// .env (server)
PORT=5000
MONGO_URI=your_mongodb_connection
SESSION_SECRET=your_session_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

// .env (client)
VITE_API_BASE_URL=http://localhost:5000`}
                    </code>
                  </pre>
                </li>
                <li>
                  Start the development server:
                  <pre className="bg-background-muted text-foreground p-4 rounded mt-2 text-sm">
                    <code>
                      {`// In server/
npm run dev

// In client/
npm run dev`}
                    </code>
                  </pre>
                </li>
              </ol>
            </section>

            {/* API Reference */}
            <section>
              <h2 className="text-2xl font-semibold mb-3">🔌 API Reference</h2>

              {/* Helper function for each endpoint block */}
              {[
                {
                  title: "Create User",
                  method: "POST",
                  path: "/user/",
                  body: `{ "name": "John", "email": "john@example.com", "password": "securePassword123" }`,
                  success: `{ "message": "User created. Verification email sent." }`,
                  error: `{ "error": "Validation error or rate limit exceeded" }`,
                },
                {
                  title: "Verify Email",
                  method: "POST",
                  path: "/user/verify-email",
                  body: `{ "email": "john@example.com", "otp": "123456" }`,
                  success: `{ "message": "Email verified successfully." }`,
                  error: `{ "error": "Invalid or expired OTP" }`,
                },
                {
                  title: "Resend OTP",
                  method: "POST",
                  path: "/user/resend-otp",
                  body: `{ "email": "john@example.com" }`,
                  success: `{ "message": "OTP resent to your email." }`,
                  error: `{ "error": "Rate limit exceeded" }`,
                },
                {
                  title: "Login",
                  method: "POST",
                  path: "/user/login",
                  body: `{ "email": "john@example.com", "password": "securePassword123" }`,
                  success: `{ "token": "jwt-token", "user": { "name": "John" } }`,
                  error: `{ "error": "Invalid credentials" }`,
                },
                {
                  title: "Request Password Reset",
                  method: "POST",
                  path: "/user/reset-password",
                  body: `{ "email": "john@example.com" }`,
                  success: `{ "message": "Password reset email sent." }`,
                  error: `{ "error": "Email not found or rate limit exceeded" }`,
                },
                {
                  title: "Reset Password (with Token)",
                  method: "POST",
                  path: "/user/reset-password/:token",
                  body: `{ "newPassword": "newSecurePassword123" }`,
                  success: `{ "message": "Password updated successfully." }`,
                  error: `{ "error": "Invalid or expired token" }`,
                },
                {
                  title: "Get Profile",
                  method: "GET",
                  path: "/user/me",
                  success: `{ "user": { "name": "John", "email": "john@example.com" } }`,
                  error: `{ "error": "Unauthorized or token expired" }`,
                },
                {
                  title: "Logout",
                  method: "GET",
                  path: "/user/logout",
                  success: `{ "message": "User logged out." }`,
                  error: `{ "error": "Unauthorized or token expired" }`,
                },
                {
                  title: "Change Password",
                  method: "POST",
                  path: "/user/change-password",
                  body: `{ "oldPassword": "oldPass", "newPassword": "newPass123" }`,
                  success: `{ "message": "Password changed successfully." }`,
                  error: `{ "error": "Old password incorrect or validation failed" }`,
                },
                {
                  title: "Update User",
                  method: "PUT",
                  path: "/user/",
                  body: `{ "name": "New Name" }`,
                  success: `{ "message": "Profile updated." }`,
                  error: `{ "error": "Validation failed or unauthorized" }`,
                },
              ].map((api, index) => (
                <div key={index} className="mb-10">
                  <h3 className="text-xl font-semibold mb-1">{api.title}</h3>
                  <p className="text-sm text-foreground-muted mb-2">
                    <strong>{api.method}</strong> {api.path}
                  </p>

                  {api.body && (
                    <>
                      <p className="text-sm font-medium text-foreground-muted">
                        Sample Request Body:
                      </p>
                      <pre className="bg-background-muted text-foreground p-4 rounded text-sm mb-2 overflow-x-auto">
                        <code>{api.body}</code>
                      </pre>
                    </>
                  )}

                  {api.success && (
                    <>
                      <p className="text-sm font-medium text-foreground-muted">
                        Sample Success Response:
                      </p>
                      <pre className="bg-background-muted text-foreground p-4 rounded text-sm mb-2 overflow-x-auto">
                        <code>{api.success}</code>
                      </pre>
                    </>
                  )}

                  {api.error && (
                    <>
                      <p className="text-sm font-medium text-foreground-muted">
                        Sample Error Response:
                      </p>
                      <pre className="bg-background-muted text-foreground p-4 rounded text-sm overflow-x-auto">
                        <code>{api.error}</code>
                      </pre>
                    </>
                  )}
                </div>
              ))}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
