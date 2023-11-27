import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const ZonaModel = sequelize.define('zona', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    geometry: {
        type: DataTypes.GEOMETRY('GEOMETRY', 4326),
        allowNull: false, 
    }
}, {
    timestamps: false,
    hooks: {
        beforeSave: function (instance) {
            if (instance.geometry && !instance.geometry.crs) {
                instance.geometry.crs = {
                    type: 'name',
                    properties: {
                        name: 'epsg:4326'
                    }
                };
            }
        }
    }
});