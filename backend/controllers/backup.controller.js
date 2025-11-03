import { generarBackup } from '../models/backup.model.js';
import path from 'path';

export const descargarBackup = async (req, res) => {
  try {
    const backupFile = await generarBackup();

    // Nombre del archivo para descargar
    const fileName = path.basename(backupFile); 
    
    res.download(path.resolve(backupFile), fileName, (err) => {
      if (err) {
        console.error('Error al descargar backup:', err);
        res.status(500).send('Error al descargar backup');
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al generar el backup' });
  }
};
