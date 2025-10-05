<template>
  <div
    class="bg-[url('/hero_bg.png')] bg-no-repeat bg-cover rounded-[50px] max-w-[1170px] xl:!mx-auto mx-3 my-16 text-white py-12 xl:!px-20 px-10 xl:flex items-center justify-center"
  >
    <div class="block xl:!hidden">
      <img
        src="/download_img.png"
        alt="Download Dos App"
        class="md:!h-[385px] md:!w-[346px] h-[250px] w-[220px] animate-[float_3s_ease-in-out_infinite] mx-auto mt-5 mb-8"
        data-aos="zoom-in"
        :class="locale == 'en' ? 'scale-x-[-1]' : ''"
      />
    </div>
    <div class="xl:max-w-[550px]">
      <h1 class="text-[35px] font-[700]" data-aos="zoom-in">
        {{ $t("download.title") }}
      </h1>
      <p class="text-[18px] font-[600] my-6 text-[#FFFFFFB2]">
        {{ $t("download.desc1") }}
      </p>
      <p class="text-[16px] my-1 text-[#FFFFFE]">{{ $t("download.desc2") }}</p>
      <p class="text-[16px] my-1 text-[#FFFFFE]">{{ $t("download.desc3") }}</p>
      <p class="text-[16px] font-[600] mt-2 mb-8 text-[#FFFFFE]">
        {{ $t("download.desc4") }}
      </p>
      <div class="flex gap-5 mb-10">
        <NuxtLink
          :to="app_store" target="_blank" external
          class="hover:scale-105 transition-all duration-300"
        >
          <img
            src="/app_store.png"
            alt="App Store"
            class="w-[208px] h-[60px] cursor-pointer"
            data-aos="zoom-in"
          />
        </NuxtLink>
        <NuxtLink
          :to="app_store" target="_blank" external
          class="hover:scale-105 transition-all duration-300"
        >
          <img
            src="/google_play.png"
            alt="Google Play"
            class="w-[209px] h-[60px] cursor-pointer"
            data-aos="zoom-in"
          />
        </NuxtLink>
      </div>
    </div>
    <div class="hidden xl:!block">
      <img
        src="/download_img2.png"
        alt="Download Dos App"
        class="w-[450px] h-[385px] animate-[float_3s_ease-in-out_infinite]"
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
<style>
@layer utilities {
  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-15px);
    }
  }
}
</style>
