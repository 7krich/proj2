// create an authguard for routes
const withAuth = (req, res, next) => {
    // if there no session exists
    if (!req.session.user_id) {
        //direct user to login
        res.redirect('/login');
    } else {
        // else call next middleware function
        next();
    }
};
  
module.exports = withAuth;