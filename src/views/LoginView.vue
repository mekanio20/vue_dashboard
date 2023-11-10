<template>
    <div class="page mt-200 page-center">
      <div class="container container-tight py-4">
        <div class="card card-md">
          <div class="card-body">
            <h2 class="h2 text-center mb-4">Login</h2>
            <form @submit="login">
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
                      <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
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

<style >
    @import '@/assets/main.css';
    @import '@/assets/css/tabler.min.css';
    @import '@/assets/css/tabler-flags.min.css';
    @import '@/assets/css/tabler-payments.min.css';
    @import '@/assets/css/tabler-vendors.min.css';
    @import '@/assets/css/demo.min.css';
</style>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                phone: '',
                password: ''
            }
        },
        methods: {
            async login() {
                try {
                    const API_URL = 'http://localhost:5000/api/user/login'
                    const postData = {
                        phone: this.phone,
                        password: this.password
                    }
                    const response = await axios.post(API_URL, postData)
                    if (response.data.type === "success") {
                        localStorage.setItem('Authorization', `Bearer ${response.data.token}`)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }
</script>