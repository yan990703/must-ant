// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userInfo: {
            username: '',
            email: ''
        },
        onlinePrinter: [],
        selectedPrintFiles: []
    },
    mutations: {
        setUserInfo(state, payload) {
            state.userInfo = payload;
        },
        setOnlinePrinter(state, payload) {
            state.onlinePrinter = payload
        },
        setSelectedPrintFile(state, payload) {
            // if (state.selectedPrintFiles.findIndex(item => JSON.stringify(item) === JSON.stringify(payload))) {
            //     state.selectedPrintFiles.splice(state.selectedPrintFiles.indexOf(payload, 1))
            // } else {
            //     state.selectedPrintFiles.push(payload)
            // }
            let index = state.selectedPrintFiles.findIndex(item => JSON.stringify(item) === JSON.stringify(payload))
            if (index !== -1) {
                state.selectedPrintFiles.splice(index, 1)
            } else {
                state.selectedPrintFiles.push(payload)
            }
        }
    },
    actions: {
        updateUserInfo({commit}, payload) {
            commit('setUserInfo', payload);
        },
        updateOnlinePrinter({commit}, payload) {
            const processedTreeData = payload.map((node, index) => {
                return {
                    ...node,
                    key: index.toString(),
                    value: index.toString(),
                    children: node.children.map((child, childIndex) => {
                        return {
                            ...child,
                            value: `${index}-${childIndex}`,
                            // value: child.title
                        }
                    })
                }
            })
            commit('setOnlinePrinter', processedTreeData);
        },
        updateSelectedPrintFiles({commit}, payload) {
            commit('setSelectedPrintFile', payload)
        }
    },
    getters: {
        getUserInfo: state => {
            return state.userInfo;
        },
        getOnlinePrinter: state => {
            return state.onlinePrinter
        },
        getSelectedPrintFile: state => {
            return state.selectedPrintFiles
        }
    }
});