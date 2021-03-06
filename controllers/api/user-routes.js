const router = require('express').Router();
const { User, Post, Comment, Vote } = require('../../models');

// GET (read) api/users
router.get('/', (req, res) => {
    User.findAll({
        // keep password private when information is grabbed
        attributes: { exclude: ['password']}
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET (read) api/users/:id
router.get('/:id', (req, res) => {
    // access User model & find read singular ID
    // read as SELECT * FROM users WHERE ID = i
    User.findOne({
        // keep user password private
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        // JOIN Post, Comment & Post models to User
        // expressed as an array of objects
        include: [
            {
                // JOIN Post with User
                model: Post,
                attributes: [
                    'id',
                    'title',
                    'post_content',
                    'category_id',
                    'created_at'
                ]
            },
            {
                // JOIN Comment with User
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'created_at'
                ],
                // JOIN Post with Comment
                include: {
                    model: Post,
                    attributes: ['title']
                }
            }
        ]
    })
    .then(dbUserData => {
        // if no users with that id are found
        if(!dbUserData) {
            //let user know response was received but no users were found
            res.status(404).json({ message: 'No users found.' });
            return;
        }
        // if found return user data
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST (create) api/users
router.post('/', (req, res) => {
    // expects {username: 'Kyle', email: '7krich@gmail.com', password: 'password123', first_name: 'Kyle', last_name: 'Richnafsky'}
    // created acts much like INSERT INTO users (username, email, password) VALUES ("","","","","")
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name
    })
    .then(dbUserData => {
        // access session information
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.first_name = dbUserData.first_name;
            req.session.last_name = dbUserData.last_name;
            req.session.loggedIn = true;

            res.json(dbUserData);
        });
    });
});

// route to verify user identity
router.post('/login', (req, res) => {
    // query User table to find the instance of a user that contains the user's credentials - user's email
    // expects {email: "", password: ""}
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(dbUserData => {
        // if no e-mail is found we don't need to try to verify the password since the acct doesn't exist
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that e-mail address!' });
            return;
        }
        
        // verify user
        // pass plaintext pwd stored in req.body.password into checkPassword argument in User.js
        const validPassword = dbUserData.checkPassword(req.body.password);
        // if match returns false
        if(!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            // declare session variables
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
        
        res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    });
});

// allow user to log out if signed in
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

router.put('/:id', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

    // pass in req.body instead to only update what's passed through
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE (non-MVP)

module.exports = router;