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

    if (!query.params) {
      return
    }

    const items = JSON.parse(query.params)

    const windows = []
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const window = {
        id: 'window_' + i,
        manifestId: item.m,
      }
      windows.push(window)
      if (item.c) {
        window.canvas = item.c
      }
    }

    let workspace = {}

    if (windows.length > 1) {
      const size = windows.length

      let layout = {
        first: 'window_' + (size - 2),
        second: 'window_' + (size - 1),
        direction: 'row',
      }

      if (size > 2) {
        for (let i = 2; i < size; i++) {
          const index = i + 1
          layout = {
            first: 'window_' + (size - index),
            second: layout,
            direction: 'row',
            splitPercentage: 100 / index,
          }
        }
      }

      workspace = {
        layout,
      }
    }

    const config = {
      id: 'demo',
      windows,
      workspace,
    }
    Mirador.viewer(config, [...miradorImageToolsPlugin])
  },
}
</script>
