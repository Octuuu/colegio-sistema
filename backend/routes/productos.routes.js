import { Router } from "express";
import { 
    crearProductoController,
    obtenerProductosController,
    obtenerProductoPorIdController,
    actualizarProductoController,
    eliminarProductoController
} from "../controllers/productos.controller.js";

const router = Router();

router.post("/", crearProductoController);
router.get("/", obtenerProductosController);
router.get("/:id", obtenerProductoPorIdController);
router.put("/:id", actualizarProductoController)
router.delete("/:id", eliminarProductoController);

export default router;
