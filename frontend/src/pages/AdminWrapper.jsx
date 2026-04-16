import AdminLayout from './adminPage/AdminLayout';
import { Outlet } from 'react-router-dom';


export default function AdminWrapper() {
  return (
    <>
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    </>
  );
}
