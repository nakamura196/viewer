<template>
  <div>
    <v-container class="my-5">

      <h2 class="mb-5">{{$t("IIIF Image Downloader")}} (JavaScript {{$t("Version")}})</h2>

      <v-text-field
        v-model="text"
        filled
        rounded
        :label="$t('IIIF Manifest')"
        placeholder="{scheme}://{host}/{prefix}/{identifier}/manifest"
          ></v-text-field>

          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
        v-model="size"
        filled
        rounded
        :label="$t('Size')"
        placeholder="full, '600,', ',600', ..."
          ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
        v-model="start"
        filled
        rounded
        disabled
        :label="$t('Start')"
          ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
        v-model="end"
        filled
        rounded
        disabled
         :label="$t('End')"
        
          ></v-text-field>
              </v-col>
</v-row>
          

    <v-btn rounded :loading="loading" color="primary" @click="manifest=text; downloadImages()">{{$t("Download")}}</v-btn>

    <h2 class="mt-10 mb-5"><!-- 結果 --></h2>

    <div class="error--text">{{message}}</div>

    <v-progress-linear
      v-if="total !== 0"
      v-model="percentage"
      color="amber"
      height="25"
    >
      <strong>{{ progress }} / {{total}}</strong>
    </v-progress-linear>
    </v-container>
  </div>
</template>
<script>
export default {
  layout: 'default',
  components: {},
  data() {
    return {
      progress: 0,
      total: 0,
      start: 0,
      end: 0,
      manifest: null,
      message: "",
      loading: false,
      text: "",
      size: "full"
    }
  },
  mounted() {
    this.loadJSZipFromCDN()
    this.manifest = this.$route.query.manifest
    this.size = this.$route.query.size || this.size

    if(this.manifest){
      this.text = this.manifest
      this.downloadImages()
    }
  },
  computed: {
    percentage(){
      if(this.total == 0){
        return 0
      }
      return this.progress / this.total * 100
    }
  },
  methods: {
    loadJSZipFromCDN(){
      let script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/jszip@3.2.1/dist/jszip.js";
      document.head.append(script);
    },
    async downloadImages() {
      this.init(true, "")

      if(!this.size){
        this.size = "full"
      }

      const sources = []
      let label = this.manifest

      const images = []

      try {
        const manifest = this.manifest// "https://iiif.dl.itc.u-tokyo.ac.jp/repo/iiif/d230f1f8-5929-4138-bb28-1108d77fd32a/manifest"

        const response = await this.$axios.$get(manifest);
        const canvases = response.sequences[0].canvases

        for(let canvas of canvases){
          sources.push(canvas.images[0].resource["@id"].replace("/full/full/", `/full/${this.size}/`))
        }
        label = response.label

        this.total = sources.length

        for(let i = 0; i < sources.length; i++){
          this.progress = i
          images.push({
            "fileName" : String(i + 1).padStart(5, '0') + ".jpg",
            "data": await this.$axios.$get(sources[i], { responseType: 'arraybuffer' } )
          })
        }

      } catch(e){
        this.init(false, e)
        return
      }

      

      this.progress = this.total

      // すべての画像が取得できたら zip 生成
      this.generateImagesZip(images, label);

      this.init(false, "")
    },

    init(loading=false, message=""){
      this.total = 0
      this.loading = loading
      this.message = message
    },

    generateImagesZip(images, label) {
      let zip = new JSZip();

      // フォルダ作成
      const folderName = label;
      let folder = zip.folder(folderName);

      // フォルダ下に画像を格納
      images.forEach(image => {
        if (image.data && image.fileName) {
          folder.file(image.fileName, image.data)
        }
      });

      // zip を生成
      zip.generateAsync({ type: "blob" }).then(blob => {

        // ダウンロードリンクを 生成
        let dlLink = document.createElement("a");

        // blob から URL を生成
        const dataUrl = URL.createObjectURL(blob);
        dlLink.href = dataUrl;
        dlLink.download = `${folderName}.zip`;

        // 設置/クリック/削除
        document.body.insertAdjacentElement("beforeEnd", dlLink);
        dlLink.click();
        dlLink.remove();

        // オブジェクト URL の開放
        setTimeout(function() {
          window.URL.revokeObjectURL(dataUrl);
        }, 1000);
      });
    }
  },
}
</script>