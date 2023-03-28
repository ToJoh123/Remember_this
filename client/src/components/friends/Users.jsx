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

  function handleAddFriend(params) {

    fetch('http://localhost:3001/friend/users', {
      method: 'POST',
      body: JSON.stringify({ Followed: params }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      credentials: 'include',
    })
      .then((res) => {
        if (res.status === 200) {
          setBackendUsers(backendUsers.filter((user) => user.userId !== params));
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("error from fetch", err.message);
      });
    console.log("New friend with id", params);
  }

  return (
    <div>
      <ul>

        {backendUsers === "No users found" ? (
          <p>{backendUsers}</p>
        ) : (
          <ul>
            {backendUsers.map((user) => (
              <li key={user.userId}>
                Username: {user.username}
                <button onClick={() => handleAddFriend(user.userId)}>add friend</button>
              </li>
            ))}
          </ul>
        )}

      </ul>
    </div>
  )
}
