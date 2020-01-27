'use strict';
module.exports = (sequelize, DataTypes) => {
    const MedicineLaboratory = sequelize.define('MedicineLaboratory', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        medicineId: {
            type: DataTypes.INTEGER,
        },
        laboratoryId: {
            type: DataTypes.INTEGER,
        },
        createdAt: {
            type: DataTypes.DATE,
            hidden: true,
        },
        atualizadoEm: {
            type: DataTypes.DATE,
            hidden: true,
        },
    });

    MedicineLaboratory.associate = function (models) {
        MedicineLaboratory.belongsTo(models.Medicine, { as: 'Medicine', foreignKey: 'medicineId' });
        MedicineLaboratory.belongsTo(models.Laboratory, { as: 'Laboratory', foreignKey: 'laboratoryId' });
    };
    return MedicineLaboratory;
};
