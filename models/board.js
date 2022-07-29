const Sequelize = require('sequelize');

module.exports = class Board extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                comment: "게시판 고유번호",
            },
            subject: {
                type: Sequelize.STRING(300),
                allowNull: false,
                comment: "게시판 제목",
            },
            author: {
                type: Sequelize.STRING(100),
                allowNull: false,
                comment: "작성자",
            },
            content: {
                type: Sequelize.STRING(1000),
                allowNull: false,
                comment: "게시판 내용",
            },
            watch: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false,
                comment: "조회수",
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: true,
            modelName: "Board",
            tableName: "boards",
            paranoid: true,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }

    static associate(db) {}
};