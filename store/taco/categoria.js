export const state = () => ({
    list: [],
    selected: {},
})
  
export const mutations = {
    SET(state, selected) { 
        state.selected = selected;
    },
    INIT(state, list) { 
        state.list = list;
    }
}