<template>

    <v-app>

        <v-toolbar color="primary" dark>

            <v-btn icon depressed tag="span" class="btn-icon_inactive" :ripple="false">
                <v-icon>apps</v-icon>
            </v-btn>

            <v-toolbar-title class="ml-0">
                UI Task tracker - {{ getUserName }}
            </v-toolbar-title>

            <v-spacer/>

            <v-tooltip bottom>
                <v-btn slot="activator" icon to="/kanban">
                    <v-icon class="flip-vertical">equalizer</v-icon>
                </v-btn>
                <span>Канбан</span>
            </v-tooltip>

            <v-tooltip bottom>
                <v-btn slot="activator" icon to="/list">
                    <v-icon>storage</v-icon>
                </v-btn>
                <span>Краткий вид</span>
            </v-tooltip>

            <v-tooltip bottom>
                <v-btn slot="activator" icon to="/table">
                    <v-icon>dns</v-icon>
                </v-btn>
                <span>Подробный вид</span>
            </v-tooltip>

            <v-tooltip bottom>
                <v-btn slot="activator" icon @click="logout">
                    <v-icon>power_settings_new</v-icon>
                </v-btn>
                <span>Выход</span>
            </v-tooltip>

        </v-toolbar>

        <v-content>

            <v-container fluid fill-height>

                <v-layout row pb-2>

                    <v-flex xs12>

                        <router-view/>

                    </v-flex>

                </v-layout>

            </v-container>

        </v-content>

    </v-app>

</template>

<script>

    export default {

        components: {},

        props: {},

        data: () => ({

            tasks: [],
            user: null,

        }),

        computed: {

          getUserName () {

            return this.$store.getters.user_name

          }

        },

        created: function () {

          this.setup()

        },

        methods: {

          setup: function () {

            this.$store.dispatch('loadTasks')

          },


          logout: function () {

            this.$store.dispatch('clearUser')
            sessionStorage.removeItem('user')
            this.$router.replace('login')

          }

        }

    }
</script>

<style lang="stylus">

    .toolbar__title_layout_baseline
        margin-left: 0

    .btn-icon_inactive

        &:hover,
        &:focus

            .btn__content

                &:before

                    background-color: transparent

</style>
