
let serverData = [];

document.getElementById("testBtn").addEventListener("click", function () {
    console.log(serverData);
  });



const data = fetch('http://localhost:3000/task',{
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: 'include'
})
.then(response => response.json())
.then(data => {
    console.log(data);
    serverData = data;
})
.catch(err => console.log(err))

