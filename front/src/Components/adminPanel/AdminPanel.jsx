import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Connections from "../../common/Connections";
import "./admin.css"; // style it separately

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Connections.getData("https://localhost:3000/admin/users")
      .then((res) => setUsers(res))
      .catch((err) => {
        console.error("Failed to load users:", err);
        setError("You are not authorized to view this page.");
        //navigate("/login")
      });
  }, []);

  const handleLogout = () => {
    Connections.getData("https://localhost:3000/auth/logout").then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="admin-container">
      <h2>Admin Panel</h2>
      <button className="logout-button" onClick={handleLogout}>
        Log out
      </button>

      {error && <p className="error">{error}</p>}

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{new Date(u.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;
