const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const files = ['LK/lichking.json', 'Cata/cataclysm.json', 'Panda/pandaria.json'];

files.forEach(file => {
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
    let updated = false;

    const updatedData = data.map(obj => {
      if (!obj.uuid) {
        updated = true;
        return { ...obj, uuid: uuidv4() };
      }
      return obj;
    });

    if (updated) {
      fs.writeFileSync(file, JSON.stringify(updatedData, null, 2));
      console.log(`UUIDs asignados en ${file}.`);
    } else {
      console.log(`Todos los objetos en ${file} ya tienen un UUID.`);
    }
  } catch (err) {
    console.error(`Error al procesar ${file}:`, err);
    process.exit(1);
  }
});
