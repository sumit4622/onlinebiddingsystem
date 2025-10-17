import { useEffect, useState } from 'react'
import { fectUserList, DeleteUser, BlockUser } from '../../services/adminServices'
import DropeDown from './Components/DropeDown'
import "../../styles/adminCSS/manage.css"


export default function ManageUser() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fectUserList();
        setUsers(response);
        console.log(response);
      } catch (error) {
        console.log("Error:  ", error);
      }
    }
    fetchUser()
  }, []

  )
  
  const handleDelete = async (userId) => {
  try {
    await DeleteUser(userId);
    setUsers(users.filter(user => user.id !== userId));
  } catch (error) {
    console.log("Error deleting user:", error);
  }
};

  const handleBlock = async (userId) => {
  try {
    await BlockUser(userId);
    setUsers(users.map(user =>
      user.id === userId ? { ...user, is_active: !user.is_active } : user
    ));
  } catch (error) {
    console.log("Error blocking user:", error);
  }
};

  const getStatusClass = (status) => {
    switch (status) {
      case 'Blocked':
        return 'status-badge status-blocked'
      case 'Active':
        return 'status-badge status-active'
      case 'Pending':
        return 'status-badge status-pending'
      default:
        return 'status-badge'
    }
  }


  return (
    <div className="p-0">
      <h1 className="text-white fw-bold p-4" style={{ backgroundColor: "#004663" }}>
        Dropped Bid
      </h1>

      <div className="manage-user-content">
        <table className="table user-table">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">NAME</th>
              <th scope="col">E-MAIL</th>
              <th scope="col">STATUS</th>
              <th scope="col" className="text-end">Edit</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <th scope="row">{index + 1}</th>
                <td>{user.username}</td>
                <td className="user-email">{user.email}</td>
                <td>
                  <span className={getStatusClass(user.is_active ? 'Active' : 'Blocked')}>
                    {user.is_active ? 'Active' : 'Blocked'}
                  </span>
                </td>
                <td className="text-end">
                  <DropeDown
                    onBlock={() => handleBlock(user.id)}
                    onDelete={() => handleDelete(user.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="no-users-message">
            No users found
          </div>
        )}
      </div>
    </div>
  )
}
