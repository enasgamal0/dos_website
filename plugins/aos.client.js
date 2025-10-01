import { defineNuxtPlugin } from '#app'
import AOS from 'aos';
import 'aos/dist/aos.css';

export default defineNuxtPlugin((nuxtApp) => {
  if (typeof window !== 'undefined') {
    // Initialize AOS
    nuxtApp.AOS = AOS.init({
      once: false,
      disable: 'mobile',
      duration: 800
    });

    // Re-initialize AOS on route change
    nuxtApp.hook('page:finish', () => {
      AOS.refresh();
    });
  }
});
