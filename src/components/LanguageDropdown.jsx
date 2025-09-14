// src/components/LanguageDropdown.jsx
import { useLanguage } from "../hooks/useLanguage";

export default function LanguageDropdown() {
    const [language, setLanguage] = useLanguage(); // comes from global hook

    const handleChange = (e) => {
        setLanguage(e.target.value);
        // console.log("Selected Language:", e.target.value);
    };

    return (
        <div>
            <label htmlFor="language">Select Language: </label>
            <select id="language" value={language} onChange={handleChange}>
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
            </select>
        </div>
    );
}
