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
    const { name, location } = req.body;

    try {
        const newZona = await ZonaModel.create({
            name,
            location,
        });
        res.json(newZona);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// put zonas
export const putZona = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location } = req.body;

        const updateZona = await ZonaModel.findByPk(id);
        updateZona.name = name;
        updateZona.location = location;
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
