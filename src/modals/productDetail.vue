<template>
    <Page>
        <DockLayout stretchLastChild="true" height="90%">
            <stackLayout dock="top">
                <GridLayout columns="auto, *, auto" rows="auto, auto, auto, auto" padding="12,12,14,12" >
                    <Image row="0" col="0" rowSpan="3" :src="product.info.imageSrc" width="57" height="57" verticalAlignment="top" margin="0,12,0,0"/>
                    <Label row="0" col="1" colSpan="2" :text="product.info.name"  class="list-group-item-heading" verticalAlignment="top" textWrap="false" margin="0"/>
                    <Label row="1" col="1" colspan="2" :text="'UPC : ' +  product.info.upc" class="h6" margin="0"/>
                    <Label row="2" col="1" colspan="2" :text="'IDR ' + formatPrice(product.info.price)"  class="h6" horizontalAlignment="left" margin="0,0,9,0" />  
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
                <SegmentedBar class="segmented-bar" selectedIndex="0" @selectedIndexChange="changeTabPage">
                    <SegmentedBarItem title="Promo" />
                    <SegmentedBarItem title="Detail" />
                </SegmentedBar>
            </stackLayout>
            <stackLayout dock="bottom">
                <button class="btn btn-primary" @tap="editCart">Close</button>
            </stackLayout>
            <GridLayout rows="*" columns="*">
                <ScrollView :visibility="(page_tab == 'promo' ? 'collapse' : 'visible')">
                    <stackLayout row="0" col="0" padding="32,16,16,16">
                        <Image :src="product.info.imageSrc" width="90%" class="m-b-30"/>
                        <label class="h5 m-b-10">Item Description</label>
                        <label textWrap="true" width="100%">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</label>
                    </stackLayout>
                </ScrollView>
                <ScrollView :visibility="(page_tab == 'detail' ? 'collapse' : 'visible')">
                    <stackLayout row="0" col="0" padding="24,16,16,16">
                        <label class="h5 m-b-0">Discount 17 Agustus</label>
                        <label class="m-b-10" textWrap="true" width="100%">16 Agustus 2018 - 31 Agustus 2018</label>
                        <label textWrap="true" width="100%">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</label>
                        <StackLayout class="hr-light m-t-20 m-b-20"></StackLayout>
                        <label class="h5 m-b-0">Discount 17 Agustus</label>
                        <label class="m-b-10" textWrap="true" width="100%">16 Agustus 2018 - 31 Agustus 2018</label>
                        <label textWrap="true" width="100%">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</label>
                        <StackLayout class="hr-light m-t-20 m-b-20"></StackLayout>                                  
                    </stackLayout>
                </ScrollView>
            </GridLayout>
        </DockLayout>
    </Page>
</template>

<script>
import moduleCurrency from '../modules/currency'

export default {
    data() {
        return {
            page_tab: 'promo',
            cart: [],
            cart_notes: null,
            cart_qty: 0     
        }
    },
    props: ['product'],
    mounted() {
        // vuex : get current cart
        // init bindable data helpers
        try{
            this.cart = this.$store.getters.cartItem(this.product.info.upc)
            this.cart_notes = this.cart.notes 
            this.cart_qty = this.cart.qty 
        }catch(ex){
            this.cart_notes = ""
            this.cart_qty = 0 
            console.log("error: " + ex)
        }
    },    
    methods:{
        //segmented
        changeTabPage(args){
            if(args.object.get("selectedIndex") == 0){
                this.page_tab = "promo"
            }else{
                this.page_tab = "detail"
            }
        },

        // helpers
        formatPrice(value) {
            return moduleCurrency.format(value)
        },

        // cart
        loadQty(args){
            console.log(args.object.get('id'))
        },
        addCartQty(){
            this.cart_qty++
        },
        removeCartQty(){
            this.cart_qty == 0 ? this.cart_qty = 0 : this.cart_qty--
        },   
        
        // close
        editCart(args){
            // 1. check is product in cart
            var selected_cart = this.$store.getters.cartItem(this.product.info.upc) 
            if(!selected_cart){ 
                //2. add new data
                this.$store.dispatch('cartItemAdd', {
                    upc: this.product.info.upc,
                    imageSrc: this.product.info.imageSrc,
                    name: this.product.info.name,
                    price: this.product.info.price,
                    qty: this.cart_qty,
                })

                // update main data
                this.product.cart.qty++
            }else{
                // 2. update cart
                if(this.cart_qty != selected_cart.qty){
                    this.$store.dispatch('cartItemEdit', {
                        upc: this.cart.upc,
                        imageSrc: this.cart.imageSrc,
                        name: this.cart.name,
                        price: this.cart.price,
                        qty: this.cart_qty,
                        notes: this.cart_notes,
                    })
                }
            }

            // 3. close modal
            this.$modal.close(this.cart_qty);
        }        
    }
}
</script>

<style scoped>
    .btn-primary{
        margin: 6;
    }
    .btn-sm{
        font-size: 16;
        height: 38;
        width: 38;
    }
    .cart-icon{
        font-size: 20;
    }
</style>
