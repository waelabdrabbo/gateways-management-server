import Gateway from '../models/gateway.model.mjs';
import Device from '../models/device.model.mjs';
const deviceController = {};

deviceController.getAllDevices = async (req, res) => {
  try {
    const devices = await Device.find().populate('gateway')
    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

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
    res.status(200).json({ message: 'Device has been deleted', updatedGateway });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

// Delete a Device By ID
deviceController.deleteDevice = async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }
    await device.deleteOne();
    res.status(200).json({ message: 'Device has been removed' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}

deviceController.updateDevice = async (req, res) => {
  try {
    const device = await Device.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }
    res.status(200).json(device);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

deviceController.createDevice = async (req, res) => {
  try {
    const { uid, vendor, status } = req.body;
    const device = new Device({
      uid,
      vendor,
      status,
    });
    const result = await device.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export default deviceController;
