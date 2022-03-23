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

const install = function(Vue, {components} = {}, opts = {}) {
    components.forEach((comp) => {
        let compName = comp.name
        if (compName) {
          if (comp.mixins) {
            comp.mixins.push(formMixin)
          } else {
            comp.mixins = [formMixin]
          }
          Vue.component(compName, comp)
        } else {
          console.warn('自定义组件需要定义组件名！')
        }
      })
    Vue.prototype.$DFormParams = opts
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}
DForm.install = install
DForm.formMixin = formMixin

export default DForm