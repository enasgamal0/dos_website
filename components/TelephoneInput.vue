<template>
  <div class="relative" dir="ltr">
    <div class="flex">
      <!-- Country Selector -->
      <div class="relative">
        <button
          type="button"
          @click="toggleDropdown"
          class="cursor-pointer flex items-center px-3 py-[14px] border border-[#EEEDEE] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#4B007D]"
        >
          <img
            v-if="selectedCountry?.image"
            :src="selectedCountry.image"
            :alt="
              locale === 'ar'
                ? selectedCountry.name_ar || selectedCountry.name
                : selectedCountry.name
            "
            class="w-5 h-3 mr-2 object-cover"
          />
          <span class="text-gray-700 text-sm font-medium">
            {{ (selectedCountry?.phone && selectedCountry.phone[0]) || "+" }}
          </span>
          <svg
            class="ml-2 h-4 w-4 text-gray-400"
            :class="{ 'rotate-180': isDropdownOpen }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <!-- Dropdown -->
        <div
          v-if="isDropdownOpen"
          class="absolute z-50 mt-1 w-80 bg-white border border-[#EEEDEE] shadow-lg max-h-60"
        >
          <!-- Search Input -->
          <div class="p-2 border-b border-gray-200">
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="t('auth.search_countries')"
              class="w-full px-3 py-2 border border-[#EEEDEE] text-sm focus:outline-none focus:ring-2 focus:ring-[#4B007D]"
            />
          </div>

          <!-- Country List -->
          <div class="max-h-48 overflow-y-auto">
            <button
              v-for="country in filteredCountries"
              :key="country.iso?.alpha2 || country.name"
              type="button"
              @click="selectCountry(country)"
              class="cursor-pointer w-full flex items-center px-3 py-2 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 text-left"
            >
              <img
                :src="country.image"
                :alt="
                  locale === 'ar'
                    ? country.name_ar || country.name
                    : country.name
                "
                class="w-5 h-3 mr-3 object-cover"
              />
              <span class="flex-1 text-sm text-gray-900">{{
                locale === "ar" ? country.name_ar || country.name : country.name
              }}</span>
              <span class="text-sm text-gray-500 font-medium">{{
                (country.phone && country.phone[0]) || "N/A"
              }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Phone Number Input -->
      <input
        v-model="phoneNumber"
        type="tel"
        class="flex-1 px-4 py-3 border border-l-0 border-[#EEEDEE] focus:outline-none focus:ring-2 focus:ring-[#4B007D] telephone_input"
        :class="locale == 'ar' ? 'phone_input' : ''"
        @input="onPhoneNumberInput"
        :placeholder="$t('placeholders.phone')"
      />
    </div>
  </div>
</template>

<script setup>
const { locale, t } = useI18n();

// Props
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  countries: {
    type: Array,
    required: true,
  },
  defaultCountry: {
    type: String,
    default: "SA", // Can be ISO code or country code like "+966"
  },
  validate: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:modelValue", "country-changed", "validation-changed"]);

const isDropdownOpen = ref(false);
const searchQuery = ref("");
const phoneNumber = ref("");
const selectedCountry = ref(null);
const validationMessage = ref("");
const isInitialized = ref(false);

const filteredCountries = computed(() => {
  if (!searchQuery.value || !props.countries) return props.countries || [];

  const query = searchQuery.value.toLowerCase();
  return props.countries?.filter((country) => {
    const name = country.name || "";
    const nameAr = country.name_ar || "";
    const phone = country?.phone?.[0] || "";

    return (
      name.toLowerCase().includes(query) ||
      nameAr.includes(query) ||
      phone.includes(query)
    );
  });
});

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
  if (isDropdownOpen.value) {
    searchQuery.value = "";
  }
};

const selectCountry = (country) => {
  if (!country || !country.phone || !country.phone[0]) {
    console.warn("Invalid country selected:", country);
    return;
  }
  
  selectedCountry.value = country;
  isDropdownOpen.value = false;

  // Clean phone number if it contains the old country code
  if (phoneNumber.value && phoneNumber.value.startsWith('+')) {
    // Remove any existing country code from phone number
    const cleanNumber = phoneNumber.value.replace(/^\+\d+/, '');
    phoneNumber.value = cleanNumber;
  }

  updateModelValue();

  if (props.validate) {
    validatePhoneNumber();
  }
  
  // Emit country change with full country object
  emit("country-changed", country);
};

const onPhoneNumberInput = () => {
  // Only allow digits in phone number
  phoneNumber.value = phoneNumber.value.replace(/\D/g, "");
  handleManualCountryCodeInput();
  updateModelValue();

  if (props.validate) {
    validatePhoneNumber();
  }
};

const updateModelValue = () => {
  if (selectedCountry.value?.phone?.[0]) {
    // Remove country code if user accidentally typed it
    let numberToProcess = phoneNumber.value;
    const countryCode = selectedCountry.value.phone[0].replace('+', '');
    
    if (numberToProcess.startsWith(countryCode)) {
      numberToProcess = numberToProcess.substring(countryCode.length);
    }

    // Clean the number and emit only the phone number without country code
    const cleanNumber = numberToProcess.replace(/[^\d]/g, "");
    phoneNumber.value = cleanNumber;
    emit("update:modelValue", cleanNumber);
  } else {
    emit("update:modelValue", phoneNumber.value);
  }
};

const validatePhoneNumber = () => {
  let message = "";
  let isValid = true;
  
  if (!phoneNumber.value || !selectedCountry.value || !selectedCountry.value.phone?.[0]) {
    message = "";
    isValid = !phoneNumber.value; // If there's a phone number but no country, it's invalid
  } else {
    const digitsOnly = phoneNumber.value.replace(/[\s-]/g, "");
    const expectedLength = selectedCountry.value.phoneLength || 9; // Default length without country code

    if (digitsOnly.length < expectedLength) {
      message = t("validation.phone_too_short", { length: expectedLength });
      isValid = false;
    } else if (digitsOnly.length > expectedLength) {
      message = t("validation.phone_too_long", { length: expectedLength });
      isValid = false;
    }
  }
  
  validationMessage.value = message;
  emit("validation-changed", isValid, message);
};

const handleManualCountryCodeInput = () => {
  if (!phoneNumber.value || !props.countries) return;

  // If user starts typing with +, try to match country code
  if (phoneNumber.value.startsWith("+")) {
    const matchingCountry = props.countries.find(
      (c) => c?.phone?.[0] && phoneNumber.value.startsWith(c.phone[0])
    );

    if (matchingCountry && matchingCountry !== selectedCountry.value) {
      selectedCountry.value = matchingCountry;
      phoneNumber.value = phoneNumber.value.replace(matchingCountry.phone[0], "");
      emit("country-changed", matchingCountry);
    }
  }
};

const initializeDefaultCountry = () => {
  if (!props.countries || props.countries.length === 0) return null;

  let defaultCountry = null;

  // First check if defaultCountry is a country code like "+966"
  if (props.defaultCountry.startsWith('+')) {
    defaultCountry = props.countries.find(
      (c) => c?.phone?.[0] === props.defaultCountry
    );
  }
  
  // If not found, check if it's an ISO code (SA, EG, etc)
  if (!defaultCountry) {
    defaultCountry = props.countries.find(
      (c) => c?.iso?.alpha2 === props.defaultCountry
    );
  }

  // If still not found, try to match by name
  if (!defaultCountry) {
    defaultCountry = props.countries.find(
      (c) => c?.name?.toLowerCase() === props.defaultCountry.toLowerCase()
    );
  }

  return defaultCountry || props.countries[0];
};

const parseInitialValue = () => {
  if (!props.modelValue || isInitialized.value) return false;

  // The modelValue should be just the phone number without country code
  // since country code is handled separately
  phoneNumber.value = props.modelValue.toString();
  return true;
};

const initialize = () => {
  if (isInitialized.value) return;

  // Set default country first
  const defaultCountry = initializeDefaultCountry();
  if (defaultCountry) {
    selectedCountry.value = defaultCountry;
    // Emit the country change so parent knows the initial country
    emit("country-changed", defaultCountry);
  }

  // Then parse any existing phone number
  parseInitialValue();

  isInitialized.value = true;
  
  if (props.validate) {
    validatePhoneNumber();
  }
};

const closeDropdown = (event) => {
  if (!event.target.closest(".relative")) {
    isDropdownOpen.value = false;
  }
};

// Watch for validation changes and emit them
watch(validationMessage, (newMessage) => {
  const isValid = !newMessage;
  emit("validation-changed", isValid, newMessage);
});

onMounted(() => {
  initialize();
  document.addEventListener("click", closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener("click", closeDropdown);
});

// Watch for external changes to modelValue
watch(
  () => props.modelValue,
  (newValue) => {
    if (!isInitialized.value) return;

    // Only update if the value actually changed to avoid infinite loops
    if (newValue !== phoneNumber.value) {
      phoneNumber.value = newValue ? newValue.toString() : "";
      
      if (props.validate) {
        validatePhoneNumber();
      }
    }
  }
);

// Watch for countries changes
watch(
  () => props.countries,
  () => {
    if (!isInitialized.value) {
      initialize();
    } else if (
      props.countries &&
      props.countries.length > 0 &&
      !selectedCountry.value
    ) {
      const defaultCountry = initializeDefaultCountry();
      if (defaultCountry) {
        selectedCountry.value = defaultCountry;
        emit("country-changed", defaultCountry);
      }
    }
  },
  { immediate: true }
);

// Watch for default country changes
watch(
  () => props.defaultCountry,
  () => {
    if (isInitialized.value) {
      const newDefaultCountry = initializeDefaultCountry();
      if (newDefaultCountry && newDefaultCountry !== selectedCountry.value) {
        selectedCountry.value = newDefaultCountry;
        emit("country-changed", newDefaultCountry);
      }
    }
  }
);
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
.phone_input::placeholder {
  text-align: right;
}
.telephone_input {
  max-width: 60%;
}
@media (min-width: 460px) {
  .telephone_input {
    max-width: 100% !important;
  }
}
</style>