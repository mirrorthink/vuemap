<template>
    <div class="outer">
        <common-header title="景点详情"></common-header>
        <div class="constainer">
    
            <section v-for="message of sightMessages">
                <div class="line">
                    <img src="../../assets/img/sight.png" alt="">
                </div>
                <div class="popover">
                    <popup v-bind:message="message" v-bind:currentPopid="message.id" v-on:close="close"></popup>
                </div>
            </section>
        </div>
        <audioplay v-if="audioShow" v-on:close="audioShowContral"></audioplay>
    </div>
</template>
<script>


import popup from '../../components/popup'
import commonHeader from '../../components/header'
import { mapState, mapActions, mapMutations } from 'vuex'
import audioplay from '../../components/audioPlay'
export default {
    name: 'sightList',
    components: {
        popup,
        commonHeader,
        audioplay
    },
    data() {
        return {
            view: null
        }
    },
    mounted() {

    },
    computed: mapState(['sightMessages', 'audioShow']),
    methods: {
        close() {

        },
        ...mapMutations(['audioShowContral'])

    },
    beforeDestroy() {
        this.audioShowContral(false)
    }
}
</script>


<style scoped lang="less">
.outer {
    width: 100%; //overflow-x: hidden;
}

.constainer {
    margin: 0 1.5rem 3rem 1rem;
    border-left: 0.25rem solid deepskyblue;
    section {
        height: auto;
        .line {
            display: inline-block;
            width: 1.5rem;
            height: 1.68rem;
            position: relative;
            left: -1rem;
            top: 4.68rem;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .popover {
            position: relative;
            left: 0.625rem;
            top: -1.25rem;
        }
    }
}
</style>