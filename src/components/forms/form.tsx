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
        action(event, formData);
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