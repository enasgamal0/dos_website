<template>
  <div class="text-center bg-[url('/footer_bg.png')] px-5 lg:!px-0">
    <div class="pt-20 pb-6">
      <div @click="scrollTop" class="cursor-pointer">
        <img
          src="/white_logo.png"
          alt="Dos Logo"
          class="w-[87.3px] h-[72px] m-auto"
          data-aos="zoom-in"
        />
      </div>
    </div>
    <p class="text-white text-[18px] my-8 leading-[1.2]">
      {{ $t("FOOTER.desc") }}
    </p>
    <div class="flex justify-center gap-5 mb-10">
      <NuxtLink :to="google_play" target="_blank" external class="hover:scale-105 transition-all duration-300">
        <img
          src="/google_play.png"
          alt="Google Play"
          class="w-[209px] h-[60px]"
          data-aos="zoom-in"
        />
      </NuxtLink>
      <NuxtLink :to="app_store" target="_blank" external class="hover:scale-105 transition-all duration-300">
        <img src="/app_store.png" alt="App Store" class="w-[208px] h-[60px]" data-aos="zoom-in" />
      </NuxtLink>
    </div>
    <div class="text-white text-[16px]">
      <hr class="text-[#FFFFFF1A]" />
      <div class="flex justify-center items-center gap-2 py-5">
        <p>
          {{ $t("FOOTER.rightsReserved") }}
        </p>
        <span> @{{ new Date().getFullYear() }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
const localePath = useLocalePath();
const route = useRoute();
const router = useRouter();
const google_play = ref("");
const app_store = ref("");
const scrollTop = () => {
  if (route.path == localePath("/") || route.path == localePath("/en")) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    router.push(localePath("/"));
  }
};
onMounted(() => {
  google_play.value = localStorage.getItem("dos_social_google_play") || "";
  app_store.value = localStorage.getItem("dos_social_app_store") || "";
});
</script>
