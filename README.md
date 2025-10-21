# Dashboard Gabungan Manajemen Proyek dan Monitoring Data

Website ini adalah Dashboard Gabungan Manajemen Proyek dan Monitoring Data dengan dua peran pengguna yaitu Admin dan Sales yang diatur menggunakan Firebase Authentication dan Firestore.

## 🚀 Fitur Utama

### 🔐 Autentikasi
- Login dan Register dengan Firebase Authentication
- Role-based access (Admin & Sales)
- Protected routes berdasarkan role user

### 📊 Dashboard Admin
- Ringkasan progress proyek dan monitoring data
- Sidebar navigation: Dashboard, Progress Proyek, Business Development, Incident Management, Form Lisensi, User Management
- CRUD operations untuk data proyek
- User management dengan role assignment

### 📈 Dashboard Sales
- Target dan hasil penjualan dengan grafik
- Sidebar navigation: Dashboard Sales, User Management
- Management data penjualan dan riwayat

## 🛠️ Tech Stack
- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Icons**: Lucide React
- **Notifications**: React Toastify
- **Hosting**: Firebase Hosting

## 📦 Installation

1. Clone repository:
```bash
git clone <repository-url>
cd fan-projecttracker
```

2. Install dependencies:
```bash
npm install
```

3. Setup Firebase:
   - Buat project di [Firebase Console](https://console.firebase.google.com)
   - Aktifkan Authentication (Email/Password)
   - Aktifkan Firestore Database
   - Copy configuration dan update `src/firebase.js`

4. Update Firebase Configuration:
```javascript
// src/firebase.js
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

5. Update `.firebaserc`:
```json
{
  "projects": {
    "default": "your-project-id"
  }
}
```

## 🚀 Development

Jalankan development server:
```bash
npm run dev
```

Build untuk production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 🌐 Deployment ke Firebase Hosting

1. Install Firebase CLI (jika belum):
```bash
npm install -g firebase-tools
```

2. Login ke Firebase:
```bash
firebase login
```

3. Build aplikasi:
```bash
npm run build
```

4. Deploy ke Firebase Hosting:
```bash
firebase deploy
```

## 📁 Struktur Folder
```
src/
├── components/
│   └── ProtectedRoute.jsx
├── pages/
│   ├── Login.jsx
│   ├── RegisterAdmin.jsx
│   ├── RegisterSales.jsx
│   ├── DashboardAdmin.jsx
│   └── DashboardSales.jsx
├── context/
│   └── AuthContext.jsx
├── services/
├── firebase.js
├── App.jsx
├── main.jsx
└── index.css
```

## 🔑 Role & Permissions

### Admin Role
- Akses ke `/dashboard-admin`
- CRUD operations untuk semua data
- User management
- Project management
- Incident management

### Sales Role
- Akses ke `/dashboard-sales`
- Management data penjualan
- View reports dan analytics
- Basic user management

## 🎯 Roadmap

### Phase 1 ✅ (Current)
- [x] Setup Firebase & Authentication
- [x] Basic routing & protected routes
- [x] Login/Register pages
- [x] Basic admin & sales dashboards
- [x] Tailwind CSS styling

### Phase 2 (Next)
- [ ] Firestore CRUD operations
- [ ] Project management features
- [ ] Sales data management
- [ ] User management interface
- [ ] Form validations

### Phase 3 (Future)
- [ ] Charts & analytics (Chart.js/Recharts)
- [ ] File upload & storage
- [ ] Real-time notifications
- [ ] Advanced filtering & search
- [ ] Export/Import features

## 🤝 Contributing

1. Fork the project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
