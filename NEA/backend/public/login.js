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


const submitButton = document.getElementById('submitLogin');
submitButton.addEventListener('click', () => {
    username1 = document.getElementById('username').value;
    password1 = document.getElementById('password').value;
    usernameStorage = generateHash(username1)
    passwordStorage = generateHash(password1)
    fetch("http://127.0.0.1:5000/check", {
        method:"POST", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            username: usernameStorage,
            password: passwordStorage
        })
    })
    //fetch('./mid.json')
        .then(response => response.json())
        .then (data => {
            data.TrueFalse
            console.log(data)
        })
    })

async function readJSON(("./mid.json");); {
    let response = await fetch("./mid.json")
    return response.json();
};