<template>
    <Header />
    <Navbar />
    <div class="container-xl">
        <div v-if="successAlert" class="alert alert-success" :class="{ 'block': successAlert }" role="alert">{{ successAlert
        }}</div>
        <div v-if="errorAlert" class="alert alert-danger" :class="{ 'block': errorAlert }" role="alert">{{ errorAlert }}
        </div>
    </div>
    <div class="page-wrapper">
        <div class="page-body">
            <div class="container-xl">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="row row g-5">
                                <div class="col-lg-4">
                                    <div class="row row-cards">
                                        <form @submit.prevent="addGroup" class="card">
                                            <div class="card-header">
                                                <h2 class="card-title">
                                                    Add Group
                                                </h2>
                                            </div>
                                            <div class="card-body">
                                                <TextInput label="group" placeholder="group name" required="true"
                                                    v-model="group_name">
                                                </TextInput>
                                            </div>
                                            <FormButton />
                                        </form>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="row row-cards">
                                        <form @submit.prevent="addStorage" class="card">
                                            <div class="card-header">
                                                <h2 class="card-title">
                                                    Add Storage
                                                </h2>
                                            </div>
                                            <div class="card-body">
                                                <TextInput label="tm_name" placeholder="tm_name" required="true"
                                                    v-model="storage.tm_name">
                                                </TextInput>
                                                <TextInput label="ru_name" placeholder="ru_name" v-model="storage.ru_name">
                                                </TextInput>
                                                <TextInput label="en_name" placeholder="en_name" v-model="storage.en_name">
                                                </TextInput>
                                            </div>
                                            <FormButton />
                                        </form>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="row row-cards">
                                        <form @submit.prevent="addCategory" class="card">
                                            <div class="card-header">
                                                <h2 class="card-title">
                                                    Add Category
                                                </h2>
                                            </div>
                                            <div class="card-body">
                                                <TextInput label="tm_name" placeholder="tm_name" required="true"
                                                    v-model="category.tm_name">
                                                </TextInput>
                                                <TextInput label="ru_name" placeholder="ru_name" v-model="category.ru_name">
                                                </TextInput>
                                                <TextInput label="en_name" placeholder="en_name" v-model="category.en_name">
                                                </TextInput>
                                                <div class="mb-3">
                                                    <label class="form-label required">Storage selection</label>
                                                    <select v-model="storageId" class="form-select">
                                                        <option v-for="storage in storages.detail" :key="storage.id"
                                                            :value="storage.id">{{ storage.tm_name }}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <FormButton />
                                        </form>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="row row-cards">
                                        <form @submit.prevent="addSubCategory" class="card">
                                            <div class="card-header">
                                                <h2 class="card-title">
                                                    Add SubCategory
                                                </h2>
                                            </div>
                                            <div class="card-body">
                                                <TextInput label="tm_name" placeholder="tm_name" required="true"
                                                    v-model="subcategory.tm_name"></TextInput>
                                                <TextInput label="ru_name" placeholder="ru_name"
                                                    v-model="subcategory.ru_name"></TextInput>
                                                <TextInput label="en_name" placeholder="en_name"
                                                    v-model="subcategory.en_name"></TextInput>
                                                <div class="mb-3">
                                                    <label class="form-label required">Category selection</label>
                                                    <select v-model="categoryId" class="form-select">
                                                        <option v-for="category in categories.detail" :key="category.id"
                                                            :value="category.id">{{ category.tm_name }}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <FormButton />
                                        </form>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="row row-cards">
                                        <form @submit.prevent="addFeature" class="card">
                                            <div class="card-header">
                                                <h2 class="card-title">
                                                    Add Feature
                                                </h2>
                                            </div>
                                            <div class="card-body">
                                                <TextInput label="tm_name" placeholder="tm_name" required="true"
                                                    v-model="feature.tm_name">
                                                </TextInput>
                                                <TextInput label="ru_name" placeholder="ru_name" v-model="feature.ru_name">
                                                </TextInput>
                                                <TextInput label="en_name" placeholder="en_name" v-model="feature.en_name">
                                                </TextInput>
                                            </div>
                                            <FormButton />
                                        </form>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="row row-cards">
                                        <form @submit.prevent="addFeatureDesc" class="card">
                                            <div class="card-header">
                                                <h2 class="card-title">
                                                    Add Feature Description
                                                </h2>
                                            </div>
                                            <div class="card-body">
                                                <div class="mb-3">
                                                    <label class="form-label required">desc</label>
                                                    <input v-model="desc" class="form-control" placeholder="desc">
                                                </div>
                                                <label class="form-label required">Feature selection</label>
                                                <select v-model="featureId" class="form-select">
                                                    <option v-for="feature in features.detail" :key="feature.id"
                                                        :value="feature.id">{{ feature.tm_name }}</option>
                                                </select>
                                            </div>
                                            <FormButton />
                                        </form>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="row row-cards">
                                        <form @submit.prevent="addSubCategoryFeature" class="card">
                                            <div class="card-header">
                                                <h2 class="card-title">
                                                    Add Subcategory Feature
                                                </h2>
                                            </div>
                                            <div class="card-body">
                                                <div class="mb-3">
                                                    <label class="form-label required">Feature selection</label>
                                                    <select v-model="featureId" class="form-select">
                                                        <option v-for="feature in features.detail" :key="feature.id"
                                                            :value="feature.id">{{ feature.tm_name }}</option>
                                                    </select>
                                                </div>
                                                <label class="form-label required">Subcategory selection</label>
                                                <select v-model="subcategoryId" class="form-select">
                                                    <option v-for="subcategory in subcategories.detail"
                                                        :key="subcategory.id" :value="subcategory.id">{{ subcategory.tm_name
                                                        }}</option>
                                                </select>
                                            </div>
                                            <FormButton />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Navbar from '@/components/Navbar.vue'
import TextInput from '@/components/layouts/TextInput.vue'
import NumberInput from '@/components/layouts/NumberInput.vue'
import BooleanInput from '@/components/layouts/BooleanInput.vue'
import FormButton from '@/components/layouts/FormButton.vue'
export default {
    name: "Admin",
    components: {
        Header,
        Navbar,
        TextInput,
        NumberInput,
        BooleanInput,
        FormButton
    },
    data() {
        return {
            group_name: '',
            desc: '',
            storage: {
                tm_name: '',
                ru_name: '',
                en_name: ''
            },
            category: {
                tm_name: '',
                ru_name: '',
                en_name: ''
            },
            subcategory: {
                tm_name: '',
                ru_name: '',
                en_name: ''
            },
            feature: {
                tm_name: '',
                ru_name: '',
                en_name: ''
            },
            storageId: 0,
            categoryId: 0,
            subcategoryId: 0,
            featureId: 0,
            storages: [],
            categories: [],
            features: [],
            subcategories: [],
            successAlert: null,
            errorAlert: null
        }
    },
    async created() {
        await this.allStorages(),
        await this.allCategories(),
        await this.allFeatures(),
        await this.allSubcategories()
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
        // POST
        async addGroup() {
            try {
                const postData = {
                    name: this.group_name
                }
                const axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${localStorage.getItem('Authorization')}`
                    }
                }
                this.$appAxios.post('/admin/add/group', postData, axiosConfig)
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
        async addStorage() {
            try {
                const postData = {
                    tm_name: this.storage.tm_name,
                    ru_name: this.storage.ru_name,
                    en_name: this.storage.en_name
                }
                const axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${localStorage.getItem('Authorization')}`
                    }
                }
                this.$appAxios.post('/admin/add/storage', postData, axiosConfig)
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
        async addCategory() {
            try {
                const postData = {
                    tm_name: this.category.tm_name,
                    ru_name: this.category.ru_name,
                    en_name: this.category.en_name,
                    storageId: this.storageId
                }
                const axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${localStorage.getItem('Authorization')}`
                    }
                }
                this.$appAxios.post('/admin/add/category', postData, axiosConfig)
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
        async addSubCategory() {
            try {
                const postData = {
                    tm_name: this.subcategory.tm_name,
                    ru_name: this.subcategory.ru_name,
                    en_name: this.subcategory.en_name,
                    categoryId: this.categoryId
                }
                const axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${localStorage.getItem('Authorization')}`
                    }
                }
                this.$appAxios.post('/admin/add/subcategory', postData, axiosConfig)
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
        async addFeature() {
            try {
                const postData = {
                    tm_name: this.feature.tm_name,
                    ru_name: this.feature.ru_name,
                    en_name: this.feature.en_name
                }
                const axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${localStorage.getItem('Authorization')}`
                    }
                }
                this.$appAxios.post('/admin/add/feature', postData, axiosConfig)
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
        async addFeatureDesc() {
            try {
                const postData = {
                    desc: this.desc,
                    featureId: this.featureId
                }
                const axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${localStorage.getItem('Authorization')}`
                    }
                }
                this.$appAxios.post('/admin/add/feature/desc', postData, axiosConfig)
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
        async addSubCategoryFeature() {
            try {
                const postData = {
                    subcategoryId: this.subcategoryId,
                    featureId: this.featureId
                }
                const axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${localStorage.getItem('Authorization')}`
                    }
                }
                this.$appAxios.post('/admin/add/subcategory/feature', postData, axiosConfig)
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
        // GET
        async allStorages() {
            try {
                const response = await this.$appAxios.get('/user/storages')
                this.storages = response.data
            } catch (error) {
                console.log(error)
            }
        },
        async allCategories() {
            try {
                const response = await this.$appAxios.get('/user/categories')
                this.categories = response.data
            } catch (error) {
                console.log(error)
            }
        },
        async allFeatures() {
            try {
                const response = await this.$appAxios.get('/user/features')
                this.features = response.data
            } catch (error) {
                console.log(error)
            }
        },
        async allSubcategories() {
            try {
                const response = await this.$appAxios.get('/user/subcategories')
                this.subcategories = response.data
            } catch (error) {
                console.log(error)
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
</style>