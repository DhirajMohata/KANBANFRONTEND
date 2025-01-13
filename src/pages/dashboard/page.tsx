import { SidebarProvider } from "../../components/ui/sidebar"
import Confetti from 'react-confetti'
import { DashboardSidebar } from "../../components/layouts/sidebar"
import { useEffect, useState } from "react"
import Tasks from "../../components/tasks/tasks"

export default function Dashboard({}: { }) {
    const [isFirstTime, setIsFirstTime] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('isFirstTime') === 'true') {
          setIsFirstTime(true)
          localStorage.removeItem('isFirstTime')
        }
      }, [])

    
    return (
        <SidebarProvider>
            {isFirstTime && (
            <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                recycle={false}
                numberOfPieces={200}
            />
            )}
            <div className="flex h-screen w-full">
                <DashboardSidebar/>
                <main className="flex-1 overflow-auto">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-8">
                      <h1 className="text-3xl font-bold">Dashboard</h1>
                    </div>
                    <div className="bg-card rounded-lg shadow-md p-6">
                      <Tasks/>
                    </div>
                  </div>
                </main>
              </div>
        </SidebarProvider>
    )
}
