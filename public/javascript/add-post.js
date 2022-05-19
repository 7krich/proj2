 var modal = document.getElementById("newpost-popout");
 var btn = document.getElementById("newpost");
 var cancel = document.getElementsByClassName("close")[0];

 btn.onclick = function() {
   modal.style.display = "block";
 }

 cancel.onclick = function() {
   modal.style.display = "none";
}

 async function newPostHandler(event) {
     event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const post_content = document.querySelector('input[name="post-content"]').value;

     const response = await fetch('/api/posts', {
         method: 'POST',
         body: JSON.stringify({
             title,
             post_content,
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

document.querySelector('.newpost').addEventListener('click', btn.onclick);
document.querySelector('.new-post-form').addEventListener('submit', newPostHandler);