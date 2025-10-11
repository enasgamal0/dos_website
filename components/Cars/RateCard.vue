<template>
  <div class="bg-[#FBFBFB] !p-2 rounded-xl min-h-[150px]">
    <div class="flex items-center !gap-2 border-[#EEEEEE] border-b-[1px] !pb-3">
      <img
        :src="rating?.image"
        :alt="rating?.name"
        class="size-[40px] rounded-full object-cover"
      />
      <div class="flex flex-col !gap-1 justify-center">
        <p class="font-[400] text-[12px] tetx-[#1C1C1C]">
          {{ rating?.name
          }}<span class="text-[#b8b8b8]"> ({{ rating?.rate }}%)</span>
        </p>
        <div class="flex">
          <img
            src="/star.svg"
            alt="star"
            class="size-[16px] object-contain"
            v-for="item in rating?.rate"
            :key="item"
          />
          <img
            src="/gray_star.svg"
            alt="star"
            class="size-[16px] object-contain"
            v-for="item in 5 - rating?.rate"
            :key="item"
          />
        </div>
      </div>
    </div>
    <div class="flex items-center gap-2 !pt-3 text-[#292929] text-[12px]">
      {{ rating?.comment }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  rating: {
    type: Object,
    required: true,
  },
});
</script>