<template>
  <div>
    <!-- Hero Section with Parallax -->
    <v-parallax
      :src="baseDir + 'img/ogp/home.jpg'"
      height="500"
      class="hero-parallax"
    >
      <v-overlay absolute opacity="0.6">
        <v-container fill-height>
          <v-row align="center" justify="center">
            <v-col cols="12" md="10" lg="8" class="text-center">
              <div class="hero-content">
                <h1 class="display-2 font-weight-bold white--text mb-6">
                  {{ $t('Hero Title') }}
                </h1>
                <p class="text-h5 font-weight-light white--text mb-8">
                  {{ $t('Hero Subtitle') }}
                </p>
                <v-btn
                  x-large
                  rounded
                  color="success"
                  elevation="8"
                  class="ma-2 px-8"
                  :to="localePath({ name: 'input' })"
                >
                  <v-icon left>mdi-rocket-launch</v-icon>
                  {{ $t('Get Started') }}
                </v-btn>
                <v-btn
                  x-large
                  rounded
                  outlined
                  dark
                  elevation="0"
                  class="ma-2 px-8"
                  href="https://github.com/nakamura196/viewer"
                  target="_blank"
                >
                  <v-icon left>mdi-github</v-icon>
                  {{ $t('View on GitHub') }}
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-overlay>
    </v-parallax>

    <!-- Features Section -->
    <v-container class="my-16">
      <v-row>
        <v-col cols="12" class="text-center mb-8">
          <h2 class="text-h3 font-weight-bold mb-4">
            {{ $t('Features') }}
          </h2>
          <v-divider class="mx-auto" style="max-width: 100px"></v-divider>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="(feature, index) in features"
          :key="index"
          cols="12"
          md="4"
        >
          <v-card
            class="text-center pa-6 feature-card"
            flat
            color="transparent"
          >
            <v-avatar size="80" :color="feature.color" class="mb-4">
              <v-icon size="48" dark>{{ feature.icon }}</v-icon>
            </v-avatar>
            <h3 class="text-h5 font-weight-bold mb-3">
              {{ feature.title }}
            </h3>
            <p class="text-body-1 grey--text text--darken-1">
              {{ feature.description }}
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Tools Section -->
    <v-container class="my-16">
      <v-row>
        <v-col cols="12" class="text-center mb-8">
          <h2 class="text-h3 font-weight-bold mb-4">
            {{ $t('Tools') }}
          </h2>
          <p class="text-h6 font-weight-light grey--text text--darken-1">
            {{ $t('Choose a tool to get started') }}
          </p>
          <v-divider class="mx-auto mt-4" style="max-width: 100px"></v-divider>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col
          v-for="(item, key) in items"
          :key="key"
          cols="12"
          md="5"
          lg="4"
        >
          <v-hover v-slot="{ hover }">
            <v-card
              class="tool-card"
              :elevation="hover ? 16 : 4"
              :class="{ 'on-hover': hover }"
              :to="localePath({ name: item.name })"
              height="100%"
            >
              <v-card-text class="text-center pa-8">
                <v-avatar
                  size="100"
                  :color="item.color"
                  class="mb-6 elevation-4"
                >
                  <v-icon size="56" dark>{{ item.icon }}</v-icon>
                </v-avatar>
                <h3 class="text-h5 font-weight-bold mb-4">
                  {{ item.label }}
                </h3>
                <p class="text-body-1 grey--text text--darken-1">
                  {{ item.description }}
                </p>
              </v-card-text>
              <v-card-actions class="justify-center pb-6">
                <v-btn
                  rounded
                  :color="item.color"
                  dark
                  large
                  :to="localePath({ name: item.name })"
                >
                  {{ $t('Get Started') }}
                  <v-icon right>mdi-arrow-right</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>

    <!-- Call to Action -->
    <v-sheet color="grey lighten-4" class="py-16">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h2 class="text-h3 font-weight-bold mb-4">
              {{ $t('Open Source') }}
            </h2>
            <p class="text-h6 font-weight-light mb-8">
              {{ $t('Open Source Description') }}
            </p>
            <v-btn
              x-large
              rounded
              color="grey darken-3"
              dark
              href="https://github.com/nakamura196/viewer"
              target="_blank"
              class="px-8"
            >
              <v-icon left>mdi-github</v-icon>
              {{ $t('View on GitHub') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </div>
</template>
<script>
export default {
  layout: 'default',
  components: {},
  data() {
    return {
      baseDir: process.env.BASE_DIR || '/',
      items: [
        {
          label: this.$t('IIIF Viewers'),
          name: 'input',
          description: this.$t('Image Comparison Description'),
          icon: 'mdi-image-multiple',
          color: 'primary',
        },
        {
          label: this.$t('Canvas Number Specification Tool'),
          name: 'canvas',
          description: this.$t('Canvas Tool Description'),
          icon: 'mdi-file-document-outline',
          color: 'success',
        },
      ],
      features: [
        {
          title: this.$t('Easy to Use'),
          description: this.$t('Easy to Use Description'),
          icon: 'mdi-hand-heart',
          color: 'primary',
        },
        {
          title: this.$t('Fast'),
          description: this.$t('Fast Description'),
          icon: 'mdi-lightning-bolt',
          color: 'orange',
        },
        {
          title: this.$t('Open Source'),
          description: this.$t('Open Source Description'),
          icon: 'mdi-open-source-initiative',
          color: 'success',
        },
      ],
    }
  },
}
</script>

<style scoped>
.hero-parallax {
  position: relative;
}

.hero-content {
  animation: fadeInUp 1s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.feature-card {
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-10px);
}

.tool-card {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
}

.tool-card.on-hover {
  transform: translateY(-12px);
}

.v-divider {
  border-width: 2px;
  border-color: currentColor !important;
  opacity: 0.3;
}
</style>
