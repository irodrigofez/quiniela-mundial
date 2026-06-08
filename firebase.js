
// ============================================================
//  PASO 1: Pega aquí las credenciales de tu proyecto Firebase
//  Firebase Console → Tu proyecto → Configuración → Tu app web
// ============================================================
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey:            "AIzaSyCs7F9UxBcGjrmO61WRrpCI42ki8cNR3TY",
  authDomain:        "quiniela-mundial-2026-5a929.firebaseapp.com",
  databaseURL:       "https://quiniela-mundial-2026-5a929-default-rtdb.firebaseio.com",   // ← MUY IMPORTANTE
  projectId:         "quiniela-mundial-2026-5a929",
  storageBucket:     "quiniela-mundial-2026-5a929.firebasestorage.app",
  messagingSenderId: "1092124533973",
  appId:             "1:1092124533973:web:967cbe877bc340d1b96e5c",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);