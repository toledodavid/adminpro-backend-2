const mongoose =  require('mongoose');
require('dotenv').config();


// axorPJK70TdtGRIA
const dbConnection = async() => {

  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('***** DB Online *****');
  } catch (error) {
    console.log(error);
    throw new Error('Initialization DB error');
  }

}


module.exports = {
  dbConnection
}