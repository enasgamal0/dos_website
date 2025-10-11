<template>
  <div class="mx-[98px] my-[80px]">
    <div>
      <div class="flex flex-wrap justify-between mb-[20px]">
        <p class="text-[#121212] text-[14px] mb-2">
          {{ $t("filters.enter_Data") }}
        </p>
        <div class="flex gap-2 mb-2">
          <Switch
            v-model="enabled"
            as="template"
            v-slot="{ checked }"
            class="cursor-pointer"
          >
            <button
              class="relative inline-flex h-[22px] w-[45px] items-center rounded-full"
              :class="checked ? 'bg-[#34A853]' : 'bg-[#A5A5A5]'"
            >
              <span
                :class="[
                  'inline-block h-4 w-4 transform rounded-full bg-white transition',
                  locale === 'ar'
                    ? checked
                      ? 'translate-x-[-25px]'
                      : 'translate-x-[-3px]'
                    : checked
                    ? 'translate-x-[25px]'
                    : 'translate-x-[3px]',
                ]"
                dir="ltr"
              />
            </button>
          </Switch>
          <p class="text-[#121212] text-[14px] font-[700]">
            {{ $t("filters.same_location") }}
          </p>
        </div>
      </div>
      <div
        class="grid grid-cols-1 md:!grid-cols-2 gap-[12px]"
        :class="enabled ? 'xl:!grid-cols-2' : 'xl:!grid-cols-4'"
      >
        <!-- Pick Up -->
        <div>
          <label class="mb-[4px] block text-[#121212] text-[14px] font-[500]">{{
            $t("filters.pickup_location")
          }}</label>
          <Listbox v-model="selectedCountry">
            <div class="relative">
              <ListboxButton
                class="border-[0.8px] border-[#B6B6B6] min-w-[277px] w-full py-[16px] px-[12px] rounded-[12px] text-start cursor-pointer flex justify-between items-center"
              >
                <div class="flex items-center gap-[4px]">
                  <img
                    src="/location.png"
                    alt="Pickup Country"
                    class="w-[16px] h-[16px]"
                  />
                  <span
                    v-if="!selectedCountry"
                    class="text-[#B6B6B6] text-[14px]"
                    >{{ $t("filters.select_country") }}</span
                  >
                  <p v-else class="text-[14px]">{{ selectedCountry?.name }}</p>
                </div>
                <div class="flex items-center gap-2">
                  <button
                    v-if="selectedCountry"
                    type="button"
                    @click.stop="
                      () => {
                        selectedCountry = '';
                        selectedCity = '';
                        handleChange('');
                        handleBlur();
                      }
                    "
                    class="text-[#a2a2a2] cursor-pointer text-[14px]"
                  >
                    ✕
                  </button>
                  <img
                    alt="arrow"
                    src="/arrow_down.png"
                    class="w-[16px] h-[16px]"
                  />
                </div>
              </ListboxButton>
              <ListboxOptions
                class="absolute mt-1 max-h-60 overflow-auto bg-white rounded-md shadow z-10 min-w-[277px] w-full"
              >
                <ListboxOption
                  v-for="country in countries"
                  :key="country.id"
                  :value="country"
                  v-slot="{ active, selected }"
                >
                  <li
                    :class="[
                      active ? 'bg-[#dbdbdb]' : 'text-gray-900',
                      'cursor-pointer select-none py-2 px-4',
                    ]"
                    class="text-[14px]"
                    @click="
                      () => {
                        if (country.id !== selectedCountry?.id) {
                          cities = [];
                          selectedCity = '';
                        }
                      }
                    "
                  >
                    {{ country.name }}
                    <span
                      v-if="selected"
                      class="float-right text-[#525252] me-1"
                      >✔</span
                    >
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </div>
          </Listbox>
        </div>
        <div>
          <label class="mb-[4px] block text-[14px] invisible font-[500]"
            >&nbsp;</label
          >
          <Listbox v-model="selectedCity">
            <div class="relative">
              <ListboxButton
                class="border-[0.8px] border-[#B6B6B6] min-w-[277px] w-full py-[16px] px-[12px] rounded-[12px] text-start flex justify-between items-center"
                :class="
                  selectedCountry?.cities?.length == 0 || !selectedCountry
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer'
                "
              >
                <div class="flex items-center gap-[4px]">
                  <img
                    src="/city.png"
                    alt="Pickup City"
                    class="w-[16px] h-[16px]"
                  />
                  <span
                    v-if="!selectedCity"
                    class="text-[#B6B6B6] text-[14px]"
                    >{{ $t("filters.select_city") }}</span
                  >
                  <p v-else class="text-[14px]">{{ selectedCity?.name }}</p>
                </div>
                <div class="flex items-center gap-2">
                  <button
                    v-if="selectedCity"
                    type="button"
                    @click.stop="
                      () => {
                        selectedCity = '';
                        handleChange('');
                        handleBlur();
                      }
                    "
                    class="text-[#a2a2a2] cursor-pointer text-[14px]"
                  >
                    ✕
                  </button>
                  <img
                    alt="arrow"
                    src="/arrow_down.png"
                    class="w-[16px] h-[16px]"
                  />
                </div>
              </ListboxButton>
              <ListboxOptions
                class="absolute mt-1 max-h-60 overflow-auto bg-white rounded-md shadow z-10 min-w-[277px] w-full"
              >
                <ListboxOption
                  v-for="city in selectedCountry?.cities"
                  :key="city.id"
                  :value="city"
                  v-slot="{ active, selected }"
                >
                  <li
                    :class="[
                      active ? 'bg-[#dbdbdb]' : 'text-gray-900',
                      'cursor-pointer select-none py-2 px-4',
                    ]"
                    class="text-[14px]"
                  >
                    {{ city.name }}
                    <span
                      v-if="selected"
                      class="float-right text-[#525252] me-1"
                      >✔</span
                    >
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </div>
          </Listbox>
        </div>
        <!-- Drop Off -->
        <div v-if="!enabled">
          <label class="mb-[4px] block text-[#121212] text-[14px] font-[500]">{{
            $t("filters.dropoff_location")
          }}</label>
          <Listbox v-model="selectedCountryDrop">
            <div class="relative">
              <ListboxButton
                class="border-[0.8px] border-[#B6B6B6] min-w-[277px] w-full py-[16px] px-[12px] rounded-[12px] text-start cursor-pointer flex justify-between items-center"
              >
                <div class="flex items-center gap-[4px]">
                  <img
                    src="/location.png"
                    alt="Pickup Country"
                    class="w-[16px] h-[16px]"
                  />
                  <span
                    v-if="!selectedCountryDrop"
                    class="text-[#B6B6B6] text-[14px]"
                    >{{ $t("filters.select_country") }}</span
                  >
                  <p v-else class="text-[14px]">
                    {{ selectedCountryDrop?.name }}
                  </p>
                </div>
                <div class="flex items-center gap-2">
                  <button
                    v-if="selectedCountryDrop"
                    type="button"
                    @click.stop="
                      () => {
                        selectedCountryDrop = '';
                        selectedCityDrop = '';
                        handleChange('');
                        handleBlur();
                      }
                    "
                    class="text-[#a2a2a2] cursor-pointer text-[14px]"
                  >
                    ✕
                  </button>
                  <img
                    alt="arrow"
                    src="/arrow_down.png"
                    class="w-[16px] h-[16px]"
                  />
                </div>
              </ListboxButton>
              <ListboxOptions
                class="absolute mt-1 max-h-60 overflow-auto bg-white rounded-md shadow z-10 min-w-[277px] w-full"
              >
                <ListboxOption
                  v-for="country in countries"
                  :key="country.id"
                  :value="country"
                  v-slot="{ active, selected }"
                >
                  <!-- Make cities = [], selectedCity = '' on click only if country value changed -->
                  <li
                    :class="[
                      active ? 'bg-[#dbdbdb]' : 'text-gray-900',
                      'cursor-pointer select-none py-2 px-4',
                    ]"
                    class="text-[14px]"
                    @click="
                      () => {
                        if (country.id !== selectedCountryDrop?.id) {
                          citiesDrop = [];
                          selectedCityDrop = '';
                        }
                      }
                    "
                  >
                    {{ country.name }}
                    <span
                      v-if="selected"
                      class="float-right text-[#525252] me-1"
                      >✔</span
                    >
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </div>
          </Listbox>
        </div>
        <div v-if="!enabled">
          <label class="mb-[4px] block text-[14px] invisible font-[500]"
            >&nbsp;</label
          >
          <Listbox v-model="selectedCityDrop">
            <div class="relative">
              <ListboxButton
                class="border-[0.8px] border-[#B6B6B6] min-w-[277px] w-full py-[16px] px-[12px] rounded-[12px] text-start flex justify-between items-center"
                :class="
                  selectedCountryDrop?.cities?.length == 0 ||
                  !selectedCountryDrop
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer'
                "
              >
                <div class="flex items-center gap-[4px]">
                  <img
                    src="/city.png"
                    alt="Pickup City"
                    class="w-[16px] h-[16px]"
                  />
                  <span
                    v-if="!selectedCityDrop"
                    class="text-[#B6B6B6] text-[14px]"
                    >{{ $t("filters.select_city") }}</span
                  >
                  <p v-else class="text-[14px]">{{ selectedCityDrop?.name }}</p>
                </div>
                <div class="flex items-center gap-2">
                  <button
                    v-if="selectedCityDrop"
                    type="button"
                    @click.stop="
                      () => {
                        selectedCityDrop = '';
                        handleChange('');
                        handleBlur();
                      }
                    "
                    class="text-[#a2a2a2] cursor-pointer text-[14px]"
                  >
                    ✕
                  </button>
                  <img
                    alt="arrow"
                    src="/arrow_down.png"
                    class="w-[16px] h-[16px]"
                  />
                </div>
              </ListboxButton>
              <ListboxOptions
                class="absolute mt-1 max-h-60 overflow-auto bg-white rounded-md shadow z-10 min-w-[277px] w-full"
              >
                <ListboxOption
                  v-for="city in selectedCountryDrop?.cities"
                  :key="city.id"
                  :value="city"
                  v-slot="{ active, selected }"
                >
                  <li
                    :class="[
                      active ? 'bg-[#dbdbdb]' : 'text-gray-900',
                      'cursor-pointer select-none py-2 px-4',
                    ]"
                    class="text-[14px]"
                  >
                    {{ city.name }}
                    <span
                      v-if="selected"
                      class="float-right text-[#525252] me-1"
                      >✔</span
                    >
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </div>
          </Listbox>
        </div>
      </div>
      <!-- Pick Up Date -->
      <div
        class="grid grid-cols-1 md:!grid-cols-2 xl:!grid-cols-4 gap-[12px] my-[12px]"
      >
        <div>
          <label class="mb-[4px] block text-[#121212] text-[14px] font-[500]">{{
            $t("filters.pickup_date")
          }}</label>
          <div class="date_picker_container">
            <div
              class="border-[0.8px] border-[#B6B6B6] rounded-[12px] px-[12px] flex items-center justify-between min-w-[277px] bg-white"
            >
              <img
                src="/calendar-2.png"
                alt="calendar"
                class="w-[16px] h-[16px]"
              />
              <VueDatePicker
                v-model="pickupDate"
                :enable-time-picker="false"
                :auto-apply="true"
                :format="formatDate"
                :placeholder="$t('filters.date_placeholder')"
                :class="[
                  locale === 'ar' ? 'datepicker-rtl' : 'datepicker-ltr',
                  'flex-1 text-center border-none focus:ring-0 outline-none',
                ]"
                input-class="!border-none !shadow-none !bg-transparent !text-[14px]"
              />
              <img src="/calendar.png" alt="arrow" class="w-[16px] h-[16px]" />
            </div>
          </div>
        </div>
        <div>
          <label class="mb-[4px] block text-[#121212] text-[14px] font-[500]">{{
            $t("filters.dropoff_date")
          }}</label>
          <div class="date_picker_container">
            <div
              class="border-[0.8px] border-[#B6B6B6] rounded-[12px] px-[12px] flex items-center justify-between min-w-[277px] bg-white"
            >
              <img
                src="/calendar-2.png"
                alt="calendar"
                class="w-[16px] h-[16px]"
              />
              <VueDatePicker
                v-model="dropoffDate"
                :enable-time-picker="false"
                :auto-apply="true"
                :format="formatDate"
                :placeholder="$t('filters.date_placeholder')"
                :class="[
                  locale === 'ar' ? 'datepicker-rtl' : 'datepicker-ltr',
                  'flex-1 text-center border-none focus:ring-0 outline-none',
                ]"
                input-class="!border-none !shadow-none !bg-transparent !text-[14px]"
              />
              <img src="/calendar.png" alt="arrow" class="w-[16px] h-[16px]" />
            </div>
          </div>
        </div>
        <div>
          <label class="mb-[4px] block text-[#121212] text-[14px] font-[500]">{{
            $t("filters.time_from")
          }}</label>
          <div class="date_picker_container">
            <div
              class="border-[0.8px] border-[#B6B6B6] rounded-[12px] px-[12px] flex items-center justify-between min-w-[277px] bg-white"
            >
              <img src="/timer.png" alt="calendar" class="w-[16px] h-[16px]" />
              <VueDatePicker
                v-model="timeFrom"
                time-picker
                :auto-apply="false"
                :close-on-auto-apply="true"
                :enable-seconds="false"
                :hide-navigation="false"
                :placeholder="$t('filters.time_placeholder')"
                :class="locale === 'ar' ? 'datepicker-rtl' : 'datepicker-ltr'"
              />
              <img src="/clock.png" alt="arrow" class="w-[16px] h-[16px]" />
            </div>
          </div>
        </div>
        <div>
          <label class="mb-[4px] block text-[#121212] text-[14px] font-[500]">{{
            $t("filters.time_to")
          }}</label>
          <div class="date_picker_container">
            <div
              class="border-[0.8px] border-[#B6B6B6] rounded-[12px] px-[12px] flex items-center justify-between min-w-[277px] bg-white"
            >
              <img src="/timer.png" alt="calendar" class="w-[16px] h-[16px]" />
              <VueDatePicker
                v-model="timeTo"
                time-picker
                :auto-apply="false"
                :close-on-auto-apply="true"
                :enable-seconds="false"
                :hide-navigation="true"
                :placeholder="$t('filters.time_placeholder')"
                :class="locale === 'ar' ? 'datepicker-rtl' : 'datepicker-ltr'"
              />
              <img src="/clock.png" alt="arrow" class="w-[16px] h-[16px]" />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div v-if="errorMessage" class="text-red-500 text-[14px]">
          {{ errorMessage }}
        </div>
        <button
          class="mt-[32px] bg-[#121212] text-[#fff] py-[13.5px] w-full rounded-[12px] !cursor-pointer hover:shadow-[0_0_0_1px_#121212] transition-all duration-300"
          @click="handleSubmit"
        >
          <span v-if="!submitLoading">{{ $t("filters.search") }}</span>
          <UIButtonLoader
            class="mx-auto"
            border-color="#fff"
            v-if="submitLoading"
          />
        </button>
      </div>
    </div>
    <div class="mt-[40px] mb-[24px]">
      <div v-if="!firstLoad && !submitLoading && vehicles?.length == 0">
        <NoResult />
      </div>
      <div v-if="!firstLoad && !submitLoading && vehicles?.length > 0">
        <div class="flex gap-[4px] items-center">
          <img src="/cars.png" alt="Vechiles" class="w-[24px] h-[24px]" />
          <p class="text-[#121212] text-[18px] font-[600]">
            {{ $t("bread_crumb.vechiles") }}
          </p>
        </div>
        <div
          class="grid grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 xl:!grid-cols-4 2xl:!grid-cols-5 gap-x-[18px] gap-y-[24px] mt-[24px]"
        >
          <div v-for="vehicle in vehicles" :key="vehicle?.id">
            <CarCard :car="vehicle" class="m-auto" data-aos="zoom-in" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Switch,
} from "@headlessui/vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const { locale } = useI18n();
const selectedCountry = ref(null);
const selectedCity = ref(null);
const selectedCountryDrop = ref(null);
const selectedCityDrop = ref(null);
const countries = ref([]);
const cities = ref([]);
const loading = ref(false);
const enabled = ref(false);
const pickupDate = ref(null);
const dropoffDate = ref(null);
const timeFrom = ref(null);
const timeTo = ref(null);
const submitLoading = ref(false);
const firstLoad = ref(true);
const vehicles = ref([]);
const errorMessage = ref("");

const handleSubmit = async () => {
  if (
    !selectedCountry.value ||
    !selectedCity.value ||
    !pickupDate.value ||
    !dropoffDate.value ||
    !timeFrom.value ||
    !timeTo.value ||
    (!enabled.value && (!selectedCountryDrop.value || !selectedCityDrop.value))
  ) {
    errorMessage.value =
      locale.value === "ar"
        ? "يرجى ملء جميع الحقول."
        : "Please fill all fields.";
    return;
  }

  const pickupDay = new Date(pickupDate.value);
  const dropoffDay = new Date(dropoffDate.value);

  if (dropoffDay < pickupDay) {
    errorMessage.value =
      locale.value === "ar"
        ? "يجب أن يكون تاريخ التسليم بعد تاريخ الاستلام."
        : "Drop-off date must be after pickup date.";
    return;
  }
  errorMessage.value = "";
  firstLoad.value = false;
  const pickupHours = timeFrom.value?.hours ?? 0;
  const pickupMinutes = timeFrom.value?.minutes ?? 0;
  const dropoffHours = timeTo.value?.hours ?? 0;
  const dropoffMinutes = timeTo.value?.minutes ?? 0;

  const pickupTotalMinutes = pickupHours * 60 + pickupMinutes;
  const dropoffTotalMinutes = dropoffHours * 60 + dropoffMinutes;

  if (dropoffTotalMinutes <= pickupTotalMinutes) {
    errorMessage.value =
      locale.value === "ar"
        ? "يجب أن يكون وقت التسليم بعد وقت الاستلام."
        : "Drop-off time must be after pickup time.";
    return;
  }

  try {
    submitLoading.value = true;

    const formatTime = (val) => {
      if (!val) return null;
      const h = val.hours?.toString().padStart(2, "0");
      const m = val.minutes?.toString().padStart(2, "0");
      return h && m ? `${h}:${m}` : null;
    };

    const data = {};
    data.return_vehicle_same_location = enabled.value ? 1 : 0;

    if (selectedCountry.value?.id || selectedCity.value?.id) {
      data.pickup_location = JSON.stringify({
        country_id: selectedCountry.value?.id,
        city_id: selectedCity.value?.id,
      });
    }

    if (
      !enabled.value &&
      (selectedCountryDrop.value?.id || selectedCityDrop.value?.id)
    ) {
      data.delivery_location = JSON.stringify({
        country_id: selectedCountryDrop.value?.id,
        city_id: selectedCityDrop.value?.id,
      });
    }

    if (pickupDate.value)
      data.start_date = new Date(pickupDate.value).toISOString().split("T")[0];
    if (dropoffDate.value)
      data.end_date = new Date(dropoffDate.value).toISOString().split("T")[0];

    const startTime = formatTime(timeFrom.value);
    if (startTime) data.start_time = startTime;
    const endTime = formatTime(timeTo.value);
    if (endTime) data.end_time = endTime;

    vehicles.value = await apiRequest(
      "GET",
      "/main/vehicles",
      data,
      {},
      null,
      locale.value
    );

    vehicles.value = vehicles.value?.data ?? [];
  } catch (error) {
    vehicles.value = [];
    console.error("Failed to load vehicles:", error);
  } finally {
    submitLoading.value = false;
  }
};

const getcountries = async () => {
  loading.value = true;
  try {
    const response = await apiRequest(
      "GET",
      `/main/countries?limit=0&page=0`,
      {},
      {},
      null,
      locale.value
    );
    countries.value = response?.data ?? [];
  } catch (error) {
    console.error("Failed to load branches:", error);
    countries.value = [];
  } finally {
    loading.value = false;
  }
};

const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString("en-GB");
};

onMounted(async () => {
  getcountries();
});
</script>
<style>
.date_picker_container {
  min-width: 277px;
}
.dp__pointer {
  padding: 16px;
}
.dp__input {
  border: none !important;
  box-shadow: none !important;
  background: transparent !important;
  border-radius: 12px;
  border: 0.8px solid #b6b6b6;
  direction: ltr;
  font-family: "Somar";
  font-size: 14px;
}
.dp__input_icons {
  padding: 0 !important;
}
.dp__today {
  border: 1px solid black;
}
[dir="rtl"] .dp__inner_nav {
  transform: none;
}
.datepicker-ltr .dp__input {
  direction: ltr;
  text-align: left;
}

.datepicker-rtl .dp__input {
  direction: rtl;
  text-align: right;
}

.dp__input_icon {
  display: none !important;
}
</style>
