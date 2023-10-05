import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue2 from '@vitejs/plugin-vue2';
import Components from 'unplugin-vue-components/vite';
import { VuetifyResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig(({ mode }) => {
  // @ts-expect-error
  import.meta.env = { ...import.meta.env, ...loadEnv(mode, './') };
  return {
    base: './',
    plugins: [vue2(), Components({ resolvers: [VuetifyResolver()] })],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      // @ts-expect-error
      port: parseInt(import.meta.env.VITE_PORT || '3000', 10),
    },
  };
});
