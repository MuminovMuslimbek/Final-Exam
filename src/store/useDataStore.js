import { create } from "zustand";

const useDataStore = create((set) => ({
  data: JSON.parse(localStorage.getItem("data")) || [],

  setData: (newData) => {
    localStorage.setItem("data", JSON.stringify(newData));
    set({ data: newData });
  },

  addData: (newItem) => {
    set((state) => {
      const updatedData = [...state.data, newItem];
      localStorage.setItem("data", JSON.stringify(updatedData));
      return { data: updatedData };
    });
  },

  deleteData: (id) => {
    set((state) => {
      const updatedData = state.data.filter((item) => item.id !== id);
      localStorage.setItem("data", JSON.stringify(updatedData));
      return { data: updatedData };
    });
  },

  updateData: (id, updatedItem) => {
    set((state) => {
      const updatedData = state.data.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      );
      localStorage.setItem("data", JSON.stringify(updatedData));
      return { data: updatedData };
    });
  },
}));

export default useDataStore;