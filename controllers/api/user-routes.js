const router = require('express').Router();
const { ValidationError } = require('sequelize/types');
const { post } = require('.');
const { User } = require('../../models');

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
        include: [
            {
                model: post,
                attributes: [
                    'id',
                    'title',
                    'post_url',
                    'created_at'
                ]
            },
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'created_at'
                ],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            }
        ]
    })
    .then(dbUserData => {
        // if no users with taht id are found
        if(!dbUserData) {
            //let user know response was recieved but no users were found
            res.status(404).json({ message: 'No users found.' });
            return;
        }
        // if found return user data
        res.json(dbUserdata);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST (create) api/users
router.post('/', (req, res) => {
    // expects {username: 'Kyle', email: '7krich@gmail.com', password: 'password123'}
    // created acts much like INSERT INTO users (username, email, password) VALUES ("","","")
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => {
        // save below for when sessions are added
        // req.session.save(() => {
        //     req.sessions.user_id = dbUserData.id;
        //     req.sessions.username = dbUserData.username;
        //     req.sessions.loggedIn = true;

            res.json(dbUserData);
        // })
    });
});