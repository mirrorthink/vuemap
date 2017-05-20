<template>
    <section>
        <div class="active">
            <span class="active item showIn" v-on:click="toggleAllshow">
                {{languageActiveItem.item}}
            </span>
        </div>
        <transition name="fade">
            <div class="all" v-if="allShow">
                <span class="item" v-for="(message, index) in Messages.item" v-on:click="clickItem(message,index)" v-bind:class="{ active: languageActiveItem.index == index}">
                    {{message}}
                </span>
            </div>
        </transition>
    </section>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'toggleBar',
    props: ['Messages'],
    data() {
        return {
            allShow: false,
            languageActiveItem: {
                item: '测试',
                index: 0
            },
        }
    },
    mounted() {
        this.languageActiveItem.item = this.Messages.item[this.Messages.activeindex];

    },
    methods: {
        toggleAllshow() {
            this.allShow = !this.allShow;

        },

        clickItem(item, index) {
            this.toggleAllshow();
            this.languageActiveItem.item = item;
            this.languageActiveItem.index = index;
            this.$store.commit({
                type: 'changMode',
                name: this.Messages.name,
                activeindex: index,
            })

        },

    }
}
</script>


<style scoped lang="less">
section {
    position: relative;
    top: -93vh;
    clear: both;
    z-index: 3;
    font-size: 1rem;
    span {
        padding: 0.6rem;
        background: #FFF;
        margin-bottom: 1rem;
        border: 1px solid #deepskyblue;
        &.active {
            background: deepskyblue;
            color: #fff;
            border-radius: 0.15rem;
        }
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
    transform: translateX(100%)
}
</style>