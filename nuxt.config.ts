// https://nuxt.com/docs/api/configuration/nuxt-config
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineNuxtConfig({
  devtools: { enabled: false },

  app: {
    head: {
      link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { charset: "utf-8" },
        { name: "format-detection", content: "telephone=no" }
      ]
    }
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  modules: ["nuxt-svgo", "@nuxtjs/i18n", "nuxt-echarts", "@pinia/nuxt"],

  echarts: {
    renderer: ["svg", "canvas"],
    charts: ["BarChart", "LineChart", "PieChart"],
    components: ["DatasetComponent", "GridComponent", "TooltipComponent"],
    features: ["LabelLayout", "UniversalTransition"]
  },

  css: [
    "~/assets/styles/main.css",
    "~/assets/styles/fonts.css",
    "element-plus/dist/index.css"
  ],

  runtimeConfig: {
    public: {
      NUXT_PUBLIC_API_BASE_URL: process.env.NUXT_PUBLIC_API_BASE_URL
    }
  },

  ssr: false,

  devServer: {
    host: "*",
    port: 8080
  },

  components: [
    { path: "~/components", pathPrefix: false },
    { path: "~/components/ui", pathPrefix: false },
    { path: "~/components/layout", pathPrefix: false }
  ],

  i18n: {
    strategy: "no_prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
      fallbackLocale: "en",
      alwaysRedirect: true
    },
    locales: [{ code: "en", file: "en/en.json", language: "en" }],
    defaultLocale: "en",
    langDir: "locales/"
  },

  plugins: [],

  imports: {
    autoImport: true
  },

  vite: {
    plugins: [
      AutoImport({
        imports: ["vue"],
        resolvers: [ElementPlusResolver({ directives: true })],
        dts: "auto-imports.d.ts"
      }),
      Components({
        resolvers: [
          ElementPlusResolver({ importStyle: false, directives: true })
        ],
        dts: "components.d.ts"
      })
    ]
  },

  svgo: {
    componentPrefix: "icon",
    autoImportPath: "./assets/icons/",
    defaultImport: "component",
    svgoConfig: {
      multipass: false,
      plugins: [
        {
          name: "preset-default",
          params: {
            overrides: {
              removeDoctype: false,
              removeXMLProcInst: false,
              removeComments: false,
              removeMetadata: false,
              removeEditorsNSData: false,
              cleanupIds: false,
              convertColors: false,
              convertPathData: false,
              convertTransform: false,
              removeUnknownsAndDefaults: false,
              removeNonInheritableGroupAttrs: false,
              removeUselessStrokeAndFill: false,
              removeUnusedNS: false,
              cleanupNumericValues: false,
              moveElemsAttrsToGroup: false,
              moveGroupAttrsToElems: false,
              collapseGroups: false,
              mergePaths: false,
              convertShapeToPath: false,
              sortAttrs: false,
              removeTitle: false,
              removeDesc: false,
              removeEmptyContainers: false,
              removeViewBox: false,
              cleanupEnableBackground: false,
              removeHiddenElems: false,
              removeEmptyText: false,
              inlineStyles: false,
              minifyStyles: false
            }
          }
        }
      ]
    }
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        paths: {
          "@/*": ["../*"],
          "@images/*": ["../assets/images/*"],
          "@styles/*": ["../assets/styles/*"]
        }
      }
    }
  },

  compatibilityDate: "2025-11-07"
});
