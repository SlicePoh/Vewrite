import { atom } from "jotai";

const initialDarkMode = JSON.parse(localStorage.getItem("darkMode")) || false;
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
