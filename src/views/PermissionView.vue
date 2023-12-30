<template>
    <Header />
    <Navbar />
    <div class="container-xl mt-3 mb-6">
        <div v-if="successAlert" class="alert alert-success" :class="{ 'block': successAlert }" role="alert">{{ successAlert
        }}</div>
        <div v-if="errorAlert" class="alert alert-danger" :class="{ 'block': errorAlert }" role="alert">{{ errorAlert }}
        </div>
        <div class="row">
            <div class="col-lg-6 mb-3">
                <div class="col-12">
                    <form @submit.prevent="addPermission" class="card">
                        <div class="card-header">
                            <h3 class="card-title">Add Permission</h3>
                        </div>
                        <div class="card-body">
                            <div class="row row-cards">
                                <div class="mb-3 col-sm-4 col-md-3">
                                    <label class="form-label required">Method</label>
                                    <select v-model="post.method" class="form-select">
                                        <option value="GET">GET</option>
                                        <option value="POST">POST</option>
                                        <option value="PUT">PUT</option>
                                        <option value="DELETE">DELETE</option>
                                    </select>
                                </div>
                                <div class="mb-3 col-sm-4 col-md-4">
                                    <label class="form-label required">Group</label>
                                    <select v-model="post.groupId" class="form-select">
                                        <option v-for="group in groups.detail" :key="group.id" :value="group.id">{{
                                            group.name
                                        }}</option>
                                    </select>
                                </div>
                                <div class="mb-3 col-sm-8 col-md-8">
                                    <label class="form-label required">URL</label>
                                    <input v-model="post.url" class="form-control">
                                </div>
                            </div>
                        </div>
                        <FormButton />
                    </form>
                </div>
            </div>
            <div class="col-lg-6 mb-3">
                <div class="col-12">
                    <form @submit.prevent="updatePermission" class="card">
                        <div class="card-header">
                            <h3 class="card-title">Update Permission</h3>
                        </div>
                        <div class="card-body">
                            <div class="row row-cards">
                                <div class="mb-3 col-sm-4 col-md-3">
                                    <label class="form-label required">Method</label>
                                    <select v-model="update.method" class="form-select">
                                        <option value="GET">GET</option>
                                        <option value="POST">POST</option>
                                        <option value="PUT">PUT</option>
                                        <option value="DELETE">DELETE</option>
                                    </select>
                                </div>
                                <div class="mb-3 col-sm-4 col-md-4">
                                    <label class="form-label required">Group</label>
                                    <select v-model="update.groupId" class="form-select">
                                        <option v-for="group in groups.detail" :key="group.id" :value="group.id">{{
                                            group.name
                                        }}</option>
                                    </select>
                                </div>
                                <div class="mb-3 col-sm-8 col-md-8">
                                    <label class="form-label required">URL</label>
                                    <input v-model="update.url" class="form-control">
                                </div>
                            </div>
                        </div>
                        <FormButton />
                    </form>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Permissions</h3>
                </div>
                <div class="table-responsive">
                    <table class="table card-table table-vcenter text-nowrap datatable">
                        <thead>
                            <tr>
                                <th class="w-1"><input class="form-check-input m-0 align-middle" type="checkbox"
                                        aria-label="Select all invoices"></th>
                                <th class="w-1">#Id</th>
                                <th>Url</th>
                                <th>Method</th>
                                <th>Role</th>
                                <th>CreatedAt</th>
                                <th>UpdatedAt</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in permissions.detail" :key="item.id">
                                <td><input class="form-check-input m-0 align-middle" type="checkbox"
                                        aria-label="Select invoice"></td>
                                <td><span class="text-secondary">#{{ item.id }}</span></td>
                                <td>{{ item.url }}</td>
                                <td>{{ item.method }}</td>
                                <td>{{ item.group.name }}</td>
                                <td>{{ item.createdAt }}</td>
                                <td>{{ item.updatedAt }}</td>
                                <td>
                                    <button class="btn" @click="
                                        update.id = item.id,
                                        update.url = item.url, 
                                        update.method = item.method,
                                        update.groupId = item.group.id
                                        ">Edit
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="card-footer d-flex align-items-center">
                    <p class="m-0 text-secondary">Page <span>1</span> limit <span>10</span></p>
                    <ul class="pagination m-0 ms-auto">
                        <li class="page-item disabled">
                            <a class="page-link" href="#" tabindex="-1" aria-disabled="true">
                                <!-- Download SVG icon from http://tabler-icons.io/i/chevron-left -->
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24"
                                    viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M15 6l-6 6l6 6" />
                                </svg>
                            </a>
                        </li>
                        <li class="page-item active"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item"><a class="page-link" href="#">4</a></li>
                        <li class="page-item"><a class="page-link" href="#">5</a></li>
                        <li class="page-item">
                            <a class="page-link" href="#">
                                <!-- Download SVG icon from http://tabler-icons.io/i/chevron-right -->
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24"
                                    viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M9 6l6 6l-6 6" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Navbar from '@/components/Navbar.vue'
import FormButton from '@/components/layouts/FormButton.vue'
export default {
    name: "Permissions",
    components: {
        Header,
        Navbar,
        FormButton
    },
    data() {
        return {
            permissions: null,
            successAlert: null,
            errorAlert: null,
            groups: [],
            post: {
                url: '/api/',
                method: '',
                groupId: 0,
            },
            update: {
                id: 0,
                url: '/api/',
                method: '',
                groupId: 0
            }
        }
    },
    async created() {
        await this.allGroups(),
        await this.allPermissions()
    },
    methods: {
        async successMessage(msg) {
            this.successAlert = msg
            setTimeout(() => {
                this.successAlert = null
            }, 3000)
        },
        async errorMessage(msg) {
            this.errorAlert = msg
            setTimeout(() => {
                this.errorAlert = null
            }, 3000)
        },
        // GET
        async allGroups() {
            try {
                const axiosConfig = {
                    headers: {
                        'Authorization': `${localStorage.getItem('Authorization')}`
                    }
                }
                const response = await this.$appAxios.get('/admin/all/groups', axiosConfig)
                this.groups = response.data
            } catch (error) {
                console.log(error)
            }
        },
        async allPermissions() {
            try {
                const axiosConfig = {
                    headers: {
                        'Authorization': `${localStorage.getItem('Authorization')}`
                    }
                }
                const response = await this.$appAxios.get('/admin/all/permissions', axiosConfig)
                this.permissions = response.data
            } catch (error) {
                console.log(error)
            }
        },
        // POST
        async addPermission() {
            try {
                const postData = {
                    url: this.post.url,
                    method: this.post.method,
                    groupId: this.post.groupId
                }
                const axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${localStorage.getItem('Authorization')}`
                    }
                }
                this.$appAxios.post('/admin/add/permission', postData, axiosConfig)
                    .then((res) => {
                        if (res.data.type === 'error') {
                            this.errorMessage(res.data.msg)
                        } else {
                            this.successMessage(res.data.msg)
                        }
                    })
                    .catch((err) => { this.errorMessage(err.response.data.msg) })
            } catch (error) {
                console.log(error)
            }
        },
        // PUT
        async updatePermission() {
            try {
                const updateData = {
                    id: this.update.id,
                    url: this.update.url,
                    method: this.update.method,
                    groupId: this.update.groupId
                }
                const axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${localStorage.getItem('Authorization')}`
                    }
                }
                this.$appAxios.post('/admin/update/permission', updateData, axiosConfig)
                    .then((res) => {
                        if (res.data.type === 'error') {
                            this.errorMessage(res.data.msg)
                        } else {
                            this.successMessage(res.data.msg)
                        }
                    })
                    .catch((err) => { this.errorMessage(err.response.data.msg) })
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style>
@import '@/assets/css/tabler.min.css';
@import '@/assets/css/tabler-flags.min.css';
@import '@/assets/css/tabler-payments.min.css';
@import '@/assets/css/tabler-vendors.min.css';
@import '@/assets/css/demo.min.css';
</style>