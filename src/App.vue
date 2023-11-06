<template>
  <div>
    <Alert />
    <RouterView />
  </div>
</template>

<script>
    import { RouterView, RouterLink } from 'vue-router'
    import Alert from '@/components/Alert.vue'
    export default {
      components: {
            RouterView,
            Alert
        },
        data() {
          return {

          }
        }
    }
</script>