<template>
  <div class="flex flex-wrap justify-center items-center gap-20 py-20 mx-8 lg:!mx-0">
    <div data-aos="zoom-in">
      <img
        src="/about.png"
        alt="About Dos"
        class="lg:!max-w-[549px] lg:!max-h-[374px]"
      />
    </div>
    <div class="w-[549px] h-[374px]">
      <h1 class="text-[35px] font-[700] text-[#121212] mb-3" data-aos="zoom-in">
        {{ $t("about.title") }}
      </h1>
      <h3 class="text-[24px] font-[600] text-[#525252] mb-8">
        {{ $t("about.subtitle") }}
      </h3>
      <p v-if="about && !loading" v-html="about"></p>
      <UIButtonLoader
        class="mx-auto !my-20"
        border-color="#000"
        v-if="loading"
      />
    </div>
  </div>
</template>
<script setup>
const about = ref(null);
const loading = ref(true);
const { locale } = useI18n();

onMounted(async () => {
  loading.value = true;
  try {
    about.value = await apiRequest(
      "GET",
      `/main/settings?key=about_app`,
      {},
      {},
      null,
      locale.value
    );
    about.value = about.value?.data[0]?.value?.description_local;
  } catch (error) {
    console.error("Failed to load advertisements:", error);
    about.value = null;
  } finally {
    loading.value = false;
  }
});
</script>
