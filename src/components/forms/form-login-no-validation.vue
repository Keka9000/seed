<template>

    <v-form class="form-login">

        <div class="form-login__fieldset">

            <v-text-field
                ref="login"
                @keyup.enter="submit"
                label="Логин"
                prepend-inner-icon="person"
                v-model="login"
                required
            ></v-text-field>

            <v-text-field
                ref="password"
                @keyup.enter="submit"
                @click:append="() => (visible = !visible)"
                label="Пароль"
                prepend-inner-icon="lock"
                :append-icon="visible ? 'visibility' : 'visibility_off'"
                :type="visible ? 'text' : 'password'"
                v-model="password"
                required
            ></v-text-field>

        </div>

        <v-btn @click="submit" :disabled="!login || !password" color="primary" block class="form-login__submit">Войти</v-btn>

        <span v-if="!submitStatus">{{message}}</span>

    </v-form>

</template>

<script>

    import my_users from '@/assets/data/users.js'

    export default {

        data: () => ({

            visible: false,
            submitStatus: true,
            message: 'Неправильная пара логин/пароль',

            login: '',
            password: '',

            users: []

        }),

        created: function () {

        },

        mounted: function () {

            this.focus()

        },


        methods: {

            submit: function () {

              this.submitStatus = true

              const user = {
                login: this.login,
                password: this.password
              }

              this.$store.dispatch('setUser', user).then(response => {
                // console.log('response', response)
                if(response) {
                  this.$router.push('kanban')
                } else {
                  this.reset()
                }
              })

            },


            focus: function (field = 'login') {

                setTimeout(() => this.$refs[field].focus())
                return this

            },

            reset: function () {

                this.submitStatus = false
                this.login = ''
                this.password = ''

            }

        }

    }

</script>

<style lang="stylus">

    .form-login__fieldset

        width: 100%
        margin-bottom: 24px

    .form-login__field

    .form-login__submit

        text-transform: none
        font-weight: 300
        letter-spacing: 1px
        width: 100%

</style>
