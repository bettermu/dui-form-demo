import Vue from 'vue'

import DForm from './DForm'

import formMixin from './mixins/formMixin'

import DFormInput from './components/input'

const components = [
    DForm,
    DFormInput
]

components.forEach(component => {
    Vue.component(component.name, component)
})

const DFormBuiltInNames = [
    'input',
]
Vue.prototype.$DFormBuiltInNames = DFormBuiltInNames

const install = function(Vue, opts = {}, lang) {
    Vue.prototype.$DFormParams = opts
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}
DForm.install = install
DForm.formMixin = formMixin

export default DForm