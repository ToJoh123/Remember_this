
import React, { useEffect, useState } from 'react'
import FriendList from './FriendList'

export default function Friends() {
    const [friendsData, setFriendsData] = useState([]);
    useEffect(() => {
        async function fetchFriends() {
            const response = await fetch('http://localhost:3001/friend/data', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });
            const data = await response.json();

            setFriendsData(data);
        }
        fetchFriends();
    }, []);

    return (
        <div>
            {friendsData === "No friends found" ? <h1>No friends found</h1> :
                friendsData.map((friend) => (
                    <FriendList key={friend.ID} friend={friend} />
                ))
            }


        </div>
    )
}


