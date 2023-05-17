import express from 'express';
import gatewayController from "../controllers/gateway.controller.mjs";


const router = express.Router();
// Route to get all gateways
router.get('/gateways', gatewayController.getAllGateways);
// Route to get a gateway by ID
router.get('/gateways/:id', gatewayController.getGatewayById);

// Route to add a new gateway
router.post('/gateways', gatewayController.createGateway);

// Update a gateway by ID
router.patch('/gateways/:id', gatewayController.updateGateway)

// Delete a gateway by ID
router.delete('/gateways/:id', gatewayController.deleteGateway)

export default router;