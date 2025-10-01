<template>
</template>

<script setup>
const router = useRouter();
const localePath = useLocalePath();
const error = useError();

onMounted(() => {
  if (error.value && error.value.statusCode === 404) {
    router.replace(localePath("/not_found"));
  }
});
</script>