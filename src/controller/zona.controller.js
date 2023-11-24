import { zona } from '../models/zona.js'


export const getZona = (req, res) => {
    res.send('get zona')
}

    export const postZona = async (req, res) => {
        try {
            const { name, location } = req.body;
    
            await zona.create({
                name,
                location: {
                    type: 'Point',
                    coordinates: [location.longitude, location.latitude]
                }
            });
    
            res.send('post zona');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al crear la zona');
        }
    };
