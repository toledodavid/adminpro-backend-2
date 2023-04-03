const fs = require('fs');
const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');




const updateImage = async (collection, id, fileName) => {

  switch(collection) {
    case 'users':
      break;

    case 'doctors':
      const doctor = await Doctor.findById(id);
      if (!doctor) {
        console.log('Doctor not found by id');
        return false;
      }

      const oldPath = `./uploads/doctors/${doctor.img}`;
      if (fs.existsSync(oldPath)) {
        // delete old image
        fs.unlinkSync(oldPath);
      }

      doctor.img = fileName;
      await doctor.save();
      return true;

      break;

    case 'hospitals':
      break;
  }

}


module.exports = {
  updateImage
}