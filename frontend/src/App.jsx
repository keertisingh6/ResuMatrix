import { useState, useEffect } from "react";
// ...existing code (API and builder moved to Home page)
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import { Moon, Sun } from "lucide-react";

export default function App() {
    // Builder state moved to `Home.jsx` to avoid duplication
    const [darkMode, setDarkMode] = useState(true);
    const [mounted, setMounted] = useState(false);
    // moved to Home.jsx when needed

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "dark") setDarkMode(true);

        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        const themeToStore = darkMode ? "dark" : "light";
        localStorage.setItem("theme", themeToStore);
    }, [darkMode, mounted]);

    // Compile/Optimize handlers moved to Home.jsx
    if (!mounted) return null;

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                {/* Fallback 404 route */}
                <Route
                    path="*"
                    element={
                        <h2 style={{ padding: "40px", textAlign: "center" }}>
                            404 - Page Not Found
                        </h2>
                    }
                />
            </Routes>
        </>
    );
}
