<template>
  <div class="container-xl">
      <div v-if="errorAlert" class="alert alert-danger" :class="{ 'block': errorAlert }" role="alert">{{ errorAlert }}
      </div>
  </div>
  <div class="page mt-200 page-center">
    <div class="container container-tight py-4">
      <div class="card card-md">
        <div class="card-body">
          <h2 class="h2 text-center mb-4">Login</h2>
          <form @submit.prevent="login">
            <div class="mb-3">
              <label class="form-label">Phone number</label>
              <input v-model="phone" type="text" class="form-control" placeholder="6*******" />
            </div>
            <div class="mb-2">
              <label class="form-label">
                Password
              </label>
              <div class="input-group input-group-flat mb-3">
                <input v-model="password" type="password" class="form-control" placeholder="Your password">
                <span class="input-group-text">
                  <a href="#" class="link-secondary" title="Show password" data-bs-toggle="tooltip">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                      stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                      <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                    </svg>
                  </a>
                </span>
              </div>
              <span class="form-label-description mb-3">
                <a href="#">I forgot password</a>
              </span>
            </div>
            <div class="form-footer">
              <button type="submit" class="btn btn-primary w-100">Sign in</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      phone: null,
      password: null,
      errorAlert: null
    }
  },
  methods: {
    async errorMessage(msg) {
      this.errorAlert = msg
      setTimeout(() => {
          this.errorAlert = null
      }, 3000)
    },
    async login() {
      try {
        const postData = {
          phone: this.phone,
          password: this.password
        }
        const response = await this.$appAxios.post('/user/login', postData)
        if (response && response.data.type === "success") {
          this.$store.commit("setToken", response.data.token)
          this.$store.state.authStatus = true
          this.$router.push({ name: "Admin" })
        }
      } catch (error) {
        this.errorMessage(error.response.data.msg)
      }
    }
  }
}
</script>

<style >
@import '@/assets/main.css';
@import '@/assets/css/tabler.min.css';
@import '@/assets/css/tabler-flags.min.css';
@import '@/assets/css/tabler-payments.min.css';
@import '@/assets/css/tabler-vendors.min.css';
@import '@/assets/css/demo.min.css';

.alert {
    width: 80%;
    margin: 10px auto;
    position: relative;
    padding: 0.75rem 1.25rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
}

.alert-danger {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
    display: none;
}

.block {
    display: block;
}
</style>