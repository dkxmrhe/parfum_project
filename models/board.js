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
            content: {
                type: Sequelize.STRING(1000),
                allowNull: false,
                comment: "게시판 내용",
            }
        })
    }
}