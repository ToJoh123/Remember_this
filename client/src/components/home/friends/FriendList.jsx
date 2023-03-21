import React, { useState, useEffect } from 'react';

export default function FriendList({ friend }) {
  const [listData, setListData] = useState([]);
  const searchParam = friend.Following;
  useEffect(() => {
    async function fetchLists() {
      const response = await fetch(`http://localhost:3001/friend/data/${searchParam}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
      const data = await response.json();
      if (data === "No lists found") {
        setListData("No lists found");
        return;
      }
      setListData(data.Lists);
    }
    fetchLists();

  }, []);

  return (
    <div >
      <h3>Your friends list</h3>
      {listData === "No lists found" ?
        <p>No lists found</p> :
        listData?.map((list) => (
          <ul key={list.listId}>
            {list.listName}
            {list.tasks && list.tasks.length > 0 && list.tasks.map((task) => (
              <li key={task.taskId}>{task.text}</li>
            ))}
          </ul>

        ))
      }
    </div>
  )
}