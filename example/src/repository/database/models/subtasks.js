module.exports = (sequelize, DataTypes) => {
  const SubTasks = sequelize.define('SubTasks', {
    TaskId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    ready: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });

  SubTasks.associate = function(models) {
    SubTasks.belongsTo(models.Task);
  };

  return SubTasks;
};
