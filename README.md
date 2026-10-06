# SEEKANA — Modern & Premium eCommerce Website

A complete, minimalist, and responsive eCommerce website for **SEEKANA**, designed with Odoo Website + Odoo eCommerce functional architecture.

---

## 🚀 Deploying to GitHub Pages

This project is pre-configured for **GitHub Pages** deployment with:
1. `base: './'` in `vite.config.ts` for relative asset loading.
2. `.github/workflows/deploy.yml` for automated GitHub Actions CI/CD deployment.
3. `public/.nojekyll` and `public/404.html` for clean asset serving and SPA routing.

### Step 1: Push your code to a GitHub repository

If you haven't pushed this code to GitHub yet, run the following in your terminal:

```bash
# 1. Initialize git (if not already initialized)
git init
git add .
git commit -m "Initial commit of SEEKANA eCommerce store"

# 2. Link your GitHub repository (replace with your repo URL)
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git

# 3. Push to GitHub
git push -u origin main
```

---

### Step 2: Enable GitHub Pages in your Repository Settings

1. On GitHub, go to your repository.
2. Click **Settings** (tab at the top).
3. In the left sidebar, click **Pages** (under the "Code and automation" section).
4. Under **Build and deployment** > **Source**, select **GitHub Actions**.
5. That's it! GitHub will automatically trigger the workflow in `.github/workflows/deploy.yml`.

Your website will be live in ~1-2 minutes at:
`https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME/`

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview build locally
npm run preview
```
