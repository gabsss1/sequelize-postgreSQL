import {Router} from 'express';
import { postZona, getZona, deleteZona, putZona, getZoneByID } from '../controller/zona.controller.js';

const router = Router();
router.get('/zona', getZona)
router.get('/zona/:id', getZoneByID)
router.post('/zona', postZona)
router.put('/zona/:id', putZona)
router.delete('/zona/:id', deleteZona)


export default router;