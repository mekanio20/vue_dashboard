<template>
  <div>
    <Header />
    <Navbar />
    <div class="container-xl mt-3 mb-6">
      <div class="row">
        <div
          v-if="successAlert"
          class="alert alert-success"
          :class="{ block: successAlert }"
          role="alert"
        >
          {{ successAlert }}
        </div>
        <div
          v-if="errorAlert"
          class="alert alert-danger"
          :class="{ block: errorAlert }"
          role="alert"
        >
          {{ errorAlert }}
        </div>
      </div>
      <div class="col-12 mb-3">
        <div class="card">
          <div class="card-header d-flex justify-content-between">
            <h3 class="card-title">Categories</h3>
            <Search />
          </div>
          <div class="table-responsive">
            <table class="table card-table table-vcenter text-nowrap datatable">
              <thead>
                <tr>
                  <th>#Id</th>
                  <th>Image</th>
                  <th>TM_NAME</th>
                  <th>RU_NAME</th>
                  <th>EN_NAME</th>
                  <th>Slug</th>
                  <th>IsActive</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in categories" :key="item.id">
                  <td>#{{ item.id }}</td>
                  <td><img :src="item.img" width="60" height="50" /></td>
                  <td>{{ item.tm_name }}</td>
                  <td>{{ item.ru_name }}</td>
                  <td>{{ item.en_name }}</td>
                  <td>{{ item.slug }}</td>
                  <td>{{ item.isActive }}</td>
                  <td>
                    <a
                      href="#update"
                      class="btn btn-blue"
                      @click="
                        (update.id = item.id),
                          (update.tm_name = item.tm_name),
                          (update.ru_name =
                            item.ru_name == 'null' ? null : item.ru_name),
                          (update.en_name =
                            item.en_name == 'null' ? null : item.en_name),
                          (update.isActive = String(item.isActive))
                      "
                      >Edit
                    </a>
                  </td>
                  <td>
                    <button
                      class="btn btn-danger"
                      @click="deleteCategory(item.id)"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Paginator
            :dataLength="dataLength"
            @setPageItem="allCategories"
            :count="count"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 mb-3">
          <div class="col-12">
            <form @submit.prevent="addCategory" class="card">
              <div class="card-header">
                <h3 class="card-title">Add Category</h3>
              </div>
              <div class="card-body">
                <div class="row row-cards">
                  <div class="mb-3 col-sm-4 col-md-4">
                    <TextInput
                      label="TM"
                      placeholder="tm_name"
                      required="true"
                      v-model="post.tm_name"
                    />
                  </div>
                  <div class="mb-3 col-sm-4 col-md-4">
                    <TextInput
                      label="RU"
                      placeholder="ru_name"
                      required="false"
                      v-model="post.ru_name"
                    />
                  </div>
                  <div class="mb-3 col-sm-4 col-md-4">
                    <TextInput
                      label="EN"
                      placeholder="en_name"
                      required="false"
                      v-model="post.en_name"
                    />
                  </div>
                  <div class="mb-3">
                    <SelectInput
                      label="IsActive"
                      v-model="post.isActive"
                      required="false"
                      :options="['true', 'false']"
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label required">Category image</label>
                    <input id="img" type="file" class="form-control" />
                  </div>
                </div>
              </div>
              <FormButton />
            </form>
          </div>
        </div>
        <div id="update" class="col-lg-6 mb-3">
          <div class="col-12">
            <form @submit.prevent="updateCategory" class="card">
              <div class="card-header">
                <h3 class="card-title">Update Category</h3>
              </div>
              <div class="card-body">
                <div class="row row-cards">
                  <div class="mb-3 col-sm-4 col-md-4">
                    <TextInput
                      label="TM"
                      placeholder="tm_name"
                      required="false"
                      v-model="update.tm_name"
                    />
                  </div>
                  <div class="mb-3 col-sm-4 col-md-4">
                    <TextInput
                      label="RU"
                      placeholder="ru_name"
                      required="false"
                      v-model="update.ru_name"
                    />
                  </div>
                  <div class="mb-3 col-sm-4 col-md-4">
                    <TextInput
                      label="EN"
                      placeholder="en_name"
                      required="false"
                      v-model="update.en_name"
                    />
                  </div>
                  <div class="mb-3">
                    <SelectInput
                      label="IsActive"
                      v-model="update.isActive"
                      required="false"
                      :options="['true', 'false']"
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Category image</label>
                    <input id="update__img" type="file" class="form-control" />
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
import Header from "@/components/Header.vue";
import Navbar from "@/components/Navbar.vue";
import Paginator from "@/components/Paginator.vue";
import TextInput from "@/components/layouts/TextInput.vue";
import FormButton from "@/components/layouts/FormButton.vue";
import SelectInput from "@/components/layouts/SelectInput.vue";
import Search from "@/components/Search.vue";
export default {
  name: "Category",
  components: {
    Header,
    Navbar,
    Paginator,
    TextInput,
    FormButton,
    SelectInput,
    Search,
  },
  data() {
    return {
      errorAlert: null,
      successAlert: null,
      categories: null,
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
    await this.allCategories(this.currentPage);
  },
  methods: {
    async successMessage(msg) {
      this.successAlert = msg;
      setTimeout(() => {
        this.successAlert = null;
      }, 3000);
    },
    async errorMessage(msg) {
      this.errorAlert = msg;
      setTimeout(() => {
        this.errorAlert = null;
      }, 3000);
    },
    // GET
    async allCategories(page) {
      try {
        this.currentPage = page;
        const response = await this.$appAxios.get(
          `/user/categories?status=all&page=${page}`
        );
        this.dataLength = Math.ceil((await response.data.detail.count) / 10);
        this.categories = await response.data.detail.rows;
        this.count = await response.data.detail.count;
      } catch (error) {
        console.log(error);
      }
    },
    // POST
    async addCategory() {
      try {
        const status = this.post.isActive == "true" ? true : false;
        const fileInput = document.getElementById("img");
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append("logo", file, file.name);
        formData.append("tm_name", this.post.tm_name);
        formData.append("ru_name", this.post.ru_name);
        formData.append("en_name", this.post.en_name);
        formData.append("isActive", status);
        const axiosConfig = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${localStorage.getItem("Authorization")}`,
          },
        };
        this.$appAxios
          .post("/admin/add/category", formData, axiosConfig)
          .then((res) => {
            if (res.data.type === "error") {
              this.errorMessage(res.data.msg);
            } else {
              this.successMessage(res.data.msg);
              this.allCategories(this.currentPage);
            }
          })
          .catch((err) => {
            this.errorMessage(err.response.data.msg);
          });
        window.scroll(0, 0);
      } catch (error) {
        console.log(error);
      }
    },
    // PUT
    async updateCategory() {
      try {
        const status = this.update.isActive == "true" ? true : false;
        const fileInput = document.getElementById("update__img");
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append("id", this.update.id);
        formData.append("tm_name", this.update.tm_name);
        formData.append("ru_name", this.update.ru_name);
        formData.append("en_name", this.update.en_name);
        formData.append("isActive", status);
        if (file) {
          formData.append("logo", file, file.name);
        }
        const axiosConfig = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("Authorization")}`,
          },
        };
        this.$appAxios
          .put("/admin/update/category", formData, axiosConfig)
          .then((res) => {
            if (res.data.type === "error") {
              this.errorMessage(res.data.msg);
            } else {
              this.successMessage(res.data.msg);
              this.allCategories(this.currentPage);
            }
          })
          .catch((err) => {
            this.errorMessage(err.response.data.msg);
          });
        window.scroll(0, 0);
      } catch (error) {
        console.log(error);
      }
    },
    // DELETE
    async deleteCategory(id) {
      try {
        if (confirm("Bu maglumaty pozmak isleýärsiňizmi?")) {
          const axiosConfig = {
            headers: {
              Authorization: `${localStorage.getItem("Authorization")}`,
            },
          };
          this.$appAxios
            .delete(`/admin/delete/category/${id}`, axiosConfig)
            .then((res) => {
              if (res.data.type === "error") {
                this.errorMessage(res.data.msg);
              } else {
                this.successMessage(res.data.msg);
                this.allCategories(this.currentPage);
              }
            })
            .catch((err) => {
              this.errorMessage(err.response.data.msg);
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