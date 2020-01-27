module.exports = (sequelize, DataTypes) => {
    const Medicine = sequelize.define('Medicine', {
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

    Medicine.associate = function (models) {
        Medicine.hasMany(models.MedicineLaboratory, {
            as: 'MedicineLaboratories',
            foreignKey: 'laboratoryId',
        });
    };

    return Medicine;
};
