// src/components/LanguageDropdown.jsx
import { useLanguage } from "../hooks/useLanguage";

export default function LanguageDropdown() {
    const [language, setLanguage, availableLanguages] = useLanguage(); // added availableLanguages

    const handleChange = (e) => {
        setLanguage(e.target.value);
    };

    return (
        <div>
            <label htmlFor="language">Select Language: </label>
            <select id="language" value={language} onChange={handleChange}>
                {availableLanguages.map((lang) => (
                    <option key={lang._id} value={lang.shortCode}>
                        {lang.fullName}
                    </option>
                ))}
            </select>
        </div>
    );
}
