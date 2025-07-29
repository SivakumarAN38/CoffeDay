// ----- FIREBASE -----
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 🔐 Your Firebase credentials
const firebaseConfig = {
  apiKey: "YOUR_NEW_API_KEY_HERE",
  authDomain: "YOUR_NEW_AUTH_DOMAIN_HERE",
  projectId: "YOUR_NEW_PROJECT_ID_HERE",
  storageBucket: "YOUR_NEW_STORAGE_BUCKET_HERE",
  messagingSenderId: "YOUR_NEW_MESSAGING_SENDER_ID_HERE",
  appId: "YOUR_NEW_APP_ID_HERE"
};

firebase.initializeApp(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ----- FORM SUBMIT -----
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  formStatus.textContent = "Submitting...";

  const formData = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    message: document.getElementById('message').value.trim()
  };

  try {
    await addDoc(collection(db, "submissions"), formData);
    formStatus.textContent = "Message sent successfully!";
    contactForm.reset();
  } catch (err) {
    console.error("Firebase Error:", err);
    formStatus.textContent = "Failed to submit: " + err.message;
  }
});
