<template>
  <div
    class="my-20 bg-no-repeat m-6 p-6"
    style="
      /* background-image: url('/slider_top.png'), url('/slider_bottom.png'); */
      background-position: top 0 right 0, bottom 0 left 0;
    "
  >
    <!-- <img
      alt="Not Found"
      src="/not_found.png"
      class="w-[343px] h-[200px] m-auto"
      data-aos="zoom-in"
    /> -->
    <div class="text-center text-[#202020] mt-8">
      <h1 class="text-[24px] font-bold mb-5">{{ $t("error.not_found") }}</h1>
      <p class="text-[16px]">{{ $t("error.not_found_desc") }}</p>
    </div>
    <div class="flex justify-center">
      <NuxtLink :to="localePath('/')" class=" w-[200px]">
      <BaseButton
        :content="$t('auth.go_to_home')"
        border-color="#E77C5A"
        bg-color="#4B007D"
        class="!mt-12 !mb-8 z-50 m-auto text-[18px]"
        :lg_reversed_space="true"
        font_size="18px"
      />
    </NuxtLink>
    </div>
  </div>
</template>