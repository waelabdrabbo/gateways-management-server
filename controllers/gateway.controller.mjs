import Gateway from '../models/gateway.model.mjs';
const gatewayController = {};

gatewayController.getAllGateways = async (req, res) => {
    try {
        const gateways = await Gateway.find().populate('devices');
        res.status(200).json(gateways);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

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

gatewayController.createGateway = async (req, res) => {
    try {
        const { serialNumber, name, ipAddress } = req.body;
        const gateway = new Gateway({
            serialNumber,
            name,
            ipAddress,
        });
        const result = await gateway.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error });
    }
};

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

gatewayController.updateGateway = async (req, res) => {
    try {
        const gateway = await Gateway.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

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
