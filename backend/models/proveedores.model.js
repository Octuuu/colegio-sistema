import pool from "../config/db.js";

export const crearProveedor = async (nombre, tipo, telefono, correo, direccion, estado = 1) => {
    const [result] = await pool.query(
        `INSERT INTO proveedores (nombre, tipo, telefono, correo, direccion, estado)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [nombre, tipo, telefono, correo, direccion, estado]
    );
    return result.insertId;
};

export const obtenerProveedores = async () => {
    const [rows] = await pool.query(`SELECT * FROM proveedores ORDER BY nombre`);
    return rows;
};

export const obtenerProveedorPorId = async (id) => {
    const [rows] = await pool.query(`SELECT * FROM proveedores WHERE id = ?`, [id]);
    return rows[0];
};

export const actualizarProveedor = async (id, nombre, tipo, telefono, correo, direccion, estado) => {
    const [result] = await pool.query(
        `UPDATE proveedores 
         SET nombre = ?, tipo = ?, telefono = ?, correo = ?, direccion = ?, estado = ?
         WHERE id = ?`,
        [nombre, tipo, telefono, correo, direccion, estado, id]
    );
    return result.affectedRows;
};

export const eliminarProveedor = async (id) => {
    const [result] = await pool.query(`DELETE FROM proveedores WHERE id = ?`, [id]);
    return result.affectedRows;
};
