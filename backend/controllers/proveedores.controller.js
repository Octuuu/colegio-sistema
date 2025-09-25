import {
    crearProveedor,
    obtenerProveedores,
    obtenerProveedorPorId,
    actualizarProveedor,
    eliminarProveedor
} from '../models/proveedores.model.js';

// Crear proveedor
export const nuevoProveedor = async (req, res) => {
    try {
        const { nombre, tipo, telefono, correo, direccion, estado } = req.body;

        if (!nombre || !tipo) {
            return res.status(400).json({ message: 'Nombre y tipo son obligatorios' });
        }

        const id = await crearProveedor(nombre, tipo, telefono, correo, direccion, estado ?? 1);
        res.status(201).json({ message: 'Proveedor creado', id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear proveedor' });
    }
};

// Obtener todos los proveedores
export const getProveedores = async (req, res) => {
    try {
        const proveedores = await obtenerProveedores();
        res.json(proveedores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener proveedores' });
    }
};

// Obtener proveedor por ID
export const getProveedorPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const proveedor = await obtenerProveedorPorId(id);

        if (!proveedor) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }

        res.json(proveedor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener proveedor' });
    }
};

// Actualizar proveedor
export const editarProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, tipo, telefono, correo, direccion, estado } = req.body;

        const filas = await actualizarProveedor(id, nombre, tipo, telefono, correo, direccion, estado);

        if (filas === 0) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }

        res.json({ message: 'Proveedor actualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar proveedor' });
    }
};

// Eliminar proveedor
export const borrarProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        const filas = await eliminarProveedor(id);

        if (filas === 0) {
            return res.status(404).json({ message: 'Proveedor no encontrado' });
        }

        res.json({ message: 'Proveedor eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar proveedor' });
    }
};
