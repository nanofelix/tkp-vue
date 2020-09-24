<template>
  <q-page padding flex flex-center>
    <q-banner v-if="error" inline-actions class="text-white bg-red">
      Неверные логин или пароль
    </q-banner>
    <q-form
      class="q-gutter-md absolute-center col-auto"
      style="width: 30%;"
    >
      <q-input
        filled
        v-model="login"
        label="Имя пользователя"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Введите имя']"
      />

      <q-input
        filled
        v-model="pass"
        label="Пароль"
        type="password"
      />

      <div class="text-center">
        <q-btn label="Войти" color="primary" @click="onSubmit"/>
      </div>
    </q-form>
  </q-page>
</template>

<script>
export default {
  name: 'PageLogin',
  data () {
    return {
      login: 'guest',
      pass: 'guest',
      error: false
    }
  },

  methods: {
    onSubmit () {
      if (this.login === 'guest' && this.pass === 'guest') {
        this.$router.push('/')
      }
      this.error = true
      setTimeout(() => {
        this.error = false
      }, 1000)
    }
  }
}
</script>
