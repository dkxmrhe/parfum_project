const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                comment: "댓글 고유번호",
            },
            user_nick: {
                type: Sequelize.STRING(100),
                allowNull: false,
                comment: "작성자",
            },
            parfum_id: {
                type: Sequelize.STRING(100),
                allowNull: false,
                comment: "해당 향수 게시물",
            },
            content: {
                type: Sequelize.STRING(1000),
                allowNull: true,
                comment: "댓글 내용",
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: true,
            modelName: "Post",
            tableName: "posts",
            paranoid: true,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }
    static associate(db) {
    }
}