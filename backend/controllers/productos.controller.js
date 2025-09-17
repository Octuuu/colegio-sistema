import * as Producto from '../models/productos.model.js';

export const crearProductoController = async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock, proveedor_id } = req.body;
        const id = await Producto.crearProducto(nombre, descripcion, precio, stock, proveedor_id);
        res.status(201).json({ id, message: 'Producto creado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear producto' });
    }
};

export const obtenerProductosController = async (req, res) => {
    try {
        const productos = await Producto.obtenerProductos();
        res.json(productos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener productos' });
    }
};

export const obtenerProductoPorIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.obtenerProductoPorId(id);
        if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(producto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener producto' });
    }
};

export const actualizarProductoController = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, stock, proveedor_id } = req.body;
        const affectedRows = await Producto.actualizarProducto(id, nombre, descripcion, precio, stock, proveedor_id);
        if (!affectedRows) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json({ message: 'Producto actualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar producto' });
    }
};

export const eliminarProductoController = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await Producto.eliminarProducto(id);
        if (!affectedRows) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar producto' });
    }
};

export const actualizarStockController = async (req, res) => {
    try {
        const { id } = req.params;
        const { cantidad } = req.body; // puede ser positivo o negativo
        await Producto.actualizarStock(id, cantidad);
        res.json({ message: 'Stock actualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar stock' });
    }
};

export const productosBajoStockController = async (req, res) => {
    try {
        const limite = req.query.limite ? parseInt(req.query.limite) : 5;
        const productos = await Producto.productosBajoStock(limite);
        res.json(productos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener productos con stock bajo' });
    }
};
