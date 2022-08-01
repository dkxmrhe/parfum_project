const Sequelize = require('sequelize');

module.exports = class Brand extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                comment: "브랜드 별 고유번호",
            },
            name: {
                type: Sequelize.STRING(100),
                allowNull: false,
                comment: "브랜드 이름",
            },
            country: {
                type: Sequelize.STRING(100),
                allowNull: false,
                comment: "브랜드 나라",
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: true,
            modelName: "Brand",
            tableName: "brands",
            paranoid: true,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }

    static associations(db) {}
}