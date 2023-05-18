import express from 'express';
import deviceController from '../controllers/device.controller.mjs';



const router = express.Router();
// Route to get all devices
router.get('/devices', deviceController.getAllDevices)

// Route to Create a New Device
router.post('/devices', deviceController.createDevice);

// Route to Delete a Device
router.delete('/devices/:id', deviceController.deleteDevice)

// Route to Update a Device
router.patch('/devices/:id', deviceController.updateDevice)

// Custom Route to add and update devices in gateway
router.post('/gateways/:id/devices', deviceController.addDeviceToGateway)
router.delete('/gateways/:id/devices/:deviceId', deviceController.deleteDeviceFromGateway)
export default router;