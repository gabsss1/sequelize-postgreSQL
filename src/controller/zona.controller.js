// Importa el modelo con un nombre diferente
import { ZonaModel } from '../models/zona.js';

// get all zonas
export const getAllZona = async (req, res) => {
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

        let combinedCoordinates = [];

        for (const feature of features) {
            const { geometry } = feature;

            if (!geometry || !geometry.type || !geometry.coordinates) {
                throw new Error('Invalid GeoJSON format');
            }

            if (geometry.coordinates.length > 0) {
                combinedCoordinates = combinedCoordinates.concat(geometry.coordinates);
            }
        }

        if (combinedCoordinates.length === 0) {
            return res.status(400).json({ message: 'No valid coordinates provided' });
        }

        const newZona = await ZonaModel.create({
            name,
            geometry: {
                type: 'GeometryCollection',
                geometries: features.map(feature => feature.geometry), 
            },
        });

        res.json(newZona);
    } catch (error) {
        console.error('Error creating zona:', error);
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

        const updatedGeoJSON = {
            type: 'FeatureCollection',
            features: features.map((feature) => ({
                type: 'Feature',
                properties: {},
                geometry: feature.geometry,
            })),
        };

        updateZona.geometry = {
            type: 'GeometryCollection',
            geometries: features.map(feature => feature.geometry),
        };

        await updateZona.save({ fields: ['name', 'geometry'], hooks: false });

        await updateZona.reload();

        res.json(updateZona);
    } catch (error) {
        console.error(error);
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