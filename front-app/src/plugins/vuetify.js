import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

const vuetify = new Vuetify({
    theme: {
        options: { customProperties: true },
        themes: {
            light: {
                primary: '#059b46',
                secondary: '#05bb66',
                accent: '#222222',
                error: '#d41b1b'
            }
        }
    }
})

export default vuetify;