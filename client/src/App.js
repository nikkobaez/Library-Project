import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Welcome from "./pages/Welcome";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import UserAccount from "./pages/UserAccount";
import UserBalance from "./pages/UserBalance";
import UserLibrary from "./pages/UserLibrary";
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import AdminUsers from "./pages/AdminUsers";
import AdminAvailable from "./pages/AdminAvailable";
import AdminRented from "./pages/AdminRented";
import AdminProcessing from "./pages/AdminProcessing";
import Success from "./pages/Success";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import UserProtectedRoute from "./components/UserProtectedRoute";
import AdminMessages from "./pages/AdminMessages";
import Contact from "./pages/Contact";
import About from "./pages/About";
import AdminReports from "./pages/AdminReports";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Basic Routes */}
                    <Route path="/" element={<Welcome />}/>
                    <Route path="/about" element={<About />}/>
                    <Route path="/contact" element={<Contact />}/>
                    <Route path="/success" element={<Success />}/>

                    {/* User Routes */}
                    <Route path="/user-login" element={<UserLogin />}/>
                    <Route path="/user-signup" element={<UserSignup />}/>
                    <Route path="user-dashboard-account" element={
                        <UserProtectedRoute>
                            <UserAccount />
                        </UserProtectedRoute>
                    }/>
                    <Route path="user-dashboard-library" element={
                        <UserProtectedRoute>
                            <UserLibrary />
                        </UserProtectedRoute>
                    }/>
                    <Route path="user-dashboard-balance" element={
                        <UserProtectedRoute>
                            <UserBalance/>
                        </UserProtectedRoute>
                    }/>
                    
                    {/* Admin Routes */}
                    <Route path="/admin-login" element={<AdminLogin />}/>
                    <Route path="/admin-signup" element={<AdminSignup />}/>
                    <Route path="/admin-dashboard-users" element={
                        <AdminProtectedRoute>
                            <AdminUsers/>
                        </AdminProtectedRoute>
                    }/>
                    <Route path="/admin-dashboard-available" element={
                        <AdminProtectedRoute>
                            <AdminAvailable/>
                        </AdminProtectedRoute>
                    }/>
                    <Route path="/admin-dashboard-rented" element={
                        <AdminProtectedRoute>
                            <AdminRented />
                        </AdminProtectedRoute>
                    } />
                    <Route path="/admin-dashboard-processing" element={
                        <AdminProtectedRoute>
                            <AdminProcessing/>
                        </AdminProtectedRoute>
                    }/>
                    <Route path="/admin-dashboard-reports" element={
                        <AdminProtectedRoute>
                            <AdminReports/>
                        </AdminProtectedRoute>
                    }/>
                    <Route path="/admin-dashboard-messages" element={
                        <AdminProtectedRoute>
                            <AdminMessages/>
                        </AdminProtectedRoute>
                    }/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
