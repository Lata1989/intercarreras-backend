import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import { connectDB, client } from './config/dbConfig.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Para manejar JSON en las peticiones

// Rutas
app.use('/api/auth', authRoutes);

// Puerto
const PORT = process.env.PORT || 5000;

// Conectar a la base de datos y luego iniciar el servidor
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('No se pudo iniciar el servidor:', error);
    }
};

// Iniciar el proceso
startServer();

// Cerrar la conexión a la base de datos al finalizar la app
process.on('SIGINT', async () => {
    await client.close();
    console.log('Conexión a MongoDB cerrada');
    process.exit(0);
});
