<template>
  <div
    class="lg:flex items-center justify-center rounded-[50px] max-w-[1170px] xl:!mx-auto mx-3 my-16 text-white xl:!px-20 px-10 bg-[#F7F7F7] gap-20 bg-[url('/cars_bg.png')] bg-no-repeat bg-bottom-left pt-12"
  >
    <div class="max-w-[439px] block lg:!hidden mb-7">
      <img
        src="/car.png"
        alt="Car"
        data-aos="zoom-in"
        :class="locale == 'en' ? 'scale-x-[-1]' : ''"
      />
    </div>
    <div class="max-w-[530px]">
      <h1 class="text-[#121212] text-[35px] font-[700]" data-aos="fade-down">
        {{ $t("provider_download.title") }}
      </h1>
      <p class="text-[#525252] text-[18px] mt-7">
        {{ $t("provider_download.desc") }}
      </p>
      <div
        class="flex justify-center lg:!justify-start gap-3 mt-7 mb-12 pb-10 lg:!pb-0"
      >
        <NuxtLink
          :to="app_store" target="_blank" external
          class="hover:scale-105 transition-all duration-300"
        >
          <img
            src="/app_store_black.png"
            alt="App Store"
            class="w-[207px] h-[60px]"
          />
        </NuxtLink>
        <NuxtLink
          :to="app_store" target="_blank" external
          class="hover:scale-105 transition-all duration-300"
        >
          <img
            src="/google_play_black.png"
            alt="Google Play"
            class="w-[207px] h-[60px]"
          />
        </NuxtLink>
      </div>
    </div>
    <div class="max-w-[439px] hidden lg:!block">
      <img
        src="/car.png"
        alt="Car"
        data-aos="zoom-in"
        :class="locale == 'en' ? 'scale-x-[-1]' : ''"
      />
    </div>
  </div>
</template>
<script setup>
const { locale } = useI18n();
const google_play = ref("");
const app_store = ref("");
onMounted(() => {
  google_play.value = localStorage.getItem("dos_social_google_play") || "";
  app_store.value = localStorage.getItem("dos_social_app_store") || "";
});
</script>
