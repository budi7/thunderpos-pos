<template>
    <Page>
        <DockLayout stretchLastChild="true" height="90%">
            <stackLayout dock="top">
                <GridLayout columns="auto, *, auto" rows="auto, auto, auto" padding="12,12,16,12" >
                    <Image row="0" col="0" rowSpan="3" :src="product.info.imageSrc" width="62" height="62" verticalAlignment="top" margin="0,12,0,0"/>
                    <Label row="0" col="1" colSpan="2" :text="product.info.name"  class="list-group-item-heading" verticalAlignment="top" textWrap="false" margin="0"/>
                    <Label row="1" col="1" colspan="2" :text="'UPC : ' +  product.info.upc" class="h6"/>
                    <Label row="2" col="1" colspan="2" :text="'IDR ' + formatPrice(product.info.price)"  class="h6" horizontalAlignment="left" margin="0,0,6,0" />  
                </GridLayout>
                <StackLayout class="hr-light"></StackLayout>       
                <SegmentedBar class="segmented-bar" selectedIndex="0" @selectedIndexChange="changeTabPage">
                    <SegmentedBarItem title="Promo" />
                    <SegmentedBarItem title="Detail" />
                </SegmentedBar>
            </stackLayout>
            <stackLayout dock="bottom">
                <button class="btn btn-primary" @tap="$modal.close">Close</button>
            </stackLayout>
            <GridLayout rows="*" columns="*">
                <ScrollView :visibility="(page_tab == 'promo' ? 'collapse' : 'visible')">
                    <stackLayout row="0" col="0" padding="32,16,16,16">
                        <Image :src="product.info.imageSrc" width="90%" class="m-b-30"/>
                        <label class="h5 m-b-10">Item Description</label>
                        <label textWrap="true" width="100%">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </label>
                    </stackLayout>
                </ScrollView>
                <ScrollView :visibility="(page_tab == 'detail' ? 'collapse' : 'visible')">
                    <stackLayout row="0" col="0" padding="32,16,16,16">
                        <label class="h5 m-b-10">Item Promotions</label>
                        <label textWrap="true" width="100%">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </label>
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
            page_tab: 'promo'
        }
    },
    props: ['product'],
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
    }
}
</script>

<style>

</style>
