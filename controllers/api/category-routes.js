const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { Category, Post } = require("../../models");

router.get("/", (req, res) => {
    Category.findAll({
        attributes: ['id', 'category_name'],
        include: [
            {
                model: Post,
                attributes: ['id', '']
            }
        ]
    })
        .then((dbCategoryData) => res.json(dbCategoryData))
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;
