import { create } from "zustand";
import apiRequest from "./apiRequest.js";

export const useNotificationStore = create((set) => ({
  number: 0,
  fetch: async () => {
    const count = await apiRequest.get("/user/getNotificationCount");
    set({ number: count.data.number });
  },

  decrease: () => {
    set((prev) => ({ number: prev.number - 1 }));
  },

  reset: () => {
    set({ number: 0 });
  },
}));
