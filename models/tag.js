module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {  // 'Tag' should be capitalized to match convention
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'photos', key: 'id' }
    }
  }, {
    tableName: 'tags', // Explicitly specify table name to avoid issues
  });

  return Tag;
};
