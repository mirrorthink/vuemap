<template>
    <div class="outer">
        <div class="constainer">
            <div class="holder" v-for="message of sightMessages">
                <popup v-bind:message="message" v-bind:currentPopid="message.id" v-on:close="close"></popup>
            </div>
        </div>
        <audioplay v-if="audioShow" v-on:close="audioShowContral"></audioplay>
    </div>
</template>
<script>


import popup from '../components/popup'

import { mapState, mapActions, mapMutations } from 'vuex'
import audioplay from '../components/audioPlay'
export default {
    name: 'sightList',
    components: {
        popup,

        audioplay
    },
    data() {
        return {
            sightMessages: [],
        }
    },
    mounted() {

        document.title = '景点详情',
            this.getSightMessage().then((data)=>{
                this.sightMessages=data;
            } )
    },
    computed: mapState(['audioShow']),
    methods: {
        close() {

        },
        ...mapMutations(['audioShowContral']),
        ...mapActions(['getSightMessage'])

    },
    beforeDestroy() {
        this.audioShowContral(false)
    }
}
</script>


<style scoped lang="less">
.outer {
    width: 100%;
    background: #335266;
}

.constainer {
    padding: 0.86rem 0.86rem 0.46rem 0.86rem;
    .holder {
        margin-bottom: 0.43rem;
    }
}
</style>