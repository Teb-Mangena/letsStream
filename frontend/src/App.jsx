import { Navigate, Route, Routes } from "react-router"
import { Toaster } from "react-hot-toast"

import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import { useAuth } from "./hooks/useAuth"
import OnboardingPage from "./pages/OnboardingPage"
import Layout from "./components/Layout"
import NotificationsPage from "./pages/NotificationsPage"
import ProfilePage from "./pages/ProfilePage"
import ChatPage from "./pages/ChatPage"
import CallPage from "./pages/CallPage"

function App() {
  const { checkAuthQuery } = useAuth();
  const { data: authUser, isLoading } = checkAuthQuery;

  const isAuthenticated = Boolean(authUser);
  const isBoarded = authUser?.user?.isBoarded;

  console.log(import.meta.env.MODE)

  if (isLoading) return <p>Loading...</p>

  return (
    <div className="h-screen" data-theme="dark">

      <Routes>
        <Route index element={isAuthenticated && isBoarded ? (
          <Layout showSidebar={true}>
            <HomePage />
          </Layout>

        ) : <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />} />
        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to={isBoarded ? "/" : "/onboarding"} />}
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <SignupPage /> : <Navigate to={isBoarded ? "/" : "/onboarding"} />}
        />
        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isBoarded ? (
                <OnboardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/notifications"
          element={
            isAuthenticated && isBoarded ? (
              <Layout showSidebar={true}>
                <NotificationsPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/profile"
          element={
            isAuthenticated && isBoarded ? (
              <Layout showSidebar={true}>
                <ProfilePage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/call/:id"
          element={
            isAuthenticated && isBoarded ? (
              <CallPage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/chat/:id"
          element={
            isAuthenticated && isBoarded ? (
              <Layout showSidebar={false}>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
