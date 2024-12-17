// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n'],
  i18n: {
    locales: [
      {
        code: 'en-US',
        iso: 'en-US',
        file: 'en-US.json'
      },
      {
        code: 'de-DE',
         iso: 'de-DE',
        file: 'de-DE.json'
      },
      {
        code: 'ja-JP',
        iso: 'ja-JP',
        file: 'ja-JP.json'
      },
      {
        code: 'ko-KR',
        iso: 'ko-KR',
        file: 'ko-KR.json'
      },
      {
        code: 'zh-CN',
        iso: 'zh-CN',
        file: 'zh-CN.json'
      },
      {
        code: 'zh-TW',
        iso: 'zh-TW',
        file: 'zh-TW.json'
      }
    ],
    langDir: 'locales/',
    defaultLocale: 'en-US',
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  compatibilityDate: '2024-12-01',
  ssr: false,
})