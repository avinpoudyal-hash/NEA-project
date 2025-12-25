
document.getElementById('signupForm').addEventListener('submit', async function(e) {
    e.preventDefault();
            
    const username = document.getElementById('new_username').value;
    const password = document.getElementById('new_password').value;
    const confirmPassword = document.getElementById('conf_password').value;
            
    if (!username || !password || !confirmPassword) {
        alert('Please fill in all fields', 'error');
        return;
    }
            
    if (password !== confirmPassword) {
        alert('Passwords do not match', 'error');
        return;
    }
            
    if (password.length < 6) {
        alert('Password must be at least 6 characters long', 'error');
        return;
    }

    try {
        alert('Sending request to /signup...');
                
        // NOTE: Using relative URL since we're on same origin
        const response = await fetch('.../signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
                confirmPassword
            })
        });

        alert('Response status:', response.status);
                
        const data = await response.json();
        alert('Server response:', data);

        if (data.message) {
            alert(data.message, 'success');
            document.getElementById('signupForm').reset();
        } else if (data.error) {
            alert(data.error, 'error');
        }

    } catch (error) {
        console.error('Error:', error);
        alert('Error connecting to server. Please try again.', 'error');
    }
});