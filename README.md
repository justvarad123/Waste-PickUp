# Sell / Dispose Anything — Doorstep AI Waste & Item Pickup (Jath, Sangli)

Doorstep waste pickup and circular disposition platform serving Jath, Sangli District, Maharashtra. Powered by Google Gemini AI for instant item identification, scrap valuation, doorstep pickup scheduling, and instant UPI/cash payouts.

---

## 🚀 Deploy to Render

This repository is pre-configured with a Render Blueprint (`render.yaml`) for 1-click deployment.

### Method 1: Automatic Blueprint Deployment (Recommended)

1. **Push this repo to GitHub** (via AI Studio's **Settings > Export to GitHub** or git CLI).
2. Go to your [Render Dashboard](https://dashboard.render.com).
3. Click **New +** and select **Blueprint**.
4. Connect your GitHub repository. Render will automatically detect `render.yaml`.
5. Under Environment Variables, add your **`GEMINI_API_KEY`**.
6. Click **Apply**. Render will automatically build and launch the application.

---

### Method 2: Manual Web Service Setup on Render

If you prefer configuring the Web Service manually:

1. In the [Render Dashboard](https://dashboard.render.com), click **New +** > **Web Service**.
2. Connect your GitHub repository.
3. Configure the following settings:
   - **Name**: `sell-dispose-anything-jath`
   - **Environment / Runtime**: `Node`
   - **Branch**: `main` (or your default branch)
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Under **Environment Variables**, add:
   - `NODE_VERSION` = `22.14.0`
   - `NODE_ENV` = `production`
   - `PORT` = `3000`
   - `GEMINI_API_KEY` = *your Google Gemini API key*
5. Click **Create Web Service**.

---

## 🛠 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Lint codebase
npm run lint

# Build production bundle
npm run build

# Start production server
npm start
```

---

## 📦 Project Architecture

- **Frontend**: React 19, Vite, Tailwind CSS v4, Lucide Icons, Motion
- **Backend**: Express (Node.js) with Google Gemini AI (`@google/genai`)
- **SSR Route**: `/ssr/rates` for pre-rendered scrap & recycling price tables
- **Accessibility**: WCAG AA compliant (44px touch targets, screen-reader landmarks, high-contrast palette)
- **Performance**: Dynamic code-splitting, tree-shaking, Rollup manual chunking, and live Core Web Vitals telemetry
