// src/hooks/useLanguage.js
import { useEffect, useState } from "react";

let globalLanguage = localStorage.getItem("appLanguage") || "en"; // load from storage or default
let listeners = [];

export function useLanguage() {
    const [language, setLanguage] = useState(globalLanguage);

    // function to update global + local state
    const changeLanguage = (lang) => {
        globalLanguage = lang;
        localStorage.setItem("appLanguage", lang); // persist in storage
        listeners.forEach((listener) => listener(lang));
        window.location.reload();
    };

    useEffect(() => {
        const listener = (lang) => setLanguage(lang);
        listeners.push(listener);

        // cleanup on unmount
        return () => {
            listeners = listeners.filter((l) => l !== listener);
        };
    }, []);

    return [language, changeLanguage];
}
