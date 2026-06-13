import { Route, Routes } from "react-router-dom";
import Landing from "./app/landing/page";
import SignupPage from "./app/sign-up/page";
import SignInPage from "./app/sign-in/page";
import DashboardPage from "./app/dashboard/page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}

export default App;