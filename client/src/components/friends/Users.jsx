import React, { useState, useEffect } from 'react';


export default function Users() {

  const [backendUsers, setBackendUsers] = useState([]);
  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch('http://localhost:3001/friend/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
      const data = await response.json();
      setBackendUsers(data);
    }
    fetchUsers();
  }, []);
  console.log(backendUsers)
  return (
    <div>
      <ul>
        <li>user1</li>
        <button>add friend</button>
      </ul>
    </div>
  )
}
