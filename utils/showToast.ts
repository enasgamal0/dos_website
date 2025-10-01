import { toast } from "vue3-toastify";

export function showToast(error, type = "error") {
  console.trace("TOAST CALLED");

  let message = error;

  if (error?.response?.data?.message) {
    message = error.response.data.message;
  } else if (error?.message) {
    message = error.message;
  }

  if (Array.isArray(message)) {
    message = message.join(", ");
  }

  if (typeof message !== "string") {
    message = "حدث خطأ غير متوقع";
  }

  toast[type](message);
}
