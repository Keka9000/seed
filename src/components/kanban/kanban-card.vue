<template>

    <v-card class="kanban-card text-xs-left" raised hover style="border-left-color: #e0e0e0">

        <v-container grid-list-md pa-2>
            <v-layout ma-0 align-center>
                <v-flex pa-0 class="font-weight-medium text-truncate">
                    {{ data.name }}
                </v-flex>
                <v-flex pa-0 shrink class="caption grey--text text--lighten-1">
                    {{ data.status }}
                </v-flex>
            </v-layout>
        </v-container>

        <v-divider/>

        <v-card-text @dblclick="editCard" class="pa-2 font-italic">
            <div class="kanban-card__name" >{{ data.description }}</div>
        </v-card-text>

        <v-divider/>

        <v-container grid-list-md pa-2>
            <v-layout ma-0 align-center>
                <v-flex pa-0 shrink class="caption grey--text text--lighten-1">
                    Приоритет: {{priority}}
                </v-flex>

                <v-spacer/>

                <v-flex pa-0 shrink class="caption grey--text text--lighten-1">
                    {{ moment(data.date_start).format('DD-MM-YYYY') }}
                </v-flex>
            </v-layout>
        </v-container>

    </v-card>

</template>

<script>

    export default {

        name: 'kanban-card',

        props: {

            data: Object

        },

        data () {

            return {
                priority: '',
                priorityTypes: [
                  {
                    val: 0,
                    text: "Наивысший"
                  },
                  {
                    val: 1,
                    text: "Высокий"
                  },
                  {
                    val: 2,
                    text: "Средний"
                  },
                  {
                    val: 3,
                    text: "Низкий"
                  },
                ],
            }

        },

        computed: {

            getPriority () {

                set: {
                  this.priorityTypes.forEach(type => {

                    if(type.val == this.data.priority) {

                      this.priority = type.text

                    }

                  })
                }

            },

        },

        created: function () {

          this.priorityTypes.forEach(type => {

            if(type.val == this.data.priority) {

              this.priority = type.text

            }

          })

        },

        methods: {

            editCard: function () {

              this.$emit('edit', this.data)

            }

        }

    }

</script>

<style>

  .kanban-card {

      border-radius: 5px;
      box-sizing: border-box;

  }

  .kanban-card__name {

      border-radius: 5px;
      box-sizing: border-box;
      display: block;
      max-height: calc(22px * 3);
      margin: 0 auto;
      font-size: 14px;
      line-height: 22px;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      cursor: pointer;
  }

</style>
