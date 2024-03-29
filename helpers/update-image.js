const fs = require('fs');
const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');


const deleteImage = (path) => {
  if (fs.existsSync(path)) {
    // delete old image
    fs.unlinkSync(path);
  }
}

const updateImage = async (collection, id, fileName) => {

  let oldPath = '';

  switch(collection) {
    case 'users':
      const user = await User.findById(id);
      if (!user) {
        console.log('User not found by id');
        return false;
      }

      oldPath = `./uploads/users/${user.img}`;

      deleteImage(oldPath);

      user.img = fileName;
      await user.save();
      return true;
      break;

    case 'doctors':
      const doctor = await Doctor.findById(id);
      if (!doctor) {
        console.log('Doctor not found by id');
        return false;
      }

      oldPath = `./uploads/doctors/${doctor.img}`;

      deleteImage(oldPath);

      doctor.img = fileName;
      await doctor.save();
      return true;
      break;

    case 'hospitals':
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        console.log('Hospital not found by id');
        return false;
      }

      oldPath = `./uploads/hospitals/${hospital.img}`;

      deleteImage(oldPath);

      hospital.img = fileName;
      await hospital.save();
      return true;
      break;
  }

}


module.exports = {
  updateImage
}