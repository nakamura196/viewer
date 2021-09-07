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
            filled
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
            filled
            rounded
            hide-details
            dense
          ></v-text-field>
        </v-col>
      </v-row>

      <div class="mt-10">
        <v-btn class="ma-1" @click="add">{{ $t('add') }}</v-btn>
        <v-btn class="ma-1" color="success" @click="sample1">{{
          $t('例1:国絵図の比較')
        }}</v-btn>
      </div>
      <div class="mt-5">
        <v-btn large class="ma-1" color="primary" @click="open">{{
          $t('open')
        }}</v-btn>
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

      this.$router.push(
        this.localePath({
          name: 'mirador',
          query: {
            q: JSON.stringify(items),
          },
        })
      )
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
            'https://www.digital.archives.go.jp/api/iiif/001892030/manifest.json',
        },
        {
          manifest:
            'https://www.digital.archives.go.jp/api/iiif/001891946/manifest.json',
        },
      ]
    },
  },
}
</script>
