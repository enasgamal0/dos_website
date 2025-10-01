<template>
  <div class="py-20 text-center mx-8 lg:!mx-0">
    <h1 class="text-[#121212] text-[35px] font-[700] mb-8" data-aos="fade-down">
      {{ $t("branches.title") }}
    </h1>
    <p class="text-[#525252] text-[18px]">{{ $t("branches.desc") }}</p>

    <div
      class="flex flex-col items-center justify-center max-w-[1170px] mx-auto mt-16"
      v-if="!loading && branches && branches?.length > 0"
    >
      <Swiper
        :key="swiperKey"
        @swiper="onSwiper"
        :slides-per-view="1"
        :breakpoints="{
          0: { slidesPerView: 1 },
          900: {
            slidesPerView: Math.min(3, branches?.length || 1),
          },
          1200: {
            slidesPerView: Math.min(5, branches?.length || 1),
          },
        }"
        :space-between="10"
        :modules="modules"
        :pagination="{ el: '.swiper-pagination1', clickable: true }"
        :autoplay="{ delay: 3500, disableOnInteraction: false }"
        :speed="800"
        :loop="branches?.length > 1"
        :observer="true"
        :observe-parents="true"
        :observe-slide-children="true"
        :update-on-window-resize="true"
        :resize-observer="true"
        class="w-full h-full"
      >
        <SwiperSlide
          v-for="(branch, index) in branches"
          :key="branch?.id || index"
          class="flex justify-center"
        >
          <div class="relative w-[214px] h-[240px] m-auto">
            <img
              src="/flag_container.png"
              alt="Branch"
              class="w-[214px] h-[240px]"
            />
            <div class="absolute top-15 left-[82px]">
              <img
                :src="branch?.icon"
                :alt="branch?.name"
                class="w-[50px] h-[50px] rounded-full"
                data-aos="zoom-in"
              />
            </div>
            <div class="absolute top-[170px] text-center w-full">
              <p class="text-white text-[20px] font-bold text-center">
                {{ branch?.name }}
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <!-- Pagination Dots -->
      <div
        class="swiper-pagination1 flex justify-center mt-6"
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
const branches = ref(null);
const loading = ref(true);
const { locale } = useI18n();
const windowWidth = ref(0);

const showPagination = computed(() => {
  if (loading.value || !branches.value) return false;
  const dataLength = branches.value.length;

  if (windowWidth.value < 900) return dataLength > 1;
  if (windowWidth.value < 1200) return dataLength > 3;
  return dataLength > 5;
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
      `/main/countries-has-branches?limit=0&page=0`,
      {},
      {},
      null,
      locale.value
    );
    branches.value = response?.data ?? [];
  } catch (error) {
    console.error("Failed to load branches:", error);
    branches.value = [];
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
.swiper-pagination1 {
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
