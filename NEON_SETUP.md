# Neon PostgreSQL Setup Guide

## Step 1: Get Your Database Connection String

1. Go to your Neon project dashboard: https://console.neon.tech
2. Click on your project
3. Go to the **Dashboard** tab
4. Find the **Connection Details** section
5. Copy the **Connection string** (it looks like this):
   ```
   postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require
   ```

## Step 2: Create the Database Table

1. In your Neon dashboard, click on **SQL Editor**
2. Run this SQL to create your table:

```sql
CREATE TABLE training_results (
    id SERIAL PRIMARY KEY,
    staff_id VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    acls_theory_marks INTEGER NOT NULL,
    acls_practical_marks INTEGER NOT NULL,
    bls_theory_marks INTEGER NOT NULL,
    bls_practical_marks INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

3. Insert sample data (optional):

```sql
INSERT INTO training_results (staff_id, full_name, department, acls_theory_marks, acls_practical_marks, bls_theory_marks, bls_practical_marks)
VALUES 
    ('GH-0001', 'John Doe', 'Emergency', 85, 90, 88, 92),
    ('GH-0002', 'Jane Smith', 'ICU', 92, 95, 90, 94);
```

## Step 3: Migrate Your Existing Data (If you have MySQL data)

If you have existing data in your local MySQL database, you need to export and convert it:

### Export from MySQL:
```bash
mysqldump -u root -p training_results > training_results.sql
```

### Convert MySQL to PostgreSQL:
You'll need to manually adjust the SQL file:
- Change `AUTO_INCREMENT` to `SERIAL`
- Change backticks `` ` `` to double quotes `"`
- Adjust data types if needed

### Import to Neon:
Use the SQL Editor in Neon dashboard to paste and run your converted SQL.

## Step 4: Add Environment Variable to Vercel

1. Go to your Vercel project: https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** > **Environment Variables**
4. Add a new variable:
   - **Name**: `DATABASE_URL`
   - **Value**: Your Neon connection string (from Step 1)
   - **Environment**: Select all (Production, Preview, Development)
5. Click **Save**

## Step 5: Redeploy on Vercel

1. Go to **Deployments** tab
2. Click the three dots (...) on your latest deployment
3. Select **Redeploy**
4. Wait for deployment to complete

## Step 6: Test Your Application

Visit your Vercel URL and test with a staff ID from your database.

## Local Development Setup

Create a `.env.local` file in your project root:

```env
DATABASE_URL=postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require
```

Replace with your actual Neon connection string.

## Troubleshooting

### "Database configuration error"
- Verify `DATABASE_URL` is set in Vercel environment variables
- Check that the connection string is complete and correct

### "Connection timeout"
- Neon databases auto-pause after inactivity. First request may be slow.
- This is normal and subsequent requests will be fast.

### "Staff ID not found"
- Verify your data was imported correctly
- Check the SQL Editor in Neon to query your data

## Benefits of Neon

✅ **Free tier**: 0.5 GB storage  
✅ **Serverless**: Auto-scales and auto-pauses  
✅ **Fast**: Optimized for serverless functions  
✅ **Branching**: Create database branches for testing  
✅ **No connection limits**: Perfect for Vercel's serverless functions
