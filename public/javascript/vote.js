async function upVoteHandler(event) {
    event.preventDefault();
    
    console.log("hello");

    const id = window.location.toString().split('/') [
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch('/api/posts/vote', {
        method: 'PUT',
        body: JSON.stringify({
            post_id: id
        }),
        headers: { "Content-Type": "application/json" }
    });

    if(response.ok) {
        document.location.reload();
    }
    else {
        alert(response.statusText);
    }
}

async function downVoteHandler(event) {

    event.preventDefault();

    console.log("hello");

    const id = 1;
    // window.location.toString().split('/') [
    //     window.location.toString().split('/').length - 1
    // ];

    const response = await fetch('/api/posts/vote', {
        method: 'PUT',
        body: JSON.stringify({
            post_id: id
        }),
        headers: { "Content-Type": "application/json" }
    });

    if(response.ok) {
        document.location.reload();
    }
    else {
        alert(response.statusText);
    }
}

document.querySelector('.up-vote-btn').addEventListener('click', upVoteHandler);
document.querySelector('.down-vote-btn').addEventListener('click', downVoteHandler);