module.exports = (sequelize, DataTypes) => {
  const SubTasks = sequelize.define('SubTasks', {
    TaskId: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING,
      hidden: true,
    },
    description: DataTypes.STRING,
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

  SubTasks.associate = function(models) {
    SubTasks.belongsTo(models.Task);
  };

  return SubTasks;
};
