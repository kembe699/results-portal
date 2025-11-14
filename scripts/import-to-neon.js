// Script to import data to Neon PostgreSQL
// Run with: node scripts/import-to-neon.js

const { neon } = require('@neondatabase/serverless');

const DATABASE_URL = 'postgresql://neondb_owner:npg_WrqUkd28BXGK@ep-wispy-scene-a4yk8lr2-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require';

async function importData() {
  console.log('🔄 Connecting to Neon...');
  const sql = neon(DATABASE_URL);

  try {
    // Drop table if exists (for clean import)
    console.log('📋 Dropping existing table if any...');
    await sql`DROP TABLE IF EXISTS training_results`;
    
    // Create table
    console.log('📋 Creating table...');
    await sql`
      CREATE TABLE training_results (
        id SERIAL PRIMARY KEY,
        staff_id VARCHAR(20) UNIQUE NOT NULL,
        full_name VARCHAR(100) NOT NULL,
        department VARCHAR(100) DEFAULT '',
        acls_theory_marks INTEGER,
        acls_practical_marks INTEGER,
        bls_theory_marks INTEGER,
        bls_practical_marks INTEGER,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Table created!');

    // Create index
    console.log('📋 Creating index...');
    await sql`CREATE INDEX IF NOT EXISTS idx_staff_id ON training_results(staff_id)`;
    console.log('✅ Index created!');

    // Insert data
    console.log('📋 Inserting data...');
    const data = [
      [151, 'GH-056', 'Laat Peter Puondak', 'Admission', 72, 96, 98, 93],
      [152, 'GH-0327', 'Filberto Ponis Mboru', 'Pharmacy', 70, 68, 96, 80],
      [153, 'TEMP001', 'Martin Pitia Hilliary', '', 68, 92, 94, 87],
      [154, 'TEMP002', 'Levi Kondo Stephen', '', 67, 92, 90, 87],
      [155, 'TEMP003', 'Yokwe Lobor Lado', '', 65, 92, 90, 87],
      [156, 'TEMP004', 'Oloya James Taban', '', 65, 92, 88, 87],
      [157, 'GH-0255', 'Hellen Juston Anter', 'Nursing', 63, 92, 88, 87],
      [158, 'TEMP005', 'Young Malesh Aritab', '', 61, 60, 82, 67],
      [159, 'TEMP006', 'Taban Joshua Lasu', '', 60, 60, 80, 67],
      [160, 'GH-0301', 'Deng Simon Tut', 'Administration', null, null, 78, 0],
      [161, 'TEMP007', 'Matilda Joungle Clement', '', null, null, 78, 0],
      [162, 'TEMP008', 'Awatil Elia Saleh', '', 60, 96, 74, 93],
      [163, 'TEMP009', 'Sunday Wilson Lemi', '', 58, 60, 72, 67],
      [164, 'GH-083', 'Areng Abuot Manyang', 'Clinical Services', 57, 96, 72, 93],
      [165, 'GH-0391', 'Nelson Wani Alex Sokiri', 'Nurse', 55, 68, 70, 80],
      [166, 'TEMP010', 'Ganya Amos', '', 51, 60, 70, 67],
      [167, 'TEMP011', 'Emmanuella Juan Martin', '', 50, 68, 68, 80],
      [168, 'GH-0333', 'Madit Ngeny Wol', 'Clinical Services', 49, 60, 64, 67],
      [169, 'GH-0347', 'Akoc Achuil Ngor', 'Clinical Services', 48, 96, 62, 93],
      [170, 'GH-0392', 'Emmanuella John Francis', 'Nursing', 44, 60, 60, 67],
      [171, 'TEMP012', 'Meshcat Bashir Adam', '', 43, 92, 58, 87],
      [172, 'TEMP013', 'Khalda Garang Akot', '', 43, 96, 58, 93],
      [173, 'GH-0281', 'Suna Cireno Adaha', 'Nursing', null, null, 56, 0],
      [174, 'GH-0197', 'Susan Tingba Daniel', 'Nursing', 42, 68, 56, 80],
      [175, 'GH-0312', 'Mike Wuoi Achiek', 'Nursing', 42, 60, 54, 67],
      [176, 'GH-0353', 'Zuhur Omar', 'Nursing', 39, 68, 52, 80],
      [177, 'GH-0161', 'Martha Edward Kisanga', 'Nursing', 33, 60, 46, 67],
      [178, 'GH-0121', 'Rema Elias Angelo', 'Admission', 33, 96, 42, 93],
      [179, 'GH-0188', 'Firyal Ahmed', 'OR', 29, 68, 36, 80],
      [180, 'GH-0260', 'Maha Osman', 'OR', 25, 68, 32, 80]
    ];

    for (const row of data) {
      await sql`
        INSERT INTO training_results (id, staff_id, full_name, department, acls_theory_marks, acls_practical_marks, bls_theory_marks, bls_practical_marks)
        VALUES (${row[0]}, ${row[1]}, ${row[2]}, ${row[3]}, ${row[4]}, ${row[5]}, ${row[6]}, ${row[7]})
        ON CONFLICT (staff_id) DO NOTHING
      `;
    }
    console.log('✅ Data inserted!');

    // Verify data
    console.log('\n📊 Verifying data...');
    const count = await sql`SELECT COUNT(*) as count FROM training_results`;
    console.log(`✅ Total records: ${count[0].count}`);

    // Show sample records
    const sample = await sql`SELECT staff_id, full_name, department FROM training_results LIMIT 5`;
    console.log('\n📋 Sample records:');
    sample.forEach(record => {
      console.log(`  - ${record.staff_id}: ${record.full_name} (${record.department || 'N/A'})`);
    });

    console.log('\n✅ Import completed successfully!');
    console.log('\n🚀 Next steps:');
    console.log('1. Add DATABASE_URL to Vercel environment variables');
    console.log('2. Redeploy your Vercel project');
    console.log('3. Test with staff IDs like: GH-056, TEMP001, GH-0327');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

importData();
