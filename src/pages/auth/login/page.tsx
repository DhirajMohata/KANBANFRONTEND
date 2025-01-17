import { AuthForm } from "../../../components/forms/auth-form"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from '../../../../store/store.ts'
import { signinUser } from '../../../../actions/authActions/login.ts'


export default function SignInPage() {
  const dispatch = useDispatch()
  
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)

  const handleSignIn = async (formValues: any) => {
      const response = await signinUser(formValues)()
        if(!response) return
        dispatch({ type: "LOGIN", payload: { email: response.email, token: response.token } })
        localStorage.setItem(response.token, response.email)
        localStorage.setItem("role", response.role)
        localStorage.setItem("email", response.email)
        
        if(response.role === "admin")
          location.href = "/admin"
        else if(response.role === "user")
          location.href = "/user"
        else {
          if(response.projectId) {
            localStorage.setItem("projectId", response.projectId)
          }
          if(response.teamMembers) {
            console.log(response.teamMembers)
            localStorage.setItem("teamMembers", response.teamMembers)
          }
          location.href = "/manager" 
        } 
  }

  if(isLoggedIn || localStorage.getItem("token")) {
      if(localStorage.getItem("role") === "admin")
        location.href = '/admin'
      else if(localStorage.getItem("role") === "user")
        location.href = '/user'
      else
        location.href = '/manager'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 flex items-center justify-center p-4">
      <AuthForm mode="signin" action={handleSignIn} />
    </div>
  )
}