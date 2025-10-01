<template>
  <div
    class="bg-[url('/hero_bg.png')] bg-no-repeat bg-cover lg:flex justify-between items-center rounded-b-[20px]"
  >
    <div class="lg:!p-24 p-8 lg:!w-1/2 w-full">
      <h1 class="text-white text-[35px] font-[700]" data-aos="zoom-out">
        {{ $t("hero.title") }}
      </h1>
      <p class="text-white text-[18px] my-8">
        {{ $t("hero.desc") }}
      </p>
      <BaseButton
        :content="$t('hero.button')"
        icon="/btn_arrow.png"
        :width="265"
        :bgColor="`bg-[#fff]`"
        :color="`text-[#000]`"
      />
    </div>
    <div
      class="bg-[url('/hero_bg2.png')] bg-no-repeat lg:!p-24 p-8 lg:!w-1/2 w-full"
      :class="locale == 'en' ? 'scale-x-[-1]' : ''"
    >
      <img
        src="/hero_car.png"
        alt="Hero Car"
        class="w-[640px] max-h-[304px] animate-[float_3s_ease-in-out_infinite]"
        data-aos="zoom-in"
      />
    </div>
  </div>
</template>
<script setup>
const { locale } = useI18n();
</script>
