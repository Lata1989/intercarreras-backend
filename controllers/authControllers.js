import jwt from 'jsonwebtoken';
import { connectDB } from '../config/dbConfig.js';

// Registrar usuario
export const register = async (req, res) => {
    const { nombre, email, password } = req.body;

    try {
        const db = await connectDB();
        const usuarios = db.collection('usuarios');

        // Verificar si el usuario ya existe
        const usuarioExistente = await usuarios.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        // Crear el usuario (sin encriptación de contraseña)
        const nuevoUsuario = {
            nombre,
            email,
            password
        };

        await usuarios.insertOne(nuevoUsuario);

        res.status(201).json({ msg: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

// Login usuario
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const db = await connectDB();
        const usuarios = db.collection('usuarios');

        // Verificar si el usuario existe
        const usuario = await usuarios.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        // Comparar contraseñas sin encriptación
        if (password !== usuario.password) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        // Crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre
            }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h' // Token válido por 1 hora
        });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};
