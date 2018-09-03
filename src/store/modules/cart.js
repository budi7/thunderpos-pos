const state = {
    cart_items: [],
    cart_total_price: 0,
    cart_total_item: 0
};

const getters = {
    cartItem: (state, upc) => (upc) => {
        return state.cart_items.find(cart_items => cart_items.upc === upc)
        // return state.cart_items[state.cart_items.findIndex(x => x.upc === upc)]
    },
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
        state.cart_total_price = parseFloat(state.cart_total_price - payload.price)

        // 3. update total items
        state.cart_total_item = parseInt(state.cart_total_item - payload.qty)
    },
    cartItemEdit: (state, payload) => {
        // 1. Get payload index on cart & validate
        var idx = state.cart_items.findIndex(x => x.upc === payload.upc)
        if(idx < 0){ return false }

        // 2. recalculate if any qty changes
        if(state.cart_items[idx].qty != payload.qty){

            // 2.a. recalculate total price
            state.cart_total_price = parseFloat(state.cart_total_price - (state.cart_items[idx].price * state.cart_items[idx].qty) + (payload.qty * payload.price))
            
            // 2.b. recalculate total items
            state.cart_total_item = parseInt(state.cart_total_item - state.cart_items[idx].qty + payload.qty)
        }

        // 3. edit selected cart item
        if(payload.qty > 0){
            // 3.a. edit
            state.cart_items[idx] = payload
        }else{
            // 3.b. remove item from cart
            delete state.cart_items[idx];
        }
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
    cartItemEdit: ({commit}, payload) => commit('cartItemEdit', payload),
    cartReset: ({commit}, payload) => commit('cartReset', payload)
};

export default {
    state,
    mutations,
    actions,
    getters,
};