import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Login />}/>
                    <Route path="/sign-up" element={<Signup />}/>
                    <Route path="/home" element={<Home />}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
