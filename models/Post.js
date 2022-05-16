const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create the Post model 
class Post extends Model {
    static vote(body, models) {
        return models.Vote.create({
            user_id: body.user_id,
            post_id: body.post_id
        }).then(() => {
            return Post.findOne({
                where: {
                    id: body.post_id
                },
                attributes: [
                    'id',
                    'post_url',
                    'title',
                    'created_at',
                    [
                        sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id & vote.up_vote = true)'), 'upvote_count'
                    ],
                    [
                        sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id & vote.down_vote = true)'), 'downvote_count'
                    ]
                ],
                include: [
            {
            model: models.Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: models.User,
                attributes: ['username']
            }
            }
        ]
        });
    });
}
}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        anonymous: {
            type: DataTypes.BOOLEAN,
            default: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'category',
                key: 'id'
            }
        }
        // comment_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'comment',
        //         key: 'id'
        //     }
        // }
    },
    { 
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;