import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const zona = sequelize.define('zona', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    location: {
        type: DataTypes.GEOMETRY('POINT')
    }
});