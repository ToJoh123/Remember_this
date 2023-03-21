import React, { useState, useEffect } from 'react'

import Friends from './friends/Friends';
import List from './List';
import ListForm from './ListForm';
export default function Lists() {
  const [userLists, setUserLists] = useState([])
  const [activeList, setActiveList] = useState(null)

  //simple counter for ids
  let counter = Math.random(1 - 199999999);
  function increment() {
    return ++counter;
  }



  useEffect(() => {
    async function fetchLists() {
      const response = await fetch('http://localhost:3001/data', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
      const data = await response.json();
      console.log(data);
      setUserLists(data.Lists);
    }
    fetchLists();
  }, []);

  const addList = (text) => {

    fetch('http://localhost:3001/list', {
      method: 'POST',
      body: JSON.stringify({ listName: text }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    })
      .then((res) => {
        if (res.status === 200) {
          const randomID = increment();
          setUserLists([...userLists, { listId: randomID, listName: text, Task: [] }]);
        }

        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("error from fetch", err.message);
      });
    console.log("New list with name", text);
  }

  function handleDeleteList(listID) {
    fetch('http://localhost:3001/list', {
      body: JSON.stringify({ ID: listID }),
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })
      .then((response) => {
        if (response.status === 200) {
          //TODO: Remove this hacky way of updating the state
          window.location.reload();
          // setUserLists(userLists.filter((list) => list.listId !== listID));
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    console.log("delete list", listID);
  }

  function handleEditList(listID, text) {
    fetch('http://localhost:3001/list', {
      body: JSON.stringify({ ID: listID, ListName: text }),
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })
      .then((response) => {
        if (response.status === 200) {
          const searchParam = listID;
          const listIndex = userLists.findIndex((list) => list.listId === searchParam);
          const newList = [...userLists];
          newList[listIndex].listName = text;
          setUserLists(newList);
          setActiveList(null)
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  function handleAddTask(listID, text) {
    fetch('http://localhost:3001/task', {
      body: JSON.stringify({ ListID: listID, Text: text }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })
      .then((response) => {
        if (response.status === 200) {
          setUserLists(
            userLists.map((list) => {
              if (list.listId === listID) {
                return {
                  ...list,
                  tasks: [...list.tasks, { taskId: increment(), taskName: text }],
                };
              }
              return list;
            })
          );
          setActiveList(null)
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    console.log("add task", text, "to list", listID);
  }
  function handleEditTask(listID, taskID, textInput) {
    fetch('http://localhost:3001/task', {
      body: JSON.stringify({ ID: taskID, Text: textInput, ListID: listID }),
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })
      .then((response) => {
        if (response.status === 200) {
          setUserLists(
            userLists.map((list) => {
              if (list.listId === listID) {
                return {
                  ...list,
                  tasks: list.tasks.map((task) => {
                    if (task.taskId === taskID) {
                      return {
                        ...task,
                        taskName: textInput,
                      };
                    }
                    return task;
                  }),
                };
              }
              return list;
            })
          );
          setActiveList(null)
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    console.log("edit task", taskID, "in list", listID, "to", textInput);
  }

  function handleDeleteTask(listID, taskID) {
    fetch('http://localhost:3001/task', {
      body: JSON.stringify({ ID: taskID, ListID: listID }),
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })
      .then((response) => {
        if (response.status === 200) {
          setUserLists(
            userLists.map((list) => {
              if (list.listId === listID) {
                return {
                  ...list,
                  tasks: list.tasks.filter((task) => task.taskId !== taskID),
                };
              }
              return list;
            })
          );
          setActiveList(null)
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    console.log("delete task", taskID, "from list", listID);
  }

  return (
    <div className='lists'>
      <div>
        <ListForm submitLabel="add list" handleSubmit={addList} />
        <h1>Your lists</h1>
        {userLists && userLists.length > 0 ? (
          userLists.map((listItem) => (
            <List
              key={listItem.listId}
              listItem={listItem}
              onDeleteList={handleDeleteList}
              onEditList={handleEditList}
              onAddTask={handleAddTask}
              setActiveList={setActiveList}
              activeList={activeList}
              childOnDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
            />
          ))
        ) : (
          <p>No lists found</p>
        )}

        <Friends />
      </div>
    </div>
  )
}
