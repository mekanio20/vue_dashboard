<template>
    <div>
      <Header />
      <Navbar />
      <div class="container-xl mt-3 mb-6">
        <Alert
          v-if="errorAlert || successAlert"
          :errorAlert="errorAlert"
          :successAlert="successAlert"
        />
        <div class="col-12 mb-3">
          <div class="card">
            <div class="card-header d-flex justify-content-between">
              <h3 class="card-title">Notifications</h3>
              <Search />
            </div>
            <div class="table-responsive">
              <table class="table card-table table-vcenter text-nowrap datatable">
                <thead>
                  <tr>
                    <th>#Id</th>
                    <th>Image</th>
                    <th>Type</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Sort order</th>
                    <th>UserId</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in banners" :key="item.id">
                    <td>#{{ item.id }}</td>
                    <td><img src="public/item.img" width="60" height="50" /></td>
                    <td>{{ item.type }}</td>
                    <td>{{ item.start_date }}</td>
                    <td>{{ item.end_date }}</td>
                    <td>{{ item.sort_order }}</td>
                    <td>{{ item.userId }}</td>
                    <td>
                      <button
                        class="btn btn-danger"
                        @click="deleteBanner(item.id)"
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
              @setPageItem="allBanners"
              :count="count"
            />
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <div class="col-lg-4" style="margin-right: 30px">
            <div class="row row-cards">
              <form @submit.prevent="addBanner" class="card">
                <div class="card-header">
                  <h2 class="card-title">Add Banner</h2>
                </div>
                <div class="card-body">
                  <div class="mb-3">
                    <label class="form-label required">Tm image</label>
                    <input id="tm_img" type="file" class="form-control" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Ru image</label>
                    <input id="ru_img" type="file" class="form-control" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">En image</label>
                    <input id="en_img" type="file" class="form-control" />
                  </div>
                  <div class="mb-3">
                    <TextInput
                      label="Url"
                      placeholder="http://"
                      v-model="post.url"
                      required="true"
                    >
                    </TextInput>
                  </div>
                  <div class="mb-3">
                    <SelectInput
                      label="Type"
                      v-model="post.type"
                      required="true"
                      :options="[
                        'home',
                        'product',
                        'profile',
                        'ad',
                        'category',
                        'etc',
                      ]"
                    />
                  </div>
                  <div class="mb-3">
                    <Number
                      label="Sort Order"
                      v-model="post.sort_order"
                      required="true"
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label required">Start Date</label>
                    <input
                      v-model="post.start_date"
                      type="date"
                      class="form-control"
                    />
                  </div>
                  <div class="mb-3">
                    <label class="form-label required">End Date</label>
                    <input
                      v-model="post.end_date"
                      type="date"
                      class="form-control"
                    />
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
  import FormButton from "@/components/layouts/FormButton.vue";
  import SelectInput from "@/components/layouts/SelectInput.vue";
  import TextInput from "@/components/layouts/TextInput.vue";
  import Number from "@/components/layouts/NumberInput.vue";
  import Search from "@/components/Search.vue";
  import Alert from "@/components/Alert.vue";
  export default {
    name: "Notifications",
    components: {
      Header,
      Navbar,
      Paginator,
      FormButton,
      SelectInput,
      TextInput,
      Search,
      Alert,
      Number,
    },
    data() {
      return {
        successAlert: null,
        errorAlert: null,
        banners: null,
        currentPage: 1,
        dataLength: 0,
        count: 0,
        post: {
          url: null,
          type: null,
          sort_order: null,
          start_date: null,
          end_date: null,
        },
      };
    },
    async created() {
      this.allBanners(this.currentPage);
    },
    methods: {
      // GET
      async allBanners(page) {
        try {
          this.currentPage = page;
          const axiosConfig = {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `${localStorage.getItem("Authorization")}`,
            },
          };
          const response = await this.$appAxios.get(
            `/banner/all?page=${page}`,
            axiosConfig
          );
          this.dataLength = Math.ceil((await response.data.detail.count) / 10);
          this.banners = await response.data.detail.rows;
          this.count = await response.data.detail.count;
        } catch (error) {
          console.log(error);
        }
      },
      // POST
      async addBanner() {
        try {
          const fileInputTM = document.getElementById("tm_img");
          const fileInputRU = document.getElementById("ru_img");
          const fileInputEN = document.getElementById("en_img");
          const fileTM = fileInputTM.files[0];
          const fileRU = fileInputRU.files[0];
          const fileEN = fileInputEN.files[0];
          const formData = new FormData();
          formData.append("tm_img", fileTM, fileTM.name);
          if (fileRU) { formData.append("ru_img", fileRU, fileRU.name); }
          if (fileEN) { formData.append("en_img", fileEN, fileEN.name); }
          formData.append("url", this.post.url);
          formData.append("type", this.post.type);
          formData.append("sort_order", this.post.sort_order);
          formData.append("start_date", this.post.start_date);
          formData.append("end_date", this.post.end_date);
          const axiosConfig = {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `${localStorage.getItem("Authorization")}`,
            },
          };
          this.$appAxios
            .post("/banner/add", formData, axiosConfig)
            .then((res) => {
              if (res.data.type === "error") {
                this.errorAlert = res.data.msg;
              } else {
                this.successAlert = res.data.msg;
                this.allBanners(this.currentPage);
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
      async deleteBanner(id) {
        try {
          if (confirm("Bu maglumaty pozmak isleýärsiňizmi?")) {
            const axiosConfig = {
              headers: {
                Authorization: `${localStorage.getItem("Authorization")}`,
              },
            };
            this.$appAxios
              .delete(`/banner/${id}`, axiosConfig)
              .then((res) => {
                if (res.data.type === "error") {
                  this.errorAlert = res.data.msg;
                } else {
                  this.successAlert = res.data.msg;
                  this.allBanners(this.currentPage);
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