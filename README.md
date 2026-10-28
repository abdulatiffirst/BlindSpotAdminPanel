# Blind Spot admin

## Setup
1. `npm install`
2. Copy `.env.example` to `.env` and fill in your Firebase web app config.
3. Firebase console: enable Authentication > Email/Password and create your admin user.
4. Paste `firestore.rules` into Firestore > Rules (replace `YOUR_ADMIN_EMAIL`).
5. `npm run dev`

## Structure
```
src/
  app/          App.jsx (providers + routes)
  config/       firebase.js, materials.js (pages, categories, fixed tags)
  styles/       theme.js, GlobalStyle.js
  utils/        small shared helpers
  components/ui shared UI kit (Button, Form, Modal), import from '@/components/ui'
  layouts/      AdminLayout.jsx (sidebar + <Outlet />)
  features/
    auth/       AuthContext, ProtectedRoute, LoginPage
    materials/  api (Firestore), useMaterials, validate, form, table, page
```

## Growing the project
- New IELTS/SAT-style page: add an entry to `PAGES` in `config/materials.js`. Sidebar and routes follow automatically.
- New admin section (e.g. scholarships): copy `features/materials/` to `features/<name>/`, add a collection in its `api.js`, then add a `<Route>` in `app/App.jsx` and a link in `layouts/AdminLayout.jsx`.
- Keep Firestore calls inside each feature's `api.js`; components never import `firebase/firestore` directly.
