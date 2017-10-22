<template>
    <div class="holder">
     
        <iframe src="http://system.china-360.cn/vr/vr.php?id=317&from=singlemessage" ref="iframe"></iframe>
    </div>
</template>
<script>

import { mapState, mapActions } from 'vuex'



export default {
    name: 'panoramic',
    components: {


    },
    data() {
        return {
        }
    },
    created() {

    },
    mounted() {
       let id = this.$route.params.id;

      
       this.getIframeSrcById(id).then((url) => {
          this.$refs.iframe.src=url
        })
   


    },
    computed: {


    },
      methods: {
        ...mapActions(['getIframeSrcById'])
    },
}
</script>


<style scoped lang="less">
.constainer {}

.holder {
    height: 100vh;
    width: 100%;
    overflow: hidden;
    position: absolute;
    top: 0px;
    left: 0px;
}

iframe {
    width: 100%;
    height: 100vh;
}
</style>