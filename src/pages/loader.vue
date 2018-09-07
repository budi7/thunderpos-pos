<template>
    <Page actionBarHidden="true">
        <FlexboxLayout class="page">
            <StackLayout class="center">
                <Image class="logo" src="~/images/cart-loading.gif"  width="96" height="96"/>
                <Label text="Checking Out" class="h6"></Label>
            </StackLayout>
        </FlexboxLayout>
    </Page>
</template>

<script>
var appSettings = require("application-settings")

export default {
    mounted(){

    }
}
</script>

<style>
    .page {
        align-items: center;
        flex-direction: column;
    }
    .center {
        margin-left: 35;
        margin-right: 35;
        flex-grow: 2;
        vertical-align: middle;
    }    
    .logo {
        margin-bottom: 16;
        height: 90;
        font-weight: bold;
    }
</style>
