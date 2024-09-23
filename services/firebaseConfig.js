// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configuração do Firebase (substitua com as suas credenciais)
const firebaseConfig = {
  apiKey: "AIzaSyAm0OUa0LQZonSggsN2FwL5utNqK44fUuU",
  authDomain: "techlearn-5e347.firebaseapp.com",
  projectId: "techlearn-5e347",
  storageBucket: "techlearn-5e347.appspot.com",
  messagingSenderId: "245186807993",
  appId: "1:245186807993:web:e0139066f5e31eae6c3368"
};

// Inicializa o Firebase
let app;
let auth;
let firestore;
let storage;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  firestore = getFirestore(app);
  storage = getStorage(app);

  console.log('Firebase inicializado com sucesso');
} catch (error) {
  console.error('Erro ao inicializar o Firebase:', error);
}

// Exporta as instâncias para uso em outras partes do aplicativo
export { auth, firestore, storage };
