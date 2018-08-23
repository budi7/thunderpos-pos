<template>
    <Page actionBarHidden="true">
        <FlexboxLayout class="page">
            <StackLayout class="form">
                <Image class="logo" src="~/images/logo.jpg"  width="96" height="96"/>
                <Label class="header" text="POS"></Label>

                <StackLayout class="input-field" :visibility="page_config.is_mode_forgot_password ? 'visible' : 'collapsed'">
                    <label class="m-b-10" text="Masukkan email yang digunakan untuk mendaftar" />
                </StackLayout>

                <StackLayout class="input-field">
                    <TextField v-model="page_data.email" class="input" hint="Email" keyboardType="email" autocorrect="false" autocapitalizationType="none" returnKeyType="next"></TextField>
                    <StackLayout class="hr-light m-b-10"></StackLayout>
                </StackLayout>

                <StackLayout class="input-field" :visibility="page_config.is_mode_forgot_password ? 'collapsed' : 'visible'">
                    <TextField v-model="page_data.password" class="input" hint="Password" secure="true" returnKeyType="done"></TextField>
                    <StackLayout class="hr-light"></StackLayout>
                </StackLayout>

                <Button :text="page_config.is_mode_forgot_password ? 'Reset Password' : 'Masuk'" @tap="submit" class="btn btn-primary m-t-20 m-b-20"></Button>
                <Label :text="page_config.is_mode_forgot_password ? 'Batal' : 'Lupa password?'" class="login-label" @tap="forgotPassword"></Label>

            </StackLayout>
        </FlexboxLayout>
    </Page>
</template>

<script>
export default {
    data() {
        return {
            page_data: {
                email: null,
                password: null,
            },
            page_config: {
                is_mode_forgot_password: false
            }
        }
    },    
    mounted(){
    },
    methods:{
        submit: function(){
            
            console.log(this.$router.push('pos'))
            return



            if(this.page_config.is_mode_forgot_password){
                resetPassword(this.page_data.email)
            }else{
                login(this.page_data.email, this.page_data.password)
            }


            // modules
            function resetPassword(email) {
                console.log(email)

                // AJAX
            }
            
            function login(email, password){
                console.log(email)
                console.log(password)

                // AJAX                
                // next page
                console.log(this.vue.ed)
            }
        },
        forgotPassword: function(){
            this.page_config.is_mode_forgot_password = !this.page_config.is_mode_forgot_password
            console.log(this.page_config.is_mode_forgot_password)

            // ajax
        }
    }
}
</script>

<style scoped>
.page {
  align-items: center;
  flex-direction: column;
}
.form {
  margin-left: 35;
  margin-right: 35;
  flex-grow: 2;
  vertical-align: middle;
}

.logo {
  margin-bottom: 12;
  height: 90;
  font-weight: bold;
}
.header {
  horizontal-align: center;
  font-size: 25;
  font-weight: 600;
  margin-bottom: 70;
  text-align: center;
}

.input-field {
  margin-bottom: 25;
}
.input {
  font-size: 18;
  placeholder-color: #A8A8A8;
}

.btn-primary {
  height: 50;
  font-size: 20;
  font-weight: 600;
}
.login-label {
  horizontal-align: center;
  color: #A8A8A8;
  font-size: 16;
}
.sign-up-label {
  margin-bottom: 20;
}
.bold {
  color: #000000; 
}

</style>