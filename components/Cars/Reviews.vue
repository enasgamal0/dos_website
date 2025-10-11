<template>
  <div class="bg-[#FBFBFB] rounded-[20px] !p-3 !space-y-2">
    <div class="flex !gap-2">
      <div
        class="bg-[#272727] rounded-md !p-1 size-[40px] flex items-center justify-center"
      >
        <p class="text-white text-[16px] font-medium">
          {{ reviews.avg }}
        </p>
      </div>
      <div class="flex flex-col !gap-1 justify-center">
        <p class="text-[16px] font-medium text-[#121212]">{{ reviews.comment }}</p>
        <p class="text-[#606060] text-[12px] font-[300]">
          {{ reviews.num }} {{ $t("vechile.evaluation") }}
        </p>
      </div>
    </div>
    <div
      class="bg-white rounded-lg !p-2 flex items-center justify-between !space-y-1"
      v-for="item in items"
      :key="item.id"
    >
      <p class="text-[16px] text-[#414141]">{{ item.title }}</p>
      <div class="text-[#000000] bg-[#FBFBFB] rounded-lg !p-1 flex items-center justify-center text-[16px] font-bold">
        {{ item.rate }}
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n();
defineProps({
  reviews: {
    type: Object,
    required: true,
  },
});

const items = [
  {
    id: 1,
    title: t("vechile.item_1"),
    rate: 6.4,
  },
  {
    id: 2,
    title: t("vechile.item_2"),
    rate: 5.4,
  },
  {
    id: 3,
    title: t("vechile.item_3"),
    rate: 8.3,
  },
  {
    id: 4,
    title: t("vechile.item_4"),
    rate: 7.8,
  },
  {
    id: 5,
    title: t("vechile.item_5"),
    rate: 5.6,
  },
];
</script>
