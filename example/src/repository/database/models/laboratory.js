module.exports = (sequelize, DataTypes) => {
    const Laboratory = sequelize.define('Laboratory', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        createdAt: {
            type: DataTypes.DATE,
            hidden: true,
        },
        updatedAt: {
            type: DataTypes.DATE,
            hidden: true,
        },
    });

    return Laboratory;
};
