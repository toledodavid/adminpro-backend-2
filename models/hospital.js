const { Schema, model } = require('mongoose');


const HospitalSchema = Schema({
  name: {
    type: String,
    require: true
  },
  img: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

HospitalSchema.method('toJSON', function() {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model('Hospital', HospitalSchema);