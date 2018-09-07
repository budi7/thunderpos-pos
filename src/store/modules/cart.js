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
    cartItems: () => {
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
        if(!payload.qty){console.log('cartItem payload qty not set, returning now'); return}
        var prev_payload_qty = payload.qty

        // 1. update carts
        try{
            var idx = state.cart_items.findIndex(x => x.upc === payload.upc)
        }catch(ex){
            console.log(ex);
        }

        if(idx < 0){ 
            // 1.a new data
            state.cart_items.push(payload) 
        }else{
            // 1.b update qty

            // direct cast wont update the view, so code bellow wont works
            // state.cart_items[idx].qty = parseInt(state.cart_items[idx].qty) + parseInt(payload.qty)

            // use this instead
            // https://vuejs.org/v2/guide/list.html#Caveats
            payload.qty = parseInt(state.cart_items[idx].qty) + parseInt(payload.qty)
            state.cart_items.splice(idx, 1, payload)
        }
 
        // 2. update total price
        state.cart_total_price = parseFloat(state.cart_total_price) + (parseFloat(payload.price) * parseInt(prev_payload_qty)) 
 
        // 3. update total items
        state.cart_total_item = parseInt(state.cart_total_item) + parseInt(prev_payload_qty) 
    },
    cartItemRemove: (state, payload) => { 
        if(!payload.qty){console.log('cartItem payload qty not set, returning now');return}
        var prev_payload_qty = payload.qty

        // 1. update carts
        try{
            var idx = state.cart_items.findIndex(x => x.upc === payload.upc)
        }catch(ex){
            console.log(ex);
        }

        if(idx < 0){ 
            // data not found
            return
        }else{
            // update qty
            
            // direct cast wont update the view, so code bellow wont works
            // state.cart_items[idx].qty = parseInt(state.cart_items[idx].qty) - parseInt(payload.qty)

            // use this instead
            // https://vuejs.org/v2/guide/list.html#Caveats
            payload.qty = parseInt(state.cart_items[idx].qty) - parseInt(payload.qty)
            state.cart_items.splice(idx, 1, payload)
        }

        // if current qty 0, then remove item
        if(state.cart_items[idx].qty < 1){
            if(state.cart_items.length > 1){
                state.cart_items.splice(idx, 1);
            }else{
                state.cart_items = []
            }
        }

        // 2. update total price
        state.cart_total_price = parseFloat(state.cart_total_price) - (parseFloat(payload.price) * parseInt(prev_payload_qty))

        // 3. update total items
        state.cart_total_item = parseInt(state.cart_total_item) - parseInt(prev_payload_qty)
    },
    cartItemEdit: (state, payload) => {
        if(!payload.qty){payload.qty = 0}

        // 1. Get payload index on cart & validate
        var idx = state.cart_items.findIndex(x => x.upc === payload.upc)
        if(idx < 0){ return false }

        // 2. recalculate if any qty changes
        if(state.cart_items[idx].qty != payload.qty){

            // 2.a. recalculate total price
            state.cart_total_price = parseFloat(state.cart_total_price - (state.cart_items[idx].price * state.cart_items[idx].qty) + (payload.qty * payload.price))
            
            // 2.b. recalculate total items
            state.cart_total_item = parseInt(state.cart_total_item) - parseInt(state.cart_items[idx].qty) + parseInt(payload.qty)
        }

        // 3. edit selected cart item
        if(payload.qty > 0){
            // 3.a. edit
            state.cart_items.splice(idx, 1, payload)
        }else{
            // 3.b. remove item from cart
            if(state.cart_items.length > 1){
                state.cart_items.splice(idx, 1);
            }else{
                state.cart_items = []
            }
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