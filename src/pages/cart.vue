<template>
    <Page class="page">
        <ActionBar class="action-bar" title="Cart" flat="true">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="$router.back()"/>
        </ActionBar>
        <DockLayout stretchLastChild="true">

        </DockLayout>
    </Page>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    props: ['carts']
}
</script>

<style>

</style>
