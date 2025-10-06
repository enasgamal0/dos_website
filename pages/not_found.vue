<template>
  <div
    class="my-20 bg-no-repeat m-6 p-6"
    style="
      /* background-image: url('/slider_top.png'), url('/slider_bottom.png'); */
      background-position: top 0 right 0, bottom 0 left 0;
    "
  >
    <img
      alt="Not Found"
      src="/not_found.png"
      class="w-[480px] h-[246px] m-auto"
      data-aos="zoom-in"
    />
    <div class="text-center text-[#202020] mt-[32px]">
      <h1 class="text-[24px] font-bold mb-[16px]">
        {{ $t("error.not_found") }}
      </h1>
      <p class="text-[18px] text-[#525252] mb-[10px]">
        {{ $t("error.not_found_desc1") }}
      </p>
      <p class="text-[18px] text-[#525252]">
        {{ $t("error.not_found_desc2") }}
      </p>
    </div>
    <div class="flex justify-center">
      <NuxtLink :to="localePath('/')" class="w-[200px]">
        <div class="mt-[32px]">
          <button
            class="bg-[#121212] text-[#fff] py-[13.5px] w-full rounded-[31px] !cursor-pointer hover:scale-101 transition-all duration-300"
          >
            {{ $t("error.back_to_home") }}
          </button>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
