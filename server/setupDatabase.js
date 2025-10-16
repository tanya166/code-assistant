
require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function setupDatabase() {
    try {
        console.log('🔄 Setting up database...');

        const schemaPath = path.join(__dirname, 'database_schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');
        
        await pool.query(schema);
        
        console.log('✅ Database setup completed successfully!');
        console.log('📊 Tables created:');
        console.log('   - users');
        console.log('   - reviews');
    
        const result = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_type = 'BASE TABLE'
        `);
        
        console.log('\n📋 Available tables in database:');
        result.rows.forEach(row => {
            console.log(`   - ${row.table_name}`);
        });
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error setting up database:', error);
        process.exit(1);
    }
}

setupDatabase();