const Sequelize = require('sequelize');

module.exports = class Parfum extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                comment: "향수 고유번호",
            },
            brandname: {
                type: Sequelize.STRING(100),
                allowNull: false,
                comment: "해당 향수의 브랜드 이름",
            },
            name: {
                type: Sequelize.STRING(100),
                allowNull: false,
                comment: "향수 이름",
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: true,
            modelName: "Parfum",
            tableName: "parfums",
            paranoid: true,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }
    static associate(db) {
        db.Parfum.belongsTo(db.Brand, { foreignKey: 'brandname', targetKey: 'name'});
    }
}