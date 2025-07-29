// ----- FIREBASE -----
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 🔐 Your Firebase credentials
const firebaseConfig = {
  apiKey: "AIzaSyDTDb7QGOM2dkw2g36_G3dfjg-zDkjd9Zw",
  authDomain: "coffee-20975.firebaseapp.com",
  projectId: "coffee-20975",
  storageBucket: "coffee-20975.appspot.com",
  messagingSenderId: "947150292179",
  appId: "1:947150292179:web:1948c0ac47deda07a50026",
  measurementId: "G-YKB1V60D66"
};

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
