<template>
  <div
    class="rounded-[20px] bg-[#F9F9F9] w-[296px] h-[287px] p-[16px] hover:border-black hover:border-[1px]"
  >
    <div class="relative">
      <div
        class="absolute top-0 left-0 bg-[linear-gradient(180deg,#272727_0%,#121212_99.99%)] rounded-[4px] p-[2px] w-[24px] h-[24px] text-white text-[12px] flex items-center justify-center"
      >
        8.0
      </div>
    </div>
    <div>
      <img src="/carrr.png" alt="Car Image" class="max-h-[131px] max-w-[247px] m-auto" />
    </div>
    <div class="flex justify-between">
      <div class="flex gap-2">
        <h1 class="text-black text-[18px] font-[600]">بي ام دبليو</h1>
        <span class="text-[#606060] text-[18px]">2024</span>
      </div>
      <div>
        <h1 class="text-[#121212] text-[20px] font-[600]">500</h1>
        <div class="flex">
          <p class="text-[#929292] text-[10px]">ريال</p>
          <p class="text-[#929292] text-[10px]">/</p>
          <p class="text-[#121212] text-[10px]">5</p>
          <p class="text-[#929292] text-[10px]">أيام</p>
        </div>
      </div>
    </div>
    <div class="flex justify-between items-center mt-6">
      <div>
        <h1 class="text-[16px] font-[500]">S** R***</h1>
        <span class="text-[#606060] text-[12px]">فرد</span>
      </div>
      <NuxtLink : class="flex items-center">
        <div class="text-[#121212] font-[500] text-[10px]">عرض التفاصيل</div>
        <img
          src="/arrow_left.png"
          alt="Show Details"
          class="w-[12px] h-[12px]"
        />
      </NuxtLink>
    </div>
  </div>
</template>
<script setup></script>
