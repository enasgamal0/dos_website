import { getToken } from "firebase/messaging";

export const useFirebaseMessaging = () => {
  const { $messaging } = useNuxtApp();

  const requestPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        console.log("Notification permission granted.");
        const token = await getToken($messaging, {
          vapidKey:
            "BEF2YV3gRVqsjKx15Z9e9cqJNyaDIgKJJC_E55GCV4v8zq4y1Yx9zYYiLLiRR3riXZsykbwkSv5n6gu4HRaQ-h8",
        });
        // console.log("FCM Token:", token);
        return token;
      } else {
        console.log("Notification permission denied.");
      }
    } catch (error) {
      console.error("Error requesting permission:", error);
    }
  };

  return {
    requestPermission,
  };
};
