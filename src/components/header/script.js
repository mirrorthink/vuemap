
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