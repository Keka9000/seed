<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Подробный вид</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-layout ma-0 justify-end align-baseline>
          <v-flex xs4 pr-2>
              <v-select
                v-model="filtered"
                :items="statuses"
                item-text="text"
                item-value="val"
                label---="Filter"
              ></v-select>
          </v-flex>

          <v-flex xs4 pr-2>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
          </v-flex>

          <v-dialog v-model="dialog" max-width="600px">

            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">Новая задача</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout column wrap>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.name" label="Наименование"></v-text-field>
                    </v-flex>

                    <v-flex xs12 sm6 md4>
                      <v-textarea outline v-model="editedItem.description" label="Описание"></v-textarea>
                    </v-flex>

                    <v-layout ma-0 justify-space-brtween>
                        <v-flex>
                          <v-autocomplete
                            v-model="editedItem.priority"
                            label="Приоритет"
                            :items="priorityTypes"
                            item-text="text"
                            item-value="val"
                          ></v-autocomplete>
                        </v-flex>
                        <v-flex xs5>
                          <v-text-field v-model="editedItem.estimate" label="Лимит"></v-text-field>
                        </v-flex>
                        <v-flex xs5>
                          <v-text-field v-if="editedId != -1" v-model="editedItem.fact" label="Факт"></v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-flex xs3>
                      <v-autocomplete
                      v-if="editedId != -1"
                        v-model="editedItem.status"
                        label="Статус"
                        :items="getStatuses"
                        item-text="text"
                        item-value="val"
                      ></v-autocomplete>
                    </v-flex>

                  </v-layout>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click="close">Отмена</v-btn>
                <v-btn color="primary" flat @click="save">Сохранить</v-btn>
              </v-card-actions>

            </v-card>
          </v-dialog>
        </v-layout>
    </v-toolbar>



    <v-data-table
      :headers="headers"
      :items="getItems"
      :search="search"
      class="elevation-1"
      hide-actions
    >

      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.priority }}</td>
        <td class="text-xs-center">{{ props.item.status }}</td>
        <td class="text-xs-left">{{ props.item.description }}</td>
        <td class="text-xs-right">{{ props.item.fact }}</td>
        <td class="text-xs-right">{{ props.item.estimate }}</td>
        <td class="text-xs-right">{{ moment(props.item.date_start).format('DD-MM-YYYY') }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
  </div>
</template>


<script>
  export default {

    name: 'task-table',

    data: () => ({
      search: null,
      filtered: 0,
      dialog: false,
      headers: [
        { text: 'Название', value: 'name', align: 'left', sortable: false },
        { text: 'Приоритет', value: 'priority' },
        { text: 'Статус', value: 'status' },
        { text: 'Описание', value: 'description', align: 'left', sortable: false },
        { text: 'Факт', value: 'fact', align: 'right' },
        { text: 'Лимит', value: 'estimate', align: 'right' },
        { text: 'Дата создания', value: 'date_start', align: 'right' },
        { text: 'Действия', value: 'name', sortable: false }
      ],
      tasks: [],
      editedId: -1,
      editedItem: {
        id: null,
        user_id: null,
        priority: null,
        status: 1,
        name: '',
        description: '',
        estimate: 0,
        fact: 0,
        date_start: '',
        date_end: ''

      },
      defaultItem: {
        id: null,
        user_id: null,
        priority: null,
        status: 1,
        name: '',
        description: '',
        estimate: null,
        fact: null,
        date_start: '',
        date_end: ''
      },

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
      statuses: [
        {
          val: 0,
          text: "все"
        },
        {
          val: 1,
          text: "создана"
        },
        {
          val: 2,
          text: "в работе"
        },
        {
          val: 3,
          text: "завершена"
        }
      ],
    }),

    computed: {

      formTitle () {
        return this.editedId === -1 ? 'Новая задача' : 'Изменить задачу'
      },

      getItems () {

        var arr = this.$store.getters.getTasks.filter(task => {

          return task.user_id == this.$store.getters.user_id

        })

        return (this.filtered != 0) ? arr.filter(task => {return task.status == this.filtered}) : arr

      },
      getStatuses () {

        return this.statuses.slice(1)

      }
    },

    filters: {

      formatDate: function (val) {

          let $_date = val.split('-').reverse().join('.')
          return $_date

      }
    },

    watch: {

      dialog (val) {
        val || this.close()
      },

    },

    created () {},

    methods: {

      editItem: function (item) {

        this.editedId = item.id
        this.editedItem = Object.assign({}, item)
        this.dialog = true

      },

      deleteItem: function (item) {

        confirm('Уверены?') && this.$store.dispatch('removeTask', item)

      },

      close: function () {
        this.dialog = false
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedId = -1

      },

      save: function () {
        if (this.editedId > -1) {
          this.$store.dispatch('changeTask', this.editedItem)
        } else {

          this.editedItem.user_id = this.$store.getters.user_id
          this.editedItem.date_start = new Date()
          this.editedItem.id = new Date().getUTCMilliseconds()

          this.$store.dispatch('addTask', this.editedItem)
        }
        this.close()
      }
    }
  }
</script>
