<template>
    <header>
        <a v-on:click="goback">
            <i class="icon iconfont icon-yuyin1"></i>
        </a>
        <h3>
            <span>{{title}}</span>
        </h3>
    </header>
</template>
<script>
export default {
    name: 'common-header',
    props: {

        title: String,

    },
    data() {
        return {

        }
    },
    mounted() {
        //  console.log(this.title)


    },
    methods: {
        goback() {
            this.nextDirection('back')
            this.$router.go(-1)
        }
    }
}
</script>


<style scoped lang="less">
header {
    width: 100%;
    background: deepskyblue;
    color: #fff;
    padding: 0.3125rem;
    top: 0px;
    z-index: 99;
}

i {
    font-size: 1.9rem;
    position: relative;
}

h3,
a {
    margin: 0;
    padding: 0;
    text-align: center;
    font-weight: normal;
    line-height: 5vh;
    font-size: 1.37rem;
    display: block;
}

a {
    position: absolute;
    top: 0.5rem;
}

span {
    background: #fff;
    color: deepskyblue;
    padding: 0.15rem 30%;
    border-radius: 0.25rem;
}
</style>

