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
                  <th>Phone</th>
                  <th>Device</th>
                  <th>Ip</th>
                  <th>Group</th>
                  <th>isActive</th>
                  <th>isCustomer</th>
                  <th>isSeller</th>
                  <th>isStaff</th>
                  <th>isSuperAdmin</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in users" :key="item.id">
                  <td>#{{ item.id }}</td>
                  <td>{{ item.phone }}</td>
                  <td>{{ item.device }}</td>
                  <td>{{ item.ip }}</td>
                  <td>{{ item.group.name }}</td>
                  <td>{{ item.isActive }}</td>
                  <td>{{ item.isCustomer }}</td>
                  <td>{{ item.isSeller }}</td>
                  <td>{{ item.isStaff }}</td>
                  <td>{{ item.isSuperAdmin }}</td>
                  <td>
                    <a
                      href="#update"
                      class="btn btn-blue"
                      @click="
                        (update.id = Number(item.id)),
                          (update.isActive = String(item.isActive)),
                          (update.isCustomer = String(item.isCustomer)),
                          (update.isSeller = String(item.isSeller)),
                          (update.isStaff = String(item.isStaff))
                      "
                      >Edit
                    </a>
                  </td>
                  <td>
                    <button class="btn btn-danger" @click="deleteUser(item.id)">
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
      <div class="d-flex justify-content-center">
        <div id="update" class="col-lg-6 mb-3">
          <div class="col-12">
            <form @submit.prevent="updateUser" class="card">
              <div class="card-header">
                <h3 class="card-title">Update User</h3>
              </div>
              <div class="card-body">
                <div class="row row-cards">
                  <div class="mb-3 col-sm-4 col-md-4">
                    <SelectInput
                      label="IsActive"
                      v-model="update.isActive"
                      required="false"
                      :options="['true', 'false']"
                    />
                  </div>
                  <div class="mb-3 col-sm-4 col-md-4">
                    <SelectInput
                      label="isCustomer"
                      v-model="update.isCustomer"
                      required="false"
                      :options="['true', 'false']"
                    />
                  </div>
                  <div class="mb-3 col-sm-4 col-md-4">
                    <SelectInput
                      label="isSeller"
                      v-model="update.isSeller"
                      required="false"
                      :options="['true', 'false']"
                    />
                  </div>
                  <div class="mb-3 col-sm-4 col-md-4">
                    <SelectInput
                      label="isStaff"
                      v-model="update.isStaff"
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
import FormButton from "@/components/layouts/FormButton.vue";
import SelectInput from "@/components/layouts/SelectInput.vue";
import Search from "@/components/Search.vue";
export default {
  name: "Users",
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
      users: null,
      errorAlert: null,
      successAlert: null,
      currentPage: 1,
      dataLength: 0,
      count: 0,
      update: {
        id: 0,
        isActive: null,
        isCustomer: null,
        isSeller: null,
        isStaff: null,
      },
    };
  },
  async created() {
    await this.allUsers(this.currentPage);
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
    async allUsers(page) {
      try {
        this.currentPage = page;
        const axiosConfig = {
          headers: {
            Authorization: `${localStorage.getItem("Authorization")}`,
          },
        };
        const response = await this.$appAxios.get(
          `/user/all?status=all&page=${page}`,
          axiosConfig
        );
        this.dataLength = Math.ceil((await response.data.detail.count) / 10);
        this.users = await response.data.detail.rows;
        this.count = await response.data.detail.count;
      } catch (error) {
        console.log(error);
      }
    },
    // PUT
    async updateUser() {
      try {
        const updateUser = {
          id: this.update.id,
          isActive: this.update.isActive == "true" ? true : false,
          isCustomer: this.update.isCustomer == "true" ? true : false,
          isSeller: this.update.isSeller == "true" ? true : false,
          isStaff: this.update.isStaff == "true" ? true : false,
        };
        const axiosConfig = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("Authorization")}`,
          },
        };
        this.$appAxios
          .put("/admin/update/user", updateUser, axiosConfig)
          .then((res) => {
            if (res.data.type === "error") {
              this.errorMessage(res.data.msg);
            } else {
              this.successMessage(res.data.msg);
              this.allUsers(this.currentPage);
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
    async deleteUser(id) {
      try {
        if (confirm("Bu maglumaty pozmak isleýärsiňizmi?")) {
          const axiosConfig = {
            headers: {
              Authorization: `${localStorage.getItem("Authorization")}`,
            },
          };
          this.$appAxios
            .delete(`/admin/delete/user/${id}`, axiosConfig)
            .then((res) => {
              if (res.data.type === "error") {
                this.errorMessage(res.data.msg);
              } else {
                this.successMessage(res.data.msg);
                this.allUsers(this.currentPage);
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