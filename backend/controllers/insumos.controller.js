import {
  crearInsumo,
  obtenerInsumos,
  obtenerInsumoPorId,
  actualizarInsumo,
  eliminarInsumo,
} from "../models/insumos.model.js";

export const crearInsumoController = async (req, res) => {
  try {
    const { nombre, descripcion, cantidad, unidad, proveedor_id } = req.body;
    if (!nombre || !descripcion || !cantidad || !unidad || !proveedor_id) {
      return res.status(400).json({ message: "Todos los campos son requeridos" });
    }
    const id = await crearInsumo(nombre, descripcion, cantidad, unidad, proveedor_id);
    res.status(201).json({ id, message: "Insumo creado con éxito" });
  } catch (error) {
    console.error("Error al crear insumo:", error);
    res.status(500).json({ message: "Error al crear insumo" });
  }
};

export const obtenerInsumosController = async (req, res) => {
  try {
    const insumos = await obtenerInsumos();
    res.json(insumos);
  } catch (error) {
    console.error("Error al obtener insumos:", error);
    res.status(500).json({ message: "Error al obtener insumos" });
  }
};

export const obtenerInsumoPorIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const insumo = await obtenerInsumoPorId(id);
    if (!insumo) {
      return res.status(404).json({ message: "Insumo no encontrado" });
    }
    res.json(insumo);
  } catch (error) {
    console.error("Error al obtener insumo:", error);
    res.status(500).json({ message: "Error al obtener insumo" });
  }
};

export const actualizarInsumoController = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, cantidad, unidad, proveedor_id } = req.body;
    const updated = await actualizarInsumo(id, nombre, descripcion, cantidad, unidad, proveedor_id);
    if (updated === 0) {
      return res.status(404).json({ message: "Insumo no encontrado" });
    }
    res.json({ message: "Insumo actualizado con éxito" });
  } catch (error) {
    console.error("Error al actualizar insumo:", error);
    res.status(500).json({ message: "Error al actualizar insumo" });
  }
};

export const eliminarInsumoController = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await eliminarInsumo(id);
    if (deleted === 0) {
      return res.status(404).json({ message: "Insumo no encontrado" });
    }
    res.json({ message: "Insumo eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar insumo:", error);
    res.status(500).json({ message: "Error al eliminar insumo" });
  }
};
