async function signupFormHandler(event) {
    event.preventDefault();

    const firstName = document.querySelector("#").value.trim();
    const lastName = document.querySelector("#").value.trim();
    const username = document.querySelector("#").value.trim();
    const email = document.querySelector('#').value.trim();
    const password = document.querySelector('#').value.trim();

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
}