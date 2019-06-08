<template>

  <v-layout fill-height ma-0 pt-3 column class="page-kanban" ref="page">

      <div class="kanban-board pl-3 pr-2" ref="board" :class="{ 'centered': centered }">

          <kanban-column
              v-for="(column, index) in columnList" :key="index" :ref="'column' + column.id"
              :data="getItems"
              :id="column.id"
              :name="column.name"
              :index="index"

              @moved="(payload) => onCardMoved(payload)"
              @changed="(payload) => onCardChanged(payload)"
              @created="(payload) => onCardCreated(payload)"
              @deleted="(payload) => onCardDeleted(payload)"
          />

      </div>

  </v-layout>

</template>


<script>

  import KanbanColumn from './kanban-column'

  export default {

    name: 'kanban-board',

    components: {

        'kanban-column': KanbanColumn,

    },

    data: () => ({

      columns: [
        {
          id: 1,
          name: 'План'
        },
        {
          id: 2,
          name: 'В процессе'
        },
        {
          id: 3,
          name: 'Готово'
        },
      ],
      centered: true,

      editedIndex: -1,

    }),

    computed: {

      getItems () {

          var arr = this.$store.getters.getTasks.filter(task => {

            return task.user_id == this.$store.getters.user_id

          })

          return arr.sort((a, b) => {

            return a.priority - b.priority

          })

      },

      columnList () {

          return this.columns

      },

    },

    created () {},

    methods: {

      onCardMoved: function (payload) {

        this.$store.getters.getTasks.forEach(task => {

          if(task.id == payload.id) {

            task.status = payload.status
            this.$store.dispatch('changeTask', task)

          }

        })

      },

      onCardChanged: function (payload) {

        this.$store.dispatch('changeTask', payload)

      },

      onCardCreated: function (payload) {

        this.$store.dispatch('addTask', payload)

      },

      onCardDeleted: function (payload) {

        this.$store.dispatch('removeTask', payload)

      },
    }
  }
</script>

<style lang="stylus">

    maxWidth(times)

        $_column-width = 280px
        max-width: $_column-width * times

    .page-kanban

        display: flex
        flex: auto

        position: relative
        overflow-x: auto

        width: 100%
        margin: 0 auto

    .kanban-board

        display: flex
        flex: auto

        justify-content: flex-start

        position: relative

        width: 100%
        margin: 0 auto

        &.centered

            justify-content: center

</style>
