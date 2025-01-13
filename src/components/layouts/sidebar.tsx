import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react'
import { cn } from '../../../lib/utils'
import { Button } from '../../components/ui/button'
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/slices/authSlice';
import { menuItems } from '../../../static/sidebar'


export function DashboardSidebar() {
  const [expanded, setExpanded] = useState(false)
  const [showLabel, setShowLabel] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); 
    localStorage.removeItem('token');
    location.href = '/auth/signup';
  };
  
  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if (expanded) {
      timer = setTimeout(() => {
        setShowLabel(true);
      }, 100);
    } else {
      setShowLabel(false);
    }
    return () => clearTimeout(timer); 
  }, [expanded]);


  return (
    <motion.div
      className={cn(
        "flex flex-col bg-gradient-to-b from-purple-100 to-purple-200 dark:bg-gradient-to-b dark:from-purple-600 dark:to-purple-500 h-screen p-4 shadow-lg",
        expanded ? "w-64" : "w-20"
      )}
      animate={{ width: expanded ? 256 : 80 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-end mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setExpanded(!expanded)}
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {expanded ? <ChevronLeft /> : <ChevronRight />}
        </Button>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={cn(
                  "flex items-center p-2 rounded-lg transition-colors",
                  "hover:bg-white dark:hover:bg-gray-700",
                  "bg-white dark:bg-gray-700"
                )}
              >
                <item.icon className="w-6 h-6 text-gray-600  dark:text-white" />
                {expanded && showLabel && (
                    <span className="ml-3 text-gray-700 dark:text-gray-200">
                    {item.label}
                    </span>
                )}
              </a>
            </li>
          ))}
          <li >
              <button
                onClick={() => handleLogout()}
                className={cn(
                  "flex items-center p-2 rounded-lg transition-colors w-full",
                  "hover:bg-white dark:hover:bg-gray-700",
                  "bg-white dark:bg-gray-700"
                )}
                
              >
                <LogOut className="w-6 h-6 text-gray-600  dark:text-white" />
                {expanded && showLabel && (
                    <span className="ml-3 text-gray-700 dark:text-gray-200">
                      LogOut
                    </span>
                )}
              </button>
            </li>
        </ul>
      </nav>
    </motion.div>
  )
}
