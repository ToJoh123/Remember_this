import React from 'react'
import FriendList from './FriendList'

export default function Friends({ friend }) {
    return (
        <div key={friend.friendId}>
            <h2>{friend.name}</h2>
            {
                friend.lists?.map((friendItem) => (
                    <FriendList friendItem={friendItem} key={friendItem.FriendListId} />
                ))
            }
        </div>
    )
}
