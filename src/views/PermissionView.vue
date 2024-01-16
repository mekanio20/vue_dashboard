<template>
    <div>
        <Header />
        <Navbar />
        <div class="container-xl mt-3 mb-6">
            <div class="row">
                <div v-if="successAlert" class="alert alert-success" :class="{ 'block': successAlert }" role="alert">{{
                    successAlert
                }}</div>
                <div v-if="errorAlert" class="alert alert-danger" :class="{ 'block': errorAlert }" role="alert">{{ errorAlert }}
                </div>
            </div>
            <div class="col-12 mb-3">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Permissions</h3>
                    </div>
                    <div class="table-responsive">
                        <table class="table card-table table-vcenter text-nowrap datatable">
                            <thead>
                                <tr>
                                    <th>#Id</th>
                                    <th>Url</th>
                                    <th>Method</th>
                                    <th>Role</th>
                                    <th>CreatedAt</th>
                                    <th>UpdatedAt</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in permissions" :key="item.id">
                                    <td>#{{ item.id }}</td>
                                    <td>{{ item.url }}</td>
                                    <td>{{ item.method }}</td>
                                    <td>{{ item.group.name }}</td>
                                    <td>{{ item.createdAt }}</td>
                                    <td>{{ item.updatedAt }}</td>
                                    <td>
                                        <a href="#update" class="btn btn-blue" @click="
                                            update.id = item.id,
                                            update.url = item.url,
                                            update.method = item.method,
                                            update.groupId = item.group.id
                                            ">Edit
                                        </a>
                                    </td>
                                    <td>
                                        <button class="btn btn-danger" @click="deletePermission(item.id)">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Paginator :dataLength="dataLength" @setPageItem="allPermissions" />
                </div>
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
                                        <SelectInput label="Method" v-model="post.method" required="true"
                                            :options="['GET', 'POST', 'PUT', 'DELETE']" />
                                    </div>
                                    <div class="mb-3 col-sm-4 col-md-4">
                                        <label class="form-label required">Group</label>
                                        <select v-model="post.groupId" class="form-select">
                                            <option v-for="group in groups" :key="group.id" :value="group.id">{{
                                                group.name
                                            }}</option>
                                        </select>
                                    </div>
                                    <div class="mb-3 col-sm-8 col-md-8">
                                        <TextInput label="URL" v-model="post.url" required="true" />
                                    </div>
                                </div>
                            </div>
                            <FormButton />
                        </form>
                    </div>
                </div>
                <div id="update" class="col-lg-6 mb-3">
                    <div class="col-12">
                        <form @submit.prevent="updatePermission" class="card">
                            <div class="card-header">
                                <h3 class="card-title">Update Permission</h3>
                            </div>
                            <div class="card-body">
                                <div class="row row-cards">
                                    <div class="mb-3 col-sm-4 col-md-3">
                                        <SelectInput label="Method" v-model="update.method" required="false"
                                            :options="['GET', 'POST', 'PUT', 'DELETE']" />
                                    </div>
                                    <div class="mb-3 col-sm-4 col-md-4">
                                        <label class="form-label">Group</label>
                                        <select v-model="update.groupId" class="form-select">
                                            <option v-for="group in groups" :key="group.id" :value="group.id">{{
                                                group.name
                                            }}</option>
                                        </select>
                                    </div>
                                    <div class="mb-3 col-sm-8 col-md-8">
                                        <TextInput label="URL" v-model="update.url" required="false" />
                                    </div>
                                </div>
                            </div>
                            <FormButton />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Navbar from '@/components/Navbar.vue'
import Paginator from '@/components/Paginator.vue'
import TextInput from '../components/layouts/TextInput.vue'
import FormButton from '@/components/layouts/FormButton.vue'
import SelectInput from '../components/layouts/SelectInput.vue'
export default {
    name: "Permissions",
    components: {
        Header,
        Navbar,
        Paginator,
        TextInput,
        FormButton,
        SelectInput
    },
    data() {
        return {
            permissions: null,
            successAlert: null,
            errorAlert: null,
            currentPage: 1,
            dataLength: 0,
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
            await this.allPermissions(this.currentPage)
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
                this.groups = response.data.detail
            } catch (error) {
                console.log(error)
            }
        },
        async allPermissions(page) {
            try {
                const axiosConfig = {
                    headers: {
                        'Authorization': `${localStorage.getItem('Authorization')}`
                    }
                }
                this.currentPage = page
                const response = await this.$appAxios.get(`/admin/all/permissions?page=${page}`, axiosConfig)
                this.dataLength = Math.ceil(await response.data.detail.count / 10)
                this.permissions = await response.data.detail.rows
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
                            this.allPermissions(this.currentPage)
                        }
                    })
                    .catch((err) => { this.errorMessage(err.response.data.msg) })
                window.scroll(0, 0)
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
                this.$appAxios.put('/admin/update/permission', updateData, axiosConfig)
                    .then((res) => {
                        if (res.data.type === 'error') {
                            this.errorMessage(res.data.msg)
                        } else {
                            this.successMessage(res.data.msg)
                            this.allPermissions(this.currentPage)
                        }
                    })
                    .catch((err) => { this.errorMessage(err.response.data.msg) })
                window.scroll(0, 0)
            } catch (error) {
                console.log(error)
            }
        },
        // DELETE
        async deletePermission(id) {
            try {
                if (confirm('Bu maglumaty pozmak isleýärsiňizmi?')) {
                    const axiosConfig = { headers: { 'Authorization': `${localStorage.getItem('Authorization')}` } }
                    this.$appAxios.delete(`/admin/delete/permission/${id}`, axiosConfig)
                        .then((res) => {
                            if (res.data.type === 'error') {
                                this.errorMessage(res.data.msg)
                            } else {
                                this.successMessage(res.data.msg)
                                this.allPermissions(this.currentPage)
                            }
                        })
                        .catch((err) => { this.errorMessage(err.response.data.msg) })
                }
                window.scroll(0, 0)
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