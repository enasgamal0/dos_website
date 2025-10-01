<template>
  <div class="text-center bg-[url('/hero_bg.png')] bg-cover bg-center bg-no-repeat py-20 px-5 lg:px-0">
    <h1 class="font-[700] text-[35px] text-white mb-6" data-aos="fade-down">{{ $t("why_us.title") }}</h1>
    <p class="text-[18px] text-white mb-16">{{ $t("why_us.desc") }}</p>
    <div class="flex flex-wrap justify-center items-start gap-12">
      <div v-for="item in items" :key="item.title" class="w-[250px]">
        <img :src="item.img" alt="Why Dos" class="w-[80px] h-[80px] m-auto" data-aos="zoom-in" />
        <h2 class="font-[600] text-[24px] text-[#EEECEC] my-5">{{ item.title }}</h2>
        <p class="text-[16px] text-[#EEECEC]">{{ item.desc }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
const { t } = useI18n();
const items = [
  {
    title: t("why_us.title1"),
    desc: t("why_us.desc1"),
    img: "/why1.png",
  },
  {
    title: t("why_us.title2"),
    desc: t("why_us.desc2"),
    img: "/why2.png",
  },
  {
    title: t("why_us.title3"),
    desc: t("why_us.desc3"),
    img: "/why3.png",
  },
  {
    title: t("why_us.title4"),
    desc: t("why_us.desc4"),
    img: "/why4.png",
  },
];
</script>
