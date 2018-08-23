<template>    
    <Page class="page">
        <ActionBar class="action-bar" title="BakerHood" flat="true">
            <ActionItem @tap="changeBarcodeMode" ios.position="right" android.position="actionBar">
                <Label style="color:#fff;" :class="isBarcodeMode ? 'fa title-icon' : 'fa title-icon text-dimmed '"  :text="'fa-qrcode' | fonticon" />
            </ActionItem>
        </ActionBar>
        <DockLayout stretchLastChild="true">
            <StackLayout dock="top">
                <StackLayout dock="top" :visibility="(isBarcodeMode ? 'visible' : 'collapse')" height="25%" style="background-color:#353434;">
                </stacklayout>
                <SearchBar v-model="searchQuery" height="54" width="100%" id="searchbar"  @clear="onSearchClear" @submit="onSearchSubmit" @loaded="onSearchLoaded"/> 
            </stacklayout>
            <StackLayout @tap="showDetail" dock="bottom">
                <GridLayout  columns="auto, *, auto" rows="auto" padding="12, 16, 12, 16" class="bg-success">
                    <label :text="'fa-shopping-cart' | fonticon" class="fa fa-2x h3" verticalAlignment="middle" margin="0, 24, 0, 0"/>
                    <StackLayout col="1" >
                        <Label :text="'IDR ' + formatPrice(totalPrice)" class="list-group-item-heading" margin="0"/>
                        <Label :text="totalItem + ' Item'" class="h6" margin="0"/>
                    </StackLayout>
                    <Label :text="'fa-angle-right' | fonticon" class="fa fa-2x h3" col="2" margin="0" verticalAlignment="middle" />
                </GridLayout>  
            </StackLayout>
            <GridLayout  columns="*" rows="*">
                <ListView :visibility="(isNoResult ? 'collapse' : 'visible')" class="list-group" for="product in searchResults" style="height:10000;" padding="12,16,9,16" >
                    <v-template >
                        <GridLayout :id="product.info.upc" v-on:tap="addToCart" v-on:longPress="showInfo" columns="auto, *, auto" rows="auto, auto, auto, auto" padding="8,12,6,12" >
                            <Image row="0" col="0" rowSpan="4" :src="product.info.imageSrc" width="62" height="62" verticalAlignment="top" margin="0,12,0,0"/>
                            <Label row="0" col="1" colSpan="2" :text="product.info.name"  class="list-group-item-heading" verticalAlignment="top" textWrap="false" margin="0"/>
                            <Label row="1" col="1" colspan="2" :text="'UPC : ' + (product.info.config.is_stock ? product.info.upc : '_')" class="h6"/>
                            <Label row="2" col="1" colspan="2" :text="'IDR ' + formatPrice(product.info.price)"  class="h6" horizontalAlignment="left" margin="0,0,6,0" />  
                            <stacklayout row="3" col="1" colspan="2">
                                <GridLayout columns="*, *" rows="auto" >
                                    <label row="0" col="0" horizontalAlignment="left" class="text-primary fa" margin="0,21,0,0" :visibility="(product.cart.qty > 0 ? 'visible' : 'hidden')">{{ product.cart.qty }} in {{'fa-shopping-cart' | fonticon}}</label>
                                    <label row="0" col="1" horizontalAlignment="right" class="text-muted fa">Add {{'fa-plus' | fonticon}}</label>
                                </GridLayout>
                            </stacklayout>
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
    import moduleCurrency from '../modules/currency'
    
    import modalProductDetail from '../modals/productDetail'

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
            },

            // actionbar
            changeBarcodeMode(){
                this.isBarcodeMode = !this.isBarcodeMode;
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
                var model = {
                    upc: selected_product.info.upc,
                    imageSrc: selected_product.info.imageSrc,
                    name: selected_product.info.name,
                    price: selected_product.info.price,
                    qty: 1,
                }
                this.cartUpdater(this.carts, model)

                // update main data
                selected_product.cart.qty++
                // /this.products[args.object.get("id")].cart.qty++

                // count total
                this.totalItem++;
                this.totalPrice = parseInt(this.totalPrice) + parseInt(selected_product.info.price)
            },
            showInfo: function (args){
                var selected_product = this.products[this.products.findIndex(x => x.info.upc === args.object.get("id"))]
                this.$showModal(modalProductDetail, { context: { propsData: {product : selected_product}}})
            },

            // cart 
            showCart: function(){
                // this.$navigateTo(page_detail)
            },
            cartStatus: function(upc){
                var idx = this.carts.findIndex(x => x.upc === upc)

                // empty?
                if(idx < 0 ){ return }

                return this.carts[idx].qty
            },

            // helpers
            formatPrice(value) {
                return moduleCurrency.format(value)
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
            searchResults: function(){
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
        }
    };

</script>

<style scoped>

</style>
