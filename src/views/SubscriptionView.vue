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
                    <h3 class="card-title">Subscriptions</h3>
                </div>
                <div class="table-responsive">
                    <table class="table card-table table-vcenter text-nowrap datatable">
                        <thead>
                            <tr>
                                <th>#Id</th>
                                <th>Name</th>
                                <th>Product limit</th>
                                <th>Image limit</th>
                                <th>Seller Banner limit</th>
                                <th>Main Banner limit</th>
                                <th>Notification limit</th>
                                <th>Voucher limit</th>
                                <th>Price</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in subscriptions" :key="item.id">
                                <td>#{{ item.id }}</td>
                                <td>{{ item.name }}</td>
                                <td>{{ item.p_limit }}</td>
                                <td>{{ item.p_img_limit }}</td>
                                <td>{{ item.seller_banner_limit }}</td>
                                <td>{{ item.main_banner_limit }}</td>
                                <td>{{ item.ntf_limit }}</td>
                                <td>{{ item.voucher_limit }}</td>
                                <td>{{ item.price }} tmt</td>
                                <td>
                                    <button class="btn btn-blue" @click="
                                        subscription__update.id = item.id,
                                        subscription__update.name = item.name,
                                        subscription__update.price = item.price,
                                        subscription__update.order = item.order,
                                        subscription__update.product_limit = item.p_limit,
                                        subscription__update.product_image_limit = item.p_img_limit,
                                        subscription__update.seller_banner_limit = item.seller_banner_limit,
                                        subscription__update.main_banner_limit = item.main_banner_limit,
                                        subscription__update.notification_limit = item.ntf_limit,
                                        subscription__update.voucher_limit = item.voucher_limit,
                                        subscription__update.smm_support = item.smm_support,
                                        subscription__update.tech_support = item.tech_support
                                        ">Edit</button>
                                </td>
                                <td>
                                    <button class="btn btn-danger" @click="deleteSubscrpition(item.id)">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center">
            <div class="col-lg-4" style="margin-right: 30px;">
                <div class="row row-cards">
                    <form @submit.prevent="addSubscription" class="card">
                        <div class="card-header">
                            <h2 class="card-title">
                                Add Subscription
                            </h2>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <TextInput label="Name" placeholder="name" v-model="subscription.name" required="true">
                                </TextInput>
                            </div>
                            <div class="mb-3">
                                <NumberInput label="Price" placeholder="price" v-model="subscription.price" required="true">
                                </NumberInput>
                            </div>
                            <div class="mb-3">
                                <NumberInput label="Order" placeholder="order" v-model="subscription.order" required="true">
                                </NumberInput>
                            </div>
                            <div class="mb-3">
                                <NumberInput label="Product limit" placeholder="limit" v-model="subscription.product_limit"
                                    required="true"></NumberInput>
                            </div>
                            <div class="mb-3">
                                <NumberInput label="Product image limit" placeholder="limit"
                                    v-model="subscription.product_image_limit" required="true">
                                </NumberInput>
                            </div>
                            <div class="mb-3">
                                <NumberInput label="Seller banner limit" placeholder="limit"
                                    v-model="subscription.seller_banner_limit" required="true">
                                </NumberInput>
                            </div>
                            <div class="mb-3">
                                <NumberInput label="Main banner limit" placeholder="limit"
                                    v-model="subscription.main_banner_limit" required="true">
                                </NumberInput>
                            </div>
                            <div class="mb-3">
                                <NumberInput label="Notification limit" placeholder="limit"
                                    v-model="subscription.notification_limit" required="true">
                                </NumberInput>
                            </div>
                            <div class="mb-3">
                                <NumberInput label="Voucher limit" placeholder="limit" v-model="subscription.voucher_limit"
                                    required="true">
                                </NumberInput>
                            </div>
                            <div class="mb-3">
                                <BooleanInput label="Smm support" v-model="subscription.smm_support">
                                </BooleanInput>
                            </div>
                            <div class="mb-3">
                                <BooleanInput label="Tech support" v-model="subscription.tech_support">
                                </BooleanInput>
                            </div>
                        </div>
                        <FormButton />
                    </form>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="row row-cards">
                    <form @submit.prevent="updateSubscription" class="card">
                        <div class="card-header">
                            <h2 class="card-title">
                                Update Subscription
                            </h2>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <TextInput label="Name" placeholder="name" v-model="subscription__update.name"
                                    required="true">
                                </TextInput>
                            </div>
                            <div class="mb-3">
                                <NumberInput label="Price" placeholder="price" v-model="subscription__update.price"
                                    required="true">
                                </NumberInput>
                            </div>
                            <div class="mb-3">
                                <NumberInput label="Order" placeholder="order" v-model="subscription__update.order"
                                    required="true">
                                </NumberInput>
                            </div>
                            <div class="mb-3">
                                <NumberInput label="Product limit" placeholder="limit"
                                    v-model="subscription__update.product_limit" required="true"></NumberInput>
                            </div>
                            <div class="mb-3">
                                <NumberInput label="Product image limit" placeholder="limit"
                                    v-model="subscription__update.product_image_limit" required="true">
                                </NumberInput>
                            </div>
                            <div class="mb-3">
                                <NumberInput label="Seller banner limit" placeholder="limit"
                                    v-model="subscription__update.seller_banner_limit" required="true">
                                </NumberInput>
                            </div>
                            <div class="mb-3">
                                <NumberInput label="Main banner limit" placeholder="limit"
                                    v-model="subscription__update.main_banner_limit" required="true">
                                </NumberInput>
                            </div>
                            <div class="mb-3">
                                <NumberInput label="Notification limit" placeholder="limit"
                                    v-model="subscription__update.notification_limit" required="true">
                                </NumberInput>
                            </div>
                            <div class="mb-3">
                                <NumberInput label="Voucher limit" placeholder="limit"
                                    v-model="subscription__update.voucher_limit" required="true">
                                </NumberInput>
                            </div>
                            <div class="mb-3">
                                <BooleanInput label="Smm support" v-model="subscription__update.smm_support">
                                </BooleanInput>
                            </div>
                            <div class="mb-3">
                                <BooleanInput label="Tech support" v-model="subscription__update.tech_support">
                                </BooleanInput>
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
import FormButton from '@/components/layouts/FormButton.vue'
import NumberInput from '@/components/layouts/NumberInput.vue'
import BooleanInput from '@/components/layouts/BooleanInput.vue'
import TextInput from '@/components/layouts/TextInput.vue'
export default {
    name: "Subscriptions",
    components: {
        Header,
        Navbar,
        FormButton,
        NumberInput,
        BooleanInput,
        TextInput,
    },
    data() {
        return {
            errorAlert: null,
            successAlert: null,
            subscriptions: null,
            subscription: {
                name: '',
                price: null,
                order: null,
                product_limit: null,
                product_image_limit: null,
                seller_banner_limit: null,
                main_banner_limit: null,
                notification_limit: null,
                voucher_limit: null,
                smm_support: false,
                tech_support: false
            },
            subscription__update: {
                id: 0,
                name: '',
                price: null,
                order: null,
                product_limit: null,
                product_image_limit: null,
                seller_banner_limit: null,
                main_banner_limit: null,
                notification_limit: null,
                voucher_limit: null,
                smm_support: false,
                tech_support: false
            }
        }
    },
    async created() {
        await this.allSubscriptions()
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
        async allSubscriptions() {
            try {
                const axiosConfig = {
                    headers: {
                        'Authorization': `${localStorage.getItem('Authorization')}`
                    }
                }
                const response = await this.$appAxios.get('/admin/all/subscriptions', axiosConfig)
                this.subscriptions = response.data.detail.rows
            } catch (error) {
                console.log(error)
            }
        },
        // POST
        async addSubscription() {
            try {
                const postData = {
                    name: this.subscription.name,
                    price: this.subscription.price,
                    order: this.subscription.order,
                    p_limit: this.subscription.product_limit,
                    p_img_limit: this.subscription.product_image_limit,
                    seller_banner_limit: this.subscription.seller_banner_limit,
                    main_banner_limit: this.subscription.main_banner_limit,
                    ntf_limit: this.subscription.notification_limit,
                    voucher_limit: this.subscription.voucher_limit,
                    smm_support: this.subscription.smm_support,
                    tech_support: this.subscription.tech_support
                }
                const axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${localStorage.getItem('Authorization')}`
                    }
                }
                this.$appAxios.post('/admin/add/subscription', postData, axiosConfig)
                    .then((res) => {
                        if (res.data.type === 'error') {
                            this.errorMessage(res.data.msg)
                        } else {
                            this.successMessage(res.data.msg)
                            this.allSubscriptions()
                        }
                    })
                    .catch((err) => { this.errorMessage(err.response.data.msg) })
            } catch (error) {
                console.log(error)
            }
        },
        // PUT
        async updateSubscription() {
            try {
                const postData = {
                    id: this.subscription__update.id,
                    price: this.subscription__update.price,
                    name: this.subscription__update.name,
                    order: this.subscription__update.order,
                    p_limit: this.subscription__update.product_limit,
                    p_img_limit: this.subscription__update.product_image_limit,
                    seller_banner_limit: this.subscription__update.seller_banner_limit,
                    main_banner_limit: this.subscription__update.main_banner_limit,
                    ntf_limit: this.subscription__update.notification_limit,
                    voucher_limit: this.subscription__update.voucher_limit,
                    smm_support: this.subscription__update.smm_support,
                    tech_support: this.subscription__update.tech_support
                }
                const axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${localStorage.getItem('Authorization')}`
                    }
                }
                this.$appAxios.put('/admin/update/subscription', postData, axiosConfig)
                    .then((res) => {
                        if (res.data.type === 'error') {
                            this.errorMessage(res.data.msg)
                        } else {
                            this.successMessage(res.data.msg)
                            this.allSubscriptions()
                        }
                    })
                    .catch((err) => { this.errorMessage(err.response.data.msg) })
            } catch (error) {
                console.log(error)
            }
        },
        // DELETE
        async deleteSubscrpition(id) {
            try {
                const axiosConfig = { headers: { 'Authorization': `${localStorage.getItem('Authorization')}` } }
                this.$appAxios.delete(`/admin/delete/subscription/${id}`, axiosConfig)
                    .then((res) => {
                        if (res.data.type === 'error') {
                            this.errorMessage(res.data.msg)
                        } else {
                            this.successMessage(res.data.msg)
                            this.allSubscriptions()
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