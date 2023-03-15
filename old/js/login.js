const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const form = document.querySelector('form');
const h2 = document.querySelector('h2');

const test = document.querySelector('#test');
// when clicking button  console log test 

let list = [];
let task = [];
let listData = {};
test.addEventListener('click', () => {
    const response = fetch('http://localhost:3000/list/all', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        list = data;
    })
    .catch(err => console.log(err))
    console.log(list);

})
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;
    
    // Responsen innehåller information om hela respons objektet, såsom headers, statusKod osv...
    const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });


    // Om vi vill åt en respons body ska vi resolva den genom att anropa .text() på responsen, om responsen innehåller en text. 
    // Om responsen skickar json, använd istället
    const data = await response.json();
    console.log(data);
    //console cookies
    console.log(document.cookie);
    h2.textContent = response.statusText;
})

