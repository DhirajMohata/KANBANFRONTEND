import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInPage from '../pages/auth/login/page.tsx';
import SignUpPage from '../pages/auth/signup/page.tsx';
import Dashboard from '../pages/dashboard/page.tsx';
import Home from '../pages/home/page.tsx';
import AdminDashboard from '../pages/admin/page.tsx';
import ShowTaskPage from '../components/admin/ShowTaskPage.tsx';
import ManagerDashboard from '../components/manager/ManagerDashboard.tsx';
import UserDashboard from '../components/user/UserDashboard.tsx';

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth">
                    <Route path="signin" element={<SignInPage />} />
                    <Route path="signup" element={<SignUpPage />} />
                </Route>
                
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/admin">
                    <Route path="" element = {<AdminDashboard/>} />
                    <Route path="tasks" element={<ShowTaskPage />} />
                </Route>
                <Route path="/manager" element={<ManagerDashboard />} />
                <Route path='/user' element={<UserDashboard />} />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </Router>
    );
};

export default AppRouter;