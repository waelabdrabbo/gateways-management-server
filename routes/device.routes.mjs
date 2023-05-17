import express from 'express';
import deviceController from '../controllers/device.controller.mjs';



const router = express.Router();
router.get('/devices', deviceController.getAllDevices)
router.post('/devices', deviceController.createDevice);
router.delete('/devices/:id', deviceController.deleteDevice)
router.patch('/devices/:id', deviceController.updateDevice)
router.post('/gateways/:id/devices', deviceController.addDeviceToGateway)

router.delete('/gateways/:id/devices/:deviceId', deviceController.deleteDeviceFromGateway)
export default router;