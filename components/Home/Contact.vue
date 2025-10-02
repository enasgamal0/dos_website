<template>
  <div class="lg:flex items-center justify-center gap-8 my-20">
    <div class="mx-5">
      <h1
        class="text-[#121212] text-[35px] font-[700] block lg:!hidden"
        data-aos="fade-down"
      >
        {{ t("contact.title") }}
      </h1>
      <p class="text-[#414042] text-[16px] mt-7 block lg:!hidden">
        {{ t("contact.desc") }}
      </p>
    </div>
    <div>
      <div
        class="bg-[#F7F7F7] rounded-[20px] w-[362px] h-[234px] my-5 mx-auto lg:!mx-5 bg-[url('/contact_bg.png')] bg-no-repeat bg-bottom-right flex items-center justify-center text-center"
        v-if="address && address != 'null'"
      >
        <div>
          <img
            src="/contact_address.png"
            alt="Address"
            class="w-[40px] h-[40px] m-auto"
            data-aos="zoom-in"
          />
          <p class="text-[16px] text-[#454545] my-3">
            {{ t("contact.address") }}
          </p>
          <p class="text-[16px] text-[#121212] font-bold">{{ address }}</p>
        </div>
      </div>
      <div
        class="bg-[#F7F7F7] rounded-[20px] w-[362px] h-[234px] my-5 mx-auto lg:!mx-5 bg-[url('/contact_bg.png')] bg-no-repeat bg-bottom-right flex items-center justify-center text-center"
        v-if="email && email != 'null'"
      >
        <div>
          <img
            src="/contact_mail.png"
            alt="Address"
            class="w-[40px] h-[40px] m-auto"
            data-aos="zoom-in"
          />
          <p class="text-[16px] text-[#454545] my-3">
            {{ t("contact.email") }}
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
        class="bg-[#F7F7F7] rounded-[20px] w-[362px] h-[234px] my-5 mx-auto lg:!mx-5 bg-[url('/contact_bg.png')] bg-no-repeat bg-bottom-right flex items-center justify-center text-center"
        v-if="phone && phone != 'null' && phone != '[]'"
      >
        <div>
          <img
            src="/contact_phone.png"
            alt="Address"
            class="w-[40px] h-[40px] m-auto"
            data-aos="zoom-in"
          />
          <p class="text-[16px] text-[#454545] my-3">
            {{ t("contact.phone_number") }}
          </p>
          <div
            v-for="phoneNum in phone?.split(',')"
            :key="phoneNum"
            class="mb-2"
          >
            <NuxtLink
              :to="`tel:${phoneNum}`"
              class="text-[16px] text-[#121212] font-bold"
            >
              {{ phoneNum }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div class="mx-5">
      <h1
        class="text-[#121212] text-[35px] font-[700] hidden lg:!block"
        data-aos="fade-down"
      >
        {{ t("contact.title") }}
      </h1>
      <p class="text-[#414042] text-[16px] mt-7 hidden lg:!block">
        {{ t("contact.desc") }}
      </p>
      <VeeForm
        ref="contactForm"
        @submit="handleSubmit"
        :validation-schema="validationSchema"
        :initial-values="initialValues"
        class="lg:w-[728px] w-full my-8"
        v-slot="{ errors, meta }"
        :validate-on-mount="false"
      >
        <div class="my-[10px]">
          <label for="name" class="mb-[8px] block">{{
            t("contact.name")
          }}</label>
          <VeeField
            @input="backendError = ''"
            id="name"
            v-model="form.name"
            name="name"
            type="text"
            :validate-on-input="true"
            :class="{
              '!border-red-500': errors.name,
              'border-[#EEEDEE]': !errors.name,
            }"
            class="w-full h-full border border-[#E8E8E8] !h-[50px] rounded-[25px] px-5"
            :placeholder="t('contact.enter_name')"
          />
          <VeeErrorMessage
            name="name"
            class="text-red-500 text-sm mt-1 block"
          />
        </div>

        <div class="my-[10px]">
          <label for="email" class="mb-[8px] block">{{
            t("contact.email")
          }}</label>
          <VeeField
            @input="backendError = ''"
            id="email"
            v-model="form.email"
            name="email"
            type="email"
            :validate-on-input="true"
            :class="{
              '!border-red-500': errors.email,
              'border-[#EEEDEE]': !errors.email,
            }"
            class="w-full h-full border border-[#E8E8E8] !h-[50px] rounded-[25px] px-5"
            :placeholder="t('contact.enter_email')"
          />
          <VeeErrorMessage
            name="email"
            class="text-red-500 text-sm mt-1 block"
          />
        </div>

        <div class="my-[10px]">
          <div class="relative w-[100%] xl:!mb-0 my-6">
            <label
              for="mobile"
              class="block text-[16px] font-[400] text-[#202020] mb-2"
            >
              {{ t("contact.phone_number") }}
            </label>
            <div class="relative">
              <VeeField
                name="mobile"
                v-slot="{ field, errors: fieldErrors, meta: fieldMeta }"
              >
                <div
                  class="border rounded-[25px]"
                  :class="{
                    'border-red-500':
                      (phoneValidationMessage || fieldErrors) &&
                      fieldMeta.touched,
                    'border-[#EEEDEE]':
                      !phoneValidationMessage || !fieldMeta.touched,
                  }"
                >
                  <TelephoneInput
                    v-bind="field"
                    v-model="form.mobile"
                    :countries="countries"
                    default-country="SA"
                    @country-changed="onCountryChanged"
                    @validation-changed="onPhoneValidationChanged"
                    @input="backendError = ''"
                  />
                </div>
              </VeeField>
            </div>
            <VeeErrorMessage
              name="mobile"
              class="text-red-500 text-sm mt-1 block"
            />
            <p
              v-if="phoneValidationMessage"
              class="text-red-500 text-sm mt-1 block"
            >
              {{ phoneValidationMessage }}
            </p>
          </div>
        </div>

        <div class="my-[10px]">
          <div class="relative w-[100%] xl:!mb-0 my-6">
            <label
              for="type"
              class="block text-[16px] font-[400] text-[#202020] mb-2"
            >
              {{ t("contact.type") }}
            </label>
            <div class="relative">
              <VeeField
                name="type"
                v-slot="{
                  field,
                  errorMessage,
                  handleChange,
                  handleBlur,
                  meta: fieldMeta,
                }"
              >
                <Listbox
                  :model-value="selectedType"
                  @update:model-value="
                    (value) => {
                      selectedType = value;
                      form.type = value;
                      handleChange(value);
                      handleBlur();
                      backendError = '';
                    }
                  "
                >
                  <div class="relative">
                    <ListboxButton
                      :class="{
                        '!border-red-500': errorMessage && fieldMeta.touched,
                        'border-[#EEEDEE]': !errorMessage || !fieldMeta.touched,
                      }"
                      class="flex justify-between cursor-pointer w-full px-4 py-3 border !h-[50px] rounded-[25px]"
                    >
                      <div class="flex-1 text-start">
                        <span v-if="!selectedType" class="text-[#A3A2A3]">
                          {{ t("placeholders.type") }}
                        </span>
                        <span
                          v-else
                          class="block whitespace-normal break-words"
                        >
                          {{ getTypeDisplayName(selectedType) }}
                        </span>
                      </div>
                      <div class="flex items-center gap-2">
                        <button
                          v-if="selectedType"
                          type="button"
                          @click.stop="
                            () => {
                              selectedType = '';
                              form.type = '';
                              handleChange('');
                              handleBlur();
                              backendError = '';
                            }
                          "
                          class="text-[#a2a2a2] hover:text-red-500 cursor-pointer"
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
                      class="absolute mt-1 max-h-60 w-full overflow-auto bg-white rounded-md shadow z-10"
                    >
                      <ListboxOption
                        v-for="type in types"
                        :key="type.id"
                        :value="type.value"
                        v-slot="{ active, selected }"
                      >
                        <li
                          :class="[
                            active ? 'bg-[#dbdbdb]' : 'text-gray-900',
                            'cursor-pointer select-none py-2 px-4',
                          ]"
                        >
                          {{ type.name }}
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
              </VeeField>
            </div>
            <VeeErrorMessage
              name="type"
              class="text-red-500 text-sm mt-1 block"
            />
          </div>
        </div>

        <div class="my-[10px]">
          <label for="message" class="mb-[8px] block">{{
            t("contact.message")
          }}</label>
          <VeeField
            as="textarea"
            id="message"
            name="message"
            v-model="form.message"
            @input="backendError = ''"
            :validate-on-input="true"
            :class="{
              '!border-red-500': errors.message,
              'border-[#EEEDEE]': !errors.message,
            }"
            class="w-full border border-[#E8E8E8] !h-[106px] rounded-[10px] px-5 py-3"
            :placeholder="t('contact.enter_message')"
          />
          <VeeErrorMessage
            name="message"
            class="text-red-500 text-sm mt-1 block"
          />
        </div>

        <div v-if="backendError" class="text-red-500 text-sm my-2">
          {{ backendError }}
        </div>

        <BaseButton
          :content="t('contact.title')"
          :icon="'/contact.png'"
          :pending="submitLoading"
          data-aos="zoom-in"
        />
      </VeeForm>
    </div>
  </div>
</template>

<script setup>
import * as yup from "yup";
import countries from "~/assets/data/countries.json";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

const address = ref("");
const phone = ref("");
const email = ref("");
const contactForm = ref(null);
const submitLoading = ref(false);
const { locale, t } = useI18n();
const backendError = ref("");
const types = ref([]);
const selectedType = ref("");

const form = ref({
  name: "",
  email: "",
  mobile: "",
  type: "",
  message: "",
});

const initialValues = {
  name: "",
  email: "",
  mobile: "",
  type: "",
  message: "",
};

const validationSchema = yup.object({
  name: yup
    .string()
    .required(t("validation.name_required"))
    .min(2, t("validation.name_min")),
  email: yup
    .string()
    .required(t("validation.email_required"))
    .email(t("validation.email_invalid")),
  mobile: yup.string().required(t("validation.phone_number")),
  type: yup.string().required(t("validation.inquiry_type")),
  message: yup
    .string()
    .required(t("validation.message"))
    .min(3, t("validation.message_min")),
});

const getTypeDisplayName = (value) => {
  const type = types.value.find((t) => t.value === value);
  return type ? type.name : value;
};

const handleSubmit = async (values, { resetForm }) => {
  if (phoneValidationMessage.value) return;

  try {
    submitLoading.value = true;

    const data = {
      name: values.name,
      email: values.email,
      country_code: selectedCountryCode.value,
      phone: values.mobile,
      type: selectedType.value || values.type,
      message: values.message,
    };

    await apiRequest(
      "POST",
      "/main/contact-us-landingPage",
      data,
      {},
      null,
      locale.value
    );
    showToast(t("contact.success"), "success");

    resetForm();
    form.value = { ...initialValues };
    selectedType.value = "";
    backendError.value = "";
    phoneValidationMessage.value = "";
  } catch (error) {
    showToast(error?.response?.data?.message || t("packages.error"));
    backendError.value = error?.response?.data?.message || t("packages.error");
  } finally {
    submitLoading.value = false;
  }
};

const phoneValidationMessage = ref("");
const selectedCountryCode = ref("");

const onCountryChanged = (country) => {
  selectedCountryCode.value = country?.phone?.[0] || "";
};

const onPhoneValidationChanged = (isValid, message) => {
  phoneValidationMessage.value = isValid ? "" : message;
};

onMounted(() => {
  address.value = localStorage.getItem("dos_social_address") || "";
  phone.value = localStorage.getItem("dos_social_phone") || "";
  email.value = localStorage.getItem("dos_social_email") || "";
  types.value = [
    {
      id: 1,
      name: t("contact.request"),
      value: "request",
    },
    {
      id: 2,
      name: t("contact.complaint"),
      value: "complaint",
    },
    {
      id: 3,
      name: t("contact.suggestion"),
      value: "suggestion",
    },
    {
      id: 4,
      name: t("contact.inquiry"),
      value: "inquiry",
    },
    {
      id: 5,
      name: t("contact.other"),
      value: "other",
    },
  ];
});
</script>
