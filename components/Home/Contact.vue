<template>
  <div class="flex items-center justify-center">
    <div>
      <div
        class="bg-[#F7F7F7] rounded-[20px] w-[362px] h-[234px] m-5 bg-[url('/contact_bg.png')] bg-no-repeat bg-bottom-right flex items-center justify-center text-center"
        v-if="address && address != 'null'"
      >
        <div>
          <img
            src="/contact_address.png"
            alt="Address"
            class="w-[40px] h-[40px] m-auto"
          />
          <p class="text-[16px] text-[#454545] my-3">
            {{ $t("contact.address") }}
          </p>
          <p class="text-[16px] text-[#121212] font-bold">{{ address }}</p>
        </div>
      </div>
      <div
        class="bg-[#F7F7F7] rounded-[20px] w-[362px] h-[234px] m-5 bg-[url('/contact_bg.png')] bg-no-repeat bg-bottom-right flex items-center justify-center text-center"
        v-if="email && email != 'null'"
      >
        <div>
          <img
            src="/contact_email.png"
            alt="Address"
            class="w-[40px] h-[40px] m-auto"
          />
          <p class="text-[16px] text-[#454545] my-3">
            {{ $t("contact.email") }}
          </p>
          <NuxtLink
            :to="`mailto:${email}`"
            class="text-[16px] text-[#121212] font-bold"
          >
            {{ email }}
          </NuxtLink>
        </div>
      </div>
      <div
        class="bg-[#F7F7F7] rounded-[20px] w-[362px] h-[234px] m-5 bg-[url('/contact_bg.png')] bg-no-repeat bg-bottom-right flex items-center justify-center text-center"
        v-if="phone && phone != 'null' && phone != '[]'"
      >
        <div>
          <img
            src="/contact_phone.png"
            alt="Address"
            class="w-[40px] h-[40px] m-auto"
          />
          <p class="text-[16px] text-[#454545] my-3">
            {{ $t("contact.phone_number") }}
          </p>
          <div v-for="phone in phone?.split(',')" class="mb-2">
            <NuxtLink
              :to="`tel:${phone}`"
              class="text-[16px] text-[#121212] font-bold"
            >
              {{ phone }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const address = ref("");
const phone = ref("");
const email = ref("");

onMounted(() => {
  address.value = localStorage.getItem("dos_social_address") || "";
  phone.value = localStorage.getItem("dos_social_phone") || "";
  email.value = localStorage.getItem("dos_social_email") || "";
});
</script>
