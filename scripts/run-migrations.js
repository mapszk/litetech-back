const path = require('path');

// Carga las variables de entorno
require('dotenv').config();

async function runMigrations() {
  try {
    console.log('🔄 Cargando DataSource compilado...');
    
    const dataSourcePath = path.join(__dirname, '../dist/data-source.js');
    const dataSourceModule = require(dataSourcePath);
    
    // Intenta obtener el DataSource de diferentes formas
    const AppDataSource = dataSourceModule.AppDataSource || 
                          dataSourceModule.default || 
                          dataSourceModule;
    
    console.log('🔄 Inicializando conexión a la base de datos...');
    await AppDataSource.initialize();
    console.log('✅ Conexión establecida');
    
    console.log('🔄 Ejecutando migraciones...');
    const migrations = await AppDataSource.runMigrations();
    
    if (migrations.length === 0) {
      console.log('ℹ️  No hay migraciones pendientes');
    } else {
      console.log(`✅ ${migrations.length} migración(es) ejecutada(s) exitosamente:`);
      migrations.forEach(migration => {
        console.log(`   - ${migration.name}`);
      });
    }
    
    await AppDataSource.destroy();
    console.log('✅ Proceso completado');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al ejecutar migraciones:');
    console.error(error);
    process.exit(1);
  }
}

runMigrations();