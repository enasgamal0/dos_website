<template>
  <div>
    <BreadCrumb
      :title="vehicle?.vehicle_model?.vehicle_brand?.name"
      :current="vehicle?.vehicle_model?.vehicle_brand?.name"
      :prev="$t('vechile.vechiles')"
      :link="`/cars`"
    />
    <div
      class="lg:max-w-[1170px] lg:flex my-[80px] gap-[40px] xl:!gap-[100px] justify-center mx-auto px-8 lg:!px-0"
    >
      <div class="lg:w-[60%] lg:max-w-[730px]">
        <div class="mb-[24px]">
          <div
            class="flex flex-col items-center justify-center max-w-[1170px] mx-auto"
            v-if="!loading && carImgs && carImgs?.length > 0"
          >
            <Swiper
              :slides-per-view="1"
              :space-between="10"
              :modules="modules"
              :pagination="{ el: '.swiper-pagination3', clickable: true }"
              :autoplay="{ delay: 3500, disableOnInteraction: false }"
              :speed="800"
              :loop="carImgs?.length > 1"
              :observer="true"
              :observe-parents="true"
              :observe-slide-children="true"
              :update-on-window-resize="true"
              :resize-observer="true"
              class="w-full h-full"
            >
              <SwiperSlide
                v-for="(carImg, index) in carImgs"
                :key="carImg?.id || index"
                class="flex justify-center"
              >
                <img
                  :src="carImg?.url"
                  alt="Vehicle Image"
                  class="w-[730px] h-[333px] object-cover text-center rounded-[20px]"
                />
              </SwiperSlide>
            </Swiper>

            <!-- Pagination Dots -->
            <div class="swiper-pagination3 flex justify-center mt-6"></div>
          </div>
        </div>
        <div class="mb-[40px]">
          <div class="flex justify-between items-center mt-3 mb-[16px]">
            <div class="flex gap-2 items-center justify-center">
              <h1 class="text-black text-[18px] font-[600] mb-[8px]">
                {{ vehicle?.vehicle_model?.vehicle_brand?.name }}
              </h1>
              <span class="text-[#606060] text-[18px] mb-[8px]">{{
                vehicle?.model_year
              }}</span>
            </div>
            <div>
              <h1
                class="text-[#121212] text-[20px] font-[600]"
                v-if="vehicle?.price_for_selected_days > 0"
              >
                {{ vehicle?.duration_in_days }}
              </h1>
              <h1
                class="text-[#121212] text-[20px] font-[600]"
                v-if="vehicle?.price_for_selected_days == 0"
              >
                {{ vehicle?.price }}
              </h1>
              <div class="flex items-center justify-center gap-1">
                <p class="text-[#929292] text-[10px]">
                  {{ $t("cars.currency") }}
                </p>
                <p class="text-[#929292] text-[10px]">/</p>
                <p
                  class="text-[#121212] text-[10px]"
                  v-if="vehicle?.price_for_selected_days > 0"
                >
                  {{ vehicle?.price_for_selected_days }}
                </p>
                <p
                  class="text-[#121212] text-[10px]"
                  v-if="vehicle?.price_for_selected_days == 0"
                >
                  1
                </p>
                <p class="text-[#929292] text-[10px]">{{ $t("cars.days") }}</p>
              </div>
            </div>
          </div>
          <p class="text-[#414141] text-[16px]">
            {{ vehicle?.description }}
          </p>
          <div class="flex items-center gap-2 mt-[16px]">
            <div>
              <img
                src="/branch.png"
                alt="Branch"
                class="w-[16px] h-[16px] inline"
              /><span class="mx-1 text-[#414141] text-[16px]"
                >{{ $t("vechile.branch") }}: {{ vehicle?.branch?.name }}</span
              >
            </div>
            <div>
              <div class="flex gap-1 items-center">
                {{ $t("vechile.car_condation") }}:
                <img
                  :src="vehicle?.is_good_condition ? '/yes.png' : '/no.png'"
                  class="w-[16px] h-[16px]"
                />{{
                  vehicle?.is_good_condition
                    ? $t("vechile.yes")
                    : $t("vechile.no")
                }}
              </div>
            </div>
            <div>
              <div class="flex gap-1 items-center">
                {{ $t("vechile.field_testing") }}:
                <img
                  :src="vehicle?.has_road_test ? '/yes.png' : '/no.png'"
                  class="w-[16px] h-[16px]"
                />
                {{
                  vehicle?.has_road_test ? $t("vechile.yes") : $t("vechile.no")
                }}
              </div>
            </div>
          </div>
        </div>
        <div class="mb-[40px]">
          <div class="flex gap-1 items-center mb-[16px]">
            <img src="/features.png" alt="Vechile Features" />
            <p class="text-[16px] text-[#121212] font-bold">
              {{ $t("vechile.features") }}
            </p>
          </div>
          <div>
            <div class="grid grid-cols-2 lg:!grid-cols-4 gap-3 mb-[12px]">
              <div class="flex gap-2 items-center">
                <img src="/car_icon.png" alt="Type" class="w-[14px] h-[14px]" />
                <p class="text-[#414141] text-[14px]">
                  {{
                    vehicle?.vehicle_model?.vehicle_brand?.vehicle_type?.name
                  }}
                </p>
              </div>
              <div class="flex gap-2 items-center">
                <img src="/brand.png" alt="Brand" class="w-[14px] h-[14px]" />
                <p class="text-[#414141] text-[14px]">
                  {{ vehicle?.vehicle_model?.vehicle_brand?.name }}
                </p>
              </div>
              <div class="flex gap-2 items-center">
                <img src="/model.png" alt="Model" class="w-[14px] h-[14px]" />
                <p class="text-[#414141] text-[14px]">
                  {{ vehicle?.vehicle_model?.name }}
                </p>
              </div>
              <div class="flex gap-2 items-center">
                <img src="/year.png" alt="Year" class="w-[14px] h-[14px]" />
                <p class="text-[#414141] text-[14px]">
                  {{ vehicle?.model_year }}
                </p>
              </div>
            </div>
            <div class="grid grid-cols-2 lg:!grid-cols-4 gap-3">
              <div class="flex gap-2 items-center">
                <img
                  src="/gear.png"
                  alt="Gear Type"
                  class="w-[14px] h-[14px]"
                />
                <p class="text-[#414141] text-[14px]">
                  {{ vehicle?.gear_type?.name }}
                </p>
              </div>
              <div class="flex gap-2 items-center">
                <img src="/seats.png" alt="Seats" class="w-[14px] h-[14px]" />
                <p class="text-[#414141] text-[14px]">
                  {{ vehicle?.number_seats }} {{ $t("vechile.seats") }}
                </p>
              </div>
              <div class="flex gap-2 items-center">
                <img src="/doors.png" alt="Doors" class="w-[14px] h-[14px]" />
                <p class="text-[#414141] text-[14px]">
                  {{ vehicle?.number_doors }} {{ $t("vechile.doors") }}
                </p>
              </div>
              <div class="flex gap-2 items-center">
                <img src="/gas.png" alt="fuel" class="w-[14px] h-[14px]" />
                <p class="text-[#414141] text-[14px]">
                  {{ vehicle?.fuel_type?.name }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="mb-[40px]">
          <div class="flex gap-1 items-center mb-[16px]">
            <img
              src="/additional_features.png"
              alt="Vechile Additional Features"
            />
            <p class="text-[16px] text-[#121212] font-bold">
              {{ $t("vechile.additional_features") }}
            </p>
          </div>
          <div>
            <div class="grid grid-cols-2 lg:!grid-cols-4 gap-3">
              <div
                class="flex gap-2 items-center"
                v-for="feature in vehicle?.features"
                :key="feature?.id"
              >
                <img src="/car_icon.png" alt="Type" class="w-[14px] h-[14px]" />
                <p class="text-[#414141] text-[14px]">
                  {{ feature?.name }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:w-[40%] lg:max-w-[400px]">
        <div>
          <div class="flex gap-1 items-center">
            <img src="/provider.png" alt="Provider" class="w-[16px] h-[16px]" />
            <p class="text-[#121212] text-[16px]">
              {{ $t("vechile.provider_data") }}
            </p>
          </div>
          <div class="text-start">
            <h1 class="text-[16px] font-[500] text-[#121212] mt-[8px]">
              {{
                vehicle?.provider?.exhibitor_name
                  ?.split(" ")
                  .map((word) => word[0] + "*".repeat(word.length - 1))
                  .join(" ")
              }}
            </h1>
            <span class="text-[#929292] text-[12px] mt-[12px]">{{
              vehicle?.provider?.exhibitor_type_trans
            }}</span>
          </div>
        </div>
        <div class="mt-[40px]">
          <div class="flex gap-1 items-center mb-[16px]">
            <img src="/services.png" alt="Services" class="w-[16px] h-[16px]" />
            <p class="text-[#121212] text-[16px]">
              {{ $t("vechile.additional_services") }}
            </p>
          </div>
          <div>
            <div
              class="flex gap-1 items-center mb-[20px]"
              v-for="service in vehicle?.additional_services"
              :class="
                service?.type == 'fixed' ? 'cursor-pointer hover:underline' : ''
              "
              @click="showGoldenGuarantee = true"
            >
              <img
                src="/service.png"
                alt="Services"
                class="w-[16px] h-[16px]"
                v-if="service?.type != 'fixed'"
              />
              <img
                src="/gold.png"
                alt="Services"
                class="w-[16px] h-[16px]"
                v-if="service?.type == 'fixed'"
              />
              <p class="text-[#414141] text-[14px]">{{ service?.name }}</p>
              <img
                src="/open_popup.png"
                alt="Services"
                class="w-[16px] h-[16px] mx-[8px]"
                v-if="service?.type == 'fixed'"
              />
            </div>
          </div>
        </div>
        <div class="mt-[40px]">
          <div class="flex gap-1 items-center">
            <img src="/rules.png" alt="Provider" class="w-[16px] h-[16px]" />
            <p class="text-[#121212] text-[16px]">
              {{ $t("vechile.road_rules") }}
            </p>
          </div>
          <div v-for="rule in roadRoles" :key="rule.id">
            <div class="flex items-center mt-[20px]">
              <div>
                <img
                  src="/rule.png"
                  :alt="rule?.name"
                  class="w-[14px] h-[14px] mx-[8px]"
                />
              </div>
              <div>
                <p class="text-[#121212] text-[14px] mb-[8px]">
                  {{ rule?.title }}
                </p>
                <p class="text-[#414141] text-[12px]">
                  {{ rule?.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-[40px]">
          <div class="flex gap-1 items-center">
            <img src="/faq.png" alt="Provider" class="w-[16px] h-[16px]" />
            <p class="text-[#121212] text-[16px]">
              {{ $t("vechile.faq") }}
            </p>
          </div>
          <div v-for="q in faq" :key="q.id">
            <div class="flex items-center mt-[20px]">
              <div>
                <img
                  src="/faq_item.png"
                  alt="Question"
                  class="w-[14px] h-[14px] mx-[8px]"
                />
              </div>
              <div>
                <p class="text-[#121212] text-[14px] mb-[8px]">
                  {{ q?.question }}
                </p>
                <p class="text-[#414141] text-[12px]">{{ q?.answer }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-[48px]">
            <button
            class="bg-[#121212] text-[#fff] py-[13.5px] w-full rounded-[31px] !cursor-pointer hover:scale-101 transition-all duration-300 font-bold text-[18px]"
          >
            {{ $t("vechile.book_now") }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <Popup
    :show="showGoldenGuarantee"
    @close="showGoldenGuarantee = false"
    type="golden_guarantee"
  />
  <Popup
    :show="openDownloadPopup"
    @close="openDownloadPopup = false"
    type="download"
  />
</template>
<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const modules = [Autoplay, Pagination];
const carImgs = ref([]);
const { locale } = useI18n();
const route = useRoute();
const loading = ref(false);
const vehicle = ref(null);
const roadRoles = ref([]);
const faq = ref([]);
const showGoldenGuarantee = ref(false);
const openDownloadPopup = ref(false);

const getVehicle = async () => {
  loading.value = true;
  try {
    const response = await apiRequest(
      "GET",
      `/main/vehicles/show/${route.params.id}`,
      {},
      {},
      null,
      locale.value
    );
    vehicle.value = response?.data?.Vehicle;
    carImgs.value = vehicle.value?.vehicle_images;
    getRoadRules(vehicle.value);
  } catch (error) {
    console.error("Failed to load branches:", error);
    vehicle.value = null;
  } finally {
    loading.value = false;
  }
};
const getRoadRules = async (vehicle) => {
  loading.value = true;
  try {
    const response = await apiRequest(
      "GET",
      `/main/road-rules?country_id=${vehicle?.branch?.country_id?.id}`,
      {},
      {},
      null,
      locale.value
    );
    roadRoles.value = response?.data;
  } catch (error) {
    console.error("Failed to load road rules:", error);
    roadRoles.value = [];
  } finally {
    loading.value = false;
  }
};
const getFAQ = async () => {
  loading.value = true;
  try {
    const response = await apiRequest(
      "GET",
      `/main/faq-questions`,
      {},
      {},
      null,
      locale.value
    );
    faq.value = response?.data;
  } catch (error) {
    console.error("Failed to load branches:", error);
    faq.value = [];
  } finally {
    loading.value = false;
  }
};
onMounted(() => {
  getVehicle();
  getFAQ();
});
</script>
