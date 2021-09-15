<template>
  <div id="demo"></div>
</template>
<script>
import Mirador from 'mirador/dist/es/src/index'
import { miradorImageToolsPlugin } from 'mirador-image-tools'

export default {
  layout: 'empty',
  components: {},
  mounted() {
    const query = this.$route.query

    let lang = 'ja'

    if (query.lang) {
      lang = query.lang
    }

    if (!query.manifest) {
      query.manifest =
        'https://iiif.bodleian.ox.ac.uk/iiif/manifest/e32a277e-91e2-4a6d-8ba6-cc4bad230410.json'
    }

    const manifest = query.manifest

    const windows = []
    const window = {
      id: 'window_0',
      imageToolsEnabled: true,
      imageToolsOpen: true,
      rotation: 270,
      manifestId: manifest,
    }
    windows.push(window)
    if (query.canvas) {
      window.canvas = query.canvas
    }

    const workspace = {}

    const config = {
      id: 'demo',
      viewers2: [
        {
          id: 'window_0',
          rotation: 270,
        },
      ],
      viewers: {
        window_0: {
          rotation: 270,
        },
      },
      windows,
      workspace,
      language: lang,
    }
    Mirador.viewer(config, [...miradorImageToolsPlugin])
  },
}
</script>
