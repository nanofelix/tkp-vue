<template>
  <q-page class="q-pa-md doc-container content-start">
    <div class="row justify-between full-width row wrap justify-start items-start content-start" style="height: 60px">
      <q-breadcrumbs class="col-auto text-h6">
        <q-breadcrumbs-el label="Главная" to="/"/>
        <q-breadcrumbs-el label="Подготовка ТКП" />
      </q-breadcrumbs>
      <div class="col-2">
        <q-btn round>
          <q-icon name="face" style="font-size: 3rem;"/>
          <q-menu>
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">Найстройки</div>
                <q-toggle v-model="acc1" label="Сохранять историю" />
                <q-toggle v-model="acc2" label="Кешировать данные" />
              </div>

              <q-separator vertical inset class="q-mx-lg" />

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
      Объект строительства
    </div>
    <div class="fit row wrap q-pt-md q-gutter-md" style="height: 150px">
      <q-btn color="primary" label="Новый объект" icon="add" @click="onNewObjClicked"/>
      <q-btn to="/app_mgr/list" label="К списку заявок" flat color="primary" />
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
    <div class="fit row wrap justify-start q-gutter-md">
      <q-card v-ripple class="my-card" v-for="obj in objects" :key="obj.id" @click="onCardClicked(obj.id)">
        <img :src="obj.img">

        <q-card-section>
          <div class="text-h6">{{ obj.title }}</div>
          <div class="text-subtitle2">Пользователь: {{ obj.user }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ obj.description }}
        </q-card-section>
      </q-card>
    </div>

    <q-dialog v-model="dialogEditObj">
      <q-card>
        <q-card-section>
          <div class="text-h6">Разработка</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Переход в Окно {{ cardEditId === 0 ? 'создания нового' : `редактирования ${cardEditId}`}} объекта строительства
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
  name: 'PageAppManager',
  data () {
    return {
      acc1: true,
      acc2: false,
      dialogEditObj: false,
      cardEditId: 0,
      drawer: false,
      miniState: true,
      objects: [
        {
          id: 1,
          title: 'ФОК "Искра"',
          user: 'Иванов И.И.',
          description: 'Стадион на 1000 человек',
          img: 'img/fok.jpg'
        },
        {
          id: 2,
          title: 'Склад №1',
          user: 'Петров П.П.',
          description: 'Склад площадью 2000 кв. м',
          img: 'img/wh.jpg'
        },
        {
          id: 3,
          title: 'Дектский сад "Солнышко"',
          user: 'Смирнова А.А.',
          description: 'Районный детский сад',
          img: 'img/kinder.jpg'
        },
        {
          id: 4,
          title: 'Объект 4',
          user: 'Иванов Иван',
          description: 'ФОК на 400 мест',
          img: 'img/obj4.jpg'
        },
        {
          id: 5,
          title: 'Объект строительства 5',
          user: 'Васильев В.В.',
          description: 'Описание для объекта 4',
          img: 'img/obj5.jpg'
        }
      ]
    }
  },
  methods: {
    onNewObjClicked () {
      this.cardEditId = 0
      this.dialogEditObj = true
    },
    onCardClicked (cardId) {
      this.cardEditId = cardId
      this.dialogEditObj = true
    }
  }
}
</script>

<style lang="sass" scoped>
  .my-card
    width: 100%
    max-width: 300px
</style>
