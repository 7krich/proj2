const router = require('express').Router();
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
const { Category, Post, User } = require('../../models');

// get all categories
router.get('/', (req, res) => {
    // SELECT * FROM categories
    Category.findAll()
      .then(dbCategoryData => res.json(dbCategoryData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

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
        res.json(dbCategoryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST create category (non-MVP)

module.exports = router;