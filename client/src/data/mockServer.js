const data = require('./listExampleData.js');


// This function returns a list of all the users in the database
function getUsersMockServer() {
    return data;
    }

// This function returns a list of all the task lists for a given user
function getUserMockServer(userID) {
    let index = data.data.findIndex((user) => user.ID === userID);
    return data.data[index];
    }

// This function returns a list of all the tasks for a given task list
function getTasksMockServer(userID, listID) {
    
    let userIndex = data.data.findIndex((user) => user.ID === userID);
    let listIndex = data.data[userIndex].List.findIndex((list) => list.ID === listID);
    
    return data.data[userIndex].List[listIndex];
    }

function addListMockServer(userID, listName) {
    let userIndex = data.data.findIndex((user) => user.ID === userID);
    data.data[userIndex].List.push({ListName: listName, Task: []});

    return data.data[userIndex].List;
    
    
}
function addTaskMockServer(userID, listID, taskName) {

    let userIndex = data.data.findIndex((user) => user.ID === userID);
    let listIndex = data.data[userIndex].List.findIndex((list) => list.ID === listID);
    data.data[userIndex].List[listIndex].Task.push({Text: taskName, Status: "Incomplete"});
    
    return data.data[userIndex].List[listIndex].Task;
}
function deleteListMockServer(userID, listID) {
    
    let userIndex = data.data.findIndex((user) => user.ID === userID);
    let listIndex = data.data[userIndex].List.findIndex((list) => list.ID === listID);
    data.data[userIndex].List.splice(listIndex, 1);
}
function deleteTaskMockServer(userID, listID, taskID) {
  

    let userIndex = data.data.findIndex((user) => user.ID === userID);
    let listIndex = data.data[userIndex].List.findIndex((list) => list.ID === listID);
    let taskIndex = data.data[userIndex].List[listIndex].Task.findIndex((task) => task.ID === taskID);
    data.data[userIndex].List[listIndex].Task.splice(taskIndex, 1);
    
}

//export the functions
module.exports = {
    getUsersMockServer,
    getUserMockServer,
    getTasksMockServer,
    addListMockServer,
    addTaskMockServer,
    deleteListMockServer,
    deleteTaskMockServer
    };
