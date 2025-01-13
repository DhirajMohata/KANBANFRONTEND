import { AuthForm } from "../../../components/forms/auth-form"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../../../store/slices/authSlice.ts"
import { RootState } from '../../../../store/store.ts'


export default function SignInPage() {
  const dispatch = useDispatch()
  
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)

  const handleSignIn = async () => {
    dispatch(login({ email: "email", token: "data_token" }))
    localStorage.setItem("token", "data_token")
    location.href = "/dashboard" 
  }

  if(isLoggedIn || localStorage.getItem("token")) {
     location.href = '/dashboard'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 flex items-center justify-center p-4">
      <AuthForm mode="signin" action={handleSignIn} />
    </div>
  )
}