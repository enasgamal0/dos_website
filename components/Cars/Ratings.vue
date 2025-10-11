<template>
  <div class="!space-y-4">
    <div class="flex !gap-2 items-center !mt-5">
      <img src="/edit.svg" alt="edit" />
      <h3 class="text-[16px] text-[#121212] font-bold">
        {{ t("vechile.customer_reviews") }}
      </h3>
    </div>

    <Swiper
      v-if="!loading && ratings && ratings?.length > 0"
      :key="swiperKey"
      @swiper="onSwiper"
      :slides-per-view="1"
      :breakpoints="{
        0: { slidesPerView: 1 },
        900: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 3,
        },
      }"
      :space-between="10"
      :modules="modules"
      :pagination="{ el: '.swiper-pagination4', clickable: true }"
      :autoplay="{ delay: 3500, disableOnInteraction: false }"
      :speed="800"
      :loop="ratings?.length > 1"
      :observer="true"
      :observe-parents="true"
      :observe-slide-children="true"
      :update-on-window-resize="true"
      :resize-observer="true"
      class="w-full h-full"
    >
      <SwiperSlide
        v-for="(rating, index) in ratings"
        :key="rating?.id || index"
      >
        <CarsRateCard :rating="rating" />
      </SwiperSlide>
    </Swiper>

    <!-- Pagination Dots -->
    <div
      class="swiper-pagination4 flex justify-center mt-6"
      v-if="ratings?.length > 1"
    ></div>
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
const windowWidth = ref(0);
const { t, locale } = useI18n();
const props = defineProps({
  ratings: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
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

const showPagination = computed(() => {
  if (!props.ratings) return false;
  const dataLength = props.ratings.length;

  if (windowWidth.value < 900) return dataLength > 1;
  if (windowWidth.value < 1200) return dataLength > 3;
  return dataLength > 5;
});

const handleResize = () => {
  windowWidth.value = window.innerWidth;
  swiperKey.value++;
  nextTick(() => updateSwiper());
};

onMounted(() => {
  windowWidth.value = window.innerWidth;
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
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
.swiper-pagination4 {
  display: flex;
  justify-content: center;
  gap: 2px;
  margin-top: 16px;
  margin-bottom: 16px;
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
