import attrsMixin from './attrsMixin'

export default {
    mixins: [attrsMixin],
    props: {
        value: {},
        disabled: Boolean,
        readonly: Boolean,
        options: {
            type: Array,
            default () {
                return []
            }
        },
        formData: Object,
        desc: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    data() {
        return {
            // 新值, 因为Vue不能修改props传递过来的值, 所以借助新的值进行传递
            newValue: this.value
        }
    }
}