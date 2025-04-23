function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === '' || password === '') {
        alert('Please fill in all fields');
    } else if (email === 'dhanushkumar@tmt.in' && password === '12345') {
        alert('Login successful');
        window.location.href = '/dashboard'; // Redirect to index page
    } else {
        alert('Invalid email or password');
    }
}


