<template>
  <q-page class="q-pa-md doc-container">

    <div class="row justify-between full-width row wrap justify-start items-start content-start"
         style="height: 60px; max-width: available;">
      <q-breadcrumbs class="col-auto">
        <q-breadcrumbs-el label="Главная" to="/"/>
        <q-breadcrumbs-el label="Подготовка ТКП" to="/app_mgr"/>
        <q-breadcrumbs-el label="Список заявок ТКП" to="/app_mgr/list"/>
        <q-breadcrumbs-el label="Новая заявка"/>
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

    <q-stepper
            v-model="step"
            vertical
            color="primary"
            header-class="text-bold"
            animated
            ref="stepper"
    >
      <q-step
              :name="1"
              title="Основные данные"
              prefix="1"
              done-color="green"
              inactive-color="secondary"
              :done="step > 1"
      >

        <div class="fit row wrap content-start" style="height: 150px">
          <div class="col-auto text-h6" style="max-width: available;">
            Выберите местоположение объекта:
          </div>
        </div>

        <div class="fit row wrap justify-start" style="height: 150px">
          <yandex-map
                  style="width: 500px; height: 300px;"
                  :coords="[54.62896654088406, 39.731893822753904]"
                  :cluster-options="{
                  1: {clusterDisableClickZoom: true}
               }"
                  :controls="['trafficControl']"
                  :placemarks="placemarks"
                  map-type="hybrid"
                  @map-was-initialized="initHandler"
          ></yandex-map>
          <div class="col-auto text-h6 q-pa-md" style="max-width: available;">
            Снеговая нагрузка: 2<br/>
            Ветровая нагрузка: 5<br/>
            Сейсмика: 3
          </div>
        </div>

        <div class="fit row wrap content-start q-pb-md" style="height: 150px">
          <div class="col-auto text-h6" style="max-width: available;">
            <b>Адрес:</b>
            <br/>
            Москва, ул. Пушкина, участок 334/5
          </div>
        </div>

        <q-form @submit="onSubmit" class="q-gutter-md row justify-between">
          <div class="q-gutter-md col" style="max-width: 500px">
            <div class="col-auto text-h6" style="max-width: available;">
              Сведения о заказчике:
            </div>
            <q-select v-model="clientType" :options="clientTypes" label="Тип клиента" stack-label :dense="dense"
                      :options-dense="denseOpts"/>
            <q-select v-model="legalForm" :options="legalForms" label="Форма" stack-label :dense="dense"
                      :options-dense="denseOpts"/>
            <q-input v-model="clientName" label="Наименование" stack-label :dense="dense"/>
            <q-input v-model="personalTaxNum" label="ИНН" stack-label :dense="dense"/>
            <q-input v-model="ogrnNum" label="ОГРН" stack-label :dense="dense"/>
            <q-input v-model="legalAddr" label="Юридический адрес" stack-label/>
            <q-input v-model="actualAddr" label="Фактический адрес" stack-label/>

            <div class="col-auto text-h6" style="max-width: available;">
              Тип здания:
            </div>
            <q-select v-model="buildingPurpose" :options="buildingPurposes" label="Назначение" stack-label
                      :dense="dense"
                      :options-dense="denseOpts"/>
            <q-select v-model="buildingNote" :options="buildingNotes" label="Уточнение" stack-label :dense="dense"
                      :options-dense="denseOpts"/>

            <q-uploader
                    url="http://localhost:4444/upload"
                    color="primary"
                    flat
                    bordered
                    style="max-width: 300px"
                    label="Прикрепить фото"
            />
          </div>

          <div class="q-gutter-md col" style="max-width: 500px">
            <div class="col-auto text-h6" style="max-width: available;">
              Контактное лицо:
            </div>
            <q-input v-model="contactName" label="ФИО" stack-label :dense="dense"/>
            <q-input v-model="contactPhone" label="Телефон" stack-label :dense="dense"/>
            <q-input v-model="contactJob" label="Долэность" stack-label :dense="dense"/>
            <q-input v-model="contactEmail" label="E-mail" stack-label :dense="dense"/>
            <q-btn label="Добавить контактное лицо" color="primary" icon="add"/>
            <q-uploader
                    url="http://localhost:4444/upload"
                    label="Файлы от заказчика"
                    multiple
                    batch
                    style="max-width: 300px"
            />
          </div>
        </q-form>

        <div class="q-pa-md row">
          <q-btn label="Далее" color="primary" @click="step = 2"/>
        </div>
      </q-step>
      <q-step
              :name="2"
              title="Конструктивная схема"
              prefix="2"
              done-color="green"
              inactive-color="secondary"
              :done="step > 2"
      >
        <div>КОНСТРУКТИВНАЯ СХЕМА</div>
        <div class="q-pa-md row q-gutter-sm">
          <q-btn label="Далее" color="primary" @click="step = 3"/>
          <q-btn label="Назад" flat color = "primary" @click="step = 1"/>
        </div>
      </q-step>
      <q-step
              :name="3"
              title="Нагрузки"
              prefix="3"
              done-color="green"
              inactive-color="secondary"
              :done="step > 3"
      >
        <div>НАГРУЗКИ</div>
        <div class="q-pa-md row q-gutter-sm">
          <q-btn label="Далее" color="primary" @click="step = 4"/>
          <q-btn label="Назад" flat color = "primary" @click="step = 2"/>
        </div>
      </q-step>
      <q-step
              :name="4"
              title="Подробное описание конструкций"
              prefix="4"
              done-color="green"
              inactive-color="secondary"
              :done="step > 4"
      >
        <div>ПОДРОБНОЕ ОПИСАНИЕ КОНСТРУКЦИЙ</div>
        <div class="q-pa-md row q-gutter-sm">
          <q-btn label="Далее" color="primary" @click="step = 5"/>
          <q-btn label="Назад" flat color = "primary" @click="step = 3"/>
        </div>
      </q-step>
      <q-step
              :name="5"
              title="Дополнительные параметры"
              prefix="5"
              done-color="green"
              inactive-color="secondary"
              :done="step > 5"
      >
        <div>ДОПОЛНИТЕЛЬНЫЕ ПАРАМЕТРЫ</div>
        <div class="q-pa-md row q-gutter-sm">
          <q-btn label="Далее" color="primary" @click="step = 6"/>
          <q-btn label="Назад" flat color = "primary" @click="step = 4"/>
        </div>
      </q-step>
      <q-step
              :name="6"
              title="Экономика"
              prefix="6"
              done-color="green"
              inactive-color="secondary"
              :done="step > 6"
      >
        <div>ЭКОНОМИКА</div>
        <div class="q-pa-md row">
          <q-btn label="Далее" color="primary" @click="step = 7"/>
          <q-btn label="Назад" flat color = "primary" @click="step = 5"/>
        </div>
      </q-step>
      <q-step
              :name="7"
              title="План-график"
              prefix="7"
              done-color="green"
              inactive-color="secondary"
              :done="step > 7"
      >
        <div>ПЛАН ГРАФИК</div>
        <div class="q-pa-md row q-gutter-sm">
          <q-btn label="Созранить" color="primary" tpye="submit" @click="onSubmit"/>
          <q-btn label="Сформировать PDF" color="primary" @click="onGetPdf"/>
        </div>
      </q-step>
    </q-stepper>
  </q-page>
</template>

<script>
// import { yandexMap, ymapMarker } from 'vue-yandex-maps'
import { yandexMap } from 'vue-yandex-maps'

export default {
  name: 'PageAppCreate',
  // components: { yandexMap, ymapMarker },
  components: { yandexMap },
  data () {
    return {
      step: 1,
      clientTypes: ['Юр. лицо', 'Физ. лицо', 'ИП'],
      clientType: 'Юр. лицо',
      legalForms: ['АО', 'ЗАО', 'ООО', 'ОАО'],
      legalForm: 'АО',
      clientName: 'Техно-строй',
      personalTaxNum: '1234567890',
      ogrnNum: '0987654321',
      legalAddr: 'Москва, Сущёвский вал, 10',
      actualAddr: 'Москва, Сущёвский вал, 10',
      buildingPurposes: ['ФОК', 'Склад', 'Детский сад'],
      buildingPurpose: 'ФОК',
      buildingNotes: ['Уточнения', 'для', 'разныз типов зданий', 'стадион на 1000 мест'],
      buildingNote: 'стадион на 1000 мест',
      contactName: 'Иванов И.И.',
      contactPhone: '+7 (999) 123-45-67',
      contactJob: 'менеджер проекта',
      contactEmail: 'manager-ivan@fok-42.ru',
      dense: true,
      denseOpts: true,
      coords: [
        54.82896654088406,
        39.831893822753904
      ]
    }
  },
  methods: {
    onSubmit () {
      console.log('Ввод данных завершён')
    },
    onGetPdf () {
      console.log('Сформировать пдф')
    },
    onMapClick (e) {
      this.coords = e.get('coords')
    }
  }
}
</script>
