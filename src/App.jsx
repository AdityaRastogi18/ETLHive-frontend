import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loader from "./components/Loader";
import { useAuth } from "./contexts/authContext";
import PrivateRoute from "./services/PrivateRoute.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Home = lazy(() => import("./pages/Home"));
const Settings = lazy(() => import("./pages/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

function App() {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen">
          <Loader />
        </div>
      }
    >
      <div className="min-h-screen flex flex-col bg-gray-100">
        {isLoggedIn && <Header />}
        <div className=" flex-grow flex items-center justify-center">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/reset-password/:token" component={ResetPassword} />
            <Route path="/signup" component={SignUp} />
            <PrivateRoute path="/home" component={Home} />
            <PrivateRoute path="/settings" component={Settings} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Suspense>
  );
}

export default App;
