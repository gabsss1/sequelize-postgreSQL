import Sequelize from 'sequelize';

export const sequelize = new Sequelize('testDBPostGIS', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres'
});
