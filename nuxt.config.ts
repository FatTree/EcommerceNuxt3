// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'https://default-api-url.com',
      cookieName: '',
    },
  },
  nitro: {
    devProxy: {
      "/api": {
        target: "https://dummyjson.com", // 这里是接口地址
        changeOrigin: true,
        prependPath: true,
      }
    }
  }
})