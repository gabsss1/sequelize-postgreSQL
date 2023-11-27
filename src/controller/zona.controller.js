// Importa el modelo con un nombre diferente
import { ZonaModel } from '../models/zona.js';

// get all zonas
export const getZona = async (req, res) => {
    try {
        const zonas = await ZonaModel.findAll();
        res.json(zonas);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// get one zona
export const getZoneByID = async (req, res) => {
    try {
        const { id } = req.params;
        const zona = await ZonaModel.findOne({
            where: {
                id,
            },
        });
        res.json(zona);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// post zonas
export const postZona = async (req, res) => {
    const { name, features } = req.body;

    try {

        if (!features || !Array.isArray(features) || features.length === 0) {
            return res.status(400).json({ message: 'Invalid features array' });
        }

        const newZona = await Promise.all(
            features.map(async (feature) => {
                const { geometry } = feature;

                if (!geometry || !geometry.type || !geometry.coordinates) {
                    throw new Error('Invalid GeoJSON format');
                }

                return ZonaModel.create({
                    name,
                    geometry: {
                        type: geometry.type,
                        coordinates: geometry.coordinates,
                    },
                });
            })
        );

        res.json(newZona);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// put zonas
export const putZona = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, features } = req.body;

        if (!features || !Array.isArray(features) || features.length === 0) {
            return res.status(400).json({ message: 'Invalid features array' });
        }

        const updateZona = await ZonaModel.findByPk(id);

        if (!updateZona) {
            return res.status(404).json({ message: 'Zona not found' });
        }

        updateZona.name = name;
        await updateZona.save();

        updateZona.geometry = {
            type: 'MultiPolygon',
            coordinates: features.map(feature => feature.geometry.coordinates),
        };
        await updateZona.save();

        res.json(updateZona);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// delete zonas
export const deleteZona = async (req, res) => {
    try {
        const { id } = req.params;
        await ZonaModel.destroy({
            where: {
                id,
            },
        });
        res.json({ message: 'Zona deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
