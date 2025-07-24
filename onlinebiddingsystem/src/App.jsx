import {
  Route,
  BrowserRouter,
  Navigate,
  Routes,
} from "react-router-dom";

import LandingPage from './pages/LandingPage';
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./landingPage/Components/ProtectedRoutes.jsx"
import NotFound from "./pages/NotFound.jsx"
import AuctionPage from "./pages/AuctionPage.jsx";
import CreateAuction from "./pages/CreateAuction.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import BiddingHistory from "./pages/landing component/UserComponent/BiddingHistory.jsx";
import AccountSettings from "./pages/landing component/UserComponent/AccountSettings.jsx";
import UploadItems from "./pages/landing component/UserComponent/UploadItems.jsx";

function Logout() {
  localStorage.clear();
  return <Navigate to="/LandingPage" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/auction" element={<ProtectedRoute><AuctionPage /></ProtectedRoute>} />
        <Route path="/CreateAuction" element={<ProtectedRoute><CreateAuction /></ProtectedRoute>} />

        {/* UserProfile and nested routes */}
        <Route path="/UserProfile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>}>
          <Route index element={<BiddingHistory />} />
          <Route path="bidding" element={<BiddingHistory />} />
          <Route path="settings" element={<AccountSettings />} />
          <Route path="upload" element={<UploadItems />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
