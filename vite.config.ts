import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";

const env = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");

const sslKeyPath = env.VITE_SSL_KEY_FILE;
const sslCrtPath = env.VITE_SSL_CRT_FILE;

console.log(sslKeyPath, sslCrtPath);

let httpsConfig = undefined;

if (sslKeyPath && sslCrtPath) {
  try {
    httpsConfig = {
      key: fs.readFileSync(path.resolve(__dirname, sslKeyPath)),
      cert: fs.readFileSync(path.resolve(__dirname, sslCrtPath)),
    };
  } catch (error) {
    console.warn(
      "⚠️ Nelze načíst SSL certifikáty. Ujistěte se, že soubory existují.",
    );
    console.error(error);
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    https: httpsConfig,
  },
});
