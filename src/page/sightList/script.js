
import { mapState, mapActions } from 'vuex'
import popup from '../../components/popup'
import commonHeader from '../../components/header'
export default {
    name: 'sightList',
    components: {
       popup ,
       commonHeader
    },
    data() {
        return {
            view: null
        }
    },
    mounted() {

    },
    computed: mapState(['sightMessages']),
    methods: {
        close(){

        },
   
    }
}