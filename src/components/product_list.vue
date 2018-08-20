<template>
    <ListView class="list-group" for="product in products" @itemTap="onItemTap" style="height:10000;">
        <v-template>
            <StackLayout>
                <GridLayout columns="auto, *, auto" rows="auto, auto, auto" margin="12, 12, 6, 12" >
                    <Image :src="product.imageSrc" rowSpan="3" width="54" height="54" verticalAlignment="top" margin="0,12,0,0"/>
                    <Label :text="product.name" row="0" col="1" colSpan="2" class="list-group-item-heading" verticalAlignment="top" textWrap="false" margin="0"/>
                    <Label :text="'SKU : ' + (product.config.is_stock ? product.sku : '_')" row=1 col="1" colspan="2" class="h6" margin="0"/>
                    <Label :text="'IDR ' + formatPrice(product.price)" row="2" col="1" class="h6" horizontalAlignment="left" />
                    <Label text="Tambahkan +" row="2" col="2" class="h6 text-success" verticalAlignment="bottom" />
                    <Label text="" col="3" row="3" colspan="2" class="h6"/>
                </GridLayout>
            </StackLayout>
        </v-template>
    </ListView>
</template>

<script>
module.exports = {
    props: {
        'products': []
    },
    data() {
        return {
            ui_helper : {
                text_status : null,
                text_color : null,
            }
        };
    },
    methods: {
        onItemTap: function (args) {
            this.$emit('productlistTapped', this.products[args.index] )
        },
        productStatus: function(product){
            var config = product.config

            if(config.is_sellable){
                if(config.is_stock){
                    if(product.stock == 0){
                        this.ui_helper.text_status = "Stok Habis"
                        this.ui_helper.text_color = "text-danger"
                    }else{
                        if(config.is_stock_warning){
                            if(product.stock <= config.stock_limit){
                                this.ui_helper.text_status = "Stok Kritis"
                                this.ui_helper.text_color = "text-warning"
                            }else{
                                this.ui_helper.text_status = "Stok Ada"
                                this.ui_helper.text_color = "text-success"
                            }
                        }else{
                            this.ui_helper.text_status = "Stok Ada"
                            this.ui_helper.text_color = "text-success"
                        }
                    }
                }else{
                    this.ui_helper.text_status = "Tersedia"
                    this.ui_helper.text_color = "text-success"
                }
            }else{
                this.ui_helper.text_status = "Tidak Tersedia"
                this.ui_helper.text_color = "text-danger"
            }
        },
        formatPrice(value) {
            let val = (value/1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        }
    },
    mounted(){
        console.log("-------");
        console.log(this.products);
    }
};
</script>