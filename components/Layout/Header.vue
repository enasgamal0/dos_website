<template>
  <div>
    <div
      class="bg-gradient-to-b from-[#272727] to-[#121212] flex justify-center items-center h-[48px] gap-2"
    >
      <p class="text-[#F7F7F7] text-[14px]">
        {{ $t("nav.top_nav1") }}
      </p>
      <p class="font-bold text-[#F7F7F7] text-[14px]">
        {{ $t("nav.top_nav2") }}
      </p>
    </div>
    <div
      class="flex justify-between items-center bg-white lg:!h-[96px] h-[64px] mx-4 md:mx-16 relative"
    >
      <div class="flex justify-between items-center">
        <NuxtLink
          :to="localePath('/')"
          class="cursor-pointer hover:scale-[1.02] transition duration-300 ease-in-out"
        >
          <img
            src="/logo.png"
            alt="Dos Logo"
            class="lg:!w-[77.5px] lg:!h-[64px] w-[50px] h-[40px]"
          />
        </NuxtLink>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden lg:!flex justify-center items-center gap-8">
        <NuxtLink
          :to="localePath('/')"
          class="text-[#303030] hover:scale-[1.02] transition duration-300 ease-in-out"
          exact-active-class="font-bold"
        >
          {{ $t("nav.home") }}
        </NuxtLink>
        <a
          :href="localePath('/#about')"
          class="text-[#303030] hover:scale-[1.02] transition duration-300 ease-in-out"
        >
          {{ $t("nav.about") }}
        </a>
        <a
          :href="localePath('/#why_us')"
          class="text-[#303030] hover:scale-[1.02] transition duration-300 ease-in-out"
        >
          {{ $t("nav.why_us") }}
        </a>
        <NuxtLink
          :to="localePath('/book_now')"
          class="text-[#303030] hover:scale-[1.02] transition duration-300 ease-in-out"
          exact-active-class="font-bold"
        >
          {{ $t("nav.book_now") }}
        </NuxtLink>
        <div
          class="text-[#303030] hover:scale-[1.02] transition duration-300 ease-in-out cursor-pointer"
          @click="openPrivacyPopup = true"
        >
          {{ $t("nav.privacy") }}
        </div>
      </div>

      <!-- Desktop Actions -->
      <div class="hidden lg:!flex justify-center items-center gap-3">
        <div>
          <BaseButton :content="$t('nav.download')" @click.prevent="openDownloadPopup = true" />
        </div>
        <div
          class="cursor-pointer hover:scale-[1.02] transition duration-300 ease-in-out"
          @click="changeLanguage"
        >
          <img
            src="/lang.png"
            alt="Change Language"
            class="w-[48px] h-[48px]"
          />
        </div>
      </div>

      <!-- Mobile Menu Button -->
      <button
        @click="toggleMenu"
        class="lg:hidden p-2 text-[#303030] hover:bg-gray-300 rounded-full transition cursor-pointer"
        aria-label="Toggle menu"
      >
        <svg
          v-if="!isMenuOpen"
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <svg
          v-else
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div
      v-show="isMenuOpen"
      class="lg:hidden bg-white overflow-hidden transition-all duration-300 h-[100vh]"
    >
      <div class="flex flex-col p-4 gap-4">
        <NuxtLink
          :to="localePath('/')"
          class="text-[#303030] hover:bg-gray-300 p-3 rounded-[25px] transition"
          exact-active-class="font-bold bg-gray-200"
          @click="closeMenu"
        >
          {{ $t("nav.home") }}
        </NuxtLink>
        <a
          :href="localePath('/#about')"
          class="text-[#303030] hover:bg-gray-300 p-3 rounded-[25px] transition"
          @click="closeMenu"
        >
          {{ $t("nav.about") }}
        </a>
        <a
          :href="localePath('/#why_us')"
          class="text-[#303030] hover:bg-gray-300 p-3 rounded-[25px] transition"
          @click="closeMenu"
        >
          {{ $t("nav.why_us") }}
        </a>
        <NuxtLink
          :to="localePath('/book_now')"
          class="text-[#303030] hover:bg-gray-300 p-3 rounded-[25px] transition"
          exact-active-class="font-bold bg-gray-50"
          @click="closeMenu"
        >
          {{ $t("nav.book_now") }}
        </NuxtLink>
        <div
          class="text-[#303030] hover:bg-gray-300 p-3 rounded-[25px] transition cursor-pointer"
          @click="closeMenu, openPrivacyPopup = true, toggleMenu()"
        >
          {{ $t("nav.privacy") }}
        </div>
        <div class="border-t pt-4 flex flex-col gap-3">
          <BaseButton :content="$t('nav.download')" @click.prevent="openDownloadPopup = true, toggleMenu()" />
          <button
            @click="changeLanguage"
            class="flex items-center gap-2 p-3 hover:bg-gray-300 rounded-[25px] transition cursor-pointer w-full h-[48px]"
          >
            <img
              src="/lang.png"
              alt="Change Language"
              class="w-[32px] h-[32px]"
            />
            <span class="text-[#303030]">{{
              locale === "ar" ? "English" : "العربية"
            }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <Popup
    :show="openPrivacyPopup"
    @close="openPrivacyPopup = false"
    type="privacy"
  />
  <Popup
    :show="openDownloadPopup"
    @close="openDownloadPopup = false"
    type="download"
  />
</template>

<script setup>
const localePath = useLocalePath();
const { locale, setLocale } = useI18n();
const openPrivacyPopup = ref(false);
const openDownloadPopup = ref(false);
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const changeLanguage = async () => {
  if (locale.value == "ar") {
    await setLocale("en");
  } else {
    await setLocale("ar");
  }
  closeMenu();
};

watch(isMenuOpen, (open) => {
  if (open) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});
</script>
