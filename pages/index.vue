<template>
  <div>
    <v-container class="my-5">
      <v-row>
        <v-col v-for="(item, key) in items" :key="key" cols="6" md="4">
          <v-card class="pa-4" outlined flat>
            <h3>
              <nuxt-link :to="localePath({ name: item.name })">
                {{ item.label }}
              </nuxt-link>
            </h3>
            <p v-if="item.description">{{ item.description }}</p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  layout: 'default',
  components: {},
  data() {
    return {
      items: [
        /*
        {
          label: this.$t('IIIF Image Downloader'),
          name: 'iiif-downloader',
        },
        */
        {
          label: this.$t('IIIF Viewers'),
          name: 'input',
        },
        {
          label: this.$t('コマ数の指定ツール'),
          name: 'canvas',
        },
      ],
    }
  },
}
</script>
