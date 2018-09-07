<template>
    <Page class="page">
        <ActionBar class="action-bar" title="Cart Summary" flat="true">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="$router.back()"/>
        </ActionBar>
        <DockLayout stretchLastChild="true">
            <StackLayout dock="bottom" :visibility="($store.getters.cartItemsCount == 0 ? 'collapse' : 'visible')">
                <GridLayout  @tap="checkout" columns="auto, *, auto" rows="auto" padding="12, 16, 12, 16" class="bg-success">
                    <StackLayout col="1" >
                        <Label :text="formatPrice(this.$store.getters.cartTotalPrice)" class="list-group-item-heading" margin="0"/>
                        <Label :text="(this.$store.getters.cartItemsCount > 1) ? 'Checkout ' + this.$store.getters.cartItemsCount + ' Items' : 'Checkout' + this.$store.getters.cartItemsCount + ' Item'" class="h5" margin="0"/>
                    </StackLayout>
                    <Label :text="'fa-angle-double-right' | fonticon" class="fa fa-2x h3" col="2" margin="0" verticalAlignment="middle" />
                </GridLayout>  
            </StackLayout>            
            <GridLayout  columns="*" rows="*">
                <ListView class="list-group" for="product in products | reverse" padding="12,16,6,16" >
                    <v-template >
                        <GridLayout columns="*">
                            <GridLayout @tap="showInfo" :id="product.upc" columns="auto, *, auto" rows="auto, auto, auto" padding="10,12,6,12" >
                                <Image row="0" col="0" rowSpan="4" :src="product.imageSrc" width="62" height="62" verticalAlignment="top" margin="0,12,0,0"/>
                                <Label row="0" col="1" colSpan="2" :text="product.name"  class="list-group-item-heading" verticalAlignment="top" textWrap="false" margin="0"/>
                                <Label row="1" col="1" colspan="2" :text="'UPC : ' + (product.upc ? product.upc : '_')" class="h6"/>
                                <stacklayout row="2" col="1" colspan="2" width="100%">
                                    <GridLayout columns="*, 100" rows="auto">
                                        <StackLayout row="0" col="0" class="input-field" width="100%">
                                            <Label :text="'@ ' + formatPrice(product.price)" class="h6" horizontalAlignment="left" verticalAlignment="middle" margin="0,0,0,0" width="100%" />  
                                            <Label :text="formatPrice(product.price * product.qty)"  class="h5" horizontalAlignment="left" margin="0,0,0,0" width="100%" />  
                                        </StackLayout>
                                        <GridLayout row="0" col="1"  class="form" columns="auto, *, auto" rows="auto" verticalAlignment="middle" >
                                            <button row="0" col="0" :id="product.upc" @tap="removeCartQty" class="btn-primary btn-sm" margin="0,0,0,0" width="30" height="30">-</button>
                                            <StackLayout class="input-field" row="0" col="1">
                                                <label class="text-center" :text="product.qty" width="35"/>
                                            </StackLayout>
                                            <button row="0" col="2" :id="product.upc" @tap="addCartQty" class="btn-primary btn-sm" margin="0,0,0,0" width="30" height="30">+</button>
                                        </GridLayout>
                                    </GridLayout>
                                </stacklayout>
                            </GridLayout>
                            <!-- <AbsoluteLayout col="1" :v-if="(1==1)">
                                <Image src="~/images/promo1.png" width="36" height="36" />
                            </AbsoluteLayout>                              -->
                        </GridLayout>
                    </v-template>
                </ListView>
            </GridLayout>
        </DockLayout>
    </Page>
</template>

<script>
    import formatter from '../modules/formatter'

    export default {
        data() {
            return {
                products: []
            }
        },
        mounted() {
            this.cartRefresher()
        },
        beforeRouteUpdate (to, from, next) {
            console.log(111)
        },
        beforeRouteLeave (to, from, next) {
            const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
            if (answer) {
                next()
            } else {
                next(false)
            }
        },
        methods: {
            // helpers
            formatPrice(value){
                return formatter.price(value)
            },
            formatNumber(value){
                return formatter.number(value)
            },
            
            // actions
            cartRefresher(){
                this.products = this.$store.getters.cartItems
            },
            removeCartQty(args){
                var selected_cart = this.$store.getters.cartItem(args.object.get("id")) 

                // update global cart data
                this.$store.dispatch('cartItemRemove', {
                    upc: selected_cart.upc,
                    imageSrc: selected_cart.imageSrc,
                    name: selected_cart.name,
                    price: selected_cart.price,
                    qty: 1,
                })

                // update
                this.cartRefresher()                
            },
            addCartQty(args){
                var selected_cart = this.$store.getters.cartItem(args.object.get("id")) 

                // update carts data
                this.$store.commit('cartItemAdd', {
                    upc: selected_cart.upc,
                    imageSrc: selected_cart.imageSrc,
                    name: selected_cart.name,
                    price: selected_cart.price,
                    qty: 1,
                })

                // update
                this.cartRefresher()  

                // var selected_product = this.products.findIndex(x => x.upc === args.object.get("id"))
                // this.products[selected_product].qty++
            },
            showInfo(args){
                // var selected_product = this.products[this.products.findIndex(x => x.upc === args.object.get("id"))]
                // this.$showModal(modalProductDetail, { context: { propsData: {product : selected_product}}}).then(function(qty){
                //     selected_product.cart.qty = (!qty && qty != 0 ? selected_product.cart.qty : qty)  
                // })
            },
            checkout(){
                this.$router.push('loader')
            },  
        },
        conmputed:{
        },
        watch: {
            products: function (val) {
               return this.products
            }
        },
    }
</script>

<style>
    .btn-sm{
        font-size: 14;
        height: 30;
        width: 30;
    }
</style>
