# SIH Frontend

This repo contains the **frontend, backend, and shared modules** for the SIH project.  
It is built with **React + Vite + Tailwind (TypeScript)** on the client side and includes server and shared modules for backend and common logic.

---

## 🧰 Project Structure

```
/               # Root of repo
├── client/     # React + Vite + Tailwind frontend
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── components/
│   │   └── index.css
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── package.json
│
├── server/     # Backend / API code
│   ├── src/
│   ├── tsconfig.json
│   └── package.json
│
├── shared/     # Shared utilities, types, constants
│   └── ...
│
├── drizzle.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json          # Root TS config
├── package.json           # Root scripts/dependencies
└── README.md
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/cooder05/sih-frontend.git
cd sih-frontend
```

### 2. Install dependencies (root)
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Install dependencies for each module
For **client** (frontend):
```bash
cd client
npm install
npm run dev
```

For **server** (backend):
```bash
cd ../server
npm install
npm run dev
```

If you make changes in **shared/**, both client and server may need to be restarted.

---

## 🛠 Available Scripts

### From `client/`
- `npm run dev` → start frontend in development mode  
- `npm run build` → build frontend for production  
- `npm run preview` → preview built frontend  

### From `server/`
- `npm run dev` → start backend in development mode  
- (add other scripts as needed for server)

---

## 🎨 Tailwind CSS

- Config file: `tailwind.config.ts`  
- PostCSS setup: `postcss.config.js`  
- Global styles are in `client/src/index.css` with Tailwind directives:  
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

---

## 📦 Build & Deployment

Frontend build:
```bash
cd client
npm run build
```

The output will be generated in `client/dist/`.

Server build (if applicable):
```bash
cd server
npm run build
```

---

## 🧾 Notes

- TypeScript configs:  
  - `tsconfig.json` → root settings  
  - `tsconfig.node.json` (if present) → Vite/node specific  
- Shared code should be imported from `shared/` into both client and server.  
- Database/ORM setup is defined in `drizzle.config.ts`.  

---

## 📄 License

MIT
