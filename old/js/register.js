const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;
    const name = nameInput.value;
    const email = emailInput.value;
    
    const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        body: JSON.stringify({username, password, name, email}),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(response);
})