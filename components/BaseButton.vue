<template>
  <div
    class="hover:scale-[1.02] transition duration-300 ease-in-out rounded-[25px]"
    :class="pending ? 'cursor-not-allowed' : 'cursor-pointer'"
    :style="`width: ${width}px;`"
  >
    <button
      class="flex items-center font-[700] group rounded-[25px]"
      :class="[pending ? 'cursor-not-allowed' : 'cursor-pointer', bgColor, color]"
      :style="`width: ${width}px;`"
      :disabled="pending"
    >
      <div
        v-if="pending"
        class="flex justify-center items-center gap-3 px-3 h-[48px] m-auto"
      >
        <UIButtonLoader />
      </div>
      <div
        v-else
        class="flex justify-center items-center gap-3 px-3 h-[48px] m-auto"
      >
        <img v-if="icon" :alt="content" :src="icon" class="w-[24px] h-[24px]" />
        <span>{{ content }}</span>
      </div>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default: "",
  },
  pending: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: "164",
  },
  bgColor: {
    type: String,
    default: "bg-gradient-to-b from-[#272727] to-[#121212]",
  },
  color: {
    type: String,
    default: "text-white",
  },
});
</script>
