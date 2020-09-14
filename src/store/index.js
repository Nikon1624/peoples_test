import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import films from '@/store/modules/peoples';

export default new Vuex.Store({
    modules: {
        films,
    }
});