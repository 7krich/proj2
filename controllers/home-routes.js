const router = require('express').Router();
const res = require('express/lib/response');
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);
    Post.findAll({
        attributes: [
            'id',
            'post_content',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
          }
        },
        {
            model: User,
            attributes: ['username']
        }
      ]
    })
    .then(dbPostData => {
        // pass a single post object into the homepage template
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', { posts });
    })
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/post/:id', (req, res) => {
    const post = {
      id: 1,
      title: 'Title',
      post_content: 1,
      created_at: 1,
      vote_count: 10,
      comments: [{}, {}],
      user: {
        username: 'test_user'
      }
    };
  
    res.render('single-post', { post });
  });

router.get('/login', (req, res) => {
    // redirect home if no one exists upon login
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('/');
});

module.exports = router;