# Deployment Instructions for Vercel

## Issue: 404 NOT_FOUND Error

The 404 error you're experiencing is because the application requires a database connection, but Vercel's serverless environment cannot connect to `localhost`.

## Solution

You need to set up a cloud database and configure environment variables in Vercel.

### Step 1: Choose a Cloud Database Provider

Select one of these MySQL-compatible database services:

1. **PlanetScale** (Recommended - Free tier available)
   - Visit: https://planetscale.com
   - Create a free account
   - Create a new database
   - Get connection details

2. **Railway** (Easy setup)
   - Visit: https://railway.app
   - Create MySQL database
   - Get connection details

3. **AWS RDS** (Enterprise option)
   - Set up MySQL instance
   - Configure security groups

### Step 2: Migrate Your Database

Export your local database and import it to your cloud database:

```bash
# Export from XAMPP (local)
mysqldump -u root -p training_results > training_results.sql

# Import to cloud database (use your cloud database credentials)
mysql -h YOUR_CLOUD_HOST -u YOUR_USER -p YOUR_DATABASE < training_results.sql
```

### Step 3: Configure Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** > **Environment Variables**
3. Add the following variables:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `DB_HOST` | Your cloud database host | Production, Preview, Development |
| `DB_USER` | Your database username | Production, Preview, Development |
| `DB_PASSWORD` | Your database password | Production, Preview, Development |
| `DB_NAME` | `training_results` | Production, Preview, Development |
| `DB_PORT` | `3306` (or your database port) | Production, Preview, Development |

### Step 4: Redeploy

After adding environment variables:

1. Go to **Deployments** tab in Vercel
2. Click on the three dots (...) next to your latest deployment
3. Select **Redeploy**
4. Wait for the deployment to complete

### Step 5: Verify

Visit your Vercel deployment URL and test the application.

## Local Development

For local development, create a `.env.local` file in the project root:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=training_results
DB_PORT=3306
```

This file is gitignored and won't be committed to your repository.

## Troubleshooting

### Still getting 404?
- Verify all environment variables are set correctly in Vercel
- Check Vercel function logs for errors
- Ensure your cloud database is accessible (not behind a firewall)

### Database connection errors?
- Verify your cloud database credentials
- Check if your database allows connections from Vercel's IP ranges
- Some providers require SSL connections - check your provider's documentation

## Security Notes

- Never commit database credentials to your repository
- Use strong passwords for production databases
- Restrict database access to only necessary IP addresses
- Consider using connection pooling for better performance
