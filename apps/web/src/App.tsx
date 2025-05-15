import React, { Suspense } from "react";
import "./App.css";
import { Loader } from "lucide-react";
import { AuthProvider } from "./hooks/useAuth";
import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider } from "./components/ThemeProvider";

function App() {
  const Index = React.lazy(() => import("./pages/Index"));
  const Login = React.lazy(() => import("./pages/auth/Login"));
  const SignUp = React.lazy(() => import("./pages/auth/Signup"));
  const ForgotPassword = React.lazy(
    () => import("./pages/auth/ForgotPassword")
  );
  const Unauthorized = React.lazy(() => import("./pages/Unauthorized"));

  const Loading = () => (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <Loader className="animate-spin h-10 w-10 text-vsphere-primary mb-4" />
        <p className="text-lg font-medium">Loading...</p>
      </div>
    </div>
  );

  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={<Loading />}>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* Protected admin routes */}
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
