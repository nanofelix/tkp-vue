<template>
  <q-page class="q-pa-md">
    <div class="row justify-between full-width wrap" style="height: 60px">
      <q-breadcrumbs class="col-auto">
        <q-breadcrumbs-el label="Главная" />
      </q-breadcrumbs>
      <div class="col-2">
        <q-btn round>
          <q-icon name="account_circle" style="font-size: 2rem;"/>
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
    <div class="row" style="min-height: 100px;"></div>
    <div class="fit row wrap justify-evenly content-start" style="height: 150px">
      <q-btn color="primary" label="Подготовка ТКП" class="btn-fixed-width" @click="onApplicationManagerClicked"/>
      <q-btn color="primary" label="Исполнение заказа" class="btn-fixed-width" @click="onOrderClicked"/>
      <q-btn color="primary" label="Масштабирование" class="btn-fixed-width" @click="onScaleClicked"/>
    </div>

    <q-dialog v-model="dialogOrder">
      <q-card>
        <q-card-section>
          <div class="text-h6">Разработка</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Переход в "Окно исполнения заявок"
        </q-card-section>

        <q-card-actions align="center">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialogScale">
      <q-card>
        <q-card-section>
          <div class="text-h6">Разработка</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Переход в Окно масштабирования
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
  name: 'PageIndex',
  data () {
    return {
      acc1: true,
      acc2: false,
      dialogOrder: false,
      dialogScale: false
    }
  },
  methods: {
    onApplicationManagerClicked () {
      this.$router.push('app_mgr')
    },
    onOrderClicked () {
      this.dialogOrder = true
    },
    onScaleClicked () {
      this.dialogScale = true
    }
  }
}
</script>
