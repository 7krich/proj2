const upvote = document.querySelector('.up-counter');
const upvoteBtn = document.querySelector('.up-vote-btn');
const downvote = document.querySelector('.down-counter');
const downvoteBtn = document.querySelector('.down-vote-btn');

let upcount = 0;
let downcount = 0;

updateDisplay();

function updateDisplay(){
    upvote.innerHTML = upcount;
};

function updateDisplay(){
    downvote.innerHTML = downcount;
};

upvoteBtn.addEventListener("click",()=>{
    upcount++;
    updateUpVoteDisplay();
}) ;

downvoteBtn.addEventListener("click",()=>{
    downcount++;
    updateDownVoteDisplay();
}) ;

function updateUpVoteDisplay(){
    upvote.innerHTML = upcount;
};

function updateDownVoteDisplay(){
    downvote.innerHTML = downcount;
};

// async function upVoteHandler(event) {
//     event.preventDefault();
    
//     console.log("hello");

//     const id = window.location.toString().split('/') [
//         window.location.toString().split('/').length - 1
//     ];

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

// async function downVoteHandler(event) {

//     event.preventDefault();

//     console.log("hello");

//     count ++;
//     const id = 1;
//     // window.location.toString().split('/') [
//     //     window.location.toString().split('/').length - 1
//     // ];

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

//document.querySelector(upvoteBtn).addEventListener('click', upVoteHandler);

//document.querySelector(downvoteBtn).addEventListener('click', downVoteHandler);