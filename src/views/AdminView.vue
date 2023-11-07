<template>
    <Header />
    <Navbar />
    <div class="container-xl">
        <div class="alert alert-success" role="alert">Success!</div>
        <div class="alert alert-danger" role="alert">Error!</div>
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
                                                <div class="mb-3">
                                                    <label class="form-label required">Group name</label>
                                                    <input v-model="name" class="form-control" placeholder="name">
                                                </div>
                                            </div>
                                            <div class="card-footer text-end">
                                                <button type="submit" class="btn btn-primary">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="row row-cards">
                                        <form @submit="addStorage" class="card">
                                            <div class="card-header">
                                                <h2 class="card-title">
                                                    Add Storage
                                                </h2>
                                            </div>
                                            <div class="card-body">
                                                <div class="mb-3">
                                                    <label class="form-label required">tm_name</label>
                                                    <input v-model="tm_name1" class="form-control" placeholder="tm_name">
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label">ru_name</label>
                                                    <input v-model="ru_name1" class="form-control" placeholder="ru_name">
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label">en_name</label>
                                                    <input v-model="en_name1" class="form-control" placeholder="en_name">
                                                </div>
                                            </div>
                                            <div class="card-footer text-end">
                                                <button type="submit" class="btn btn-primary">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="row row-cards">
                                        <form @submit="addCategory" class="card">
                                            <div class="card-header">
                                                <h2 class="card-title">
                                                    Add Category
                                                </h2>
                                            </div>
                                            <div class="card-body">
                                                <div class="mb-3">
                                                    <label class="form-label required">tm_name</label>
                                                    <input v-model="tm_name2" class="form-control" placeholder="tm_name">
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label">ru_name</label>
                                                    <input v-model="ru_name2" class="form-control" placeholder="ru_name">
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label">en_name</label>
                                                    <input v-model="en_name2" class="form-control" placeholder="en_name">
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label required">Storage selection</label>
                                                    <select v-model="storageId" class="form-select">
                                                            <option 
                                                                v-for="storage in storages.detail"
                                                                :key="storage.id"
                                                                :value="storage.id"
                                                            >{{ storage.tm_name }}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="card-footer text-end">
                                                <button type="submit" class="btn btn-primary">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="row row-cards">
                                        <form @submit="addSubCategory" class="card">
                                            <div class="card-header">
                                                <h2 class="card-title">
                                                    Add SubCategory
                                                </h2>
                                            </div>
                                            <div class="card-body">
                                                <div class="mb-3">
                                                    <label class="form-label required">tm_name</label>
                                                    <input v-model="tm_name3" class="form-control" placeholder="tm_name">
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label">ru_name</label>
                                                    <input v-model="ru_name3" class="form-control" placeholder="ru_name">
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label">en_name</label>
                                                    <input v-model="en_name3" class="form-control" placeholder="en_name">
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label required">Category selection</label>
                                                    <select v-model="categoryId" class="form-select">
                                                            <option 
                                                                v-for="category in categories.detail"
                                                                :key="category.id"
                                                                :value="category.id"
                                                            >{{ category.tm_name }}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="card-footer text-end">
                                                <button type="submit" class="btn btn-primary">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="row row-cards">
                                        <form @submit="addFeature" class="card">
                                            <div class="card-header">
                                                <h2 class="card-title">
                                                    Add Feature
                                                </h2>
                                            </div>
                                            <div class="card-body">
                                                <div class="mb-3">
                                                    <label class="form-label required">tm_name</label>
                                                    <input v-model="tm_name4" class="form-control" placeholder="tm_name">
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label">ru_name</label>
                                                    <input v-model="ru_name4" class="form-control" placeholder="ru_name">
                                                </div>
                                                <div class="mb-3">
                                                    <label class="form-label">en_name</label>
                                                    <input v-model="en_name4" class="form-control" placeholder="en_name">
                                                </div>
                                            </div>
                                            <div class="card-footer text-end">
                                                <button type="submit" class="btn btn-primary">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="row row-cards">
                                        <form @submit="addFeatureDesc" class="card">
                                            <div class="card-header">
                                                <h2 class="card-title">
                                                    Add Feature Description
                                                </h2>
                                            </div>
                                            <div class="card-body">
                                                <div class="mb-3">
                                                    <label class="form-label required">desc</label>
                                                    <input v-model="desc" class="form-control" placeholder="tm_name">
                                                </div>
                                                <label class="form-label required">Feature selection</label>
                                                <select v-model="featureId" class="form-select">
                                                    <option 
                                                        v-for="feature in features.detail"
                                                        :key="feature.id"
                                                        :value="feature.id"
                                                    >{{ feature.tm_name }}</option>
                                                </select>
                                            </div>
                                            <div class="card-footer text-end">
                                                <button type="submit" class="btn btn-primary">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div class="col-lg-8">
                                    <div class="col-12">
                                        <form @submit="addPermission" class="card">
                                            <div class="card-header">
                                                <h3 class="card-title">Add Permission</h3>
                                            </div>
                                            <div class="card-body">
                                                <div class="row row-cards">
                                                    <div class="mb-3 col-sm-4 col-md-2">
                                                        <label class="form-label required">Method</label>
                                                        <select v-model="method" class="form-select">
                                                            <option value="GET">GET</option>
                                                            <option value="POST">POST</option>
                                                            <option value="PUT">PUT</option>
                                                            <option value="DELETE">DELETE</option>
                                                        </select>
                                                    </div>
                                                    <div class="mb-3 col-sm-4 col-md-3">
                                                        <label class="form-label required">Group</label>
                                                        <select v-model="groupId" class="form-select">
                                                            <option 
                                                                v-for="group in groups.detail" 
                                                                :key="group.id" 
                                                                :value="group.id"
                                                            >{{ group.name }}</option>
                                                        </select>
                                                    </div>
                                                    <div class="mb-3 col-sm-8 col-md-10">
                                                        <label class="form-label required">URL</label>
                                                        <input v-model="url" class="form-control">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-footer text-end">
                                                <button type="submit" class="btn btn-primary">Submit</button>
                                            </div>
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
    import axios from 'axios'
    import Header from '@/components/Header.vue'
    import Navbar from '@/components/Navbar.vue'
    import Alert from '@/components/Alert.vue'
    export default {
        components: {
            Header,
            Navbar,
            Alert
        },
        data() {
            return {
                name: '',
                method: '',
                desc: '',
                url: '/api',
                tm_name1: '',
                ru_name1: '',
                en_name1: '',
                tm_name2: '',
                ru_name2: '',
                en_name2: '',
                tm_name3: '',
                ru_name3: '',
                en_name3: '',
                tm_name4: '',
                ru_name4: '',
                en_name4: '',
                groupId: 0,
                storageId: 0,
                categoryId: 0,
                featureId: 0,
                groups: [],
                storages: [],
                categories: [],
                features: []
            }
        },
        async created() { 
            await this.allGroups(),
            await this.allStorages(),
            await this.allCategories(),
            await this.allFeatures()
        },
        methods: {
            // POST
            async addGroup() {
                try {
                    const successAlert = document.getElementsByClassName('alert-success')[0]
                    const errorAlert = document.getElementsByClassName('alert-danger')[0]
                    const API_URL = 'http://localhost:5000/api/admin/add/group'
                    const postData = {
                        name: this.name
                    }
                    const axiosConfig = {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${localStorage.getItem('Authorization')}`
                        }
                    }
                    await axios.post(API_URL, postData, axiosConfig)
                        .then((res) => {
                            successAlert.style.display = 'block'
                            successAlert.innerHTML = res.data.msg
                            setTimeout(() => {
                                successAlert.style.display = 'none'
                            }, 3000);
                        }).catch((err) => {
                            if (err) {
                                errorAlert.style.display = 'block'
                                errorAlert.innerHTML = err.response.data.msg
                                setTimeout(() => {
                                  errorAlert.style.display = 'none'
                                }, 3000)
                            }
                        })
                    this.$router.push('/admin')
                } catch (error) {
                    console.log(error)
                }
            },
            async addPermission() {
                try {
                    const successAlert = document.getElementsByClassName('alert-success')[0]
                    const errorAlert = document.getElementsByClassName('alert-danger')[0]
                    const API_URL = 'http://localhost:5000/api/admin/add/permission'
                    const postData = {
                        url: this.url,
                        method: this.method,
                        groupId: this.groupId 
                    }
                    const axiosConfig = {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${localStorage.getItem('Authorization')}`
                        }
                    }
                    await axios.post(API_URL, postData, axiosConfig)
                        .then((res) => {
                            successAlert.style.display = 'block'
                            successAlert.innerHTML = res.data.msg
                            setTimeout(() => {
                                successAlert.style.display = 'none'
                            }, 3000);
                        }).catch((err) => {
                            if (err) {
                                errorAlert.style.display = 'block'
                                errorAlert.innerHTML = err.response.data.msg
                                setTimeout(() => {
                                  errorAlert.style.display = 'none'
                                }, 3000)
                            }
                        })
                    this.$router.push('/admin')
                } catch (error) {
                    console.log(error)
                }
            },
            async addStorage() {
                try {
                    const successAlert = document.getElementsByClassName('alert-success')[0]
                    const errorAlert = document.getElementsByClassName('alert-danger')[0]
                    const API_URL = 'http://localhost:5000/api/admin/add/storage'
                    const postData = {
                        tm_name: this.tm_name1,
                        ru_name: this.ru_name1,
                        en_name: this.en_name1 
                    }
                    const axiosConfig = {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${localStorage.getItem('Authorization')}`
                        }
                    }
                    await axios.post(API_URL, postData, axiosConfig)
                        .then((res) => {
                            successAlert.style.display = 'block'
                            successAlert.innerHTML = res.data.msg
                            setTimeout(() => {
                                successAlert.style.display = 'none'
                            }, 3000);
                        }).catch((err) => {
                            if (err) {
                                errorAlert.style.display = 'block'
                                errorAlert.innerHTML = err.response.data.msg
                                setTimeout(() => {
                                  errorAlert.style.display = 'none'
                                }, 3000)
                            }
                        })
                    this.$router.push('/admin')
                } catch (error) {
                    console.log(error)
                }
            },
            async addCategory() {
                try {
                    const successAlert = document.getElementsByClassName('alert-success')[0]
                    const errorAlert = document.getElementsByClassName('alert-danger')[0]
                    const API_URL = 'http://localhost:5000/api/admin/add/category'
                    const postData = {
                        tm_name: this.tm_name2,
                        ru_name: this.ru_name2,
                        en_name: this.en_name2,
                        storageId: this.storageId
                    }
                    const axiosConfig = {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${localStorage.getItem('Authorization')}`
                        }
                    }
                    await axios.post(API_URL, postData, axiosConfig)
                        .then((res) => {
                            successAlert.style.display = 'block'
                            successAlert.innerHTML = res.data.msg
                            setTimeout(() => {
                                successAlert.style.display = 'none'
                            }, 3000);
                        }).catch((err) => {
                            if (err) {
                                errorAlert.style.display = 'block'
                                errorAlert.innerHTML = err.response.data.msg
                                setTimeout(() => {
                                  errorAlert.style.display = 'none'
                                }, 3000)
                            }
                        })
                    this.$router.push('/admin')
                } catch (error) {
                    console.log(error)
                }
            },
            async addSubCategory() {
                try {
                    const successAlert = document.getElementsByClassName('alert-success')[0]
                    const errorAlert = document.getElementsByClassName('alert-danger')[0]
                    const API_URL = 'http://localhost:5000/api/admin/add/subcategory'
                    const postData = {
                        tm_name: this.tm_name3,
                        ru_name: this.ru_name3,
                        en_name: this.en_name3,
                        categoryId: this.categoryId
                    }
                    const axiosConfig = {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${localStorage.getItem('Authorization')}`
                        }
                    }
                    await axios.post(API_URL, postData, axiosConfig)
                        .then((res) => {
                            successAlert.style.display = 'block'
                            successAlert.innerHTML = res.data.msg
                            setTimeout(() => {
                                successAlert.style.display = 'none'
                            }, 3000);
                        }).catch((err) => {
                            if (err) {
                                errorAlert.style.display = 'block'
                                errorAlert.innerHTML = err.response.data.msg
                                setTimeout(() => {
                                  errorAlert.style.display = 'none'
                                }, 3000)
                            }
                        })
                    this.$router.push('/admin')
                } catch (error) {
                    console.log(error)
                }
            },
            async addFeature() {
                try {
                    const successAlert = document.getElementsByClassName('alert-success')[0]
                    const errorAlert = document.getElementsByClassName('alert-danger')[0]
                    const API_URL = 'http://localhost:5000/api/admin/add/feature'
                    const postData = {
                        tm_name: this.tm_name4,
                        ru_name: this.ru_name4,
                        en_name: this.en_name4
                    }
                    const axiosConfig = {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${localStorage.getItem('Authorization')}`
                        }
                    }
                    await axios.post(API_URL, postData, axiosConfig)
                        .then((res) => {
                            successAlert.style.display = 'block'
                            successAlert.innerHTML = res.data.msg
                            setTimeout(() => {
                                successAlert.style.display = 'none'
                            }, 3000);
                        }).catch((err) => {
                            if (err) {
                                errorAlert.style.display = 'block'
                                errorAlert.innerHTML = err.response.data.msg
                                setTimeout(() => {
                                  errorAlert.style.display = 'none'
                                }, 3000)
                            }
                        })
                    this.$router.push('/admin')
                } catch (error) {
                    console.log(error)
                }
            },
            async addFeatureDesc() {
                try {
                    const successAlert = document.getElementsByClassName('alert-success')[0]
                    const errorAlert = document.getElementsByClassName('alert-danger')[0]
                    const API_URL = 'http://localhost:5000/api/admin/add/feature/desc'
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
                    await axios.post(API_URL, postData, axiosConfig)
                        .then((res) => {
                            successAlert.style.display = 'block'
                            successAlert.innerHTML = res.data.msg
                            setTimeout(() => {
                                successAlert.style.display = 'none'
                            }, 3000);
                        }).catch((err) => {
                            if (err) {
                                errorAlert.style.display = 'block'
                                errorAlert.innerHTML = err.response.data.msg
                                setTimeout(() => {
                                  errorAlert.style.display = 'none'
                                }, 3000)
                            }
                        })
                    this.$router.push('/admin')
                } catch (error) {
                    console.log(error)
                }
            },
            // GET
            async allGroups() {
                try {
                    const API_URL = 'http://localhost:5000/api/admin/all/groups'
                    const axiosConfig = {
                        headers: {
                            'Authorization': `${localStorage.getItem('Authorization')}`
                        }
                    }
                    const response = await axios.get(API_URL, axiosConfig)
                    this.groups = response.data
                    this.$router.push('/admin')
                } catch (error) {
                    console.log(err)
                }
            },
            async allStorages() {
                try {
                    const API_URL = 'http://localhost:5000/api/user/storages'
                    const response = await axios.get(API_URL)
                    this.storages = response.data
                    this.$router.push('/admin')
                } catch (error) {
                    console.log(err)
                }
            },
            async allCategories() {
                try {
                    const API_URL = 'http://localhost:5000/api/user/categories'
                    const response = await axios.get(API_URL)
                    this.categories = response.data
                    this.$router.push('/admin')
                } catch (error) {
                    console.log(err)
                }
            },
            async allFeatures() {
                try {
                    const API_URL = 'http://localhost:5000/api/user/features'
                    const response = await axios.get(API_URL)
                    this.features = response.data
                    this.$router.push('/admin')
                } catch (error) {
                    console.log(err)
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

    .alert-success {
        color: #155724;
        background-color: #d4edda;
        border-color: #c3e6cb;
        display: none;
    }

    .alert-danger {
        color: #721c24;
        background-color: #f8d7da;
        border-color: #f5c6cb;
        display: none;
    }
</style>