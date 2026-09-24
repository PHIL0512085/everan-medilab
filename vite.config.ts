import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: process.env.CAPAFY_PREVIEW_BASE || "/",
  plugins: [react()],
});
