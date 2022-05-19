const router = require("express").Router();
const res = require("express/lib/response");
const sequelize = require("../config/connection");
const withAuth = require('../utils/auth');
const { Post, User, Comment, Category } = require("../models");

router.get("/", (req, res) => {
  console.log(req.session);
  Post.findAll({
    attributes: [
      "id",
      "post_content",
      "title",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
        ),
        "vote_count",
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      // pass a single post object into the homepage template
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("homepage", { posts });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/post/:id", withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: 1
      // id: req.params.id
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
    if(!dbPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    const post = dbPostData.get({plain: true});
    res.render('single-post', { post });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


router.get("/login", (req, res) => {
  // redirect home if no one exists upon login
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("/");
});

module.exports = router;
