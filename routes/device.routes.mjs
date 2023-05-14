import express from 'express';
import deviceController from '../controllers/device.controller.mjs';



const router = express.Router();
router.post('/gateways/:id/devices', deviceController.addDeviceToGateway)
router.delete('/gateways/:id/devices/:deviceId', deviceController.deleteDeviceFromGateway)
export default router;