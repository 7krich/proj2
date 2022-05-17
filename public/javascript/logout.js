async function logout() {
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
        document.location.replace('/login');
    }
    else {
        alert(response.statusText);
    }
}


document.querySelector('#logout').addEventListener('click', logout);