<template>
  <div>
    <Header />
    <Navbar />
    <div class="container-xl mt-3 mb-6">
      <Alert v-if="errorAlert || successAlert" :errorAlert="errorAlert" :successAlert="successAlert" />
      <div class="col-12 mb-3">
        <div class="card">
          <div class="card-header d-flex justify-content-between">
            <h3 class="card-title">Subcategory Features</h3>
            <Search />
          </div>
          <div class="table-responsive">
            <table class="table card-table table-vcenter text-nowrap datatable">
              <thead>
                <tr>
                  <th>#Id</th>
                  <th>Subcategory</th>
                  <th>Feature</th>
                  <th>IsActive</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in subcategory_features" :key="item.id">
                  <td>#{{ item.id }}</td>
                  <td>{{ item.subcategory.tm_name }}</td>
                  <td>{{ item.feature.tm_name }}</td>
                  <td>{{ item.isActive }}</td>
                  <td>
                    <a href="#update" class="btn btn-blue" @click="
                      (update.id = item.id),
                      (update.subcategoryId = item.subcategory.id),
                      (update.featureId = item.feature.id),
                      (update.isActive = String(item.isActive))
                      ">Edit
                    </a>
                  </td>
                  <td>
                    <button class="btn btn-danger" @click="deleteSubCategoryFeature(item.id)">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Paginator :dataLength="dataLength" @setPageItem="allSubcategoryFeatures" :count="count" />
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <div class="col-lg-4" style="margin-right: 30px">
          <div class="row row-cards">
            <form @submit.prevent="addSubCategoryFeature" class="card">
              <div class="card-header">
                <h2 class="card-title">Add Subcategory Feature</h2>
              </div>
              <div class="card-body">
                <div class="mb-3">
                  <label class="form-label required">Subcategory</label>
                  <select v-model="post.subcategoryId" class="form-select">
                    <option v-for="item in subcategories" :key="item.id" :value="item.id">
                      {{ item.tm_name }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label class="form-label required">Feature</label>
                  <select v-model="post.featureId" class="form-select">
                    <option v-for="item in features" :key="item.id" :value="item.id">
                      {{ item.tm_name }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <SelectInput label="IsActive" v-model="post.isActive" required="false" :options="['true', 'false']" />
                </div>
              </div>
              <FormButton />
            </form>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="row row-cards">
            <form @submit.prevent="updateSubCategoryFeature" class="card">
              <div class="card-header">
                <h2 class="card-title">Update Subcategory Feature</h2>
              </div>
              <div class="card-body">
                <div class="mb-3">
                  <label class="form-label required">Subcategory</label>
                  <select v-model="update.subcategoryId" class="form-select">
                    <option v-for="item in subcategories" :key="item.id" :value="item.id">
                      {{ item.tm_name }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <label class="form-label required">Feature</label>
                  <select v-model="update.featureId" class="form-select">
                    <option v-for="item in features" :key="item.id" :value="item.id">
                      {{ item.tm_name }}
                    </option>
                  </select>
                </div>
                <div class="mb-3">
                  <SelectInput label="IsActive" v-model="update.isActive" required="false" :options="['true', 'false']" />
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
  name: "SubcategoryFeature",
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
      errorAlert: null,
      successAlert: null,
      subcategory_features: null,
      subcategories: null,
      features: null,
      currentPage: 1,
      dataLength: 0,
      count: 0,
      post: {
        featureId: 0,
        subcategoryId: 0,
        isActive: null,
      },
      update: {
        id: 0,
        featureId: 0,
        subcategoryId: 0,
        isActive: null,
      },
    };
  },
  async created() {
    await this.allSubcategoryFeatures(this.currentPage),
    await this.allSubCategories(),
    await this.allFeatures()
  },
  methods: {
    // GET
    async allSubCategories() {
      try {
        const response = await this.$appAxios.get(`/product/subcategories?status=all&limit=200`);
        this.subcategories = await response.data.detail.rows;
      } catch (error) {
        console.log(error);
      }
    },
    async allFeatures() {
      try {
        const axiosConfig = {
          headers: {
            Authorization: `${localStorage.getItem("Authorization")}`,
          },
        };
        const response = await this.$appAxios.get(`/admin/all/features?status=all&limit=200`, axiosConfig);
        this.features = await response.data.detail.rows;
      } catch (error) {
        console.log(error);
      }
    },
    async allSubcategoryFeatures(page) {
      try {
        this.currentPage = page
        const axiosConfig = {
          headers: {
            Authorization: `${localStorage.getItem("Authorization")}`,
          },
        };
        const response = await this.$appAxios.get(`/admin/subcategory/features?status=all`, axiosConfig)
        this.dataLength = Math.ceil((await response.data.detail.count) / 10);
        this.subcategory_features = await response.data.detail.rows;
        this.count = await response.data.detail.count;
      } catch (error) {
        console.log(error);
      }
    },
    // POST
    async addSubCategoryFeature() {
      try {
        const postData = {
          featureId: this.post.featureId,
          subcategoryId: this.post.subcategoryId,
          isActive: this.post.isActive == "true" ? true : false,
        };
        const axiosConfig = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("Authorization")}`,
          },
        };
        this.$appAxios
          .post("/admin/add/subcategory/feature", postData, axiosConfig)
          .then((res) => {
            if (res.data.type === "error") {
              this.errorAlert = res.data.msg;
            } else {
              this.successAlert = res.data.msg;
              this.allSubcategoryFeatures(this.currentPage);
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
    async updateSubCategoryFeature() {
      try {
        const updateData = {
          id: this.update.id,
          featureId: this.update.featureId,
          subcategoryId: this.update.subcategoryId,
          isActive: this.update.isActive == "true" ? true : false,
        };
        const axiosConfig = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("Authorization")}`,
          },
        };
        this.$appAxios
          .put("/admin/update/subcategory/feature", updateData, axiosConfig)
          .then((res) => {
            if (res.data.type === "error") {
              this.errorAlert = res.data.msg;
            } else {
              this.successAlert = res.data.msg;
              this.allSubcategoryFeatures(this.currentPage);
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
    async deleteSubCategoryFeature(id) {
      try {
        if (confirm("Bu maglumaty pozmak isleýärsiňizmi?")) {
          const axiosConfig = {
            headers: {
              Authorization: `${localStorage.getItem("Authorization")}`,
            },
          };
          this.$appAxios
            .delete(`/admin/delete/subcategory/feature/${id}`, axiosConfig)
            .then((res) => {
              if (res.data.type === "error") {
                this.errorAlert = res.data.msg;
              } else {
                this.successAlert = res.data.msg;
                this.allSubcategoryFeatures(this.currentPage);
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