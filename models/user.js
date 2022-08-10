const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                comment: "고유번호 UUID",
            },
            userid: {
                type: Sequelize.STRING(100),
                allowNull: true,
                unique: true,
                comment: "로그인 아이디",
            },
            password: {
                type: Sequelize.STRING(500),
                allowNull: true,
                comment: "로그인 비밀번호",
            },
            nick: {
                type: Sequelize.STRING(100),
                allowNull: true,
                comment: "닉네임",
            },
            provider: {
                type: Sequelize.STRING(30),
                allowNull: false,
                defaultValue: 'local',
                comment: "네이버나 카카오 기본은 지역회원가입",
            },
            name: {
                type: Sequelize.STRING(30),
                allowNull: true,
                comment: "실제 이름",
            },
            email: {
                type: Sequelize.STRING(100),
                allowNull: true,
                comment: "이메일",
            },
            phone: {
                type: Sequelize.STRING(72),
                allowNull: true,
                comment: "핸드폰 번호",
            },
            gender: {
                type: Sequelize.STRING(10),
                allowNull: true,
                comment: "성별",
            },
            birth: {
                type: Sequelize.STRING(100),
                allowNull: true,
                comment: "생일",
            },
            zipcode: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            address: {
                type: Sequelize.STRING(200),
                allowNull: true,
            },
            detailaddress: {
                type: Sequelize.STRING(200),
                allowNull: true,
            },
            authority: {
                type: Sequelize.STRING(100),
                allowNull: false,
                defaultValue: 'base',
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: true,
            modelName: "User",
            tableName: "users",
            paranoid: true,
            charset: "utf8",
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
    }
};