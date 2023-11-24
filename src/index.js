import app from './app.js';
import { sequelize } from './database/database.js';
import './models/zona.js';

async function main() {
    try {
        await sequelize.sync();
        console.log('Connection has been established successfully.');
        const PORT = process.env.PORT || 3000;
        app.listen(PORT);
        console.log('Server on port', PORT)
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

main();