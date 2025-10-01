<template>
  <div>
    <img
      v-if="img"
      alt="No Result"
      :src="img"
      class="w-[154px] h-[120px] mx-auto my-12"
      data-aos="zoom-out"
    />
    <img
      v-else
      alt="No Result"
      src="/no_result.png"
      class="w-[167px] h-[160px] mx-auto my-12"
      data-aos="zoom-out"
    />
    <div class="my-12">
      <h1
        class="lg:!text-[24px] text-[18px] font-[700] text-[#202020] text-center"
        data-aos="zoom-in"
      >
        {{ title || $t("filters.no_result") }}
      </h1>
      <p
        class="lg:!text-[16px] text-[14px] text-[#202020] text-center mt-5"
        data-aos="zoom-in"
        v-if="description"
      >
        {{ description }}
      </p>
      <NuxtLink v-if="link && link_text" :to="link">
        <BaseButton
          :content="link_text"
          border-color="#E77C5A"
          bg-color="#4B007D"
          width="200px"
          class="m-auto !mb-2 z-50 !mt-8"
          lg_space="true"
          font_size="16px"
        />
      </NuxtLink>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  img: {
    type: String,
    default: "",
  },
  link: {
    type: String,
    default: "",
  },
  link_text: {
    type: String,
    default: "",
  },
});
</script>
