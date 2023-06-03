const Sequelize = require('sequelize');

class Notice extends Sequelize.Model {
  static initiate(sequelize) {
    Admin.init(
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING(500),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Notice',
        tableName: 'notices',
        peranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Notice.belongsTo(db.Admin, { foreignKey: 'admin_id', targetKey: 'id' });
  }
}

module.exports = Notice;