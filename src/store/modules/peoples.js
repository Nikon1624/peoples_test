import {HTTP} from '@/consts';

export default {
    state: {
        peoples: []
    },
    getters: {
        getPeoples(state) {
            return state.peoples;
        }
    },
    mutations: {
        setPeoples(state, peoples) {
            state.peoples = peoples;
        }
    },
    actions: {
        fetchPeoples() {
            let people = [];

            return HTTP.get('people/')
                .then(response => {
                    people = response.data.results;
                    return response.data.count;
                })
                .then(count => {
                    const numberOfPagesLeft = Math.ceil((count - 1) / 10);
                    let promises = [];

                    for (let i = 2; i <= numberOfPagesLeft; i++) {
                        promises.push(HTTP.get(`people/?page=${i}`));
                    }
                    return Promise.all(promises);
                })
                .then(response => {
                    people = response.reduce((acc, data) => [...acc, ...data.data.results], people);
                    return people;
                })
                .catch((err) => {
                    throw new Error(err);
                });
        },
        async setAllPeoples({dispatch, commit}) {
            const peoples = await dispatch('fetchPeoples');
            commit('setPeoples', peoples);
        }
    }
};