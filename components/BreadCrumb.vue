<template>
  <div
    class="bg-[url('/hero_bg.png')] bg-cover bg-center bg-no-repeat min-h-[167px] text-center pt-[40px] pb-[20px] bread_crumb"
  >
    <h1
      class="lg:!text-[32px] text-[24px] font-[800] text-white max-w-[86%] break-words m-auto"
      data-aos="fade-down"
    >
      {{ title }}
    </h1>
    <div
      class="flex items-center justify-center text-white gap-5 max-w-[86%] m-auto !mt-4"
      data-aos="fade-up"
    >
      <NuxtLink
        v-if="prev"
        :to="localePath(`${link}`)"
        class="text-[16px] font-[400] hover:text-[#E77C5A]"
      >
        {{ prev }}
      </NuxtLink>
      <img
        v-if="current || current_link"
        src="/arrow.png"
        alt="arrow"
        class="w-[24px] h-[24px]"
        :class="locale == 'en' ? 'rotate-180' : ''"
      />
      <span v-if="current" class="text-[16px] font-[700]">{{ current }}</span>
      <NuxtLink
        v-if="current_link"
        :to="localePath(`${link2}`)"
        class="text-[16px] hover:text-[#E77C5A]"
        >{{ current_link }}</NuxtLink
      >
      <span
        v-if="desc"
        class="text-[16px] font-[400] w-[80%] md:!w-[60%] mb-5 lg:!mb-0"
        >{{ desc }}</span
      >
    </div>
  </div>
</template>
<script setup>
const { locale } = useI18n();
defineProps({
  title: {
    type: String,
    default: "",
  },
  current: {
    type: String,
    default: "",
  },
  current_link: {
    type: String,
    default: "",
  },
  prev: {
    type: String,
    default: "",
  },
  desc: {
    type: String,
    default: "",
  },
  link: {
    type: String,
    default: "/",
  },
  link2: {
    type: String,
    default: "",
  },
});
</script>
