<template>
    <div>
        <Header />
        <Navbar />
        <div class="container-xl mt-3 mb-6">
            <Alert v-if="errorAlert || successAlert" :errorAlert="errorAlert" :successAlert="successAlert" />
            <div class="col-12 mb-3">
                <div class="card">
                    <div class="card-header d-flex justify-content-between">
                        <h3 class="card-title">Feature Descriptions</h3>
                        <Search />
                    </div>
                    <div class="table-responsive">
                        <table class="table card-table table-vcenter text-nowrap datatable">
                            <thead>
                                <tr>
                                    <th>#Id</th>
                                    <th>Desc</th>
                                    <th>IsActive</th>
                                    <th>FeatureId</th>
                                    <th>CreatedAt</th>
                                    <th>UpdatedAt</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in featureDesc" :key="item.id">
                                    <td>#{{ item.id }}</td>
                                    <td>{{ item.desc }}</td>
                                    <td>{{ item.isActive }}</td>
                                    <td>{{ item.featureId }}</td>
                                    <td>{{ item.createdAt }}</td>
                                    <td>{{ item.updatedAt }}</td>
                                    <td>
                                        <a href="#update" class="btn btn-blue" @click="
                                            (update.id = item.id),
                                            (update.desc = item.desc),
                                            (update.featureId = item.featureId),
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
                    <Paginator :dataLength="dataLength" @setPageItem="allFeatureDescriptions" :count="count" />
                </div>
            </div>
            <div class="d-flex justify-content-center">
                <div class="col-lg-4" style="margin-right: 30px">
                    <div class="row row-cards">
                        <form @submit.prevent="addFeature" class="card">
                            <div class="card-header">
                                <h2 class="card-title">Add Feature Description</h2>
                            </div>
                            <div class="card-body">
                                <div class="mb-3">
                                    <TextInput label="Desc" v-model="post.desc" required="true">
                                    </TextInput>
                                </div>
                                <div class="mb-3">
                                    <SelectInput label="IsActive" v-model="post.isActive" required="false"
                                        :options="['true', 'false']" />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label required">Feature</label>
                                    <select v-model="post.featureId" class="form-select">
                                        <option v-for="item in features" :key="item.id" :value="item.id">
                                            {{ item.tm_name }}
                                        </option>
                                    </select>
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
                                    <TextInput label="Desc" v-model="update.desc" required="true">
                                    </TextInput>
                                </div>
                                <div class="mb-3">
                                    <SelectInput label="IsActive" v-model="update.isActive" required="false"
                                        :options="['true', 'false']" />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label required">Feature</label>
                                    <select v-model="update.featureId" class="form-select">
                                        <option v-for="item in features" :key="item.id" :value="item.id">
                                            {{ item.tm_name }}
                                        </option>
                                    </select>
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
    name: "FeatureDescription",
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
            featureDesc: null,
            successAlert: null,
            errorAlert: null,
            currentPage: 1,
            dataLength: 0,
            count: 0,
            post: {
                featureId: 0,
                desc: null,
                isActive: null,
            },
            update: {
                id: 0,
                featureId: 0,
                desc: null,
                isActive: null,
            },
        };
    },
    async created() {
        await this.allFeatures();
        await this.allFeatureDescriptions(this.currentPage);
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
                this.features = response.data.detail.rows;
            } catch (error) {
                console.log(error);
            }
        },
        async allFeatureDescriptions(page) {
            try {
                this.currentPage = page
                const axiosConfig = {
                    headers: {
                        Authorization: `${localStorage.getItem("Authorization")}`,
                    },
                };
                const response = await this.$appAxios.get(
                    "/admin/all/feature/descriptions?status=all",
                    axiosConfig
                );
                this.dataLength = Math.ceil((await response.data.detail.count) / 10);
                this.featureDesc = response.data.detail.rows;
                this.count = response.data.detail.count;
            } catch (error) {
                console.log(error);
            }
        },
        // POST
        async addFeature() {
            try {
                const postData = {
                    desc: this.post.desc,
                    featureId: this.post.featureId,
                    isActive: this.post.isActive == "true" ? true : false,
                };
                const axiosConfig = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${localStorage.getItem("Authorization")}`,
                    },
                };
                this.$appAxios
                    .post("/admin/add/feature/desc", postData, axiosConfig)
                    .then((res) => {
                        if (res.data.type === "error") {
                            this.errorAlert = res.data.msg;
                        } else {
                            this.successAlert = res.data.msg;
                            this.allFeatureDescriptions();
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
                    desc: this.update.desc,
                    isActive: this.update.isActive == "true" ? true : false,
                };
                const axiosConfig = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${localStorage.getItem("Authorization")}`,
                    },
                };
                this.$appAxios
                    .put("/admin/update/feature/descriptions", updateData, axiosConfig)
                    .then((res) => {
                        if (res.data.type === "error") {
                            this.errorAlert = res.data.msg;
                        } else {
                            this.successAlert = res.data.msg;
                            this.allFeatureDescriptions();
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
                        .delete(`/admin/delete/feature/desc/${id}`, axiosConfig)
                        .then((res) => {
                            if (res.data.type === "error") {
                                this.errorAlert = res.data.msg;
                            } else {
                                this.successAlert = res.data.msg;
                                this.allFeatureDescriptions();
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