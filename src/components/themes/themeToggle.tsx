import { Moon, Sun } from 'lucide-react'
import { Button } from "../ui/button"
import { useTheme } from 'next-themes'

export function ThemeToggle() {


  const { theme, setTheme } = useTheme()
  const setNewTheme = () => {
    if (theme === 'dark') {
      return () => setTheme('light')
    } else {
      return () => setTheme('dark')
    }
  }


  return (
    <div className="absolute top-4 right-4 mt-2">
      <Button
        onClick={setNewTheme()}
      >
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  )
}
