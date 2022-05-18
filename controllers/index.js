const generatePage = (name, github) => {
    return `
    <!DOCTYPE html> 
    <html lang="en"> 
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Portfolio Demo</title>
    </head>
  
    <body>
      <h1>${name}</h1>
      <h2><a href="https://github.com/${github}">Github</a></h2>
    </body>
    </html>
    `;
  };
<div class="card">
  <h3 class="card-header text-uppercase">Search By User</h3>
  <form id="user-form" class="card-body">
    <label class="form-label" for="username">Username</label>
    <input name="username" id="username" type="text" autofocus="true" class="form-input" />
    <button type="submit" class="btn">Get User</button>
  </form>
</div>

router.delete('/:id',function(req, res, next){
  Docket.findById(req.params.id, function(err, docket){
    docket.remove(function(err){
      res.redirect('/dockets');
    });
  });
});

<form name="delete-docket-form" id="delete-docket-form" method="delete">
    <div class="form-submit">
        <input type="submit" value="Delete my docket" />
    </div>
</form>

// NPM package at the top of the website that cycles throug hall of the B words
//15-20 B Words
//32 Inspirational B words
//Look for HTML for Tumblr and add that to your branch as an update
// Future state is add more tags
// purple circle potentially opens a new page

