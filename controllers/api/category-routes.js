<<<<<<< HEAD
const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { Category, Post } = require("../../models");

// get all categories with their posts 
router.get("/", (req, res) => {
    Category.findAll({
        attributes: ['id', 'category_name'],
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'anonymous', 'user_id', 'category_id']
            }
        ]
    })
        .then((dbCategoryData) => res.json(dbCategoryData))
        .catch((err) => {
=======
const router = require('express').Router();
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
const { Category, Post, Comment, User } = require('../../models');

// get all categories
router.get('/', (req, res) => {
    // SELECT * FROM categories
    Category.findAll()
      .then(dbCategoryData => res.json(dbCategoryData))
      .catch(err => {
>>>>>>> develop
        console.log(err);
        res.status(500).json(err);
    });
});

<<<<<<< HEAD
// get one category 
router.get('/:id', (req, res) => {
    Category.findOne({
        where: {
        id: req.params.id
        },
        attributes: ["id", "category_name"],
        include: [
        {
            model: Post,
            attributes: ['id', 'title', 'anonymous', 'user_id', 'category_id'],
        },
        ],
    })
    .then(dbCategoryData => {
        if(!dbCategoryData) {
        res.status(404).json({ message: 'No Category found with this id' });
        }
=======
// GET (read) api/categories/:id
router.get('/:id', (req, res) => {
    // access Category model & find read singular ID
    // read as SELECT * FROM category WHERE ID = i
    Category.findOne({
        // JOIN Post, Comment & Post models to Category
        // expressed as an array of objects
        include: [
            {
                // JOIN Post with Category
                model: Post,
                attributes: [
                    'id',
                    'title',
                    'post_content',
                    'created_at'
                ]
            },
            {
                // JOIN Comment with Category
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
    .then(dbCategoryData => {
        // if no categories with that id are found
        if(!dbCategoryData) {
            //let user know response was recieved but no categories were found
            res.status(404).json({ message: 'No categories found.' });
            return;
        }
        // if found return category data
>>>>>>> develop
        res.json(dbCategoryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
<<<<<<< HEAD
    })
=======
    });
>>>>>>> develop
});

// create a category 
router.post("/", (req, res) => {
    Category.create({
        category_name: req.body.category_name,
    })
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> develop
