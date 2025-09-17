import pool from '../config/db.js';

export const crearProducto = async (nombre, descripcion, precio, stock, proveedor_id) => {
    const [result] = await pool.query(
        `INSERT INTO productos (nombre, descripcion, precio, stock, proveedor_id, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
        [nombre, descripcion, precio, stock, proveedor_id]
    );
    return result.insertId;
};

export const obtenerProductos = async () => {
    const [rows] = await pool.query(
        `SELECT p.*, pr.nombre as proveedor_nombre
         FROM productos p
         LEFT JOIN proveedores pr ON p.proveedor_id = pr.id
         ORDER BY p.nombre`
    );
    return rows;
};

export const obtenerProductoPorId = async (id) => {
    const [rows] = await pool.query(`SELECT * FROM productos WHERE id = ?`, [id]);
    return rows[0];
};

export const actualizarProducto = async (id, nombre, descripcion, precio, stock, proveedor_id) => {
    const [result] = await pool.query(
        `UPDATE productos 
         SET nombre = ?, descripcion = ?, precio = ?, stock = ?, proveedor_id = ?, updated_at = NOW()
         WHERE id = ?`,
        [nombre, descripcion, precio, stock, proveedor_id, id]
    );
    return result.affectedRows;
};

export const eliminarProducto = async (id) => {
    const [result] = await pool.query(`DELETE FROM productos WHERE id = ?`, [id]);
    return result.affectedRows;
};

// Funciones adicionales para control de stock
export const actualizarStock = async (id, cantidad) => {
    const [result] = await pool.query(
        `UPDATE productos SET stock = stock + ?, updated_at = NOW() WHERE id = ?`,
        [cantidad, id]
    );
    return result.affectedRows;
};

export const productosBajoStock = async (limite = 5) => {
    const [rows] = await pool.query(
        `SELECT * FROM productos WHERE stock <= ? ORDER BY stock ASC`,
        [limite]
    );
    return rows;
};
