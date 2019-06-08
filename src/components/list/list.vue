<template>
  <v-layout ma-0 justify-center>
    <v-flex xs6>
      <v-toolbar flat color="white">
        <v-toolbar-title>Краткий вид</v-toolbar-title>

        <v-spacer></v-spacer>

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
                      :items="statuses"
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
      </v-toolbar>

      <v-list two-line>
          <template v-for="(item, index) in getItems">
            <v-list-tile
              :key="item.id"
              avatar
              ripple---
            >
              <v-list-tile-content @dblclick="editItem(item)" style="cursor: pointer">
                <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">Статус: {{ item.status }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>Лимит: {{ item.estimate }} Факт: {{ item.fact }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-list-tile-action-text>Приоритет: {{ item.priority }}</v-list-tile-action-text>
                <v-icon
                  color="error"
                  @click="deleteItem(item)"
                >
                  delete
                </v-icon>
              </v-list-tile-action>

            </v-list-tile>
            <v-divider
              v-if="index + 1 < getItems.length"
              :key="index"
            ></v-divider>
          </template>
        </v-list>

    </v-flex>
  </v-layout>
</template>


<script>
  export default {

    name: 'task-list',

    data: () => ({

      dialog: false,

      tasks: [],
      editedId: -1,
      editedItem: {
        id: null,
        user_id: null,
        priority: null,
        status: 0,
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
        status: 0,
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
          text: "создана"
        },
        {
          val: 1,
          text: "в работе"
        },
        {
          val: 2,
          text: "завершена"
        }
      ],
    }),

    computed: {

      formTitle () {

        return this.editedId === -1 ? 'Новая задача' : 'Изменить задачу'

      },

      getItems () {

        return this.$store.getters.getTasks.filter(task => {

          return task.user_id == this.$store.getters.user_id

        })
      },
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
      }
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
