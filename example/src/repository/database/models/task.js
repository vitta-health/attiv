module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    email: DataTypes.STRING,
    ready: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });

  Task.associate = function(models) {
    Task.hasMany(models.SubTasks, {
      as: 'sub_tasks',
      foreignKey: 'TaskId',
    });
  };

  return Task;
};
