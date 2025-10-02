<template>
  <div
    v-if="show"
    class="fixed inset-0 z-500 flex items-center justify-center bg-[#00000055] p-0 lg:!p-20"
    @click="handleClickOutside"
  >
    <div
      ref="modalRef"
      class="relative w-full p-6 bg-white bg-no-repeat mx-5 max-h-[80vh] overflow-y-auto"
      :class="
        type == 'logout' || type == 'delete_account' ? 'max-w-xl' : 'max-w-3xl'
      "
      style="
        /* background-image: url('/slider_top.png'), url('/slider_bottom.png'); */
        background-position: top 0 right 0, bottom 0 left 0;
      "
      data-aos="zoom-in"
    >
      <!-- Close Button -->
      <button
        @click="
          $emit('close'),
            (form.old_password = ''),
            (form.password = ''),
            (form.password_confirmation = ''),
            (showPassword = false),
            (showOldPassword = false),
            (showNewPassword = false),
            (newEmail = false),
            (firstOTP = false)
        "
        class="absolute top-0 left-0 text-white bg-[#4B007D] h-[40px] w-[40px] text-[16px] font-[700] cursor-pointer"
      >
        ✕
      </button>
      <!-- Title -->
      <h2
        class="text-center text-[24px] font-[700] mb-8"
        v-if="type === 'terms'"
      >
        {{ $t("static_pages.terms") }}
      </h2>
      <h2
        class="text-center text-[24px] font-[700] mb-8"
        v-if="type === 'privacy'"
      >
        {{ $t("static_pages.privacy") }}
      </h2>
      <h2
        class="text-center text-[24px] font-[700] mb-3"
        v-if="type === 'logout'"
      >
        {{ $t("static_pages.logout") }}
      </h2>

      <h2
        class="text-center text-[24px] font-[700] mb-3"
        v-if="type === 'delete_account'"
      >
        {{ $t("static_pages.delete_account") }}
      </h2>

      <p
        v-if="type === 'logout'"
        class="text-center text-[16px] font-[400] text-[#202020] mb-8"
      >
        {{ $t("static_pages.logout_desc") }}
      </p>

      <p
        v-if="type === 'delete_account'"
        class="text-center text-[16px] font-[400] text-[#202020] mb-8"
      >
        {{ $t("static_pages.delete_account_desc") }}
      </p>

      <div class="flex justify-center mb-4">
        <img
          v-if="type == 'login' || type == 'login_fav'"
          src="/login.png"
          alt="Login Icon"
          class="w-[109px] h-[120px]"
        />
      </div>

      <h2
        class="text-center text-[24px] font-[700] mb-3"
        v-if="type === 'login'"
      >
        {{ $t("static_pages.login") }}
      </h2>

      <h2
        class="text-center text-[24px] font-[700] mb-3"
        v-if="type === 'login_fav'"
      >
        {{ $t("static_pages.login_fav") }}
      </h2>

      <p
        v-if="type === 'login' || type === 'login_fav'"
        class="text-center text-[16px] font-[400] text-[#202020] mb-8"
      >
        {{ $t("static_pages.login_desc") }}
      </p>

      <div class="flex justify-center mb-4">
        <img
          v-if="type == 'subscription'"
          src="/subscription_img.png"
          alt="Subscription Icon"
          class="w-[154px] h-[120px]"
        />
      </div>

      <h2
        class="text-center text-[24px] font-[700] mb-3"
        v-if="type === 'subscription'"
      >
        {{ $t("static_pages.subscription") }}
      </h2>

      <p
        v-if="type === 'subscription'"
        class="text-center text-[16px] font-[400] text-[#202020] mb-8"
      >
        {{ $t("static_pages.subscription_desc") }}
      </p>

      <h2
        class="text-center text-[24px] font-[700] mb-3"
        v-if="type === 'change_password' && !successPopup"
      >
        {{ $t("static_pages.change_password") }}
      </h2>

      <p
        v-if="type === 'change_password' && !successPopup"
        class="text-center text-[16px] font-[400] text-[#202020] mb-8"
      >
        {{ $t("static_pages.change_password_desc") }}
      </p>

      <div v-if="type === 'change_password' && !successPopup" class="mx-20">
        <VeeForm
          @submit="changePassword"
          :validation-schema="validationSchemaPassword"
          :initial-values="initialValuesPassword"
          class="space-y-6"
          v-slot="{ errors }"
        >
          <div class="relative w-[100%] lg:!mb-0 my-6">
            <label
              for="old_password"
              class="block text-[16px] font-[400] text-[#202020] mb-2"
            >
              {{ $t("auth.old_password") }}
            </label>
            <div class="relative">
              <VeeField
                @input="backendError = ''"
                id="old_password"
                v-model="form.old_password"
                name="old_password"
                :type="showOldPassword ? 'text' : 'password'"
                :class="{
                  'border-red-500': errors.old_password,
                  'border-[#EEEDEE]': !errors.old_password,
                }"
                class="w-full px-4 py-3 ps-12 pe-12 border outline-none focus:ring-2 focus:ring-[#4B007D] placeholder:text-[#A3A2A3] placeholder:text-[14px]"
              />
              <!-- ADD THIS BUTTON FOR OLD PASSWORD -->
              <button
                type="button"
                @click.stop="showOldPassword = !showOldPassword"
                class="absolute end-3 top-1/2 transform -translate-y-1/2 text-[#a2a2a2] hover:text-[#4B007D] cursor-pointer"
              >
                <img
                  v-if="showOldPassword"
                  alt="Show Password"
                  src="/eye_pass.png"
                  class="w-[24px] h-[24px]"
                />
                <img
                  v-else
                  alt="Hide Password"
                  src="/eye_hide_pass.png"
                  class="w-[24px] h-[24px]"
                />
              </button>
              <div class="absolute start-3 top-1/2 transform -translate-y-1/2">
                <img
                  src="/password_icon.png"
                  alt="password"
                  class="w-[18px] h-[20px]"
                />
              </div>
            </div>
            <VeeErrorMessage
              name="old_password"
              class="text-red-500 text-sm mt-1 block"
            />
          </div>

          <!-- 2. NEW PASSWORD FIELD - Add eye icon -->
          <div class="relative w-[100%] lg:!mb-0 my-6">
            <label
              for="password"
              class="block text-[16px] font-[400] text-[#202020] mb-2"
            >
              {{ $t("auth.new_password") }}
            </label>
            <div class="relative">
              <VeeField
                @input="backendError = ''"
                id="password"
                v-model="form.password"
                name="password"
                :type="showNewPassword ? 'text' : 'password'"
                :class="{
                  'border-red-500': errors.password,
                  'border-[#EEEDEE]': !errors.password,
                }"
                class="w-full px-4 py-3 ps-12 pe-12 border outline-none focus:ring-2 focus:ring-[#4B007D] placeholder:text-[#A3A2A3] placeholder:text-[14px]"
              />
              <!-- ADD THIS BUTTON FOR NEW PASSWORD -->
              <button
                type="button"
                @click.stop="showNewPassword = !showNewPassword"
                class="absolute end-3 top-1/2 transform -translate-y-1/2 text-[#a2a2a2] hover:text-[#4B007D] cursor-pointer"
              >
                <img
                  v-if="showNewPassword"
                  alt="Show Password"
                  src="/eye_pass.png"
                  class="w-[24px] h-[24px]"
                />
                <img
                  v-else
                  alt="Hide Password"
                  src="/eye_hide_pass.png"
                  class="w-[24px] h-[24px]"
                />
              </button>
              <div class="absolute start-3 top-1/2 transform -translate-y-1/2">
                <img
                  src="/password_icon.png"
                  alt="password"
                  class="w-[18px] h-[20px]"
                />
              </div>
            </div>
            <VeeErrorMessage
              name="password"
              class="text-red-500 text-sm mt-1 block"
            />
          </div>

          <!-- 3. CONFIRM PASSWORD FIELD - Fix existing (add pe-12 class) -->
          <div class="relative w-[100%] lg:!mb-0 my-6">
            <label
              for="password_confirmation"
              class="block text-[16px] font-[400] text-[#202020] mb-2"
            >
              {{ $t("auth.new_password_confirmation") }}
            </label>
            <div class="relative">
              <VeeField
                @input="backendError = ''"
                id="password_confirmation"
                v-model="form.password_confirmation"
                name="password_confirmation"
                :type="showPassword ? 'text' : 'password'"
                :class="{
                  'border-red-500': errors.password_confirmation,
                  'border-[#EEEDEE]': !errors.password_confirmation,
                }"
                class="w-full px-4 py-3 ps-12 pe-12 border outline-none focus:ring-2 focus:ring-[#4B007D] placeholder:text-[#A3A2A3] placeholder:text-[14px]"
              />
              <button
                type="button"
                @click.stop="showPassword = !showPassword"
                class="absolute end-3 top-1/2 transform -translate-y-1/2 text-[#a2a2a2] hover:text-[#4B007D] cursor-pointer"
              >
                <img
                  v-if="showPassword"
                  alt="Show Password"
                  src="/eye_pass.png"
                  class="w-[24px] h-[24px]"
                />
                <img
                  v-else
                  alt="Hide Password"
                  src="/eye_hide_pass.png"
                  class="w-[24px] h-[24px]"
                />
              </button>
              <div class="absolute start-3 top-1/2 transform -translate-y-1/2">
                <img
                  src="/password_icon.png"
                  alt="password"
                  class="w-[18px] h-[20px]"
                />
              </div>
            </div>
            <VeeErrorMessage
              name="password_confirmation"
              class="text-red-500 text-sm mt-1 block"
            />
          </div>

          <!-- Submit Button -->
          <div class="w-[80%] mx-auto my-8">
            <BaseButton>
              {{ $t("contact.title") }}
            </BaseButton>
          </div>
        </VeeForm>
      </div>

      <h2
        v-if="type === 'change_email' && !emailSuccess"
        class="text-center text-[24px] font-[700] mb-3"
      >
        {{ $t("static_pages.change_email") }}
      </h2>

      <p
        v-if="
          type === 'change_email' && !firstOTP && !newEmail && !emailSuccess
        "
        class="text-center text-[16px] font-[400] text-[#202020] mb-8"
      >
        {{ $t("static_pages.change_email_desc") }}
      </p>

      <p
        v-if="type === 'change_email' && firstOTP && !newEmail && !emailSuccess"
        class="text-center text-[16px] font-[400] text-[#202020] mb-8"
      >
        {{ $t("static_pages.first_otp_desc") }}
      </p>

      <p
        v-if="type === 'change_email' && newEmail && !firstOTP && !emailSuccess"
        class="text-center text-[16px] font-[400] text-[#202020] mb-8"
      >
        {{ $t("auth.enter_new_email") }}
      </p>

      <div
        v-if="type === 'change_email' && !firstOTP && newEmail && !emailSuccess"
        class="mx-20"
      >
        <VeeForm
          @submit="submitNewEmail"
          :validation-schema="validationSchemaNewEmail"
          :initial-values="initialValuesNewEmail"
          class="space-y-6"
          v-slot="{ errors }"
        >
          <div class="relative w-[100%] lg:!mb-0 my-6">
            <label
              for="email"
              class="block text-[16px] font-[400] text-[#202020] mb-2"
            >
              {{ $t("auth.new_email") }}
            </label>
            <div class="relative">
              <VeeField
                @input="backendError = ''"
                id="email"
                v-model="form.email"
                name="email"
                :type="`text`"
                :class="{
                  'border-red-500': errors.email,
                  'border-[#EEEDEE]': !errors.email,
                }"
                class="w-full px-4 py-3 ps-12 pe-12 border outline-none focus:ring-2 focus:ring-[#4B007D] placeholder:text-[#A3A2A3] placeholder:text-[14px]"
                :placeholder="$t('auth.enter_new_email')"
              />
              <div class="absolute start-3 top-1/2 transform -translate-y-1/2">
                <img
                  src="/mail_icon.png"
                  alt="password"
                  class="w-[24px] h-[24px]"
                />
              </div>
            </div>
            <p
              class="text-red-500 text-sm mt-5 block"
              v-if="backendError"
              data-aos="fade-up"
            >
              {{ backendError }}
            </p>
            <VeeErrorMessage
              name="email"
              class="text-red-500 text-sm mt-1 block"
            />
          </div>
          <div class="w-[80%] mx-auto my-8">
            <BaseButton
              :content="$t('courses.confirm')"
              border-color="#E77C5A"
              bg-color="#4B007D"
              width="100%"
              class="mx-auto my-4"
              lg_space="true"
              font_size="16px"
              type="submit"
              :lg_reversed_space="true"
              :pending="isSubmittingNewEmail"
            />
          </div>
        </VeeForm>
      </div>

      <div
        v-if="type === 'change_email' && firstOTP && !newEmail && !emailSuccess"
        class="mx-20"
      >
        <VeeForm
          @submit="submitOTP"
          :validation-schema="validationSchemaOTP"
          class="space-y-6"
          v-slot="{ errors }"
        >
          <div class="relative">
            <div class="flex justify-between">
              <label class="block text-[16px] font-[400] text-[#202020] mb-5">
                {{ $t("auth.enter_otp") }}
              </label>
              <p
                class="text-[13px] font-bold text-[#4B007D] underline cursor-pointer"
                @click.stop="(firstOTP = false), (newEmail = true)"
              >
                {{ $t("profile.change_email") }}
              </p>
            </div>
            <div
              class="flex justify-center lg:!justify-between gap-2"
              dir="ltr"
            >
              <div>
                <input
                  v-model="form.digit1"
                  ref="input0"
                  type="tel"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  placeholder="-"
                  @input="handleInput($event, 0), (backendError = '')"
                  @keydown="handleKeydown($event, 0)"
                  @paste="handlePaste"
                  @focus="handleFocus(0)"
                  :class="{
                    'border-red-500': hasError('digit1', errors),
                    'border-[#EEEDEE]': !hasError('digit1', errors),
                  }"
                  class="xl:!w-[102.5px] w-[50px] h-[50px] px-4 py-3 border outline-none focus:ring-2 focus:ring-[#4B007D] placeholder:text-[#A3A2A3] placeholder:text-[14px] text-center"
                  maxlength="1"
                  autocomplete="one-time-code"
                />
                <VeeField v-model="form.digit1" name="digit1" type="hidden" />
              </div>
              <div>
                <input
                  v-model="form.digit2"
                  ref="input1"
                  type="tel"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  placeholder="-"
                  @input="handleInput($event, 1), (backendError = '')"
                  @keydown="handleKeydown($event, 1)"
                  @paste="handlePaste"
                  @focus="handleFocus(1)"
                  :class="{
                    'border-red-500': hasError('digit2', errors),
                    'border-[#EEEDEE]': !hasError('digit2', errors),
                  }"
                  class="xl:!w-[102.5px] w-[50px] h-[50px] px-4 py-3 border outline-none focus:ring-2 focus:ring-[#4B007D] placeholder:text-[#A3A2A3] placeholder:text-[14px] text-center"
                  maxlength="1"
                  autocomplete="one-time-code"
                />
                <VeeField v-model="form.digit2" name="digit2" type="hidden" />
              </div>
              <div>
                <input
                  v-model="form.digit3"
                  ref="input2"
                  type="tel"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  placeholder="-"
                  @input="handleInput($event, 2), (backendError = '')"
                  @keydown="handleKeydown($event, 2)"
                  @paste="handlePaste"
                  @focus="handleFocus(2)"
                  :class="{
                    'border-red-500': hasError('digit3', errors),
                    'border-[#EEEDEE]': !hasError('digit3', errors),
                  }"
                  class="xl:!w-[102.5px] w-[50px] h-[50px] px-4 py-3 border outline-none focus:ring-2 focus:ring-[#4B007D] placeholder:text-[#A3A2A3] placeholder:text-[14px] text-center"
                  maxlength="1"
                  autocomplete="one-time-code"
                />
                <VeeField v-model="form.digit3" name="digit3" type="hidden" />
              </div>
              <div>
                <input
                  v-model="form.digit4"
                  ref="input3"
                  type="tel"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  placeholder="-"
                  @input="handleInput($event, 3), (backendError = '')"
                  @keydown="handleKeydown($event, 3)"
                  @paste="handlePaste"
                  @focus="handleFocus(3)"
                  :class="{
                    'border-red-500': hasError('digit4', errors),
                    'border-[#EEEDEE]': !hasError('digit4', errors),
                  }"
                  class="xl:!w-[102.5px] w-[50px] h-[50px] px-4 py-3 border outline-none focus:ring-2 focus:ring-[#4B007D] placeholder:text-[#A3A2A3] placeholder:text-[14px] text-center"
                  maxlength="1"
                  autocomplete="one-time-code"
                />
                <VeeField v-model="form.digit4" name="digit4" type="hidden" />
              </div>
            </div>
            <p
              class="text-red-500 text-sm mt-5 block"
              v-if="
                errors.digit1 || errors.digit2 || errors.digit3 || errors.digit4
              "
            >
              {{
                errors.digit1 || errors.digit2 || errors.digit3 || errors.digit4
              }}
            </p>
            <p
              class="text-red-500 text-sm mt-5 block"
              v-if="backendError"
              data-aos="fade-up"
            >
              {{ backendError }}
            </p>
            <p
              class="text-green-500 text-sm mt-5 block"
              v-if="resendSuccess"
              data-aos="fade-up"
            >
              {{ resendSuccess }}
            </p>
          </div>

          <!-- Resend Code Section -->
          <div class="flex justify-center items-center mt-6">
            <span class="text-[14px] text-[#202020] mx-2">
              {{ $t("auth.didnt_receive_code") }}
            </span>
            <button
              type="button"
              @click.stop="handleResendCode"
              :disabled="isResendDisabled || isResending"
              :class="{
                'text-[#4B007D] hover:underline cursor-pointer':
                  !isResendDisabled && !isResending,
                'text-gray-400 cursor-not-allowed':
                  isResendDisabled || isResending,
              }"
              class="text-[14px] font-[600] transition-colors"
            >
              <span v-if="isResending">{{ $t("auth.sending") }}</span>
              <span v-else-if="isResendDisabled">
                {{ $t("auth.resend_in") }} {{ formatTime(resendTimer) }}
              </span>
              <span v-else>{{ $t("auth.resend_code") }}</span>
            </button>
          </div>

          <BaseButton
            :content="$t('auth.submit')"
            border-color="#E77C5A"
            bg-color="#4B007D"
            class="!mt-12 !mb-8 z-50 m-auto text-[18px]"
            :lg_reversed_space="true"
            width="100%"
            font_size="18px"
            :disabled="Object.keys(errors).length > 0"
            :pending="isSubmitting"
            type="submit"
          />
        </VeeForm>
      </div>

      <!-- Image -->
      <div class="flex justify-center mb-4">
        <img
          v-if="type == 'terms'"
          src="/terms.png"
          alt="Terms Icon"
          class="w-[106px] h-[120px]"
        />
        <img
          v-if="type == 'privacy'"
          src="/privacy.png"
          alt="Privacy Icon"
          class="w-[111px] h-[120px]"
        />
        <img
          v-if="type == 'logout'"
          src="/logout_img.png"
          alt="Logout Icon"
          class="w-[120px] h-[120px]"
        />
        <img
          v-if="type == 'delete_account'"
          src="/delete_account.png"
          alt="Delete Account Icon"
          class="w-[150px] h-[120px]"
        />
        <img
          v-if="type == 'alert' || type == 'failed_package'"
          src="/alert_img.png"
          alt="Error Icon"
          class="w-[154px] h-[120px] m-auto"
        />
        <img
          v-if="type == 'package'"
          src="/package.png"
          alt="Package"
          class="w-[154px] h-[120px] m-auto"
        />
        <img
          v-if="type == 'success_package'"
          src="/success_pkg.png"
          alt="Package"
          class="w-[154px] h-[120px] m-auto"
        />
        <img
          v-if="successPopup || emailSuccess"
          src="/success.png"
          alt="Success"
          class="w-[116px] h-[120px] m-auto"
        />
        <img
          v-if="
            type == 'change_email' && !firstOTP && !newEmail && !emailSuccess
          "
          src="/change_email.png"
          alt="Change Email"
          class="w-[126px] h-[120px] m-auto"
        />
      </div>

      <div class="flex justify-center">
        <BaseButton
          v-if="
            type == 'change_email' && !firstOTP && !newEmail && !emailSuccess
          "
          :content="$t('static_pages.change_email')"
          border-color="#E77C5A"
          bg-color="#4B007D"
          class="!mx-auto my-8"
          lg_space="true"
          width="270px"
          font_size="16px"
          type="submit"
          :lg_reversed_space="true"
          @click.stop="newEmail = true"
        />
      </div>

      <h2 v-if="successPopup" class="text-center text-[24px] font-[700] my-8">
        {{ $t("auth.password_changed_successfully") }}
      </h2>

      <h2 v-if="emailSuccess" class="text-center text-[24px] font-[700] my-8">
        {{ $t("auth.email_changed_successfully") }}
      </h2>

      <!-- Content -->

      <div
        class="text-start text-[16px] font-[400] overflow-y-auto px-5 lg:px-16 max-h-[calc(80vh-300px)]"
        v-if="!loading"
      >
        <div
          v-if="type === 'terms' && locale === 'ar'"
          v-html="terms?.value?.ar"
        ></div>
        <div
          v-if="type === 'terms' && locale === 'en'"
          v-html="terms?.value?.en"
        ></div>
        <div
          v-if="type === 'privacy' && locale === 'ar'"
          v-html="privacy?.value?.ar"
        ></div>
        <div
          v-if="type === 'privacy' && locale === 'en'"
          v-html="privacy?.value?.en"
        ></div>
        <div v-if="type === 'alert'" class="text-center my-8 text-[20px]">
          {{ $t("course_details.please_finish_previous") }}
        </div>
        <div v-if="type === 'package'" class="mx-5">
          <h1 class="text-[24px] font-[800] my-3 text-center">
            {{ pkg?.name }}
          </h1>
          <p class="text-[16px] font-[400] my-3 text-center">
            {{ pkg?.period }} {{ $t("packages.sub_desc") }}
          </p>
          <div>
            <div class="flex justify-between py-2">
              <p class="text-[18px]">{{ $t("packages.price") }}</p>
              <div class="flex items-center">
                <p class="text-[18px] font-bold">{{ pkg?.price }}</p>
                <img
                  alt="SAR"
                  src="/sar.png"
                  class="w-[16px] h-[14.7px] mx-2 mb-1"
                />
              </div>
            </div>
            <div class="flex justify-between py-2">
              <p class="text-[18px]">{{ $t("packages.duration") }}</p>
              <div class="flex items-center">
                <p class="text-[18px] font-bold">{{ pkg?.period }}</p>
                <p class="text-[18px] font-bold mx-1">
                  {{ $t("packages.month") }}
                </p>
              </div>
            </div>
            <div class="flex justify-between py-2">
              <p class="text-[18px]">{{ $t("packages.tax") }}</p>
              <div class="flex items-center">
                <p class="text-[18px] font-bold">{{ pkg?.tax }}</p>
                <img
                  alt="SAR"
                  src="/sar.png"
                  class="w-[16px] h-[14.7px] mx-2 mb-1"
                />
              </div>
            </div>
            <div class="flex justify-between py-2">
              <p class="text-[18px]">{{ $t("packages.total") }}</p>
              <div class="flex items-center">
                <p class="text-[18px] font-bold">
                  {{
                    (pkg?.price || 0) +
                    ((pkg?.price || 0) * (pkg?.tax || 0)) / 100
                  }}
                </p>
                <img
                  alt="SAR"
                  src="/sar.png"
                  class="w-[16px] h-[14.7px] mx-2 mb-1"
                />
              </div>
            </div>
          </div>
          <div class="w-[80%] mx-auto">
            <BaseButton
              :content="$t('courses.subscribe_now')"
              border-color="#E77C5A"
              bg-color="#4B007D"
              width="100%"
              class="mx-auto my-4"
              lg_space="true"
              font_size="16px"
              :pending="subscribe_loading"
              @click.stop="subscribe"
            />
          </div>
        </div>
        <div v-if="type === 'success_package'">
          <h1 class="text-[24px] font-[800] my-3 text-center">
            {{ $t("packages.congratulations") }}
          </h1>
          <p class="text-[16px] font-[400] mt-3 mb-8 text-center">
            {{ $t("packages.success_package_desc") }}
          </p>
        </div>
        <div v-if="type === 'failed_package'">
          <h1 class="text-[24px] font-[800] my-3 text-center">
            {{ $t("packages.error") }}
          </h1>
          <p class="text-[16px] font-[400] mt-3 mb-8 text-center">
            {{ errorMessage }}
          </p>
        </div>
      </div>
      <!-- Logout Button -->
      <div
        v-if="type === 'logout'"
        class="flex items-center justify-center mt-4 mb-2 text-[#DC3545] cursor-pointer transition-colors duration-200"
        @click="handleLogout"
      >
        <div
          class="flex items-center justify-center gap-3 border border-[#DC3545] px-5 py-2 hover:bg-red-50 w-[314px] h-[48px]"
        >
          <img src="/logout.png" class="w-[20px] h-[20px]" />
          <span>{{ $t("nav.logout") }}</span>
        </div>
      </div>

      <!-- Delete Account -->
      <div
        v-if="type === 'delete_account'"
        class="flex items-center justify-center mt-4 mb-2 text-[#DC3545] cursor-pointer transition-colors duration-200"
        @click="handleDeleteAccount"
      >
        <div
          class="flex items-center justify-center gap-3 border border-[#DC3545] px-5 py-2 hover:bg-red-50 w-[314px] h-[48px]"
        >
          <img src="/delete_account_icon.png" class="w-[20px] h-[20px]" />
          <span>{{ $t("static_pages.delete_my_account") }}</span>
        </div>
      </div>
      <!-- Advantage -->
      <div
        v-if="type == 'advantage'"
        class="bg-white m-auto text-center min-h-[300px]"
      >
        <img
          :src="advantage?.image"
          alt="Why Us"
          class="w-[118px] h-[128px] m-auto object-contain"
        />
        <div class="px-10">
          <h1 class="text-[24px] font-[800] my-3">
            {{ advantage?.name }}
          </h1>
          <div>
            <p :class="['text-[16px] font-[400] text-[#202020]']">
              {{ advantage?.description }}
            </p>
          </div>
        </div>
      </div>
      <div v-if="type === 'endExam'" class="text-center">
        <h1 class="text-[24px] font-[800]">
          {{ $t("exam.submit") }}
        </h1>
        <p class="text-[16px] font-[400] mt-3 mb-8">
          {{ $t("exam.confirm_end_exam") }}
        </p>
        <img
          src="/end_exam_img.png"
          alt="End Exam"
          class="w-[110px] h-[120px] m-auto"
        />
        <div class="flex gap-4 justify-center">
          <BaseButton
            :content="$t('exam.submit')"
            bg-color="#4B007D"
            font_size="16px"
            width="302px"
            @click="$emit('submit')"
            class="my-5"
            :lg_reversed_space="true"
            border-color="#E77C5A"
          />
        </div>
      </div>

      <div v-if="type === 'rateCourse'" class="text-center">
        <h1 class="text-[24px] font-[800]">
          {{ $t("courses.rate_course_title") }}
        </h1>
        <p class="text-[16px] font-[400] mt-3 mb-8">
          {{ $t("courses.rate_course_desc") }}
        </p>
        <StarRating v-model="rating" />
        <div class="text-start w-[80%] mx-auto mb-8">
          <p class="text-[16px] text-[#202020] mb-2">
            {{ $t("courses.share_your_experience") }}
          </p>
          <div
            class="flex gap-2 justify-center border-[1.5px] border-[#EEEDEE]"
          >
            <img
              src="/comment.png"
              alt="Comment"
              class="w-[24px] h-[24px] m-3"
            />
            <textarea
              v-model="comment"
              :placeholder="$t('courses.comment_here')"
              class="w-full p-3 h-[70px] resize-none"
            ></textarea>
          </div>
        </div>
        <div class="flex gap-4 justify-center">
          <BaseButton
            :content="$t('courses.confirm')"
            bg-color="#4B007D"
            font_size="16px"
            width="302px"
            @click="rateCourse"
            class="my-5"
            :lg_reversed_space="true"
            border-color="#E77C5A"
            :pending="rateLoading"
          />
        </div>
      </div>

      <!-- <div v-if="type === 'downloadCertificate'" class="text-center">
        <h1 class="text-[24px] font-[800]">
          {{ $t("exam.submit") }}
        </h1>
        <p class="text-[16px] font-[400] mt-3 mb-8">
          {{ $t("exam.confirm_end_exam") }}
        </p>
        <img
          src="/end_exam_img.png"
          alt="End Exam"
          class="w-[110px] h-[120px] m-auto"
        />
        <div class="flex gap-4 justify-center">
          <BaseButton
            :content="$t('exam.submit')"
            bg-color="#4B007D"
            font_size="16px"
            width="302px"
            @click="$emit('submit')"
            class="my-5"
            :lg_reversed_space="true"
            border-color="#E77C5A"
          />
        </div>
      </div> -->

      <!-- Question Review Section -->
      <div v-if="type == 'question'" class="mx-16">
        <h1 class="text-[24px] font-bold text-center">
          {{ $t("exam.question_number") }} {{ questionIndex }}
        </h1>
        <p class="text-[16px] mt-3 mb-8 text-center">
          {{ $t("exam.review_answer_number") }} {{ questionIndex }}
        </p>

        <div class="border border-[#EEEDEE] p-5" dir="ltr">
          <h1
            class="text-[16px] font-bold text-start mb-4"
            v-html="question?.question?.question"
          ></h1>

          <!-- MCQ and Multi-choice Questions -->
          <div
            v-if="
              ['mcq', 'multi_choice', 'true_false'].includes(
                question?.question?.type
              )
            "
          >
            <div
              v-for="(answer, index) in question?.question?.answers"
              :key="index"
              class="h-auto min-h-[50px] p-3 border border-[#EEEDEE] mb-3"
              :class="getAnswerBorderClass(answer)"
            >
              <div class="flex items-center gap-2 justify-start">
                <img
                  :src="getAnswerIcon(answer)"
                  :alt="getAnswerIconAlt(answer)"
                  class="w-[24px] h-[24px]"
                />
                <p class="text-start" v-html="answer.answer"></p>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-2 gap-4">
            <!-- Left side (base items) -->
            <div class="space-y-2">
              <!-- <h3 class="font-semibold text-gray-700 mb-2">Base Items</h3> -->
              <div
                v-for="baseItem in question?.question?.match_answers?.base"
                :key="baseItem.id"
                class="p-3 border border-[#EEEDEE] bg-gray-50 rounded"
              >
                <span v-html="baseItem.answer"></span>
              </div>
            </div>

            <!-- Right side (options) -->
            <div class="space-y-2">
              <!-- <h3 class="font-semibold text-gray-700 mb-2">Options</h3> -->
              <div
                v-for="option in question?.question?.match_answers?.options"
                :key="option.id"
                class="p-3 border border-[#EEEDEE] bg-gray-50 rounded"
              >
                <span v-html="option.answer"></span>
              </div>
            </div>
          </div>
        </div>
        <div
          class="border border-[#EEEDEE] p-5 mt-5"
          v-if="
            question?.question?.type === 'match' &&
            question?.question?.match_answers
          "
        >
          <!-- Matching Questions -->
          <div v-if="question?.question?.type === 'match'" class="space-y-4">
            <!-- Matching Results -->
            <div class="mt-6">
              <h3 class="font-semibold text-gray-700 mb-3 text-start">
                {{ $t("exam.your_answer") }}
              </h3>
              <div class="space-y-2">
                <div
                  v-for="(match, index) in getUserMatches()"
                  :key="index"
                  class="flex items-center gap-3 p-3 border rounded"
                  :class="getMatchBorderClass(match)"
                  dir="ltr"
                >
                  <img
                    :src="getMatchIcon(match)"
                    :alt="getMatchIconAlt(match)"
                    class="w-[24px] h-[24px]"
                  />
                  <div class="flex gap-2 items-center">
                    <span class="font-medium">{{
                      getBaseItemText(match.left)
                    }}</span>
                    <span class="text-center text-gray-500">→</span>
                    <span v-html="getOptionItemText(match.right)"></span>
                  </div>
                </div>
              </div>

              <!-- Correct Matches -->
              <div class="mt-8" v-if="!question?.is_correct">
                <h3 class="font-semibold text-green-700 mb-3 text-start">
                  {{ $t("exam.correct_answer") }}
                </h3>
                <div class="space-y-2">
                  <div
                    v-for="(correctMatch, index) in getCorrectMatches()"
                    :key="index"
                    class="flex items-center gap-3 p-3 border border-green-500 bg-green-50 rounded"
                    dir="ltr"
                  >
                    <img
                      src="/correct.png"
                      alt="Correct"
                      class="w-[24px] h-[24px]"
                    />
                    <div class="flex gap-2 items-center">
                      <span class="font-medium">{{
                        correctMatch.baseText
                      }}</span>
                      <span class="text-center text-gray-500">→</span>
                      <span v-html="correctMatch.optionText"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Order Questions -->
        <div
          v-if="question?.question?.type === 'orderd'"
          class="space-y-4 mt-5 border border-[#EEEDEE] p-5"
        >
          <h3 class="font-semibold text-gray-700 mb-3">
            {{ $t("exam.your_answer") }}
          </h3>
          <div class="space-y-2">
            <div
              v-for="(answer, index) in getUserOrderedAnswers()"
              :key="index"
              class="flex items-center gap-3 p-3 border rounded"
              :class="getOrderBorderClass(answer, index + 1)"
              dir="ltr"
            >
              <div class="flex items-center gap-2">
                <span
                  class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium"
                >
                  {{ index + 1 }}
                </span>
                <img
                  :src="getOrderIcon(answer, index + 1)"
                  :alt="getOrderIconAlt(answer, index + 1)"
                  class="w-[24px] h-[24px]"
                />
              </div>
              <span class="flex-1" v-html="answer.answer"></span>
            </div>
          </div>

          <!-- Correct Order -->
          <div class="mt-8" v-if="!question?.is_correct">
            <h3 class="font-semibold text-green-700 mb-3">
              {{ $t("exam.correct_answer") }}
            </h3>
            <div class="space-y-2" dir="ltr">
              <div
                v-for="(answer, index) in getCorrectOrderedAnswers()"
                :key="index"
                class="flex items-center gap-3 p-3 border border-green-500 bg-green-50 rounded"
              >
                <div class="flex items-center gap-2">
                  <span
                    class="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center text-sm font-medium"
                  >
                    {{ index + 1 }}
                  </span>
                  <img
                    src="/correct.png"
                    alt="Correct"
                    class="w-[24px] h-[24px]"
                  />
                </div>
                <span class="flex-1" v-html="answer.answer"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="border border-[1px] border-[#EEEDEE] p-5 mt-8 text-center">
          <span class="font-bold">{{ $t("exam.answer_status") }}: </span>
          <img
            :src="question?.is_correct ? '/correct.png' : '/wrong.png'"
            alt="Answer Status"
            class="w-[24px] h-[24px] mx-1 inline"
          />
          <span
            :class="
              question?.is_correct
                ? 'text-[#34C759] font-bold'
                : 'text-[#DC3545] font-bold'
            "
            >{{
              question?.is_correct ? $t("exam.correct") : $t("exam.wrong")
            }}</span
          >
          <div
            v-if="!question?.is_correct && !question?.answer_ids"
            class="text-[14px] mt-4"
          >
            {{ $t("exam.not_answered") }}
          </div>
        </div>
      </div>

      <UIButtonLoader
        class="mx-auto !my-20"
        border-color="#4B007D"
        v-if="loading"
      />
    </div>
  </div>
</template>

<script setup>
import { showToast } from "~/utils/showToast";
import * as yup from "yup";
import { configure } from "vee-validate";
configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
});

const { t, locale } = useI18n();
const props = defineProps({
  show: Boolean,
  type: String,
  advantage: Object,
  pkg: Object,
  readLoading: {
    type: Boolean,
    default: false,
  },
  errorMessage: String,
  question: Object,
  questionIndex: Number,
  courseRateID: String,
});
const emit = defineEmits(["close", "email-success"]);
const changePasswordLoading = ref(false);
const firstOtpLoading = ref(false);
const newEmail = ref(false);
const showPassword = ref(false);
const showOldPassword = ref(false);
const showNewPassword = ref(false);
const successPopup = ref(false);
const emailSuccess = ref(false);
const backendError = ref("");
const terms = ref(``);
const privacy = ref(``);
const modalRef = ref(null);
const rating = ref(null);
const tokenCookie = useCookie("dos_token", { maxAge: 60 * 60 * 24 * 90 });
const OtpTokenCookie = useCookie("dos_otp_token", {
  maxAge: 60 * 60 * 24 * 90,
});
const studentName = useCookie("dos_student_name", {
  maxAge: 60 * 60 * 24 * 90,
});
const academic_stage = useCookie("dos_academic_stage", {
  maxAge: 60 * 60 * 24 * 90,
});
const academic_year = useCookie("dos_academic_year", {
  maxAge: 60 * 60 * 24 * 90,
});
const router = useRouter();
const localePath = useLocalePath();
const loading = ref(true);
const rateLoading = ref(false);
const subscribe_loading = ref(false);
const route = useRoute();
const comment = ref("");
const firstOTP = ref(false);
const isSubmitting = ref(false);
const isSubmittingNewEmail = ref(false);

const form = reactive({
  old_password: "",
  password: "",
  password_confirmation: "",
  digit1: "",
  digit2: "",
  digit3: "",
  digit4: "",
});

// MCQ, multi-choice, and true/false questions
const getAnswerBorderClass = (answer) => {
  if (answer?.is_correct) {
    return "!border-[#34C759]";
  }
  if (!answer?.is_correct && props.question?.answer_ids?.includes(answer.id)) {
    return "!border-[#DC3545]";
  }
  return "";
};

const getAnswerIcon = (answer) => {
  if (answer?.is_correct) {
    return "/correct.png";
  }
  if (!answer?.is_correct && props.question?.answer_ids?.includes(answer.id)) {
    return "/wrong.png";
  }
  return "/not_an_answer.png";
};

const getAnswerIconAlt = (answer) => {
  if (answer?.is_correct) {
    return "Correct";
  }
  if (!answer?.is_correct && props.question?.answer_ids?.includes(answer.id)) {
    return "Wrong";
  }
  return "Not an answer";
};

// Matching questions
const getUserMatches = () => {
  if (
    !props.question?.answer_ids ||
    !Array.isArray(props.question.answer_ids)
  ) {
    return [];
  }
  return props.question.answer_ids.filter((item) => item.left && item.right);
};

const getCorrectMatches = () => {
  if (!props.question?.question?.match_answers) return [];

  const base = props.question.question.match_answers.base || [];
  const options = props.question.question.match_answers.options || [];

  return base
    .map((baseItem) => {
      const correctOption = options.find(
        (option) => option.parent_id === baseItem.id
      );
      return {
        baseText: baseItem.answer,
        optionText: correctOption?.answer || "",
        baseId: baseItem.id,
        optionId: correctOption?.id,
      };
    })
    .filter((match) => match.optionText);
};

const getMatchBorderClass = (match) => {
  const correctMatches = getCorrectMatches();
  const isCorrect = correctMatches.some(
    (correct) =>
      correct.baseId === match.left && correct.optionId === match.right
  );

  return isCorrect
    ? "border-green-500 bg-green-50"
    : "border-red-500 bg-red-50";
};

const getMatchIcon = (match) => {
  const correctMatches = getCorrectMatches();
  const isCorrect = correctMatches.some(
    (correct) =>
      correct.baseId === match.left && correct.optionId === match.right
  );

  return isCorrect ? "/correct.png" : "/wrong.png";
};

const getMatchIconAlt = (match) => {
  const correctMatches = getCorrectMatches();
  const isCorrect = correctMatches.some(
    (correct) =>
      correct.baseId === match.left && correct.optionId === match.right
  );

  return isCorrect ? "Correct" : "Wrong";
};

const getBaseItemText = (baseId) => {
  const baseItem = props.question?.question?.match_answers?.base?.find(
    (item) => item.id === baseId
  );
  return baseItem?.answer || "";
};

const getOptionItemText = (optionId) => {
  const optionItem = props.question?.question?.match_answers?.options?.find(
    (item) => item.id === optionId
  );
  return optionItem?.answer || "";
};

// Order questions
const getUserOrderedAnswers = () => {
  if (
    !props.question?.answer_ids ||
    !Array.isArray(props.question.answer_ids)
  ) {
    return [];
  }

  const answers = props.question.question.answers || [];
  return props.question.answer_ids
    .map((answerId) => {
      return answers.find((answer) => answer.id === answerId);
    })
    .filter(Boolean);
};

const getCorrectOrderedAnswers = () => {
  const answers = props.question?.question?.answers || [];
  return [...answers].sort((a, b) => (a.orderd || 0) - (b.orderd || 0));
};

const getOrderBorderClass = (answer, currentPosition) => {
  const correctPosition = answer?.orderd || 0;
  return correctPosition === currentPosition
    ? "border-green-500 bg-green-50"
    : "border-red-500 bg-red-50";
};

const getOrderIcon = (answer, currentPosition) => {
  const correctPosition = answer?.orderd || 0;
  return correctPosition === currentPosition ? "/correct.png" : "/wrong.png";
};

const getOrderIconAlt = (answer, currentPosition) => {
  const correctPosition = answer?.orderd || 0;
  return correctPosition === currentPosition ? "Correct" : "Wrong";
};

const subscribe = async () => {
  if (!props.pkg) return;

  subscribe_loading.value = true;

  try {
    const response = await apiRequest(
      "POST",
      "/subscriptions/store",
      { package_id: props.pkg.id },
      {},
      tokenCookie.value,
      locale.value
    );
    emit("switch", "success_package");
  } catch (error) {
    emit("switch", "failed_package", error?.response?.data?.message);
  } finally {
    subscribe_loading.value = false;
  }
};

const handleClickOutside = (e) => {
  e.stopPropagation();
  if (modalRef.value && !modalRef.value.contains(e.target)) {
    emit("close");
    form.old_password = "";
    form.password = "";
    form.password_confirmation = "";
    showPassword.value = false;
    showOldPassword.value = false;
    showNewPassword.value = false;
    newEmail.value = false;
    firstOTP.value = false;
  }
};

const handleLogout = () => {
  apiRequest("POST", "/auth/logout", {}, {}, tokenCookie.value, locale.value);
  tokenCookie.value = null;
  OtpTokenCookie.value = null;
  academic_stage.value = null;
  academic_year.value = null;
  studentName.value = null;
  document.body.classList.remove("overflow-hidden");
  emit("close");
  router.push(localePath("/"));
};

const handleDeleteAccount = () => {
  apiRequest(
    "DELETE",
    "/auth/delete-account",
    {},
    {},
    tokenCookie.value,
    locale.value
  );
  tokenCookie.value = null;
  OtpTokenCookie.value = null;
  academic_stage.value = null;
  academic_year.value = null;
  studentName.value = null;
  document.body.classList.remove("overflow-hidden");
  emit("close");
  router.push(localePath("/"));
};

watch(
  () => props.show,
  async (visible) => {
    if (!process.client) return;

    document.body.classList.toggle("overflow-hidden", visible);

    if (visible) {
      loading.value = true;

      if (props.type === "terms") {
        try {
          const response = await apiRequest(
            "GET",
            "/settings?key=terms_and_conditions",
            {},
            {},
            tokenCookie.value,
            locale.value
          );
          terms.value = response?.data?.data[0];
        } catch (err) {
          console.error("Failed to fetch terms:", err);
        }
      }

      if (props.type === "privacy") {
        try {
          const response = await apiRequest(
            "GET",
            "/settings?key=privacy_policy",
            {},
            {},
            tokenCookie.value,
            locale.value
          );
          privacy.value = response?.data?.data[0];
        } catch (err) {
          console.error("Failed to fetch privacy policy:", err);
        }
      }
      // if (props.type == "login" || props.type == "login_fav") {
      //   setTimeout(() => {
      //     router.push(localePath("/auth/login"));
      //   }, 3000);
      // }
      if (props.type == "subscription") {
        setTimeout(() => {
          router.push(localePath("/packages"));
        }, 3000);
      }
      loading.value = false;
    }
  },
  { immediate: true }
);

watch(successPopup, () => {
  if (successPopup?.value == true) {
    setTimeout(() => {
      emit("close");
      successPopup.value = false;
    }, 3000);
  }
});
watch(emailSuccess, () => {
  if (emailSuccess?.value == true) {
    emit("email-success");
    setTimeout(() => {
      emit("close");
      emailSuccess.value = false;
    }, 3000);
  }
});
const rateCourse = async () => {
  rateLoading.value = true;
  try {
    const response = await apiRequest(
      "POST",
      "/rates/rate-course",
      {
        course_id: route.params?.id || props.courseRateID,
        rate: rating.value,
        comment: comment.value,
      },
      {},
      tokenCookie.value,
      locale.value
    );
    showToast(response?.data?.message, "success");
    emit("close");
    rating.value = null;
    comment.value = "";
    rateLoading.value = false;
    router.push({
      query: {
        ...route.query,
        reload: "true",
      },
    });
  } catch (error) {
    rateLoading.value = false;
    showToast(error);
    if (
      error?.response?.data?.message == "لقد قمت بتقييم هذا الكورس بالفعل." ||
      error?.response?.data?.message == "You have already rated this course."
    ) {
      emit("close");
      rating.value = null;
      comment.value = "";
    }
  }
};

onMounted(() => {
  detectMobile();

  if (route?.query?.type == "register" || route?.query?.type == "login") {
    handleResendCode();
  }

  setTimeout(() => {
    const firstInput = getInputRef(0);
    if (firstInput) {
      firstInput.focus();
    }
  }, 100);
});

onUnmounted(() => {
  if (process.client) {
    document.body.classList.remove("overflow-hidden");
  }
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
  }
});

// Validation schema
const validationSchemaPassword = yup.object({
  old_password: yup
    .string()
    .required(t("validation.password_required"))
    .min(8, t("validation.password_min"))
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      t("validation.password_strength")
    ),
  password: yup
    .string()
    .required(t("validation.password_required"))
    .min(8, t("validation.password_min"))
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      t("validation.password_strength")
    ),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], t("validation.password_mismatch"))
    .required(t("validation.password_confirmation_required")),
});

const initialValuesPassword = {
  old_password: "",
  password: "",
  password_confirmation: "",
};

const changePassword = async (values) => {
  changePasswordLoading.value = true;
  backendError.value = "";

  try {
    const response = await apiRequest(
      "POST",
      "/auth/chang-password",
      {
        old_password: values.old_password,
        password: values.password,
        password_confirmation: values.password_confirmation,
      },
      {},
      tokenCookie.value,
      locale.value
    );
    console.log("response", response);
    tokenCookie.value = response?.data?.access_token;
    // showToast(
    //   response?.data?.message || t("auth.password_changed_successfully"),
    //   "success"
    // );
    successPopup.value = true;
    // emit("close");

    // Reset form
    Object.keys(form).forEach((key) => {
      form[key] = "";
    });
  } catch (error) {
    backendError.value =
      error?.response?.data?.message || t("auth.password_change_failed");
    showToast(backendError.value, "error");
  } finally {
    changePasswordLoading.value = false;
  }
};

// New Email
const validationSchemaNewEmail = yup.object({
  email: yup
    .string()
    .required(t("validation.email_required"))
    .email(t("validation.email_invalid"))
    .trim()
    .lowercase(),
});
const initialValuesNewEmail = {
  email: "",
};

const submitNewEmail = async (values) => {
  backendError.value = "";
  try {
    isSubmittingNewEmail.value = true;
    const userData = {
      email: values.email,
    };
    const result = await apiRequest(
      "POST",
      "/auth/update-email",
      userData,
      {},
      tokenCookie.value,
      locale.value
    );
    firstOTP.value = true;
    newEmail.value = false;
    form.email = "";
    form.digit1 = "";
    form.digit2 = "";
    form.digit3 = "";
    form.digit4 = "";
  } catch (error) {
    console.error("Error verifying OTP:", error);
    backendError.value = error?.response?.data?.message;
  } finally {
    isSubmittingNewEmail.value = false;
  }
};

// OTP
// Validation schema
const validationSchemaOTP = yup.object({
  digit1: yup.string().required(t("validation.code_required")),
  digit2: yup.string().required(t("validation.code_required")),
  digit3: yup.string().required(t("validation.code_required")),
  digit4: yup.string().required(t("validation.code_required")),
});
const email = useCookie("dos_email_otp", { maxAge: 60 * 60 * 24 * 90 });
const resendSuccess = ref("");

// Resend functionality
const isResending = ref(false);
const isResendDisabled = ref(false);
const resendTimer = ref(0);
const timerInterval = ref(null);

const input0 = ref(null);
const input1 = ref(null);
const input2 = ref(null);
const input3 = ref(null);

// Track if we're on mobile
const isMobile = ref(false);

const hasError = (fieldName, errors) => {
  return !!errors[fieldName];
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const startResendTimer = (duration = 60) => {
  isResendDisabled.value = true;
  resendTimer.value = duration;

  timerInterval.value = setInterval(() => {
    resendTimer.value--;

    if (resendTimer.value <= 0) {
      clearInterval(timerInterval.value);
      isResendDisabled.value = false;
      resendTimer.value = 0;
    }
  }, 1000);
};

const handleResendCode = async () => {
  if (isResendDisabled.value || isResending.value) return;

  isResending.value = true;
  backendError.value = "";
  resendSuccess.value = "";

  try {
    const result = await apiRequest(
      "POST",
      "/auth/resend-otp",
      { email: email.value },
      {},
      tokenCookie.value,
      locale.value
    );

    resendSuccess.value = t("auth.otp_resent_successfully");

    // Clear the form properly
    form.digit1 = "";
    form.digit2 = "";
    form.digit3 = "";
    form.digit4 = "";

    // Also clear the actual input elements
    [input0, input1, input2, input3].forEach((inputRef, index) => {
      if (inputRef.value) {
        inputRef.value.value = "";
      }
    });

    // Focus on first input with delay for mobile
    setTimeout(() => {
      const firstInput = getInputRef(0);
      if (firstInput) {
        firstInput.focus();
      }
    }, 100);

    startResendTimer(60);

    setTimeout(() => {
      resendSuccess.value = "";
    }, 5000);
  } catch (error) {
    console.error("Error resending OTP:", error);
    backendError.value =
      error?.response?.data?.message || t("auth.resend_error");
  } finally {
    isResending.value = false;
  }
};

const submitOTP = async (values) => {
  backendError.value = "";
  resendSuccess.value = "";
  try {
    isSubmitting.value = true;
    const otpCode =
      values.digit1 + values.digit2 + values.digit3 + values.digit4;
    const userData = {
      code: otpCode,
    };
    const result = await apiRequest(
      "POST",
      "/auth/verify-otp",
      userData,
      {},
      tokenCookie.value,
      locale.value
    );
    emailSuccess.value = true;
    firstOTP.value = false;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    backendError.value = error?.response?.data?.message;
  } finally {
    isSubmitting.value = false;
  }
};
const moveToNextInput = (currentIndex) => {
  if (currentIndex < 3) {
    const nextInput = getInputRef(currentIndex + 1);
    if (nextInput) {
      // Use setTimeout to ensure the focus happens after the current input event
      setTimeout(() => {
        nextInput.focus();
        // On mobile, also trigger a click to ensure keyboard stays open
        if (isMobile.value) {
          nextInput.click();
        }
      }, 10);
    }
  }
};

const moveToPrevInput = (currentIndex) => {
  if (currentIndex > 0) {
    const prevInput = getInputRef(currentIndex - 1);
    if (prevInput) {
      setTimeout(() => {
        prevInput.focus();
        if (isMobile.value) {
          prevInput.click();
        }
      }, 10);
    }
  }
};

const handleInput = (event, index) => {
  let value = event.target.value;

  // Handle multiple characters (for mobile auto-complete or paste)
  if (value.length > 1) {
    const digits = value.replace(/\D/g, "").slice(0, 4);

    // Fill all available fields starting from current index
    for (let i = 0; i < digits.length && index + i < 4; i++) {
      const fieldName = `digit${index + i + 1}`;
      form[fieldName] = digits[i];
      const input = getInputRef(index + i);
      if (input) {
        input.value = digits[i];
      }
    }

    // Move focus to the next empty field or last field
    const nextIndex = Math.min(index + digits.length, 3);
    const nextInput = getInputRef(nextIndex);
    if (nextInput) {
      setTimeout(() => {
        nextInput.focus();
        if (isMobile.value) {
          nextInput.click();
        }
      }, 10);
    }
    return;
  }

  // Handle single character input
  value = value.replace(/\D/g, "").slice(0, 1);
  const fieldName = `digit${index + 1}`;
  form[fieldName] = value;
  event.target.value = value;

  // Move to next input if value is entered
  if (value) {
    moveToNextInput(index);
  }
};

const handleKeydown = (event, index) => {
  if (event.key === "Backspace") {
    if (!form[`digit${index + 1}`] && index > 0) {
      event.preventDefault();
      moveToPrevInput(index);
    }
  } else if (event.key === "ArrowLeft" && index > 0) {
    event.preventDefault();
    moveToPrevInput(index);
  } else if (event.key === "ArrowRight" && index < 3) {
    event.preventDefault();
    moveToNextInput(index);
  } else if (
    !/\d/.test(event.key) &&
    !["Backspace", "Delete", "Tab", "Enter"].includes(event.key)
  ) {
    event.preventDefault();
  }
};

const handleFocus = (index) => {
  // Select all text in the input when focused (helpful for mobile)
  const input = getInputRef(index);
  if (input && input.value) {
    setTimeout(() => {
      input.select();
    }, 10);
  }
};

const handlePaste = (event) => {
  event.preventDefault();
  const paste = (event.clipboardData || window.clipboardData).getData("text");
  const digits = paste.replace(/\D/g, "").slice(0, 4).split("");

  digits.forEach((digit, index) => {
    if (index < 4) {
      form[`digit${index + 1}`] = digit;
      const input = getInputRef(index);
      if (input) {
        input.value = digit;
      }
    }
  });

  const nextEmptyIndex = digits.length < 4 ? digits.length : 3;
  const targetInput = getInputRef(nextEmptyIndex);
  if (targetInput) {
    setTimeout(() => {
      targetInput.focus();
      if (isMobile.value) {
        targetInput.click();
      }
    }, 10);
  }
};

const getInputRef = (index) => {
  const refs = [input0, input1, input2, input3];
  return refs[index]?.value;
};

// Detect if device is mobile
const detectMobile = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  isMobile.value =
    /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent.toLowerCase()
    ) ||
    (navigator.maxTouchPoints &&
      navigator.maxTouchPoints > 2 &&
      /MacIntel/.test(navigator.platform));
};
const readLoading = ref(false);
</script>

<style>
.ql-align-center {
  text-align: center;
}
</style>
