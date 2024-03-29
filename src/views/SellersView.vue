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
            <h3 class="card-title">Sellers</h3>
            <Search />
          </div>
          <div class="table-responsive">
            <table class="table card-table table-vcenter text-nowrap datatable">
              <thead>
                <tr>
                  <th>#Id</th>
                  <th>Logo</th>
                  <th>Name</th>
                  <th>Store number</th>
                  <th>Seller type</th>
                  <th>Sell type</th>
                  <th>Main number</th>
                  <th>IsVerified</th>
                  <th>Category</th>
                  <th>Subscription</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in sellers" :key="item.id">
                  <td>#{{ item.id }}</td>
                  <td><img src="item.logo" width="60" height="50" /></td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.store_number }}</td>
                  <td>{{ item.seller_type }}</td>
                  <td>{{ item.sell_type }}</td>
                  <td>{{ item.main_number }}</td>
                  <td>{{ item.isVerified }}</td>
                  <td>{{ item.category?.tm_name || "null" }}</td>
                  <td>{{ item.subscription.name }}</td>
                  <td>
                    <a
                      href="#update"
                      class="btn btn-blue"
                      @click="
                        (update.id = Number(item.id)),
                          (update.isVerified = String(item.isVerified))
                      "
                      >Edit
                    </a>
                  </td>
                  <td>
                    <button
                      class="btn btn-danger"
                      @click="deleteSeller(item.id)"
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
            @setPageItem="allSellers"
            :count="count"
          />
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <div id="update" class="col-lg-4 mb-3">
          <div class="col-10">
            <form @submit.prevent="updateSeller" class="card">
              <div class="card-header">
                <h3 class="card-title">Update Seller</h3>
              </div>
              <div class="card-body">
                <div class="row row-cards">
                  <div class="mb-3 col-sm-4 col-md-10">
                    <SelectInput
                      label="IsVerified"
                      v-model="update.isVerified"
                      required="false"
                      :options="['true', 'false']"
                    />
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
import SelectInput from "@/components/layouts/SelectInput.vue";
import NumberInput from "@/components/layouts/NumberInput.vue";
import BooleanInput from "@/components/layouts/BooleanInput.vue";
import FormButton from "@/components/layouts/FormButton.vue";
import Search from "@/components/Search.vue";
import Alert from "@/components/Alert.vue";
export default {
  name: "Sellers",
  components: {
    Header,
    Navbar,
    Paginator,
    TextInput,
    NumberInput,
    SelectInput,
    BooleanInput,
    FormButton,
    Search,
    Alert,
  },
  data() {
    return {
      sellers: null,
      errorAlert: null,
      successAlert: null,
      currentPage: 1,
      dataLength: 0,
      count: 0,
      update: {
        id: 0,
        isVerified: null,
      },
    };
  },
  async created() {
    await this.allSellers(this.currentPage);
  },
  methods: {
    // GET
    async allSellers(page) {
      try {
        this.currentPage = Number(page);
        const axiosConfig = {
          headers: {
            Authorization: `${localStorage.getItem("Authorization")}`,
          },
        };
        const response = await this.$appAxios.get(
          `/seller/all?sort=id&order=desc&page=${this.currentPage}`,
          axiosConfig
        );
        this.dataLength = Math.ceil((await response.data.detail.count) / 10);
        this.sellers = await response.data.detail.rows;
        this.count = await response.data.detail.count;
      } catch (error) {
        console.log(error);
      }
    },
    // PUT
    async updateSeller() {
      try {
        const updateUser = {
          id: this.update.id,
          isVerified: this.update.isVerified == "true" ? true : false,
        };
        const axiosConfig = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("Authorization")}`,
          },
        };
        this.$appAxios
          .put("/admin/update/seller", updateUser, axiosConfig)
          .then((res) => {
            if (res.data.type === "error") {
              this.errorAlert = res.data.msg;
            } else {
              this.successAlert = res.data.msg;
              this.allSellers(this.currentPage);
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
    async deleteSeller(id) {
      try {
        if (confirm("Bu maglumaty pozmak isleýärsiňizmi?")) {
          const axiosConfig = {
            headers: {
              Authorization: `${localStorage.getItem("Authorization")}`,
            },
          };
          this.$appAxios
            .delete(`/admin/delete/seller/${id}`, axiosConfig)
            .then((res) => {
              if (res.data.type === "error") {
                this.errorAlert = res.data.msg;
              } else {
                this.successAlert = res.data.msg;
                this.allSellers(this.currentPage);
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