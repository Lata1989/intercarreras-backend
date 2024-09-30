import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

const connectDB = async () => {
    try {
        await client.connect();
        console.log(`Conectado a MongoDB`);
        return client.db(process.env.DB_NAME);
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1);
    }
};

export { connectDB, client };
