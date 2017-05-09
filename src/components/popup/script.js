
export default {
    name: 'toggleBar',
    props: {

        message: {
            type: Object,
            required: false,
            default: function () {
                return {
                    'id': '',
                    'title': '',
                    'dec': '',
                }
            }
        },

        currentPopid: String,
        close: {
            type: String,
            required: false
        },

    },
    data() {
        return {

        }
    },
    mounted() {


    },
    created: function () {
    
    },
    methods: {
        onclose() {
            this.$emit('close')
        },
        navDetail() {
            this.$router.push({ name: 'detail', params: { id:this.message.id } })

        },
        play() {

        },
        navImg() {
            this.$router.push({ name: 'img', params: { id: this.message.id } })
        },
        navPanoramic() {
            this.$router.push({ name: 'panoramic', params: { id: this.message.id  } })
        },
        showAudio() {

        }

    }
}