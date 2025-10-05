<template>
  <div class="py-20 text-center mx-8 lg:!mx-0">
    <h1 class="text-[#121212] text-[35px] font-[700] mb-8" data-aos="fade-down">
      {{ $t("cars.title") }}
    </h1>

    <p class="text-[#525252] text-[18px]">{{ $t("cars.desc") }}</p>

    <div
      class="flex flex-col items-center justify-center max-w-[1170px] mx-auto mt-16"
      v-if="!loading && cars && cars?.length > 0"
    >
      <Swiper
        :key="swiperKey"
        @swiper="onSwiper"
        :slides-per-view="1"
        :breakpoints="{
          0: { slidesPerView: 1 },
          900: {
            slidesPerView: Math.min(2, cars?.length || 1),
          },
          1200: {
            slidesPerView: Math.min(3, cars?.length || 1),
          },
        }"
        :space-between="10"
        :modules="modules"
        :pagination="{ el: '.swiper-pagination2', clickable: true }"
        :autoplay="{ delay: 3500, disableOnInteraction: false }"
        :speed="800"
        :loop="cars?.length > 1"
        :observer="true"
        :observe-parents="true"
        :observe-slide-children="true"
        :update-on-window-resize="true"
        :resize-observer="true"
        class="w-full h-full"
      >
        <SwiperSlide
          v-for="(car, index) in cars"
          :key="car?.id || index"
          class="flex justify-center"
        >
          <CarCard :car="car" class="m-auto" data-aos="zoom-in" />
        </SwiperSlide>
      </Swiper>

      <!-- Pagination Dots -->
      <div
        class="swiper-pagination2 flex justify-center mt-6"
        v-if="showPagination"
      ></div>
    </div>

    <UIButtonLoader class="mx-auto !my-20" v-if="loading" />
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const modules = [Autoplay, Pagination];
const swiperKey = ref(0);
const swiperInstance = ref(null);
const cars = ref([]);
const loading = ref(true);
const { locale } = useI18n();
const windowWidth = ref(0);

const showPagination = computed(() => {
  if (loading.value || !cars.value) return false;
  const dataLength = cars.value.length;

  if (windowWidth.value < 900) return dataLength > 1;
  if (windowWidth.value < 1200) return dataLength > 2;
  return dataLength > 3;
});

const onSwiper = (swiper) => {
  swiperInstance.value = swiper;
};

const updateSwiper = () => {
  if (swiperInstance.value) {
    swiperInstance.value.update();
    swiperInstance.value.pagination.update();
  }
};

const handleResize = () => {
  windowWidth.value = window.innerWidth;
  swiperKey.value++;
  nextTick(() => updateSwiper());
};

onMounted(async () => {
  windowWidth.value = window.innerWidth;

  loading.value = true;
  try {
    const response = await apiRequest(
      "GET",
      `/main/vehicles?latest_vehicles=1`,
      {},
      {},
      null,
      locale.value
    );
    cars.value = response?.data ?? [];
  } catch (error) {
    console.error("Failed to load cars:", error);
    cars.value = [];
  } finally {
    loading.value = false;
    nextTick(() => updateSwiper());
  }

  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

watch(locale, () => {
  nextTick(() => updateSwiper());
});

watch(showPagination, () => {
  nextTick(() => updateSwiper());
});
</script>

<style scoped>
.swiper-pagination2 {
  display: flex;
  justify-content: center;
  gap: 2px;
  margin-top: 50px;
}

:deep(.swiper-pagination-bullet) {
  width: 8px;
  height: 8px;
  background: #807d7dd1;
  transition: all 0.3s;
  border-radius: 10px;
}

:deep(.swiper-pagination-bullet-active) {
  background: #121212;
  width: 32px;
}
</style>
