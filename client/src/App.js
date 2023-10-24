import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Welcome from "./pages/Welcome";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import UserHome from "./pages/UserHome";
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import AdminUsers from "./pages/AdminUsers";
import AdminAvailable from "./pages/AdminAvailable";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Basic Routes */}
                    <Route path="/" element={<Welcome />}/>

                    {/* User Routes */}
                    <Route path="/user-login" element={<UserLogin />}/>
                    <Route path="/user-signup" element={<UserSignup />}/>
                    <Route path="user-home" element={<UserHome/>}/>
                    
                    {/* Admin Routes */}
                    <Route path="/admin-login" element={<AdminLogin />}/>
                    <Route path="/admin-signup" element={<AdminSignup />}/>
                    <Route path="/admin-dashboard-users" element={<AdminUsers/>}/>
                    <Route path="/admin-dashboard-available" element={<AdminAvailable/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
