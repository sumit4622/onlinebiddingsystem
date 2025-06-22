import Header from './landing component/Header';
import LogoutModal from "./login/LogoutModal"

export default function Dashboard() {
  return (
    <>
    <LogoutModal />
     <Header />
    <div className="container mt-5 text-bg-dark">
      <h1>Welcome to Dashboard!</h1>
    </div>
    </>
  );
 
}
