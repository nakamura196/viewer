<template>
  <div>
    <v-container class="mt-5">
      <h1>コマ数の指定ツール</h1>

      <p class="mt-5 mb-10">
        マニフェストファイルのURLとコマ数を指定してください。
      </p>

      <v-text-field
        v-model="viewer"
        class="mt-5"
        :label="$t('ビューアのURL')"
        outlined
        rounded
        hide-details
        placeholder="https://clioapi.hi.u-tokyo.ac.jp/mirador/"
        dense
      ></v-text-field>

      <v-text-field
        v-model="manifest"
        class="mt-5"
        :label="$t('マニフェストファイルのURL')"
        outlined
        rounded
        hide-details
        placeholder="https://clioapi.hi.u-tokyo.ac.jp/iiif/81/tdata/imaijikan/01-01_03-21/1/manifest"
        dense
      ></v-text-field>

      <v-text-field
        v-model="pos"
        class="mt-5"
        :label="$t('コマ数')"
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
          >{{ $t('URLを生成') }}</v-btn
        >
      </div>

      <div class="mt-10">
        <a :href="url" target="_blank">{{ url }}</a>
      </div>

      <v-card outlined flat class="mt-10">
        <div class="pa-10">
          <h3 class="mb-5">入力サポート</h3>

          <p>次の形式のURLを入力してください。 {url}?manifest={manifest}</p>

          <v-btn
            class="ma-1"
            rounded
            depressed
            color="info"
            @click="
              support =
                'https://clioapi.hi.u-tokyo.ac.jp/mirador/?manifest=https://clioapi.hi.u-tokyo.ac.jp/iiif/81/tdata/imaijikan/01-01_03-21/1/manifest'
            "
            >例</v-btn
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
