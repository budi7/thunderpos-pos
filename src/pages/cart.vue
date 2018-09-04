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
                <ListView class="list-group" for="product in this.$store.getters.cartItems" padding="12,16,9,16" >
                    <v-template >
                        <GridLayout :id="product.upc" columns="auto, *, auto" rows="auto, auto, auto, auto" padding="8,12,6,12" >
                            <Image row="0" col="0" rowSpan="4" :src="product.imageSrc" width="62" height="62" verticalAlignment="top" margin="0,12,0,0"/>
                            <Label row="0" col="1" colSpan="2" :text="product.name"  class="list-group-item-heading" verticalAlignment="top" textWrap="false" margin="0"/>
                            <Label row="1" col="1" colspan="2" :text="'UPC : ' + (product.upc ? product.upc : '_')" class="h6"/>
                            <Label row="2" col="1" colspan="2" :text="'IDR ' + formatPrice(product.price)"  class="h6" horizontalAlignment="left" margin="0,0,6,0" />  
                            <stacklayout row="3" col="1" colspan="2">
                                <GridLayout columns="*, 50" rows="auto" >
                                    <!--
                                    <label row="0" col="0" horizontalAlignment="left" width="100%" class="text-primary fa" margin="0,21,0,0" :visibility="(product.qty > 0 ? 'visible' : 'hidden')">{{ product.qty }} in {{'fa-shopping-cart' | fonticon}}</label>
                                    <label row="0" col="1" horizontalAlignment="right" class="text-muted fa">Add {{'fa-plus' | fonticon}}</label>
                                    -->
                                </GridLayout>
                            </stacklayout>
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

            }
        },
        methods: {
            checkout(){

            },
            formatPrice(value){
                return formatter.price(value)
            }
        }

    }
</script>

<style>

</style>
