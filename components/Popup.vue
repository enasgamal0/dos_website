<template>
  <div
    v-if="show"
    class="fixed inset-0 z-500 flex items-center justify-center bg-[#00000055] p-0 lg:!p-20"
    @click="handleClickOutside"
  >
    <div
      ref="modalRef"
      class="relative w-full bg-white bg-no-repeat mx-5 max-h-[80vh] overflow-y-auto"
      :class="
        type == 'download' ? 'max-w-[920px] rounded-[25px]' : 'max-w-3xl p-6'
      "
      style="background-position: top 0 right 0, bottom 0 left 0"
      data-aos="zoom-in"
    >
      <!-- Close Button -->
      <button
        class="absolute top-0 text-white bg-[#FA0000] h-[40px] w-[40px] text-[16px] font-[700] cursor-pointer"
        :class="locale == 'en' ? 'right-0' : 'left-0'"
        @click="emit('close')"
        v-if="type !== 'download'"
      >
        ✕
      </button>
      <!-- Title -->
      <h2
        class="text-center text-[24px] font-[700] mb-8"
        v-if="type === 'privacy'"
      >
        {{ $t("static_pages.privacy") }}
      </h2>

      <!-- Image -->
      <div class="flex justify-center mb-[24px]">
        <img
          v-if="type == 'privacy'"
          src="/privacy.png"
          alt="Privacy Icon"
          class="w-[120px] h-[120px]"
        />
      </div>

      <!-- Content -->
      <div
        class="text-start text-[16px] font-[400] h-[calc(80vh-300px)] overflow-y-auto px-5 lg:px-16 max-h-[calc(80vh-300px)]"
        v-if="!loading && type == 'privacy'"
      >
        <div v-html="privacy"></div>
      </div>
      <UIButtonLoader
        class="mx-auto !my-20"
        border-color="#000"
        v-if="loading"
      />
      <div v-if="type == 'download'">
        <div class="md:flex justify-center">
          <img
            src="/download_popup2.png"
            alt="Dos App"
            class="w-[317px] h-[353px] self-end block md:!hidden m-auto"
          />
          <div class="md:!w-[488px] w-full p-[40px]">
            <h2 class="text-[24px] font-[700] mb-[24px]">
              {{ $t("static_pages.download") }}
            </h2>
            <p class="text-[#54514F] text-[16px]">
              {{ $t("static_pages.download_desc1") }}
            </p>
            <p class="text-[#54514F] text-[16px]">
              {{ $t("static_pages.download_desc2") }}
            </p>
            <p class="text-[#54514F] text-[16px]">
              {{ $t("static_pages.download_desc3") }}
            </p>
            <div class="flex justify-center lg:!justify-start gap-3 mt-7">
              <NuxtLink
                :to="app_store"
                target="_blank"
                external
                class="hover:scale-105 transition-all duration-300"
              >
                <img
                  src="/app_store_black.png"
                  alt="App Store"
                  class="w-[207px] h-[60px]"
                />
              </NuxtLink>
              <NuxtLink
                :to="app_store"
                target="_blank"
                external
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
          <img
            src="/download_popup.png"
            alt="Dos App"
            class="w-[391px] h-[353px] self-end hidden md:!block"
          />
        </div>
      </div>
      <!-- Title -->
      <h2
        class="text-center text-[24px] font-[700] mb-8"
        v-if="type === 'golden_guarantee'"
      >
        {{ $t("vechile.golden_guarantee") }}
      </h2>

      <!-- Image -->
      <div
        class="flex justify-center mb-[24px]"
        v-if="type == 'golden_guarantee'"
      >
        <img src="/star.png" alt="Golden Guarantee" class="w-[64px] h-[64px]" />
      </div>

      <div v-if="type == 'golden_guarantee'">
        <p class="text-[16px] text-[#202020] text-center w-[80%] mx-auto mb-5">
          {{ $t("vechile.golden_guarantee_content") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const { locale } = useI18n();
const props = defineProps({
  show: Boolean,
  type: String,
});
const emit = defineEmits(["close"]);
const modalRef = ref(null);
const loading = ref(true);
const privacy = ref(null);
const google_play = ref("");
const app_store = ref("");
const handleClickOutside = (e) => {
  e.stopPropagation();
  if (modalRef.value && !modalRef.value.contains(e.target)) {
    emit("close");
  }
};

watch(
  () => props.show,
  async (visible) => {
    if (!process.client) return;

    document.body.classList.toggle("overflow-hidden", visible);

    if (visible) {
      loading.value = true;
      if (props.type === "privacy") {
        try {
          const response = await apiRequest(
            "GET",
            "/main/settings?key=privacy_policy",
            {},
            {},
            null,
            locale.value
          );
          privacy.value = response?.data[0]?.value?.description_local;
        } catch (err) {
          console.error("Failed to fetch privacy policy:", err);
        }
      }
      loading.value = false;
    }
  },
  { immediate: true }
);
onMounted(() => {
  google_play.value = localStorage.getItem("dos_social_google_play") || "";
  app_store.value = localStorage.getItem("dos_social_app_store") || "";
});
onUnmounted(() => {
  if (process.client) {
    document.body.classList.remove("overflow-hidden");
  }
});
</script>
