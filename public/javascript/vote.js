const upvote = document.querySelector('.up-counter');
const upvoteBtn = document.querySelector('.up-vote-btn');
const downvote = document.querySelector('.down-counter');
const downvoteBtn = document.querySelector('.down-vote-btn');
const id = window.location.toString().split('/') [window.location.toString().split('/').length - 1];

console.log(id);

let upcount = 0;
let downcount = 0;

updateDisplay();

function updateDisplay(){
    upvote.innerHTML = upcount;
    downvote.innerHTML = downcount;
};

upvoteBtn.addEventListener("click",()=>{
    upcount++;
    updateNewCount();
}) ;

downvoteBtn.addEventListener("click",()=>{
    downcount++;
    updateNewCount();
}) ;

function updateNewCount(){
    upvote.innerHTML = upcount;
    downvote.innerHTML = downcount;
};


// downVoteHandler();


async function upVoteHandler(event) {
    event.preventDefault();
    
    const response = await fetch('/api/posts/vote', {
        method: 'PUT',
        body: JSON.stringify({
            up_vote: upcount,
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

// async function downVoteHandler(event) {

//     event.preventDefault();

//     const response = await fetch('/api/posts/vote', {
//         method: 'PUT',
//         body: JSON.stringify({
//             post_id: id
//         }),
//         headers: { "Content-Type": "application/json" }
//     });

//     if(response.ok) {
//         document.location.reload();
//     }
//     else {
//         alert(response.statusText);
//     }
// }


upVoteHandler();