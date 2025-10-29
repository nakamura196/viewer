<template>
  <v-app>
    <div>
      <v-navigation-drawer v-model="drawer" app :temporary="true" width="300">
      </v-navigation-drawer>

      <v-app-bar dark color="success" flat>
        <v-app-bar-nav-icon v-if="false" @click.stop="drawer = !drawer" />
        <v-toolbar-title>
          <nuxt-link
            :to="
              localePath({
                name: 'index',
              })
            "
            style="color: inherit; text-decoration: inherit"
          >
            {{ $t(title) }}
          </nuxt-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-menu offset-y>
          <template #activator="{ on }">
            <v-btn depressed btn icon v-on="on">
              <v-icon>mdi-translate</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item :to="switchLocalePath('ja')">
              <v-list-item-title>日本語</v-list-item-title>
            </v-list-item>
            <v-list-item :to="switchLocalePath('en')">
              <v-list-item-title>English</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
    </div>

    <v-main>
      <nuxt />
    </v-main>

    <v-footer :dark="true" class="mt-5">
      <v-container>
        <p class="text-center my-5">
          {{ $t(footer) }}
        </p>
      </v-container>
    </v-footer>

    <v-btn
      v-show="fab"
      v-scroll="onScroll"
      fab
      dark
      fixed
      bottom
      right
      large
      color="error"
      @click="toTop"
    >
      <v-icon>mdi-arrow-up</v-icon>
    </v-btn>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({
  components: {},
})
export default class search extends Vue {
  fab: boolean = false

  drawer: boolean = false
  baseUrl: string = process.env.BASE_URL || ''
  title: any = process.env.siteName // this.$t(process.env.siteName as any)
  footer: any = process.env.footer // this.$t(process.env.footer as any)

  head() {
    const locale = this.$i18n.locale
    const meta = this.$t('meta') as any
    const baseUrl = process.env.BASE_URL || ''
    const baseDir = process.env.BASE_DIR || '/'
    const basePath = baseUrl + baseDir
    const ogpImage = `${basePath}img/ogp/home.jpg`

    return {
      htmlAttrs: {
        lang: locale,
      },
      meta: [
        {
          hid: 'og:locale',
          property: 'og:locale',
          content: meta.locale || 'ja_JP',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: meta.siteName || 'Digital Archive Tools',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: meta.siteDescription || 'Digital Archive Tools',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: meta.siteName || 'Digital Archive Tools',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: meta.siteDescription || 'Digital Archive Tools',
        },
      ],
    }
  }

  onScroll(e: any): void {
    if (typeof window === 'undefined') return
    const top = window.pageYOffset || e.target.scrollTop || 0
    this.fab = top > 20
  }

  toTop(): void {
    // @ts-ignore
    this.$vuetify.goTo(0)
  }
}
</script>

<style>
tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}
* {
  text-transform: none !important;
}
a {
  text-decoration: none !important;
}
</style>
