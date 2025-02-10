import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import MainLayout from "./layout/MainLayout";
import ErrorPage from "./pages/ErrorPage";
import useThemeStore from "./store/themeUseStore";

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <div className={theme}>
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/:id" element={<MainLayout><Details /></MainLayout>} />
        <Route path="*" element={<MainLayout><ErrorPage /></MainLayout>} />
      </Routes>
    </div>
  );
}

export default App;
