import { atom } from "jotai";

const initialDarkMode = (() => {
  try {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode !== null ? JSON.parse(savedMode) : false;
  } catch (error) {
    console.error("Error parsing dark mode from localStorage:", error);
    return false;
  }
})();
export const darkModeAtom = atom(initialDarkMode);

darkModeAtom.onMount = (setAtom) => {
  setAtom(initialDarkMode);

  const updateDarkMode = (darkMode) => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  updateDarkMode(initialDarkMode);
  return updateDarkMode;
};
