<template>
  <q-page class="q-pa-md doc-container">
    <div class="row justify-between full-width row wrap justify-start items-start content-start"
         style="height: 60px; max-width: available;">
      <q-breadcrumbs class="col-auto text-h6">
        <q-breadcrumbs-el label="Главная" to="/"/>
        <q-breadcrumbs-el label="Подготовка ТКП" to="/app_mgr"/>
        <q-breadcrumbs-el label="Список заявок ТКП"/>
      </q-breadcrumbs>
      <div class="col-auto text-h5" style="max-width: available;">
        Вы <em style="background-color: bisque">не закончили заполнять</em> анкету -- она в черновиках!
      </div>
      <div class="col-2">
        <q-btn round>
          <q-icon name="face" style="font-size: 3rem;"/>
          <q-menu>
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">Найстройки</div>
                <q-toggle v-model="acc1" label="Сохранять историю"/>
                <q-toggle v-model="acc2" label="Кешировать данные"/>
              </div>

              <q-separator vertical inset class="q-mx-lg"/>

              <div class="column items-center">
                <q-avatar size="72px">
                  <img src="https://cdn.quasar.dev/img/avatar4.jpg">
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">Иванов Иван</div>

                <q-btn
                        color="primary"
                        label="Выйти"
                        push
                        size="sm"
                        v-close-popup
                />
              </div>
            </div>
          </q-menu>
        </q-btn>
      </div>
    </div>
    <div class="fit row wrap text-h4" style="height: 150px">
      Заявки
    </div>
    <div class="fit row wrap q-pt-md q-gutter-md" style="height: 150px">
      <q-btn to="/app_mgr/create" color="primary" label="Новая заявка" class="btn-fixed-width" icon="add"/>
      <q-btn to="/app_mgr" label="К списку объектов" flat color="primary"/>
      <div class="col-4"></div>
      <q-btn label="К черновикам" flat color="primary" @click="onDraftsClicked"/>
    </div>

    <div class="fit row wrap q-pt-sm q-pb-sm" style="height: 150px">
      <q-btn flat round icon="filter_alt">
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section>Фильтры</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Для</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup>
              <q-item-section>Списка</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Объектов</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>

    <q-list bordered separator class="rounded-borders" style="width: 90%;">
      <q-card class="my-card" v-for="app in applications" :key="app.id">
        <q-card-section horizontal class="justify-start">
          <q-card-section horizontal class="justify-start">
            <q-card-actions vertical class="justify-around">
              <q-btn flat round :color="app.status === 'ready' ? 'green' : 'orange'" icon="circle" disabled/>
              <q-btn flat round color="grey" icon="edit" @click="onAppEditClicked(app.id)"/>
            </q-card-actions>
            <div>
              <q-img
                      class="col"
                      :src="app.obj.img"
                      style="height: 100px; max-width: 100px"
              />
              <div class="text-center" style="min-width: 100px;">ID {{ app.id }}</div>
            </div>
          </q-card-section>
          <q-card-section horizontal class="justify-start">
            <q-card-section vertial class="q-pa-md">
              <div class="text-bold">{{ app.obj.title }}, {{ app.obj.description }}</div>
              <div class="">
                Клиент:<br/>
                {{ app.client }}<br/>
                {{ app.obj.address }}
              </div>
            </q-card-section>
            <q-card-section vertial class="q-pa-md">
              <div class="text-bold">Контактное лица:</div>
              <div class="">
                {{ app.contacts[0].name}}<br/>
                {{ app.contacts[0].phone}}<br/>
                {{ app.contacts[0].email}}
              </div>
              <a href="google.com">ещё 2</a>
            </q-card-section>
            <q-card-section vertial class="q-pa-md">
              <div>Дата создания<br/>
                {{ app.created.datetime}}<br/>
                {{ app.created.user }}
              </div>
            </q-card-section>
            <q-card-section vertial class="q-pa-md">
              <div>Дата изменения<br/>
                {{ app.modified.datetime }}<br/>
                {{ app.modified.user}}
              </div>
            </q-card-section>
          </q-card-section>
        </q-card-section>
      </q-card>
    </q-list>

    <q-dialog v-model="dialogDrafts">
      <q-card>
        <q-card-section>
          <div class="text-h6">Разработка</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Переход в Окно черновиков заявок
        </q-card-section>

        <q-card-actions align="center">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialogEditApp">
      <q-card>
        <q-card-section>
          <div class="text-h6">Разработка</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Переход в Окно редактирования заявок
        </q-card-section>

        <q-card-actions align="center">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  name: 'PageAppList',
  data () {
    return {
      acc1: true,
      acc2: false,
      dialogDrafts: false,
      dialogEditApp: false,
      applications: [
        {
          id: 1,
          status: 'ready',
          obj: {
            id: 1,
            title: 'ФОК "Искра"',
            description: 'Стадион на 1000 человек',
            address: 'г. Владивосток, ул Ленина, д.2',
            img: './img/fok.jpg'
          },
          client: 'ООО Егоровна и колобки',
          contacts: [
            {
              id: 1,
              name: 'Иванов Иван',
              phone: '+79871234567',
              email: 'ivan@gmail.com'
            }
          ],
          created: {
            datetime: '12.12.2020 в 12.00',
            user: 'Сергей Сергеев'
          },
          modified: {
            datetime: '13.12.2020 в 12.00',
            user: 'Пётр Петров'
          }
        },
        {
          id: 2,
          status: 'not',
          obj: {
            id: 1,
            title: 'ФОК',
            description: 'ФОК на 400 человек',
            address: 'г. Москва, ул Тверская, д.2 ',
            img: './img/fok2.jpg'
          },
          client: 'ОАО Рога и копыта',
          contacts: [
            {
              id: 2,
              name: 'Петров Пётр',
              phone: '+79871234567',
              email: 'petr@gmail.com'
            }
          ],
          created: {
            datetime: '12.11.2020 в 11.00',
            user: 'Василий Васильев'
          },
          modified: {
            datetime: '13.11.2020 в 11.00',
            user: 'Артём Артемов'
          }
        }
      ]
    }
  },
  methods: {
    onDraftsClicked () {
      this.dialogDrafts = true
    },
    onAppEditClicked (appId) {
      this.dialogEditApp = true
    }
  }
}
</script>

<style lang="sass" scoped>
  .my-card
    width: auto
    max-height: 200px
    margin: 4px

</style>
