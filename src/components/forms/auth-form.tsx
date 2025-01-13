import { Input } from "../ui/input"
import { Form } from "./form"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { AuthFormProps } from "types/auth/auth"

export function AuthForm({ mode, action }: AuthFormProps) {
  return (
    <Card className="w-full max-w-md mx-auto ">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Welcome to <span className="text-primary text-purple-600 dark:text-purple-400">Devflo</span>!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form action={action} submitButton={mode === "signin" ? "Sign In" : "Sign Up"}>
          {mode === "signup" && (
            <Input
              name="name"
              placeholder="Full Name"
              required
            />
          )}
          <Input
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </Form>
        <div className="mt-4 text-center text-sm">
          {mode === "signin" ? (
            <p>
              Don't have an account?{" "}
              <a href="/auth/signup" className="text-purple-600 dark:text-purple-400 hover:underline">
                Create a new account
              </a>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <a href="/auth/signin" className="text-purple-600 dark:text-purple-400 hover:underline">
                Sign in
              </a>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}