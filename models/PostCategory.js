const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class PostCategory extends Model {}

PostCategory.init(
    {
        id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        },
        post_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "post",
            key: "id",
        },
        },
        category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "category",
            key: "id",
        },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "post_category",
    }
);

module.exports = PostCategory;
