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
                name:this.Messages.name,
                activeindex: index,
            })

        },

    }
}