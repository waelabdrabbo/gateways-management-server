import mongoose from 'mongoose';

const gatewaySchema = new mongoose.Schema({
  serialNumber: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  ipAddress: {
    type: String,
    required: true,
    minLength: 7,
    maxLength: 15,
    validate: {
      validator: function (value) {
        const pattern =
          /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/; // IPv4 pattern
        return pattern.test(value);
      },
      message: props => `${props.value} is not a valid IP address`
    }
  },
  devices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Device'
  }]
});

const Gateway = mongoose.model('Gateway', gatewaySchema);

export default Gateway;