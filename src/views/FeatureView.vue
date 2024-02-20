<template>
    <div>
        <Header />
        <Navbar />
        <div class="container-xl mt-3 mb-6">
            <Alert v-if="errorAlert || successAlert" :errorAlert="errorAlert" :successAlert="successAlert" />
            <div class="col-12 mb-3">
                <div class="card">
                    <div class="card-header d-flex justify-content-between">
                        <h3 class="card-title">Features</h3>
                        <Search />
                    </div>
                    <div class="table-responsive">
                        <table class="table card-table table-vcenter text-nowrap datatable">
                            <thead>
                                <tr>
                                    <th>#Id</th>
                                    <th>Tm_name</th>
                                    <th>Ru_name</th>
                                    <th>En_name</th>
                                    <th>IsActive</th>
                                    <th>CreatedAt</th>
                                    <th>UpdatedAt</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in features" :key="item.id">
                                    <td>#{{ item.id }}</td>
                                    <td>{{ item.tm_name }}</td>
                                    <td>{{ item.ru_name }}</td>
                                    <td>{{ item.en_name }}</td>
                                    <th>{{ item.isActive }}</th>
                                    <td>{{ item.createdAt }}</td>
                                    <td>{{ item.updatedAt }}</td>
                                    <td>
                                        <a href="#update" class="btn btn-blue" @click="
                                            (update.id = item.id),
                                            (update.tm_name = item.tm_name),
                                            (update.ru_name = item.ru_name),
                                            (update.en_name = item.en_name),
                                            (update.isActive = String(item.isActive))
                                            ">Edit
                                        </a>
                                    </td>
                                    <td>
                                        <button class="btn btn-danger" @click="deleteFeature(item.id)">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Paginator :dataLength="dataLength" @setPageItem="allFeatures" :count="count" />
                </div>
            </div>
            <div class="d-flex justify-content-center">
                <div class="col-lg-4" style="margin-right: 30px">
                    <div class="row row-cards">
                        <form @submit.prevent="addFeature" class="card">
                            <div class="card-header">
                                <h2 class="card-title">Add Feature</h2>
                            </div>
                            <div class="card-body">
                                <div class="mb-3">
                                    <TextInput label="Tm_name" v-model="post.tm_name" required="true">
                                    </TextInput>
                                </div>
                                <div class="mb-3">
                                    <TextInput label="Ru_name" v-model="post.ru_name" required="false">
                                    </TextInput>
                                </div>
                                <div class="mb-3">
                                    <TextInput label="En_name" v-model="post.en_name" required="false">
                                    </TextInput>
                                </div>
                                <div class="mb-3">
                                    <SelectInput label="IsActive" v-model="post.isActive" required="false"
                                        :options="['true', 'false']" />
                                </div>
                            </div>
                            <FormButton />
                        </form>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="row row-cards">
                        <form @submit.prevent="updateFeature" class="card">
                            <div class="card-header">
                                <h2 class="card-title">Update Feature</h2>
                            </div>
                            <div class="card-body">
                                <div class="mb-3">
                                    <TextInput label="Tm_name" v-model="update.tm_name" required="true">
                                    </TextInput>
                                </div>
                                <div class="mb-3">
                                    <TextInput label="Ru_name" v-model="update.ru_name" required="false">
                                    </TextInput>
                                </div>
                                <div class="mb-3">
                                    <TextInput label="En_name" v-model="update.en_name" required="false">
                                    </TextInput>
                                </div>
                                <div class="mb-3">
                                    <SelectInput label="IsActive" v-model="update.isActive" required="false"
                                        :options="['true', 'false']" />
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
import Header from "@/components/Header.vue";
import Navbar from "@/components/Navbar.vue";
import Paginator from "@/components/Paginator.vue";
import TextInput from "@/components/layouts/TextInput.vue";
import FormButton from "@/components/layouts/FormButton.vue";
import SelectInput from "@/components/layouts/SelectInput.vue";
import Search from "@/components/Search.vue";
import Alert from "@/components/Alert.vue";
export default {
    name: "Feature",
    components: {
        Header,
        Navbar,
        Paginator,
        TextInput,
        FormButton,
        SelectInput,
        Search,
        Alert,
    },
    data() {
        return {
            features: null,
            successAlert: null,
            errorAlert: null,
            currentPage: 1,
            dataLength: 0,
            count: 0,
            post: {
                tm_name: null,
                ru_name: null,
                en_name: null,
                isActive: null,
            },
            update: {
                id: 0,
                tm_name: null,
                ru_name: null,
                en_name: null,
                isActive: null,
            },
        };
    },
    async created() {
        await this.allFeatures();
    },
    methods: {
        // GET
        async allFeatures() {
            try {
                const axiosConfig = {
                    headers: {
                        Authorization: `${localStorage.getItem("Authorization")}`,
                    },
                };
                const response = await this.$appAxios.get(
                    "/admin/all/features?status=all",
                    axiosConfig
                );
                this.dataLength = Math.ceil((await response.data.detail.count) / 10);
                this.features = response.data.detail.rows;
                this.count = response.data.detail.count
            } catch (error) {
                console.log(error);
            }
        },
        // POST
        async addFeature() {
            try {
                const postData = {
                    tm_name: this.post.tm_name,
                    ru_name: this.post.ru_name,
                    en_name: this.post.en_name,
                    isActive: this.post.isActive == "true" ? true : false,
                };
                const axiosConfig = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${localStorage.getItem("Authorization")}`,
                    },
                };
                this.$appAxios
                    .post("/admin/add/feature", postData, axiosConfig)
                    .then((res) => {
                        if (res.data.type === "error") {
                            this.errorAlert = res.data.msg;
                        } else {
                            this.successAlert = res.data.msg;
                            this.allFeatures();
                        }
                    })
                    .catch((err) => {
                        this.errorAlert = err.response.data.msg;
                    });
                window.scroll(0, 0);
            } catch (error) {
                console.log(error);
            }
        },
        // PUT
        async updateFeature() {
            try {
                const updateData = {
                    id: this.update.id,
                    tm_name: this.update.tm_name,
                    ru_name: this.update.ru_name,
                    en_name: this.update.en_name,
                    isActive: this.update.isActive == "true" ? true : false,
                };
                const axiosConfig = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${localStorage.getItem("Authorization")}`,
                    },
                };
                this.$appAxios
                    .put("/admin/update/feature", updateData, axiosConfig)
                    .then((res) => {
                        if (res.data.type === "error") {
                            this.errorAlert = res.data.msg;
                        } else {
                            this.successAlert = res.data.msg;
                            this.allFeatures();
                        }
                    })
                    .catch((err) => {
                        this.errorAlert = err.response.data.msg;
                    });
                window.scroll(0, 0);
            } catch (error) {
                console.log(error);
            }
        },
        // DELETE
        async deleteFeature(id) {
            try {
                if (confirm("Bu maglumaty pozmak isleýärsiňizmi?")) {
                    const axiosConfig = {
                        headers: {
                            Authorization: `${localStorage.getItem("Authorization")}`,
                        },
                    };
                    this.$appAxios
                        .delete(`/admin/delete/feature/${id}`, axiosConfig)
                        .then((res) => {
                            if (res.data.type === "error") {
                                this.errorAlert = res.data.msg;
                            } else {
                                this.successAlert = res.data.msg;
                                this.allFeatures();
                            }
                        })
                        .catch((err) => {
                            this.errorAlert = err.response.data.msg;
                        });
                }
                window.scroll(0, 0);
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>
    
<style>
@import "@/assets/css/tabler.min.css";
@import "@/assets/css/tabler-flags.min.css";
@import "@/assets/css/tabler-payments.min.css";
@import "@/assets/css/tabler-vendors.min.css";
@import "@/assets/css/demo.min.css";
</style>