<template>
  <div>
    <img
      alt="No Result"
      src="/no_result.png"
      class="w-[275px] h-[234px] mx-auto my-12"
      data-aos="zoom-out"
    />
    <div class="mt-[32px] mb-[80px]">
      <h1
        class="lg:!text-[24px] text-[18px] font-[700] text-[#121212] text-center"
        data-aos="zoom-in"
      >
        {{ $t("filters.no_result") }}
      </h1>
      <p
        class="lg:!text-[18px] text-[16px] text-[#525252] text-center mt-[16px] mx-5"
        data-aos="zoom-in"
      >
        {{ $t("filters.no_result_desc") }}
      </p>
    </div>
  </div>
</template>
<script setup>
</script>
