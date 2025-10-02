<template>
  <div class="py-20 text-center mx-8 lg:!mx-0">
    <h1 class="text-[#121212] text-[35px] font-[700] mb-8" data-aos="fade-down">{{ $t("cars.title") }}</h1>
    <p class="text-[#525252] text-[18px]">{{ $t("cars.desc") }}</p>
    <div>
      <CarCard />
    </div>
  </div>
</template>
<script setup>
const { locale } = useI18n();
const loading = ref(true);
const cars = ref([]);

onMounted(async () => {
  loading.value = true;
  try {
    cars.value = await apiRequest(
      "GET",
      `/main/vehicles?latest_vehicles=1`,
      {},
      {},
      null,
      locale.value
    );
    cars.value = cars.value?.data;
  } catch (error) {
    console.error("Failed to load contact:", error);
    cars.value = [];
  } finally {
    loading.value = false;
  }
});
</script>