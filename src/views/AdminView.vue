<template>
    <Header />
    <Navbar />
    <Alert />
    <div class="page-wrapper">
        <div class="page-body">
            <div class="container-xl">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="row row g-5">
                                <div class="col-lg-4">
                                    <div class="row row-cards">
                                        <form @submit="addGroup" class="card">
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
                                <div class="col-lg-8">
                                    <div class="col-12">
                                        <form @submit="addPermission" class="card">
                                            <div class="card-header">
                                                <h3 class="card-title">Add Permission</h3>
                                            </div>
                                            <div class="card-body">
                                                <div class="row row-cards">
                                                    <div class="mb-3 col-sm-4 col-md-3">
                                                        <label class="form-label required">Method</label>
                                                        <select v-model="method" class="form-select">
                                                            <option value="GET">GET</option>
                                                            <option value="POST">POST</option>
                                                            <option value="PUT">PUT</option>
                                                            <option value="DELETE">DELETE</option>
                                                        </select>
                                                    </div>
                                                    <div class="mb-3 col-sm-4 col-md-4">
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
                                                <button @submit="addPermission" class="btn btn-primary">Submit</button>
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
    import Header from '@/components/Header.vue'
    import Navbar from '@/components/Navbar.vue'
    import Alert from '@/components/Alert.vue'
    import { useRouter } from 'vue-router'
    import { onMounted } from 'vue'
    export default {
        components: {
            Header,
            Navbar,
            Alert
        },
        data() {
            return {
                name: '',
                url: '/api',
                method: '',
                groupId: 0,
                groups: []
            }
        },
        async created(){
            await this.allGroups()
        },
        methods: {
            async addGroup() {
                try {
                    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZ3JvdXAiOjEsImlhdCI6MTY5NzYyNjkyMSwiZXhwIjoxNzAwMjE4OTIxfQ.RYS9Ss3qqfoJMnrqbDbfEMxyXbL1uEFhbiQNLdxvfK0'
                    const API_URL = 'http://localhost:5000/api/admin/add/group'
                    const router = useRouter()
                    const response = await fetch(API_URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ name: this.name })
                    })
                    const json = await response.json()
                    router.push({ name: 'admin' })
                } catch (error) {
                    console.log(error)
                }
            },
            async addPermission() {
                try {
                    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZ3JvdXAiOjEsImlhdCI6MTY5NzYyNjkyMSwiZXhwIjoxNzAwMjE4OTIxfQ.RYS9Ss3qqfoJMnrqbDbfEMxyXbL1uEFhbiQNLdxvfK0'
                    const API_URL = 'http://localhost:5000/api/admin/add/permission'
                    const router = useRouter()
                    const response = await fetch(API_URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ 
                            url: this.url,
                            method: this.method,
                            groupId: this.groupId 
                        })
                    })
                    const json = await response.json()
                    console.log(json);
                    router.push({ name: 'admin' })
                } catch (error) {
                    console.log(error)
                }
            },
            async allGroups() {
                try {
                    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZ3JvdXAiOjEsImlhdCI6MTY5NzYyNjkyMSwiZXhwIjoxNzAwMjE4OTIxfQ.RYS9Ss3qqfoJMnrqbDbfEMxyXbL1uEFhbiQNLdxvfK0'
                    const API_URL = 'http://localhost:5000/api/admin/all/groups'
                    const router = useRouter()
                    const response = await fetch(API_URL, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    const json = await response.json()
                    this.groups = json
                    router.push({ name: 'admin' })
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
</style>