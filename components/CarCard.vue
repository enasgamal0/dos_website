<template>
  <div
    class="rounded-[20px] bg-[#F9F9F9] w-[296px] h-[287px] pb-[16px] hover:border-black hover:border-[1px]"
  >
    <div class="relative">
      <div
        class="z-[20] absolute top-[16px] left-[16px] bg-[linear-gradient(180deg,#272727_0%,#121212_99.99%)] rounded-[4px] p-[2px] w-[24px] h-[24px] text-white text-[12px] flex items-center justify-center"
      >
        {{ props?.car?.vehicle_evaluation?.rating?.average }}
      </div>
    </div>
    <div>
      <img
        :src="props?.car?.vehicle_images[0]?.url"
        alt="Car Image"
        class="h-[140px] w-full m-auto rounded-t-[20px] object-cover"
      />
    </div>
    <div class="flex justify-between items-center mt-3 px-[16px]">
      <div class="flex gap-2 items-center justify-center">
        <h1 class="text-black text-[18px] font-[600]">
          {{ props?.car?.vehicle_model?.vehicle_brand?.name }}
        </h1>
        <span class="text-[#606060] text-[18px]">{{
          props?.car?.model_year
        }}</span>
      </div>
      <div>
        <h1 class="text-[#121212] text-[20px] font-[600]">
          {{ props?.car?.duration_in_days }}
        </h1>
        <div class="flex items-center justify-center gap-1">
          <p class="text-[#929292] text-[10px]">{{ $t("cars.currency") }}</p>
          <p class="text-[#929292] text-[10px]">/</p>
          <p class="text-[#121212] text-[10px]">
            {{ props?.car?.price_for_selected_days }}
          </p>
          <p class="text-[#929292] text-[10px]">{{ $t("cars.days") }}</p>
        </div>
      </div>
    </div>
    <div class="flex justify-between items-center mt-6 px-[16px]">
      <div class="text-start">
        <h1 class="text-[16px] font-[500]">
          {{
            props?.car?.provider?.exhibitor_name
              ?.split(" ")
              .map((word) => word[0] + "*".repeat(word.length - 1))
              .join(" ")
          }}
        </h1>
        <span class="text-[#606060] text-[12px]">{{
          props?.car?.provider?.exhibitor_type_trans
        }}</span>
      </div>
      <NuxtLink to="/cars/1" class="flex items-center justify-center hover:underline">
        <div class="text-[#121212] font-[500] text-[10px]">{{ $t("cars.showDetails") }}</div>
        <img
          src="/arrow_left.png"
          alt="Show Details"
          class="w-[12px] h-[12px] mx-1"
          :class="locale === 'en' ? 'rotate-180 mb-1' : ''"
        />
      </NuxtLink>
    </div>
  </div>
</template>
<script setup>
const { locale } = useI18n();
const props = defineProps({
  car: {
    type: Object,
    required: true,
  },
});
</script>
