async function searchBarHandler(event) {
  event.preventDefault();

  const input = document.querySelector("#search-input").value;

  fetch(`/api/posts?${input ? `input=${input}` : ""}`) // if input exists, add input=${input}
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      console.log({ data });
      const container = document.querySelector("#posts-container");
      container.innerHTML = "";

      for (let i = 0; i < data.length; i++) {
        const post = `<div class="post-container">

        <div class="post-header">
        <div class="post-author--no-cover">
          <h4>${data[i].username}</h4>
                 </div>
               </div>
             
               <div class="post-body">
               <div class="post-title">
                 <h2><a href="/post/:${data[i].id}">
                   ${data[i].title}
                   </a></h2>
                 </div>
                 <div class="blog-summary">
                   <p>${data[i].post_content}</p>
               </div>
               <div class="blog-footer">
                 <ul>
                   <li class="published-date"></li>
                   </div>
                 </ul>
               </div>
             </div>`;
        const listItem = document.createElement("li");
        listItem.innerHTML = post;
        container.append(listItem);
      }
    });
}
document
  .querySelector("#search-button")
  .addEventListener("click", searchBarHandler);
