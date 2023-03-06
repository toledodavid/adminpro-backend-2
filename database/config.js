const mongoose =  require('mongoose');


// axorPJK70TdtGRIA
const dbConnection = async() => {

  try {
    await mongoose.connect('mongodb+srv://mean_user:axorPJK70TdtGRIA@cluster0.bmwo7.mongodb.net/hospitaldb2', {
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