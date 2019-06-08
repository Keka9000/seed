<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <div class="page-auth">

                    <img alt="Vue logo" src="../assets/logo.png">
                    <form-login/>

            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>

</template>

<script>

    import FormLogin from '@/components/forms/form-login-no-validation'

    export default {

        components: {

            'form-login': FormLogin,

        },

    }

</script>

<style lang="stylus">

    .page-auth

        display: flex
        flex-direction: column
        align-items: center
        position: relative
        width: 260px
        height: auto
        padding: 5px
        box-sizing: border-box

</style>
