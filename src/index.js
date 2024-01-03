import app from './app.js';
import { sequelize } from './database/database.js';
import './models/zona.js';

async function main() {
    try {
        await sequelize.sync();
        console.log('Connection has been established successfully.');
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, '192.168.18.128');
        console.log('Server on port', PORT)
        console.log(`Servidor escuchando en http://192.168.18.128:${PORT}`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

main();