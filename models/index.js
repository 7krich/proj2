const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote'); 
const Comment = require('./Comment');
const Category = require("./Category");

// create associations 
// linking the user id to the post - one user can have many posts: hasMany
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// linking the post to the user id - the post can belong to one user, not many: belongsTo
Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

// linking the user to many posts - viewing their voted on posts 
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// linking the post to the liked users - viewing how many likes on a post 
Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

// votes of the user 
Vote.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// vote on the post 
Vote.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});

// users votes
User.hasMany(Vote, {
    foreignKey: 'user_id'
});

// posts votes
Post.hasMany(Vote, {
    foreignKey: 'post_id',
});

// each posted comment belongs to a particular user (ref user id)
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// each comment belongs to a particular post (ref post id)
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

// a user can add many comments (ref user id)
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// a single post can have many comments (ref post id)
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

Post.belongsTo(Category, {
    foreignKey: 'category_id'
});

// one post can have many categories
Category.hasMany(Post, {
    foreignKey: 'category_id'
});

module.exports = { User, Post, Vote, Comment, Category };