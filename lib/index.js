import Vue from 'vue'

import DForm from './DForm'

import formMixin from './mixins/formMixin'

import DFormInput from './components/DFormInput'
import DFormSwitch from './components/DFormSwitch'
import DFormRadio from './components/DFormRadio'
import DFormCheckbox from './components/DFormCheckbox'

const components = [
    DForm,
    DFormInput,
    DFormSwitch,
    DFormRadio,
    DFormCheckbox
]

components.forEach(component => {
    Vue.component(component.name, component)
})

const DFormBuiltInNames = [
    'input',
    'switch',
    'radio',
    'checkbox'
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