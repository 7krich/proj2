async function signupFormHandler(event) {
    event.preventDefault();

    const firstName = document.querySelector("#firstname-signup").value.trim();
    const lastName = document.querySelector("#lastname-signup").value.trim();
    const username = document.querySelector("#username-signup").value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (firstName && lastName && username && email && password) {
        const response = await fetch("/api/users????", {
            method: "post",
            body: JSON.stringify({
                firstName,
                lastName,
                username,
                email,
                password
            }),
            headers: {}
        });

        if (response.ok) {
            console.log("success");
        }
        else {
            alert(response.statusText);
        }
    }
};

async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector("#email-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();

    if (email && password) {
        const response = await fetch("/api/users/login????", {
            method: "post",
            body: JSON.stringify({
                email,
                password
            }),
            headers: {}
        });

        if (response.ok) {
            document.location.replace("/??????");
        }
        else {
            alert(response.statusText);
        }
    }
}

document.querySelector("class?").addEventListener("submit", loginFormHandler);
document.querySelector("class???").addEventListener("submit", signupFormHandler);