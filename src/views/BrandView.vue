<template>
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
                    <h3 class="card-title">Brands</h3>
                </div>
                <div class="table-responsive">
                    <table class="table card-table table-vcenter text-nowrap datatable">
                        <thead>
                            <tr>
                                <th>#Id</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>IsActive</th>
                                <th>CreatedAt</th>
                                <th>UpdatedAt</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in brands" :key="item.id">
                                <td>#{{ item.id }}</td>
                                <td>{{ item.img }}</td>
                                <td>{{ item.name }}</td>
                                <td>{{ item.isActive }}</td>
                                <td>{{ item.createdAt }}</td>
                                <td>{{ item.updatedAt }}</td>
                                <td>
                                    <a href="#update" class="btn btn-blue" @click="
                                        update.brand_id = item.id,
                                        update.brand_name = item.name,
                                        update.brand_active = item.isActive,
                                        update.brand_desc = item.desc
                                        ">Edit
                                    </a>
                                </td>
                                <td>
                                    <button class="btn btn-danger" @click="deleteBrand(item.id)">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Paginator :dataLength="dataLength" @setPageItem="allBrands" />
            </div>
        </div>
        <div class="d-flex justify-content-center">
            <div class="col-lg-4" style="margin-right: 30px;">
                <div class="row row-cards">
                    <form @submit.prevent="addBrand" class="card">
                        <div class="card-header">
                            <h2 class="card-title">
                                Add Brand
                            </h2>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <TextInput label="Brand" placeholder="brand_name" v-model="brand_name" required="true">
                                </TextInput>
                            </div>
                            <div class="mb-3">
                                <label class="form-label required">Brand image</label>
                                <input id="brand_img" type="file" class="form-control" />
                            </div>
                            <div class="mb-3">
                                <SelectInput label="IsActive" v-model="brand_active" required="false"
                                    :options="[true, false]" />
                            </div>
                            <div class="mb-3">
                                <TextInput label="Description" placeholder="brand_description" v-model="brand_desc">
                                </TextInput>
                            </div>
                        </div>
                        <FormButton />
                    </form>
                </div>
            </div>
            <div id="update" class="col-lg-4">
                <div class="row row-cards">
                    <form @submit.prevent="updateBrand" class="card">
                        <div class="card-header">
                            <h2 class="card-title">
                                Update Brand
                            </h2>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <TextInput label="Brand" placeholder="brand_name" v-model="update.brand_name"
                                    required="true">
                                </TextInput>
                            </div>
                            <div class="mb-3">
                                <label class="form-label required">Brand image</label>
                                <input id="update__brand_img" type="file" class="form-control" />
                            </div>
                            <div class="mb-3">
                                <SelectInput label="IsActive" v-model="update.brand_active" required="false"
                                    :options="[true, false]" />
                            </div>
                            <div class="mb-3">
                                <TextInput label="Description" placeholder="brand_description" v-model="update.brand_desc">
                                </TextInput>
                            </div>
                        </div>
                        <FormButton />
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Navbar from '@/components/Navbar.vue'
import Paginator from '@/components/Paginator.vue'
import FormButton from '@/components/layouts/FormButton.vue'
import SelectInput from '../components/layouts/SelectInput.vue'
import TextInput from '@/components/layouts/TextInput.vue'
export default {
    name: "Brands",
    components: {
        Header,
        Navbar,
        Paginator,
        FormButton,
        SelectInput,
        TextInput,
    },
    data() {
        return {
            successAlert: null,
            errorAlert: null,
            brands: null,
            brand_name: null,
            brand_desc: null,
            brand_active: true,
            dataLength: 0,
            update: {
                brand_id: null,
                brand_name: null,
                brand_desc: null,
                brand_active: true
            }
        }
    },
    async created() {
        this.allBrands(1)
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
        async allBrands(page) {
            try {
                const response = await this.$appAxios.get(`/user/brands?status=all&page=${page}`)
                this.dataLength = Math.ceil(await response.data.detail.count / 10)
                this.brands = await response.data.detail.rows
            } catch (error) {
                console.log(error)
            }
        },
        // POST
        async addBrand() {
            try {
                const fileInput = document.getElementById('brand_img')
                const file = fileInput.files[0]
                const formData = new FormData()
                formData.append('name', this.brand_name)
                formData.append('desc', this.brand_desc)
                formData.append('brand_img', file, file.name)
                const axiosConfig = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `${localStorage.getItem('Authorization')}`
                    }
                }
                this.$appAxios.post('/admin/add/brand', formData, axiosConfig)
                    .then((res) => {
                        if (res.data.type === 'error') {
                            this.errorMessage(res.data.msg)
                        } else {
                            this.successMessage(res.data.msg)
                            this.allBrands()
                        }
                    })
                    .catch((err) => { this.errorMessage(err.response.data.msg) })
                window.scroll(0,0)
            } catch (error) {
                console.log(error)
            }
        },
        // PUT
        async updateBrand() {
            try {
                const fileInput = document.getElementById('update__brand_img')
                const file = fileInput.files[0]
                const formData = new FormData()
                formData.append('id', Number(this.update.brand_id))
                formData.append('name', this.update.brand_name)
                formData.append('desc', this.update.brand_desc)
                formData.append('isActive', this.update.brand_active)
                if (file) {
                    formData.append('brand_img', file, file.name)
                }
                const axiosConfig = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `${localStorage.getItem('Authorization')}`
                    }
                }
                this.$appAxios.put('/admin/update/brand', formData, axiosConfig)
                    .then((res) => {
                        if (res.data.type === 'error') {
                            this.errorMessage(res.data.msg)
                        } else {
                            this.successMessage(res.data.msg)
                            this.allBrands()
                        }
                    })
                    .catch((err) => { this.errorMessage(err.response.data.msg) })
                window.scroll(0,0)
            } catch (error) {
                console.log(error)
            }
        },
        // DELETE
        async deleteBrand(id) {
            try {
                if (confirm('Bu maglumaty pozmak isleýärsiňizmi?')) {
                    const axiosConfig = { headers: { 'Authorization': `${localStorage.getItem('Authorization')}` } }
                    this.$appAxios.delete(`/admin/delete/brand/${id}`, axiosConfig)
                        .then((res) => {
                            if (res.data.type === 'error') {
                                this.errorMessage(res.data.msg)
                            } else {
                                this.successMessage(res.data.msg)
                                this.allBrands()
                            }
                        })
                        .catch((err) => { this.errorMessage(err.response.data.msg) })
                }
                window.scroll(0,0)
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