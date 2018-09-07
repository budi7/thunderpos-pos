<template>    
    <Page class="page">
        <ActionBar class="action-bar" title="BakerHood" flat="true">
            <ActionItem @tap="changeBarcodeMode" ios.position="right" android.position="actionBar">
                <Label style="color:#fff;" :class="isBarcodeMode ? 'fa title-icon' : 'fa title-icon text-dimmed '"  :text="'fa-camera' | fonticon" />
            </ActionItem>
        </ActionBar>
        <DockLayout stretchLastChild="true">
            <StackLayout dock="top">
                <StackLayout dock="top" v-if="(isBarcodeMode)" style="background-color:#000;">
                    <MLKitBarcodeScanner
                        height="275"
                        formats="QR_CODE, EAN_8, EAN_13"
                        @scanResult="scanDone($event)">
                    </MLKitBarcodeScanner>
                </stacklayout>
                <SearchBar v-model="searchQuery" height="54" width="100%" id="searchbar"  @clear="onSearchClear" @submit="onSearchSubmit" @loaded="onSearchLoaded"/> 
            </stacklayout>
            <StackLayout dock="bottom" :visibility="($store.getters.cartItemsCount == 0 ? 'collapse' : 'visible')">
                <GridLayout  @tap="showCart" columns="auto, *, auto" rows="auto" padding="12, 16, 12, 16" class="bg-success">
                    <label :text="'fa-shopping-cart' | fonticon" class="fa fa-2x h3" verticalAlignment="middle" margin="0, 24, 0, 0"/>
                    <StackLayout col="1" >
                        <Label :text="formatPrice(this.$store.getters.cartTotalPrice)" class="list-group-item-heading" margin="0"/>
                        <Label :text="(this.$store.getters.cartItemsCount > 1) ? formatNumber(this.$store.getters.cartItemsCount) + ' Items' : this.$store.getters.cartItemsCount + ' Item'" class="h6" margin="0"/>
                    </StackLayout>
                    <Label :text="'fa-angle-right' | fonticon" class="fa fa-2x h3" col="2" margin="0" verticalAlignment="middle" />
                </GridLayout>  
            </StackLayout>
            <GridLayout  columns="*" rows="*">
                <ListView :visibility="(isNoResult ? 'collapse' : 'visible')" class="list-group" for="product in searchResults" padding="12,16,6,16" >
                    <v-template >
                        <GridLayout columns="*">
                            <GridLayout :id="product.info.upc" v-on:longPress="showInfo" v-on:tap="addToCart" columns="auto, *, auto" rows="auto, auto, auto, auto" padding="10,12,6,12" width="100%">
                                <Image row="0" col="0" rowSpan="4" :src="product.info.imageSrc" width="62" height="62" verticalAlignment="top" margin="0,12,0,0"/>
                                <Label row="0" col="1" colSpan="2" :text="product.info.name"  class="list-group-item-heading" verticalAlignment="top" textWrap="false" margin="0"/>
                                <Label row="1" col="1" colspan="2" :text="'UPC : ' + (product.info.config.is_stock ? product.info.upc : '_')" class="h6"/>
                                <Label row="2" col="1" colspan="2" :text="formatPrice(product.info.price)"  class="h6" horizontalAlignment="left" margin="0,0,3,0" />  
                                <stacklayout row="3" col="1" colspan="2">
                                    <!--
                                    <GridLayout columns="*, 66, 40" rows="auto" >
                                    -->
                                    <GridLayout columns="*, 68" rows="auto" >
                                        <label row="0" col="0" verticalAlignment="center" horizontalAlignment="left" width="100%" class="text-primary fa" margin="0,21,0,0" :visibility="(product.cart.qty > 0 ? 'visible' : 'hidden')">{{ formatNumber(product.cart.qty) }} in {{'fa-shopping-cart' | fonticon}}</label>
                                        <button row="0" col="1" v-if="(product.cart.qty > 0)" :id="product.info.upc" v-on:tap="addNotes" width="100%" class="btn-primary btn-sm text-center fa" >Detail  {{'fa-angle-right' | fonticon}}</button>
                                        <!--
                                        <label row="0" col="2" verticalAlignment="center" width="100%" class="text-muted text-right fa">Add {{'fa-plus' | fonticon}}</label>
                                        -->
                                    </GridLayout>
                                </stacklayout>
                            </GridLayout>
                            <!-- <AbsoluteLayout col="0" :v-if="(1==0)">
                                <Image src="~/images/promo1.png" width="36" height="36" />
                            </AbsoluteLayout>                                -->
                        </GridLayout>
                    </v-template>
                </ListView>
                <StackLayout :visibility="(isNoResult ? 'visible' : 'collapse')" verticalAlignment="top">
                    <label class="text-muted" text="Item not found" textAlignment="center" paddingTop="50"></label>
                </StackLayout> 
            </GridLayout>
        </DockLayout>
    </Page>
</template>

<script>
    var isAndroid = require("platform")
    import formatter from '../modules/formatter'
    
    import modalProductDetail from '../modals/productDetail'
    import modalOrderNotes from '../modals/orderNotes'

    export default {
        data() {
            return {
                products: [],
                carts: [],
                totalItem: 0,
                totalPrice: 0,
                searchQuery: "",
                isLoading: true,
                isBarcodeMode: false,
                isNoResult: false
            }
        },
        mounted(){
            this.getData();
        },
        methods: {
            // boot
            getData: function(){
                // dummy
                var products = require('../dummies/products')

                this.products = products.data.map(function(x){ return {'info' : x, 'cart' : {'qty' : 0}} });

                this.isLoading = false

                // refresh cart
                // hack
                this.searchQuery ="b"
                this.searchQuery =""
            },

            // actionbar
            changeBarcodeMode(){
                this.isBarcodeMode = !this.isBarcodeMode;
            },

            // barcode
            scanDone(args){
                if(args.value.barcodes.length > 0){
                    //breaker to delay
                    // console.log(args.value.barcodes[0].value)
                    console.log(args.value.barcodes)
                }
            },

            // searchbar
            onSearchLoaded(args){
                args.object.dismissSoftInput()
                if(isAndroid){ args.object.android.clearFocus(); }
            },
            onSearchClear(args){
                if(!this.searchQuery){
                    args.object.dismissSoftInput()
                    if(isAndroid){ args.object.android.clearFocus(); }
                }
            },
            onSearchSubmit(args){
                args.object.dismissSoftInput()
            },

            // product lists
            addToCart: function (args) {
                var selected_product = this.products[this.products.findIndex(x => x.info.upc === args.object.get("id"))]

                // update carts data
                this.$store.dispatch('cartItemAdd', {
                    upc: selected_product.info.upc,
                    imageSrc: selected_product.info.imageSrc,
                    name: selected_product.info.name,
                    price: selected_product.info.price,
                    qty: 1,
                })

                // update main data
                selected_product.cart.qty++
                // this.products[args.object.get("id")].cart.qty++
            },
            showInfo: function (args){
                var selected_product = this.products[this.products.findIndex(x => x.info.upc === args.object.get("id"))]
                this.$showModal(modalProductDetail, { context: { propsData: {product : selected_product}}}).then(function(qty){
                    selected_product.cart.qty = (!qty && qty != 0 ? selected_product.cart.qty : qty)  
                })
            },
            addNotes(args){
                var selected_product = this.products[this.products.findIndex(x => x.info.upc === args.object.get("id"))]
                this.$showModal(modalOrderNotes, { context: { propsData: {product : selected_product}}}).then(function(qty){
                    selected_product.cart.qty = (!qty && qty != 0 ? selected_product.cart.qty : qty)  
                })
            },

            // cart 
            showCart: function(){
                // next page
                this.$router.push('cart')

                //  reset state barcode scanner
                this.isBarcodeMode = false                
            },
            cartStatus: function(upc){
                var idx = this.carts.findIndex(x => x.upc === upc)

                // empty?
                if(idx < 0 ){ return }

                return this.carts[idx].qty
            },

            // helpers
            formatPrice(value) {
                return formatter.price(value)
            },
            formatNumber(value) {
                return formatter.number(value)
            },            
            cartUpdater(current_data, new_data){
                // check if new item existed on current data
                var idx = current_data.findIndex(x => x.upc === new_data.upc)

                // is new?
                if(idx < 0){ this.carts.push(new_data); return }

                //update qty
                current_data[idx].qty++
            }
        },
        computed:{
            searchResults() {
                var result = this.products

                if (!this.searchQuery){
                    this.isNoResult = false
                    if(this.returnEmptyOnNull){ return this.products}
                    return result
                }
                
                var filterValue = this.searchQuery.toLowerCase()     
                const filter = datas => datas['info']['name'].toLowerCase().includes(filterValue)
                var rslt = result.filter(filter)

                if(rslt.length == 0){
                    this.isNoResult = this.searchQuery ? true : false
                    return null
                }else{
                    this.isNoResult = false
                    return rslt
                }
            }
        },
        components: {
        },
    };

</script>

<style scoped>

</style>
