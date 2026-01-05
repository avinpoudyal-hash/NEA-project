var usernameStorage = ''
var passwordStorage = ''

const generateHash = (string) => {
  let hash = 0;
  for (const char of string) {
    hash = (hash << 5) - hash + char.charCodeAt(0);
    hash |= 0;
  }
  return hash;
};


const submitButton = document.getElementById('submit_button');
submitButton.addEventListener('click', () => {
    username = document.getElementById('new_username').value;
    password = document.getElementById('new_password').value;
    conf_password = document.getElementById('conf_password').value;
    if (password !== conf_password) {
        alert('Passwords do not match. Please try again.');
        return;
    }
    else if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }
    else if (username == '' || password == '' || conf_password == '') {
        alert('All fields are required.');
        return;
    }
    else {
        usernameStorage = generateHash(username)
        passwordStorage = generateHash(password)
        localStorage.setItem('username', JSON.stringify(usernameStorage));
        localStorage.setItem('password', JSON.stringify(passwordStorage));
        alert('Registration successful!');
        location.href = "index.html";
    }
})
