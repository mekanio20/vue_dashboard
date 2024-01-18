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
            <h3 class="card-title">Users</h3>
            <Search />
          </div>
          <div class="table-responsive">
            <table class="table card-table table-vcenter text-nowrap datatable">
              <thead>
                <tr>
                  <th>#Id</th>
                  <th>Image</th>
                  <th>Fullname</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>createdAt</th>
                  <th>updatedAt</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in customers" :key="item.id">
                  <td>#{{ item.id }}</td>
                  <td><img src="item.logo" width="60" height="50" /></td>
                  <td>{{ item.fullname }}</td>
                  <td>{{ item.gender }}</td>
                  <td>{{ item.email }}</td>
                  <td>{{ item.createdAt }}</td>
                  <td>{{ item.updatedAt }}</td>
                  <td>
                    <button
                      class="btn btn-danger"
                      @click="deleteCustomer(item.id)"
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
            @setPageItem="allUsers"
            :count="count"
          />
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
  name: "Customers",
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
      customers: null,
      errorAlert: null,
      successAlert: null,
      currentPage: 1,
      dataLength: 0,
      count: 0,
    };
  },
  async created() {
    await this.allCustomers(this.currentPage);
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
    async allCustomers(page) {
      try {
        this.currentPage = page;
        const axiosConfig = {
          headers: {
            Authorization: `${localStorage.getItem("Authorization")}`,
          },
        };
        const response = await this.$appAxios.get(
          `/customer/all?page=${page}`,
          axiosConfig
        );
        this.dataLength = Math.ceil((await response.data.detail.count) / 10);
        this.customers = await response.data.detail.rows;
        this.count = await response.data.detail.count;
      } catch (error) {
        console.log(error);
      }
    },
    // DELETE
    async deleteCustomer(id) {
      try {
        if (confirm("Bu maglumaty pozmak isleýärsiňizmi?")) {
          const axiosConfig = {
            headers: {
              Authorization: `${localStorage.getItem("Authorization")}`,
            },
          };
          this.$appAxios
            .delete(`/admin/delete/customer/${id}`, axiosConfig)
            .then((res) => {
              if (res.data.type === "error") {
                this.errorMessage(res.data.msg);
              } else {
                this.successMessage(res.data.msg);
                this.allCustomers(this.currentPage);
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