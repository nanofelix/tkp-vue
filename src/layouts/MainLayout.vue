<template>
  <q-layout view="lHh Lpr lFf" class="fa-align-center justify-center row q-pa-lg window-width">
    <q-drawer
      v-model="drawer"
      show-if-above

      :mini="!drawer || miniState"
      @click.capture="drawerClick"

      :width="200"
      :breakpoint="500"
      bordered
      content-class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <q-list>
          <q-item></q-item>
          <EssentialLink
                  v-for="link in essentialLinks"
                  :key="link.title"
                  v-bind="link"
          />
        </q-list>
      </q-scroll-area>

      <div class="q-mini-drawer-hide absolute z-top" style="top: 55px; right: -17px">
        <q-btn
          dense
          round
          color="grey"
          icon="chevron_left"
          @click="miniState = true"
        />
      </div>
    </q-drawer>

    <q-page-container class="fa-align-center justify-between window-width bg-white" style="max-width: 80%;">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    icon: 'home',
    link: '/',
    caption: 'Перейти домой',
    title: 'Домой'
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      drawer: false,
      miniState: true,
      essentialLinks: linksData
    }
  },
  methods: {
    drawerClick (e) {
      if (this.miniState) {
        this.miniState = false
        e.stopPropagation()
      }
    }
  }
}
</script>
