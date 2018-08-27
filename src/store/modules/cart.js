const state = {
    cart_items: [],
    cart_total_price: 0,
    cart_total_item: 0
};

const getters = {
    cartItems(){
        return state.cart_items
    },
    cartItemsCount(){
        return state.cart_total_item
    },
    cartTotalPrice(){
        return state.cart_total_price
    }
};

const mutations = {
    cartItemAdd: (state, payload) => {
        // 1. update carts
        var idx = state.cart_items.findIndex(x => x.upc === payload.upc)

        if(idx < 0){ 
            // 1.a new data
            state.cart_items.push(payload) 
        }else{
            // 1.b update qty
            state.cart_items[idx].qty++
        }
 
         // 2. update total price
         state.cart_total_price = parseInt(state.cart_total_price) + parseInt(payload.price) 
 
         // 3. update total items
         state.cart_total_item = parseInt(state.cart_total_item) + parseInt(payload.qty) 
    },
    cartItemRemove: (state, payload) => { 
        // 1. update carts
        // check if current qty none, remove the item

        // else, update qty only

        // 2. update total price
        state.cart_total_price = state.cart_total_price - payload.price 

        // 3. update total items
        state.cart_total_item = state.cart_total_item - payload.qty 
    },
    cartReset (){
        state.cart_items = []
        state.cart_total_price = 0
        state.cart_total_item = 0
    }
};
  
const actions = {
    cartItemAdd: ({commit}, payload) => commit('cartItemAdd', payload),
    cartItemRemove: ({commit}, payload) => commit('cartItemRemove', payload),
    cartReset: ({commit}, payload) => commit('cartReset', payload)
};

export default {
    state,
    mutations,
    actions,
    getters,
};