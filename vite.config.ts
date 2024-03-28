import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

declare module "*.glb" {
  const src: string;
  export default src;
}
// https://vitejs.dev/config/
export default defineConfig({
  base: "/3dPortfolio/",
  plugins: [react()],
  assetsInclude: ["**/*.glb"],
});
