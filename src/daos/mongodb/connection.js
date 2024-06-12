import { connect } from 'mongoose';
const connectionString = 'mongodb+srv://eugeniagonzalez97:FuriayLola0clusterCH@clustercoderh.ofv3ce9.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=clusterCoderH';

export const initMongoDB = async () => {
  try {
    await connect(connectionString);
    console.log('Conectado a la base de datos de MongoDB');
  } catch (error) {
    console.log(`ERROR => ${error}`);
  }
};