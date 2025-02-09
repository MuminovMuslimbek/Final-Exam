import { create } from "zustand";

const useThemeStore = create((set) => ({
    theme: localStorage.getItem("theme") || "light",
    toggleTheme: () =>
        set((state) => {
            const newTheme = state.theme === "light" ? "dark" : "light";
            document.body.classList.remove("light", "dark");
            document.body.classList.add(newTheme);
            localStorage.setItem("theme", newTheme);
            return { theme: newTheme };
        }),
}));

export default useThemeStore;