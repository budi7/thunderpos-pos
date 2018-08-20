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
            <GridLayout @tap="showDetail" dock="bottom" columns="auto, *, auto" rows="auto" padding="12, 16, 12, 16" class="bg-success">
                <label :text="'fa-shopping-cart' | fonticon" class="fa fa-2x h3" verticalAlignment="middle" margin="0, 24, 0, 0"/>
                <StackLayout col="1" >
                    <Label :text="'IDR ' + formatPrice(totalPrice)" class="list-group-item-heading" margin="0"/>
                    <Label :text="totalItem + ' Item'" class="h6" margin="0"/>
                </StackLayout>
                <Label :text="'fa-angle-right' | fonticon" class="fa fa-2x h3" col="2" margin="0" verticalAlignment="middle" />
            </GridLayout>             
            <StackLayout height="10000" verticalAlignment="middle">
                <ListView class="list-group" for="product in searchResults" @itemTap="addToCart" style="height:10000;">
                    <v-template>
                        <StackLayout>
                            <GridLayout columns="auto, *, auto" rows="auto, auto, auto" margin="12, 12, 6, 12" >
                                <Image :src="product.imageSrc" rowSpan="3" width="54" height="54" verticalAlignment="top" margin="0,12,0,0"/>
                                <Label :text="product.name" row="0" col="1" colSpan="2" class="list-group-item-heading" verticalAlignment="top" textWrap="false" margin="0"/>
                                <Label :text="'UPC : ' + (product.config.is_stock ? product.upc : '_')" row=1 col="1" colspan="2" class="h6" margin="0"/>
                                <Label :text="'IDR ' + formatPrice(product.price)" row="2" col="1" class="h6" horizontalAlignment="left" />
                                <Label text="Tambahkan +" row="2" col="2" class="h6 text-success" verticalAlignment="bottom" />
                                <Label text="" col="3" row="3" colspan="2" class="h6"/>
                            </GridLayout>
                        </StackLayout>
                    </v-template>
                </ListView>
            </StackLayout>
        </DockLayout>
    </Page>
</template>

<script>
    var isAndroid = require("platform");

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
                this.products = products.data
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
                var selected_product = this.products[args.index]

                // update carts data
                var model = {
                    upc: selected_product.upc,
                    imageSrc: selected_product.imageSrc,
                    name: selected_product.name,
                    price: selected_product.price,
                    qty: 1,
                }
                this.cartUpdater(this.carts, model)

                // count total
                this.totalItem++;
                this.totalPrice = parseInt(this.totalPrice) + parseInt(selected_product.price)
            },

            // cart 
            showCart: function(){
                // this.$navigateTo(page_detail)
            },

            // helpers
            formatPrice(value) {
                let val = (value/1).toFixed(0).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
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
                    this.isNoResult = false;
                    if(this.returnEmptyOnNull){ return this.products}
                    return result
                }
                
                var filterValue = this.searchQuery.toLowerCase()     
                const filter = datas => datas['name'].toLowerCase().includes(filterValue)
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
