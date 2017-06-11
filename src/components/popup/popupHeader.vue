<template>
    <div class="row">
        <div class="left">
            <span class="img">
                <img src="/static/img/int_jingdian@3x.png" alt="">
            </span>
            <span class="title"> {{title}}</span>
        </div>
        <div class="right">
            <span class="img">
                <img src="/static/img/detail_navpoint@3x.png" alt="">
            </span>
            <span class="title">{{distantWord}}</span>
        </div>
    
    </div>
</template>
<script>

import { mapState, mapActions, mapMutations } from 'vuex';
import { computDistant } from '../../services/Global'

export default {
    name: 'popupHeader',
    props: {
        title: '',
        location: '',
    },

    data() {
        return {
            distant: 0,
            word: {
                'chiness': ['距离','未知'],
                'english': ['distant','unknow']
            },
            distantWord:''
        }
    },
    computed: mapState(['currentPosition','activeLanguage']),
    mounted() {
        let result=computDistant(this.location, this.currentPosition)
        this.distant = result ?  result : this.word[this.activeLanguage][1];
    
       this.distantWord= this.word[this.activeLanguage][0]+' '+this.distant
    },
    created: function () {
    },

    methods: {
    }
}
</script>


<style scoped lang="less">
.row {
    border-bottom: 1px solid #E6E6E6;
    padding-bottom: 0.8rem;
    display: flex;
    justify-content: space-between;
    position: relative;

    .left {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-grow: 2;

        .img {
            width: 1.71rem;
            height: 1.71rem;
            display: inline-block;
            margin-right: 0.5rem;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .title {
            width: 100%;
        }
    }
    .right {
        text-align: left;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        min-width: 7rem!important;


        .img {
            display: inline-block;
            width: 1.14rem;
            height: 1.14rem;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .title {
            font-size: 0.86rem;
        }
    }

    .title {
        line-height: 160%;
   
    }
}
</style>