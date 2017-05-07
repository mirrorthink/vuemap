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
        this.languageActiveItem.item = this.Messages[0];

    },
    methods: {
        toggleAllshow() {
            this.allShow = !this.allShow;

        },

        clickItem(item,index) {
            this.toggleAllshow();
            this.languageActiveItem.item=item;
            this.languageActiveItem.index=index;

        },
        // ...mapMutations([
        //    'increment' // 映射 this.increment() 为 this.$store.commit('increment')
        // ]),
    }
}