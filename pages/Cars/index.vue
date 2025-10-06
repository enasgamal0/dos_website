<template>
  <div>
    <BreadCrumb
      :title="$t('bread_crumb.vechiles')"
      :prev="$t('bread_crumb.home')"
      :current="$t('bread_crumb.vechiles')"
    />
    <CarsFilters />
  </div>
</template>
<script setup></script>
