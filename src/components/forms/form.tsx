import * as React from "react"
import { Button } from "../ui/button"
import { cn } from "../../../lib/utils"
import { FormProps } from "../../../types/index"

export function Form({ children, action, submitButton = "Submit", className, ...props }: FormProps) {
  const [isPending] = React.useTransition()

  return (
    <form
      className={cn("space-y-4", className)}
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email");
        const name = formData.get("name");
        const password = formData.get("password");
        const role = formData.get("role");
        const formValues = { email, name, password, role };
        action(formValues);
      }}
      {...props}
    >
      {children}
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Loading..." : submitButton}
      </Button>
    </form>
  )
}