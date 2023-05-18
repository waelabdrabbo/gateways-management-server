import Gateway from '../models/gateway.model.mjs';
import Device from '../models/device.model.mjs';
const gatewayController = {};

// Get all Gateways Documents
gatewayController.getAllGateways = async (req, res) => {
    try {
        const gateways = await Gateway.find().populate('devices');
        res.status(200).json(gateways);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Get a Signle Gateway
gatewayController.getGatewayById = async (req, res) => {
    try {
        const gateway = await Gateway.findById(req.params.id).populate('devices');
        if (!gateway) {
            return res.status(404).json({ message: 'Gateway not found' });
        }
        res.status(200).json(gateway);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Create Gateway with Devices
gatewayController.createGateway = async (req, res) => {
    try {
        const { serialNumber, name, ipAddress, devices } = req.body;
        const gateway = new Gateway({
            serialNumber,
            name,
            ipAddress,
            devices
        });
        const result = await gateway.save();
        // Update devices' gateway field and remove from unwanted gateways collection
        if (devices && devices.length > 0) {
            const deviceIds = devices.map(item => item._id);

            // Update the gateway ID in each requested device object
            await Device.updateMany(
                { _id: { $in: deviceIds } },
                { gateway: result._id }
            );

            // Remove devices from unwanted gateways collection
            await Gateway.updateMany(
                { _id: { $ne: result._id }, devices: { $in: deviceIds } },
                { $pull: { devices: { $in: deviceIds } } }
            );
        }
        res.status(201).json(result);
    } catch (error) {
        console.log(error)
        res.status(400).json({ error });
    }
};

// Delete Gateway with associated Devices
gatewayController.deleteGateway = async (req, res) => {
    try {
        const gateway = await Gateway.findById(req.params.id);
        if (!gateway) {
            return res.status(404).json({ message: 'Gateway not found' });
        }
        await gateway.deleteOne();
        res.status(200).json({ message: 'Gateway has been removed' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Create Gateway with its Devices
gatewayController.updateGateway = async (req, res) => {
    const { _id, devices } = req.body;

    try {
        const gateway = await Gateway.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (devices && devices.length > 0) {
            const deviceIds = devices.map(item => item._id);

            // Update the gateway ID in each requested device object
            await Device.updateMany(
                { _id: { $in: deviceIds } },
                { gateway: _id }
            );

            // Remove gateway ID from devices that were not included in the request
            await Device.updateMany(
                { gateway: gateway._id, _id: { $nin: deviceIds } },
                { gateway: undefined }
            );

            // Remove devices from unwanted gateways collection
            await Gateway.updateMany(
                { _id: { $ne: _id }, devices: { $in: deviceIds } },
                { $pull: { devices: { $in: deviceIds } } }
            );
        } else {
            // Remove gateway ID from all devices associated with the gateway
            await Device.updateMany(
                { gateway: gateway._id },
                { gateway: undefined }
            );
        }

        if (!gateway) {
            return res.status(404).json({ message: 'Gateway not found' });
        }
        res.status(200).json(gateway);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
};
export default gatewayController;
