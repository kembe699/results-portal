# 🚀 Quick Start - Deploy to Vercel with Neon

## ✅ What's Already Done
- ✅ Neon PostgreSQL driver installed
- ✅ API route updated for PostgreSQL
- ✅ Your data converted to PostgreSQL format

## 📋 Next Steps (5 minutes)

### 1️⃣ Import Data to Neon (2 min)

1. Open Neon Console: https://console.neon.tech
2. Select your project
3. Click **SQL Editor** tab
4. Open the file: `scripts/training_results_postgresql.sql`
5. Copy ALL the content
6. Paste into Neon SQL Editor
7. Click **Run** button
8. ✅ You should see: "30 rows inserted"

### 2️⃣ Get Connection String (1 min)

1. In Neon, go to **Dashboard** tab
2. Find **Connection Details** section
3. Copy the **Connection string** (looks like):
   ```
   postgresql://username:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require
   ```
4. Keep this handy for next step

### 3️⃣ Add to Vercel (1 min)

1. Go to: https://vercel.com/dashboard
2. Click your project
3. Go to: **Settings** → **Environment Variables**
4. Click **Add New**
5. Enter:
   - **Name**: `DATABASE_URL`
   - **Value**: Paste your Neon connection string
   - **Environment**: Check all three boxes (Production, Preview, Development)
6. Click **Save**

### 4️⃣ Redeploy (1 min)

1. Go to **Deployments** tab
2. Find your latest deployment
3. Click the **three dots (...)** → **Redeploy**
4. Wait ~30 seconds for deployment

### 5️⃣ Test! 🎉

Visit your Vercel URL and test with any staff ID:
- `GH-056` (Laat Peter Puondak)
- `GH-0327` (Filberto Ponis Mboru)
- `TEMP001` (Martin Pitia Hilliary)

## 🔧 Local Development

To run locally with Neon:

1. Create `.env.local` file:
   ```env
   DATABASE_URL=your_neon_connection_string_here
   ```

2. Run dev server:
   ```bash
   npm run dev
   ```

## ❓ Troubleshooting

**"Database configuration error"**
- Check that `DATABASE_URL` is set in Vercel
- Verify the connection string is complete

**"Staff ID not found"**
- Make sure you ran the SQL import in Neon
- Check data exists: Run `SELECT * FROM training_results LIMIT 5;` in Neon SQL Editor

**Still getting 404?**
- Wait 1-2 minutes after redeploying
- Check Vercel function logs for errors
- Verify environment variable is set for "Production"

## 📚 More Info

- Full setup guide: `NEON_SETUP.md`
- Deployment guide: `DEPLOYMENT.md`

---

**Total time: ~5 minutes** ⏱️
