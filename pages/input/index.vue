<template>
  <div>
    <v-container class="mt-5">
      <h2>入力フォーム</h2>

      <p class="mb-10">
        比較する画像のマニフェスト（必須）とカンバス（任意）を指定してください。
      </p>

      <v-row v-for="(item, n) in items" :key="n">
        <v-col>
          <v-text-field
            v-model="item.manifest"
            :label="$t('manifest')"
            outlined
            rounded
            single-line
            hide-details
            dense
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="item.canvas"
            single-line
            :label="$t('canvas')"
            outlined
            rounded
            hide-details
            dense
          ></v-text-field>
        </v-col>
      </v-row>

      <div class="mt-10">
        <v-btn
          large
          rounded
          depressed
          class="ma-1"
          color="primary"
          @click="open"
          >{{ $t('open') }}</v-btn
        >

        <v-btn class="ma-1" rounded depressed color="info" @click="add">{{
          $t('add')
        }}</v-btn>
      </div>
      <div class="mt-5">
        <span class="mr-2">{{ $t('example') }}</span>
        <v-btn
          v-for="(example, key) in examples"
          :key="key"
          class="ma-1"
          rounded
          depressed
          color="success"
          @click="items = example.items"
          >{{ example.label }}</v-btn
        >
      </div>
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
        {
          manifest: '',
          canvas: '',
        },
      ],
    }
  },
  computed: {
    examples() {
      const examples = [
        {
          label: '国絵図',
          items: [
            {
              manifest:
                'https://www.digital.archives.go.jp/api/iiif/764029/manifest.json',
            },
            {
              manifest:
                'https://www.digital.archives.go.jp/api/iiif/764193/manifest.json',
            },
          ],
        },
        {
          label: '源氏物語',
          items: [
            {
              manifest:
                'https://www.dl.ndl.go.jp/api/iiif/3437686/manifest.json',
              canvas: 'https://www.dl.ndl.go.jp/api/iiif/3437686/canvas/22',
            },
            {
              manifest:
                'https://iiif.dl.itc.u-tokyo.ac.jp/repo/iiif/c1ea8e6b-9403-4394-8619-96aad0ec6329/manifest',
              canvas:
                'https://iiif.dl.itc.u-tokyo.ac.jp/repo/iiif/c1ea8e6b-9403-4394-8619-96aad0ec6329/canvas/p4',
            },
            {
              manifest:
                'https://catalog.lib.kyushu-u.ac.jp/image/manifest/820/411193.json',
              canvas:
                'https://catalog.lib.kyushu-u.ac.jp/image/411193/canvas/p1',
            },
          ],
        },
      ]
      return examples
    },
  },
  mounted() {},
  methods: {
    open() {
      const items = []
      for (const item of this.items) {
        if (item.manifest) {
          const query = {
            manifest: item.manifest,
          }
          items.push(query)
          if (item.canvas) {
            query.canvas = item.canvas
          }
        }
      }

      if (items.length === 0) {
        return
      }

      const url =
        process.env.BASE_URL + '/mirador' + '?q=' + JSON.stringify(items)

      window.open(url, '_blank')
    },
    add() {
      this.items.push({
        manifest: '',
        canvas: '',
      })
    },
  },
}
</script>
