async function searchBarHandler(event){ 
    event.preventDefault();

    const input = document.querySelector("#search-input").value;

    fetch(`/api/posts?${input ? `input=${input}`: ""}`) // if input exists, add input=${input} 
    .then(response => {
        if (response.ok){ 
            return response.json()
        }
    }).then(
        data => {
            console.log({data})
           const container =  document.querySelector("#posts-container")
           container.innerHTML = ""

           for (let i = 0; i < data.length; i++) {
               const post = `<div class="blog-container">

               <div class="blog-header">
                 <div class="blog-author--no-cover">
                   <h3>${data[i].username}</h3>
                 </div>
               </div>
             
               <div class="blog-body">
                 <div class="blog-title">
                   <h1><a href="/post/:${data[i].id}">
                   ${data[i].title}
                   </a></h1>
                 </div>
                 <div class="blog-summary">
                   <p>${data[i].post_content}</p>
                 </div>
                 <div class="blog-tags">
                 </div>
               </div>
               <div class="blog-footer">
                 <ul>
                   <li class="published-date"></li>
                   <div class="votingbuttons">
                   <li class="positive">
                     <span>
                     <button class="up-vote-btn" id="up-vote-btn"><img src="/stylesheet/assets/thumbsup.png"><class="numero">3</span></button>
                     </span>
                   </li>
                   <li class="negative">
                     <span>
                       <button class="down-vote-btn" id="down-vote-btn">
                       <img src="/stylesheet/assets/thumbsdown.png"><class="numero">0</span></button>
                     </span>
                       </li>
                   </div>
                 </ul>
               </div>
             </div>`
             const listItem = document.createElement('li')
             listItem.innerHTML= post;
             container.append(listItem)
           }
        }
    )

}
document.querySelector("#search-button").addEventListener("click", searchBarHandler)