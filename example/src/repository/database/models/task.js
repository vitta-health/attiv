module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    email: DataTypes.STRING,
    ready: DataTypes.BOOLEAN,
    createdAt: {
      type: DataTypes.DATE,
      hidden: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      hidden: true,
    },
  });

  Task.associate = function(models) {
    Task.hasMany(models.SubTasks, {
      as: 'sub_tasks',
      foreignKey: 'TaskId',
    });
  };

  return Task;
};
