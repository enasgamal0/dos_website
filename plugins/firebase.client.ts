// import { initializeApp } from "firebase/app";
// import { getMessaging, onMessage } from "firebase/messaging";

// export default defineNuxtPlugin((nuxtApp) => {
//   //   const firebaseConfig = {
//   //       apiKey: "AIzaSyBVC7UKtp3Uu8gy8Ox0msa1xIc6iq_HHVU",
//   //       authDomain: "dos.firebaseapp.com",
//   //       projectId: "dos",
//   //       storageBucket: "dos.firebasestorage.app",
//   //       messagingSenderId: "1091208139473",
//   //       appId: "1:1091208139473:web:b0a2faaf38b986b541ebf0",
//   //       measurementId: "G-EWW0F1WHSC"
//   //     };

//   // // Initialize Firebase
//   // const app = initializeApp(firebaseConfig);

//   // let messaging = null;

//   // // Only initialize messaging if service workers are supported
//   // if (typeof window !== "undefined" && "serviceWorker" in navigator) {
//   //   try {
//   //     messaging = getMessaging(app);

//   //     onMessage(messaging, (payload) => {
//   //       console.log("Message received:", payload);
//   //     });
//   //   } catch (err) {
//   //     console.warn("Firebase Messaging is not supported in this browser:", err);
//   //   }
//   // } else {
//   //   console.warn("Service workers not supported - skipping Firebase Messaging");
//   // }

//   // return {
//   //   provide: {
//   //     messaging,
//   //   },
//   // };
// });
