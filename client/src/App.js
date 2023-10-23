import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import AdminHome from "./pages/AdminHome";
import UserHome from "./pages/UserHome";
import AdminUsers from "./pages/AdminUsers";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* User Routes */}
                    <Route path="/user-login" element={<UserLogin />}/>
                    <Route path="/user-signup" element={<UserSignup />}/>
                    <Route path="user-home" element={<UserHome/>}/>
                    
                    {/* Admin Routes */}
                    <Route path="/admin-login" element={<AdminLogin />}/>
                    <Route path="/admin-signup" element={<AdminSignup />}/>
                    <Route path="/admin-home" element={<AdminHome />}/>
                    <Route path="/admin-dashboard-users" element={<AdminUsers/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
