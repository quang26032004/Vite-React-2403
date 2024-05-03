import React, { useEffect, useState } from "react";
import "./UserPage.css";

const UserPage = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (confirmDelete) {
        await fetch(`http://localhost:3000/users/${id}`, {
          method: "DELETE",
        });
        setUserData(userData.filter((user) => user.id !== id));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="user-container">
      <div className="user-info">
        <p>ID</p>
        <p>Email</p>
        <p>Username</p>
        <p>Full Name</p>
        <p>Department</p>
        <p>Position</p>
      </div>
      {userData.map((user) => (
        <div key={user.id} className="user-details">
          <p>{user.id}</p>
          <p>{user.email}</p>
          <p>{user.username}</p>
          <p>{user.fullName}</p>
          <p>{user.department}</p>
          <p>{user.position}</p>
          <div className="user-buttons">
            <button
              className="delete-button"
              onClick={() => handleDelete(user.id)}
            >
              Delete
            </button>
            <button className="edit-button">Edit</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserPage;
