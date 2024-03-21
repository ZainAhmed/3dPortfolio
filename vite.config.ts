import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

declare module "*.glb" {
  const src: string;
  export default src;
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.glb"],
});
