export interface AuthState {
    isLoggedIn: boolean;
    userDetails: { email: string } | null;
    token: string | null;
}

export interface AuthFormProps {
  mode: "signin" | "signup"
  action: any
}

