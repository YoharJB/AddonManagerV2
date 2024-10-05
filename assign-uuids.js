const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Lista de archivos JSON a procesar con sus rutas
const jsonFiles = [
  'LK/lichking.json',
  'Cata/cataclysm.json',
  'Panda/pandaria.json'
];

let anyUpdates = false; // Bandera para verificar si se realizaron cambios en algún archivo

jsonFiles.forEach(filePath => {
  try {
    // Leer y parsear el archivo JSON
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Verificar y asignar UUIDs donde sea necesario
    let updated = false;
    const updatedData = data.map(item => {
      if (!item.uuid) {
        updated = true;
        return { ...item, uuid: uuidv4() };
      }
      return item;
    });

    // Si se realizaron cambios, escribir el archivo actualizado
    if (updated) {
      fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
      console.log(`UUIDs asignados en ${filePath}.`);
      anyUpdates = true;
    } else {
      console.log(`Todos los objetos en ${filePath} ya tienen un UUID. No se realizaron cambios.`);
    }
  } catch (err) {
    console.error(`Error al procesar ${filePath}:`, err);
    process.exit(1);
  }
});

// Salida final si se realizaron actualizaciones
if (anyUpdates) {
  console.log('Se realizaron actualizaciones en los archivos JSON.');
} else {
  console.log('No se realizaron cambios en ninguno de los archivos JSON.');
}
