import Gateway from '../models/gateway.model.mjs';
import Device from '../models/device.model.mjs';
const deviceController = {};


deviceController.addDeviceToGateway = async (req, res) => {
  try {
    const { id } = req.params;
    const { uid, vendor, createdDate, status } = req.body;
    const gateway = await Gateway.findById(id);
    if (!gateway) {
      return res.status(404).json({ message: 'Gateway not found' });
    }
    if (gateway.devices.length >= 10) {
      return res.status(400).json({ message: 'Gateway already has 10 devices' });
    }
    const device = new Device({
      uid,
      vendor,
      createdDate,
      status,
      gateway: gateway._id,
    });
    await device.save();
    gateway.devices.push(device._id);
    await gateway.save();
    res.status(200).json({ message: 'Device has been added' });
  } catch (error) {
    if (error.code === 11000 && error.keyValue && error.keyValue.uid) {
      res.status(400).json({ message: 'Device with this UID already exists' });
    } else {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
};

// Delete a Device from gateway by ID
deviceController.deleteDeviceFromGateway = async (req, res) => {
  try {
    const { id, deviceId } = req.params;
    // Find the gateway with the specified id
    const gateway = await Gateway.findById(id);

    // If the gateway is not found, return an error
    if (!gateway) {
      
      console.log(req.params)
      return res.status(404).json({ message: 'Gateway not found 1' });
    }

    // Remove the device with the specified deviceId from the gateway's devices array
    gateway.devices.pull(deviceId);

    // Save the updated gateway object
    const updatedGateway = await gateway.save();

    // Return the updated gateway object
    res.status(200).json({ message: 'Device has been deleted', updatedGateway});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export default deviceController;
