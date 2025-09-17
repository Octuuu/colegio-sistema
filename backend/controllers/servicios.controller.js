import {
  crearServicio,
  obtenerServicios,
  obtenerServicioPorId,
  actualizarServicio,
  eliminarServicio,
} from "../models/servicios.model.js";

export const crearServicioController = async (req, res) => {
  try {
    const { nombre, tipo, descripcion, costo } = req.body;
    if (!nombre || !tipo || !descripcion || !costo) {
      return res.status(400).json({ message: "Todos los campos son requeridos" });
    }
    const id = await crearServicio(nombre, tipo, descripcion, costo);
    res.status(201).json({ id, message: "Servicio creado con éxito" });
  } catch (error) {
    console.error("Error al crear servicio:", error);
    res.status(500).json({ message: "Error al crear servicio" });
  }
};

export const obtenerServiciosController = async (req, res) => {
  try {
    const servicios = await obtenerServicios();
    res.json(servicios);
  } catch (error) {
    console.error("Error al obtener servicios:", error);
    res.status(500).json({ message: "Error al obtener servicios" });
  }
};

export const obtenerServicioPorIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const servicio = await obtenerServicioPorId(id);
    if (!servicio) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }
    res.json(servicio);
  } catch (error) {
    console.error("Error al obtener servicio:", error);
    res.status(500).json({ message: "Error al obtener servicio" });
  }
};

export const actualizarServicioController = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, tipo, descripcion, costo } = req.body;
    const updated = await actualizarServicio(id, nombre, tipo, descripcion, costo);
    if (updated === 0) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }
    res.json({ message: "Servicio actualizado con éxito" });
  } catch (error) {
    console.error("Error al actualizar servicio:", error);
    res.status(500).json({ message: "Error al actualizar servicio" });
  }
};

export const eliminarServicioController = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await eliminarServicio(id);
    if (deleted === 0) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }
    res.json({ message: "Servicio eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar servicio:", error);
    res.status(500).json({ message: "Error al eliminar servicio" });
  }
};
