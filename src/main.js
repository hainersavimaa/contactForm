import Vue from 'vue'
import App from './App.vue'
import VeeValidate, { Validator } from 'vee-validate'
import messages from 'vee-validate/dist/locale/et';

// Eesti keelse tõlke lisamine vee-valiate jaoks
Validator.addLocale(messages);
const config = {
    locale: 'et'
};
Vue.use(VeeValidate, config)

new Vue({
  el: '#app',
  render: h => h(App)
})
