import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import Home from "./pages/Home";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/user-login" element={<UserLogin />}/>
                    <Route path="/user-signup" element={<UserSignup />}/>
                    <Route path="/admin-login" element={<AdminLogin />}/>
                    <Route path="/admin-signup" element={<AdminSignup />}/>
                    <Route path="/home" element={<Home />}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
