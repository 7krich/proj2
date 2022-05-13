const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote'); 
const Comment = require('./Comment');

// create associations 
// linking the user id to the post - one user can have many posts: hasMany
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// linking the post to the user id - the post can belong to one user, not many: belongsTo
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// linking the user to many posts - viewing their voted on posts 
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

// linking the post to the liked users - viewing how many likes on a post 
Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

// votes of the user 
Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

// vote on the post 
Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

// users votes
User.hasMany(Vote, {
    foreignKey: 'user_id'
});

// posts votes
Post.hasMany(Vote, {
    foreignKey: 'post_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});


module.exports = { User, Post, Vote, Comment };