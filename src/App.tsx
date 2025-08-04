import { useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  // Toggle function
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.theme = newTheme;
  }
  return (
    <div className="h-screen">
      <NavBar />
      <button onClick={toggleTheme} className="btn btn-primary m-4">
        Toggle Theme
      </button>
      <div className="p-4 h-full flex items-center justify-center">
        <h1 className="text-xl font-bold">Hello, Tailwind!</h1>
      </div>
      <Footer />
    </div>
  );
}

export default App;
