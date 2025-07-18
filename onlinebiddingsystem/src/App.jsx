import {
  Route,
  BrowserRouter,
  Navigate,
  Routes,
} from "react-router-dom";

// import ProtectedRoute from "./landingPage/Components/ProtectedRoutes";
import LandingPage from './pages/LandingPage';
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./landingPage/Components/ProtectedRoutes.jsx"
import NotFound from "./pages/NotFound.jsx"
import AuctionPage from "./pages/AuctionPage.jsx";
import CreateAuction from "./pages/CreateAuction.jsx";
// import Home from "./pages/landing component/Home.jsx";

function Logout() {
  localStorage.clear();
  return <Navigate to="/LandingPage" />;
}

function Registerandlogout() {
  localStorage.clear();
  return <Navigate to="/LandingPage" />;
}

// Create routes
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <LandingPage />} />
        <Route path="/dashboard" element={
           <ProtectedRoute>
           <Dashboard />
           </ProtectedRoute>} />,
        <Route path="/auction" element={<ProtectedRoute><AuctionPage/></ProtectedRoute>}/>,
        <Route path="/CreateAuction" element={<ProtectedRoute><CreateAuction/></ProtectedRoute>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

