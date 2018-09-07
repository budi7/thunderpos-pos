<template>
    <Page>
        <DockLayout stretchLastChild="true" height="55%">
            <stackLayout dock="top">
                <GridLayout columns="auto, *, auto" rows="auto, auto, auto, auto" padding="12,12,14,12" >
                    <Image row="0" col="0" rowSpan="3" :src="product.info.imageSrc" width="57" height="57" verticalAlignment="top" margin="0,12,0,0"/>
                    <Label row="0" col="1" colSpan="2" :text="product.info.name"  class="list-group-item-heading" verticalAlignment="top" textWrap="false" margin="0"/>
                    <Label row="1" col="1" colspan="2" :text="'UPC : ' +  product.info.upc" class="h6" margin="0"/>
                    <Label row="2" col="1" colspan="2" :text="formatPrice(product.info.price)"  class="h6" horizontalAlignment="left" margin="0,0,9,0" />  
                    <GridLayout row="3" class="form" col="1" columns="34, auto, *, auto" rows="auto">
                        <label row="0" col="0" class="fa cart-icon text-muted" verticalAlignment="center">{{'fa-shopping-cart' | fonticon}}</label>
                        <button row="0" col="1" @tap="removeCartQty" class="btn-primary btn-sm text-center" margin="0,0,0,0">-</button>
                        <StackLayout class="input-field" row="0" col="2">
                            <TextField class="input text-center" keyboardType="number" v-model="cart_qty"/>
                            <StackLayout class="hr-light"></StackLayout>
                        </StackLayout>
                        <button row="0" col="3" @tap="addCartQty" class="btn-primary btn-sm text-center" margin="0,0,0,0">+</button>
                    </GridLayout>
                </GridLayout>
                <StackLayout class="hr-light"></StackLayout>       
            </stackLayout>
            <stackLayout dock="bottom">
                <button @tap="editCart" class="btn btn-primary">Done</button>
            </stackLayout>
            <GridLayout rows="20,*" columns="*" padding="12,12,12,12" class="form">
                <Label row="0" col="0" text="Order Notes"  verticalAlignment="Center" margin="0,0,3,0"/>
                <StackLayout class="input-field" row="1" col="0" >
                    <TextView class="input" height="100%" @loaded="loadNote"  v-model="cart_notes" />
                </StackLayout>
            </GridLayout>
        </DockLayout>
    </Page>
</template>

<script>
var isAndroid = require("platform")
import moduleFormatter from '../modules/formatter'

export default {
    data() {
        return {
            cart: [],
            cart_notes: null,
            cart_qty: 0
        }
    },
    props: ['product'],
    mounted() {
        // vuex : get current cart
        // init bindable data helpers

        // error 
        this.cart = this.$store.getters.cartItem(this.product.info.upc)
        this.cart_qty = this.cart.qty 
        try{
            this.cart_notes = this.cart.notes
        }catch(ex){
            this.cart_notes = ""
            console.log("error: " + ex)
        }
    },
    methods:{
        // helpers
        formatPrice(value) {
            return moduleFormatter.price(value)
        },

        // cart
        addCartQty(){
            this.cart_qty++
        },
        removeCartQty(){
            this.cart_qty == 0 ? this.cart_qty = 0 : this.cart_qty--
        },

        //notes
        loadNote(args){
            setTimeout(() => {
                args.object.focus()
            }, 125);
        },
        
        // close
        editCart(args){
            // 1. update cart
            this.$store.dispatch('cartItemEdit', {
                upc: this.cart.upc,
                imageSrc: this.cart.imageSrc,
                name: this.cart.name,
                price: this.cart.price,
                qty: this.cart_qty,
                notes: this.cart_notes,
            })

            // 2. close modal
            this.$modal.close(this.cart_qty);
        }
    },
    computed:{

    }
}
</script>

<style scoped>
    .btn-primary{
        margin: 6;
    }
    .btn-sm{
        font-size: 16;
        height: 34;
        width: 34;
    }
    .cart-icon{
        font-size: 18;
    }
</style>
