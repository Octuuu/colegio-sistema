import pool from '../config/db.js';
import fs from 'fs';
import path from 'path';

export const generarBackup = async () => {
  const [tables] = await pool.query("SHOW TABLES");
  const dbName = process.env.DB_NAME;

  // Nombre del archivo con fecha y hora
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFile = path.join('backups', `backup_${timestamp}.sql`);

  // Crear carpeta backups si no existe
  if (!fs.existsSync('backups')) fs.mkdirSync('backups');

  let sql = `-- Backup de la base de datos ${dbName} - ${new Date().toLocaleString()}\n\n`;

  for (let tableObj of tables) {
    const tableName = tableObj[`Tables_in_${dbName}`];

    // Estructura de la tabla
    const [createTable] = await pool.query(`SHOW CREATE TABLE \`${tableName}\``);
    sql += `${createTable[0]['Create Table']};\n\n`;

    // Datos de la tabla
    const [rows] = await pool.query(`SELECT * FROM \`${tableName}\``);
    if (rows.length > 0) {
      const columns = Object.keys(rows[0]).map(col => `\`${col}\``).join(', ');
      rows.forEach(row => {
        const values = Object.values(row)
          .map(val => val === null ? 'NULL' : `'${val.toString().replace(/'/g, "\\'")}'`)
          .join(', ');
        sql += `INSERT INTO \`${tableName}\` (${columns}) VALUES (${values});\n`;
      });
      sql += `\n`;
    }
  }

  fs.writeFileSync(backupFile, sql);
  return backupFile;
};
