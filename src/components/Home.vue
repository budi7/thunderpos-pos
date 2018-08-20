<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Home"/>

    <StackLayout>
      <Button class="btn btn-primary" @tap="$router.push('/counter')">Counter</Button>
      <Button class="btn btn-primary" @tap="$router.push('/hello')">Hello World</Button>
      <Button class="btn btn-primary" @tap="$router.push('/pos')">Pos</Button>
      <Button class="btn btn-primary" @tap="$router.push('/login')">Pos</Button>
      <label :text="products" />
    </StackLayout>

  </Page>
</template>

<script>
module.exports = {
    data() {
      return {
        products: "hi"
      };
    },
    mounted(){
      console.log("loaded")
    }
}
</script>