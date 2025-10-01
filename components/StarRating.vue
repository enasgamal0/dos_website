<template>
  <div class="flex items-center gap-x-1 justify-center" dir="ltr">
    <button
      v-for="star in maxStars"
      :key="star"
      type="button"
      @mouseover="hoverValue = star"
      @mouseleave="hoverValue = 0"
      @click="setRating(star)"
      class="text-[50px] focus:outline-none transition-colors duration-150 cursor-pointer"
    >
      <span
        :class="
          star <= (hoverValue || modelValue)
            ? 'text-[#FFD700]'
            : 'text-[#DEDDDE]'
        "
      >
        ★
      </span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  maxStars: {
    type: Number,
    default: 5,
  },
});

const emit = defineEmits(["update:modelValue"]);
const hoverValue = ref(0);

function setRating(value) {
  emit("update:modelValue", value);
}
</script>
