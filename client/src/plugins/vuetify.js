import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#B71C1C',
        secondary: '#1565C0',
        accent: '#512DA8',
        error: '#B71C1C',
        warning: '#FB8C00',
        info: '#2196f3',
        success: '#388E3C',
        grey: '#BCBCBC',
        white: '#ffffff',
      },
    },
  },
  icons: {
    iconfont: 'fa',
  },
});
