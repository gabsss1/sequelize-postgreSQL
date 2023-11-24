import {Router} from 'express';
import { postZona, getZona } from '../controller/zona.controller.js';

const router = Router();
router.post('/zona', postZona)
router.get('/zona', getZona)
router.get('/zona:id')
router.put('/zona:id')
router.delete('/zona:id')

export default router;