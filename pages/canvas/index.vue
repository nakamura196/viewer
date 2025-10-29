<template>
  <div>
    <v-container class="mt-5">
      <h1>{{ $t('Canvas Number Specification Tool') }}</h1>

      <p class="mt-5 mb-10">
        {{ $t('Please specify the manifest file URL and canvas number.') }}
      </p>

      <v-text-field
        v-model="viewer"
        class="mt-5"
        :label="$t('Viewer URL')"
        outlined
        rounded
        hide-details
        placeholder="https://clioapi.hi.u-tokyo.ac.jp/mirador/"
        dense
      ></v-text-field>

      <v-text-field
        v-model="manifest"
        class="mt-5"
        :label="$t('Manifest File URL')"
        outlined
        rounded
        hide-details
        placeholder="https://clioapi.hi.u-tokyo.ac.jp/iiif/81/tdata/imaijikan/01-01_03-21/1/manifest"
        dense
      ></v-text-field>

      <v-text-field
        v-model="pos"
        class="mt-5"
        :label="$t('Canvas Number')"
        outlined
        rounded
        hide-details
        dense
      ></v-text-field>

      <div class="mt-10">
        <v-btn
          large
          rounded
          depressed
          class="ma-1"
          color="primary"
          @click="open"
          >{{ $t('Generate URL') }}</v-btn
        >
      </div>

      <div class="mt-10">
        <a :href="url" target="_blank">{{ url }}</a>
      </div>

      <v-card outlined flat class="mt-10">
        <div class="pa-10">
          <h3 class="mb-5">{{ $t('Input Support') }}</h3>

          <p>{{ $t('Please enter URL in the following format: {url}?manifest={manifest}') }}</p>

          <v-btn
            class="ma-1"
            rounded
            depressed
            color="info"
            @click="
              support =
                'https://clioapi.hi.u-tokyo.ac.jp/mirador/?manifest=https://clioapi.hi.u-tokyo.ac.jp/iiif/81/tdata/imaijikan/01-01_03-21/1/manifest'
            "
            >{{ $t('example') }}</v-btn
          >

          <v-text-field
            v-model="support"
            class="mt-5"
            :label="$t('URL')"
            outlined
            rounded
            hide-details
            dense
            placeholder="https://clioapi.hi.u-tokyo.ac.jp/mirador/?manifest=https://clioapi.hi.u-tokyo.ac.jp/iiif/81/tdata/imaijikan/01-01_03-21/1/manifest"
          ></v-text-field>
        </div>
      </v-card>
    </v-container>
  </div>
</template>
<script>
export default {
  layout: 'default',
  components: {},
  data() {
    return {
      viewer: '', // 'https://clioapi.hi.u-tokyo.ac.jp/mirador/',
      manifest: '', // 'https://clioapi.hi.u-tokyo.ac.jp/iiif/81/tdata/imaijikan/01-01_03-21/1/manifest',
      pos: 1,
      url: '',
      support: '',
    }
  },
  watch: {
    support(data, _) {
      const spl = data.split('?manifest=')
      this.viewer = spl[0]
      this.manifest = spl[1]
    },
  },
  methods: {
    async open() {
      this.url = ''

      const manifest = this.manifest
      const pos = Number(this.pos) - 1

      const res = await fetch(manifest)
      const data = await res.json()

      const canvases = data.sequences[0].canvases

      const canvasId = canvases[pos]['@id']

      const url = this.viewer + '?manifest=' + manifest + '&canvas=' + canvasId

      this.url = url
    },
  },
}
</script>
