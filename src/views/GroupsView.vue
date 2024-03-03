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
            <h3 class="card-title">Groups</h3>
            <Search />
          </div>
          <div class="table-responsive">
            <table class="table card-table table-vcenter text-nowrap datatable">
              <thead>
                <tr>
                  <th>#Id</th>
                  <th>Name</th>
                  <th>IsActive</th>
                  <th>CreatedAt</th>
                  <th>UpdatedAt</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in groups" :key="item.id">
                  <td>#{{ item.id }}</td>
                  <td>{{ item.name }}</td>
                  <th>{{ item.isActive }}</th>
                  <td>{{ item.createdAt }}</td>
                  <td>{{ item.updatedAt }}</td>
                  <td>
                    <a
                      href="#update"
                      class="btn btn-blue"
                      @click="
                        (update.id = item.id),
                          (update.name = item.name),
                          (update.isActive = String(item.isActive))
                      "
                      >Edit
                    </a>
                  </td>
                  <td>
                    <button
                      class="btn btn-danger"
                      @click="deleteGroup(item.id)"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 mb-3">
          <div class="col-12">
            <form @submit.prevent="addGroup" class="card">
              <div class="card-header">
                <h3 class="card-title">Add Group</h3>
              </div>
              <div class="card-body">
                <div class="row row-cards">
                  <div class="mb-3 col-sm-8 col-md-8">
                    <TextInput
                      label="Name"
                      v-model="post.name"
                      required="true"
                    />
                  </div>
                  <div class="mb-3 col-sm-8 col-md-8">
                    <SelectInput
                      label="IsActive"
                      v-model="post.isActive"
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
        <div class="col-lg-6 mb-3">
          <div class="col-12">
            <form @submit.prevent="updateGroup" class="card">
              <div class="card-header">
                <h3 class="card-title">Update Group</h3>
              </div>
              <div class="card-body">
                <div class="row row-cards">
                  <div class="mb-3 col-sm-8 col-md-8">
                    <TextInput
                      label="Name"
                      v-model="update.name"
                      required="true"
                    />
                  </div>
                  <div class="mb-3 col-sm-8 col-md-8">
                    <SelectInput
                      label="IsActive"
                      v-model="update.isActive"
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
import Alert from "@/components/Alert.vue";
export default {
  name: "Groups",
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
      groups: null,
      successAlert: null,
      errorAlert: null,
      post: {
        name: null,
        isActive: null,
      },
      update: {
        id: 0,
        name: null,
        isActive: null,
      },
    };
  },
  async created() {
    await this.allGroups();
  },
  methods: {
    // GET
    async allGroups() {
      try {
        const axiosConfig = {
          headers: {
            Authorization: `${localStorage.getItem("Authorization")}`,
          },
        };
        const response = await this.$appAxios.get(
          "/admin/all/groups?status=all",
          axiosConfig
        );
        this.groups = response.data.detail.rows;
      } catch (error) {
        console.log(error);
      }
    },
    // POST
    async addGroup() {
      try {
        const postData = {
          name: this.post.name,
          isActive: this.post.isActive == "true" ? true : false,
        };
        const axiosConfig = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("Authorization")}`,
          },
        };
        this.$appAxios
          .post("/admin/add/group", postData, axiosConfig)
          .then((res) => {
            if (res.data.type === "error") {
              this.errorAlert = res.data.msg;
            } else {
              this.successAlert = res.data.msg;
              this.allGroups();
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
    async updateGroup() {
      try {
        const updateData = {
          id: this.update.id,
          name: this.update.name,
          isActive: this.update.isActive == "true" ? true : false,
        };
        const axiosConfig = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("Authorization")}`,
          },
        };
        this.$appAxios
          .put("/admin/update/group", updateData, axiosConfig)
          .then((res) => {
            if (res.data.type === "error") {
              this.errorAlert = res.data.msg;
            } else {
              this.successAlert = res.data.msg;
              this.allGroups();
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
    async deleteGroup(id) {
      try {
        if (confirm("Bu maglumaty pozmak isleýärsiňizmi?")) {
          const axiosConfig = {
            headers: {
              Authorization: `${localStorage.getItem("Authorization")}`,
            },
          };
          this.$appAxios
            .delete(`/admin/delete/group/${id}`, axiosConfig)
            .then((res) => {
              if (res.data.type === "error") {
                this.errorAlert = res.data.msg;
              } else {
                this.successAlert = res.data.msg;
                this.allGroups();
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