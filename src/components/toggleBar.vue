<template>
    <section>
        <div class="active">
            <span class="active item showIn" v-on:click="toggleAllshow" v-bind:class="{ voice: Messages.name == 'languagemode'}">
    
                <img :src="languageActiveItem.item" alt="">
            </span>
        </div>
        <transition name="fade">
            <div class="all" v-if="allShow" v-bind:class="{ active: allShow }">
                <span class="item" v-for="(message, index) in Messages.item" v-on:click="clickItem(message,index)" v-bind:class="{ voice: Messages.name == 'languagemode'}">
                    <img :src="message" alt="">
                </span>
            </div>
        </transition>
    </section>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
    name: 'toggleBar',
    props: ['Messages'],
    data() {
        return {
            allShow: false,
            languageActiveItem: {
                item: '',
                index: 0
            },
        }
    },

    mounted() {
        this.languageActiveItem.item = this.Messages.item[this.Messages.activeindex];

    },
    methods: {
        audioready() {

            var that = this;
            if (this.languageActiveItem.index == 1) {
                if (this.Messages.item.length < 3) {
                    console.log('touchstart')
                    that.$store.dispatch({
                        type: 'play',
                        id: 'slient',
                    }).then(function (value) {

                        that.play()

                        that.audioShowContral(true);
                    })

                    setTimeout(() => {
                        that.pause();
                        that.$store.dispatch({
                            type: 'play',
                            id: 'canteen',
                        }).then(function (value) {
                            that.play()
                            that.audioShowContral(true);
                        })
                    }, 10000);
                }
            }
        },
        toggleAllshow() {
            var that = this;

            if (this.Messages.item.length > 2) {
                this.allShow = !this.allShow;
                this.changetoggleAllShow()
            } else {
                //自动播放按钮
                this.languageActiveItem.index = (this.languageActiveItem.index + 1) % 2;
                this.languageActiveItem.item = this.Messages.item[this.languageActiveItem.index];
                this.$store.commit({
                    type: 'changMode',
                    name: this.Messages.name,
                    activeindex: this.languageActiveItem.index,
                })

                if (this.languageActiveItem.index == 1) {
                    that.locating(true)
                } else {

                }
            }
        },
        clickItem(item, index) {
            var that = this;
            this.toggleAllshow();
            this.languageActiveItem.item = item;
            this.languageActiveItem.index = index;
            this.$store.commit({
                type: 'changMode',
                name: this.Messages.name,
                activeindex: index,
            })


        },
        ...mapMutations([
            'changetoggleAllShow', 'play', 'audioShowContral', 'locating', 'pause', 'changeFlesh'
        ])
    },
    computed: mapState(['geoErr', 'notHere', 'currentPosition']),

}
</script>


<style scoped lang="less">
section {
    position: relative;
    clear: both;
    z-index: 3;
    span {
        padding: 0.14rem 0.5rem;
        background: #FFF;
        margin-bottom: 1rem;
        width: 2.71rem;
        height: 2.71rem;
        margin-left: 0.86rem;
        img {
            width: 100%;
            height: 100%;
        }
    }
    span.voice {
        padding: 0.5rem;
    }
    div.active {
        span {
            float: right;
        }
    }
    .all {
        position: absolute;
        top: 0px;
        right: 0px;

        span {
            display: inline-block;
        }
        overflow: hidden;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: all .2s ease-in
}

.fade-enter,
.fade-leave-active {
    min-width: 28rem;
    transform: translateX(100%)
}
</style>