const router = require('express').Router();
const {Op } = require ("sequelize")
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
const { Post, User, Vote, Comment, Category } = require('../../models');

// get all posts
router.get('/', (req, res) => {
    console.log('========================');
    console.log('req.query', req.query);
    Post.findAll({
        // where: {post_content:{ [Op.like]: req.query.input}},
        order: [['created_at', 'DESC']],
        //query config
        attributes: [
        'id',
        'post_content',
        'title',
        'category_id',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: [
                'id',
                'comment_text',
                'post_id',
                'user_id',
                'created_at'
                ],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Category,
                attributes: ['id', 'category_name']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get single post
router.get('/:id', (req, res) => {
    console.log(req);
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_content',
            'title',
            'category_id',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: [
                'id',
                'comment_text',
                'post_id',
                'user_id',
                'created_at'
                ],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Category,
                attributes: ['id', 'category_name']
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// create a post
router.post('/', withAuth, (req, res) => {
    // expects {title: '', post_url: 'https://xx.com/press', user_id: 1}
    Post.create({
        title: req.body.title,
        post_content: req.body.post_content,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// upvote (votes technically alter the post's data)
router.put('/vote', withAuth, (req, res) => {
    // make sure the session exists first
    // upvotes should only work if someone is logged in
    if (req.session) {
      // pass session id along with all destructured properties on req.body
        Post.vote({ ...req.body, user_id: req.session.user_id }, { Vote, Comment, User, Category })
        .then(updatedVoteData => res.json(updatedVoteData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
});

module.exports = router;