import {
    crearProducto,
    obtenerProductos,
    obtenerProductoPorId,
    actualizarProducto,
    eliminarProducto
} from "../models/productos.model.js";

export const crearProductoController = async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock, proveedor_id } = req.body;
        const id = await crearProducto(nombre, descripcion, precio, stock, proveedor_id);
        res.status(201).json({ id, message: "producto creado con exito" });
    } catch (error) {
        res.status(500).json({ error: "error al crear producto", error });
    }
}

export const obtenerProductosController = async (req, res) => {
    try {
        const productos = await obtenerProductos();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener productos", error });
    }
};

export const obtenerProductoPorIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await obtenerProductoPorId(id);
        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.json(producto);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener producto", error });
    }
};

export const actualizarProductoController = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, stock, proveedor_id } = req.body;
        const updated = await actualizarProducto(id, nombre, descripcion, precio, stock, proveedor_id);
        if (!updated) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.json({ message: "Producto actualizado con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar producto", error });
    }
};

export const eliminarProductoController = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await eliminarProducto(id);
        if (!deleted) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.json({ message: "Producto eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar producto", error });
    }
};