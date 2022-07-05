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
        <v-btn class="ma-1" rounded depressed color="info" @click="add">{{
          $t('add')
        }}</v-btn>
        <v-btn
          class="ma-1"
          rounded
          depressed
          color="success"
          @click="sample1"
          >{{ $t('例1:国絵図の比較') }}</v-btn
        >
      </div>
      <div class="mt-5">
        <v-btn
          large
          rounded
          depressed
          class="ma-1"
          color="primary"
          @click="open"
          >{{ $t('open') }}</v-btn
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

      /*
      this.$router.push(
        this.localePath({
          name: 'mirador',
          query: {
            q: JSON.stringify(items),
          },
        })
      )
      */
      const url = this.localePath({
        name: 'mirador',
        query: {
          q: JSON.stringify(items),
        },
      })

      // console.log({ url })
      window.open(url, '_blank')
    },
    add() {
      this.items.push({
        manifest: '',
        canvas: '',
      })
    },
    sample1() {
      this.items = [
        {
          manifest:
            'https://www.digital.archives.go.jp/api/iiif/764029/manifest.json',
        },
        {
          manifest:
            'https://www.digital.archives.go.jp/api/iiif/764193/manifest.json',
        },
      ]
    },
  },
}
</script>
