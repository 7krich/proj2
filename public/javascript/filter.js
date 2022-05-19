var filterModal = document.getElementById("filter-popout");
var btn = document.getElementById("filters");
var cancel = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

cancel.onclick = function() {
    modal.style.display = "none";
}

async function newFilterHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;

    const response = await fetch('/api/categories', {
        method: 'POST',
        body: JSON.stringify({
            title
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if(response.ok) {
        document.location.replace('/dashboard');
    }
    else {
        alert(response.statusText);
    }
}

document.querySelector('.filter-popout').addEventListener('click', btn.onclick);
document.querySelector('.new-filter-form').addEventListener('click', newFilterHandler);

