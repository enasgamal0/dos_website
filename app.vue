<template>
  <div :dir="locale == 'en' ? 'ltr' : 'rtl'">
    <NuxtLoadingIndicator color="#4B007D" />
    <NuxtLayout name="default">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
const { locale } = useI18n();
const contact = ref(null);
const loading = ref(true);
onMounted(async () => {
  loading.value = true;
  try {
    contact.value = await apiRequest(
      "GET",
      `/main/settings?key=contact`,
      {},
      {},
      null,
      locale.value
    );
    contact.value = contact.value?.data[0]?.value;
    localStorage.setItem("dos_social_address", contact.value?.address);
    localStorage.setItem("dos_social_phone", contact.value?.mobile);
    localStorage.setItem("dos_social_email", contact.value?.email);
    localStorage.setItem("dos_social_google_play", contact.value?.google_play);
    localStorage.setItem("dos_social_app_store", contact.value?.app_store);
  } catch (error) {
    console.error("Failed to load contact:", error);
    contact.value = null;
  } finally {
    loading.value = false;
  }
});

useHead({
  title: "Dos | دوس",
});
</script>
<style>
@media only screen and (max-width: 480px) {
  [data-aos] {
    opacity: 1 !important;
    transform: translate(0) scale(1) !important;
  }
}
</style>
