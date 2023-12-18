import {Router} from 'express';
import { postZona, getAllZona, deleteZona, putZona, getZoneByID} from '../controller/zona.controller.js';

const router = Router();
router.get('/zona', getAllZona)
router.get('/zona/:id', getZoneByID)
router.post('/zona', postZona)
router.put('/zona/:id', putZona)
router.delete('/zona/:id', deleteZona)

export default router;