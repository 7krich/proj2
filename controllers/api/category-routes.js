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
        console.log(err);
        res.status(500).json(err);
    });
});

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
        res.json(dbCategoryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
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

module.exports = router;
