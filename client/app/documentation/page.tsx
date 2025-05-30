import CodeBlock from "@/components/documentation/CodeBlock";

const page = () => {
  return (
    <div>
      <header className="bg-background-muted shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
            📘 Project Documentation
          </h1>
          <p className="text-foreground-muted mt-4">
            This guide documents the setup and API usage for the
            Passport.js-based authentication project.
          </p>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="bg-background text-foreground min-h-screen px-6 py-12 max-w-3xl mx-auto space-y-10">
            {/* Installation */}
            <section>
              <h2 className="text-2xl font-semibold mb-3">⚙️ Installation</h2>
              <ol className="list-decimal list-inside text-foreground-muted space-y-4">
                <li>
                  Clone the repository:
                  <CodeBlock language="bash">
                    {`git clone https://github.com/ishanjarwal/passport-authentication`}
                  </CodeBlock>
                </li>
                <li>
                  Install dependencies:
                  <CodeBlock language="bash">
                    {`cd client
npm install

cd ../server
npm install`}
                  </CodeBlock>
                </li>
                <li>
                  Add environment variables:
                  <CodeBlock language="bash">
                    {`# /server
# Server port
PORT=8080

# Frontend origin for CORS
FRONTEND_HOST=http://localhost:3000

# MongoDB connection string
DB_URL=""

# Bcrypt salt rounds for password hashing
SALT_ROUNDS=

# SMTP username (your email address)
EMAIL_USER=

# Email address that appears in the "from" field
EMAIL_FROM=

# SMTP password or application-specific password
EMAIL_PASSWORD=

# SMTP port (usually 587 for TLS)
EMAIL_PORT=587

# SMTP provider hostname (e.g., Gmail)
EMAIL_PROVIDER=smtp.gmail.com

# JWT secret for access tokens
JWT_ACCESS_TOKEN_SECRET=

# JWT secret for refresh tokens
JWT_REFRESH_TOKEN_SECRET=

# JWT secret used for password reset links
JWT_PASSWORD_RESET_SECRET=

# Application environment (development | production)
ENVIRONMENT=development

# /client
NEXT_PUBLIC_BASE_URL=http://localhost:8080/api/v1
`}
                  </CodeBlock>
                </li>
                <li>
                  Start both development servers:
                  <CodeBlock language="bash">
                    {`npm run dev # in both /client and /server directories`}
                  </CodeBlock>
                </li>
              </ol>
            </section>

            {/* API Reference */}
            <section>
              <h2 className="text-2xl font-semibold mb-3">🔌 API Reference</h2>

              {[
                {
                  title: "Create User",
                  method: "POST",
                  path: "/user/",
                  body: `{
"name": "John Doe",
"email": "john@example.com",
"password": "securePassword123"
}`,
                  success: `{
"status": "success",
"message": "User created. Verification email sent."
}`,
                  error: `{
"status": "error",
"message": "Validation error or rate limit exceeded"
}`,
                },
                {
                  title: "Verify Email",
                  method: "POST",
                  path: "/user/verify-email",
                  body: `{
"email": "john@example.com",
"otp": "1234"
}`,
                  success: `{
"status": "success",
"message": "Account verified successfully."
}`,
                  error: `{
"status": "error",
"message": "Invalid or expired OTP"
}`,
                },
                {
                  title: "Resend OTP",
                  method: "POST",
                  path: "/user/resend-otp",
                  body: `{
"email": "john@example.com"
}`,
                  success: `{
"status": "success",
"message": "OTP resent to your email."
}`,
                  error: `{
"status": "error",
"message": "Rate limit exceeded / No Users found"
}`,
                },
                {
                  title: "Login",
                  method: "POST",
                  path: "/user/login",
                  body: `{
"email": "john@example.com",
"password": "securePassword123"
}`,
                  success: `{
"status": "success",
"message": "Login successful",
"body": {
    "_id": "2893fhw8e8sda",
    "name": "John Doe",
    "email": "john@example.com"
  }
}`,
                  error: `{
"status": "error",
"message": "Invalid credentials"
}`,
                },
                {
                  title: "Request Password Reset",
                  method: "POST",
                  path: "/user/reset-password",
                  body: `{
"email": "john@example.com"
}`,
                  success: `{
"status": "success",
"message": "Password reset email sent."
}`,
                  error: `{
"status": "error",
"message": "Email not found or rate limit exceeded"
}`,
                },
                {
                  title: "Reset Password (with Token)",
                  method: "POST",
                  path: "/user/reset-password/:token",
                  body: `{
"password": "newSecurePassword123",
"password_confirmation": "newSecurePassword123",
}`,
                  success: `{
"status": "success",
"message": "Password updated successfully."
}`,
                  error: `{
"status": "error",
"message": "Invalid or expired token"
}`,
                },
                {
                  title: "Get Profile",
                  method: "GET",
                  path: "/user/me",
                  success: `{
"status": "success",
"message": "User data fetched.",
"body": {
    "_id": "2893fhw8e8sda",
    "name": "John Doe",
    "email": "john@example.com",
    "bio": "Hey there, I am a coder."
  }
}`,
                  error: `{
"status": "error",
"message": "Unauthorized or token expired"
}`,
                },
                {
                  title: "Logout",
                  method: "GET",
                  path: "/user/logout",
                  success: `{
"status": "success",
"message": "User logged out."
}`,
                  error: `{
"status": "error",
"message": "Unauthorized or token expired"
}`,
                },
                {
                  title: "Change Password",
                  method: "POST",
                  path: "/user/change-password",
                  body: `{
"password": "12345678",
"password_confirmation": "12345678"
}`,
                  success: `{
"status": "success",
"message": "Password changed successfully."
}`,
                  error: `{
"status": "error",
"message": "passwords don't match "
}`,
                },
                {
                  title: "Update User",
                  method: "PUT",
                  path: "/user/",
                  body: `{
"name": "New Name",
"bio": "New Bio",
}`,
                  success: `{
"status": "success",
"message": "Profile updated."
}`,
                  error: `{
"status": "error",
"message": "Validation failed or unauthorized"
}`,
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
                      <CodeBlock language="json">{api.body}</CodeBlock>
                    </>
                  )}

                  {api.success && (
                    <>
                      <p className="text-sm font-medium text-foreground-muted">
                        Sample Success Response:
                      </p>
                      <CodeBlock language="json">{api.success}</CodeBlock>
                    </>
                  )}

                  {api.error && (
                    <>
                      <p className="text-sm font-medium text-foreground-muted">
                        Sample Error Response:
                      </p>
                      <CodeBlock language="json">{api.error}</CodeBlock>
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
