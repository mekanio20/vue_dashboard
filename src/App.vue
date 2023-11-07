<template>
  <div>
    <RouterView />
  </div>
</template>

<script>
    import { RouterView, RouterLink } from 'vue-router'
    export default {
      components: {
            RouterView
        },
        data() {
          return {
            
          }
        }
    }
</script>