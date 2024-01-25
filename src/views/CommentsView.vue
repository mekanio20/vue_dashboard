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
            <h3 class="card-title">Users</h3>
            <Search />
          </div>
          <div class="table-responsive">
            <table class="table card-table table-vcenter text-nowrap datatable">
              <thead>
                <tr>
                  <th>#Id</th>
                  <th>Comment</th>
                  <th>IsActive</th>
                  <th>CreatedAt</th>
                  <th>UpdatedAt</th>
                  <th>CustomerId</th>
                  <th>ProductId</th>
                  <th>Star</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in comments" :key="item.id">
                  <td>#{{ item.id }}</td>
                  <td>{{ item.comment }}</td>
                  <td>{{ item.isActive }}</td>
                  <td>{{ item.createdAt }}</td>
                  <td>{{ item.updatedAt }}</td>
                  <td>{{ item.customer.id }}</td>
                  <td>{{ item.product.id }}</td>
                  <td>{{ item.star || "null" }}</td>
                  <td>
                    <a
                      href="#update"
                      class="btn btn-blue"
                      @click="
                        (update.id = Number(item.id)),
                          (update.isActive = String(item.isActive))
                      "
                      >Edit
                    </a>
                  </td>
                  <td>
                    <button
                      class="btn btn-danger"
                      @click="deleteComment(item.id)"
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
            @setPageItem="allComments"
            :count="count"
          />
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <div id="update" class="col-lg-4 mb-3">
          <div class="col-10">
            <form @submit.prevent="updateComment" class="card">
              <div class="card-header">
                <h3 class="card-title">Update Comment</h3>
              </div>
              <div class="card-body">
                <div class="row row-cards">
                  <div class="mb-3 col-sm-4 col-md-10">
                    <SelectInput
                      label="IsActive"
                      v-model="update.isActive"
                      required="true"
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
  name: "Comments",
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
      comments: null,
      errorAlert: null,
      successAlert: null,
      currentPage: 1,
      dataLength: 0,
      count: 0,
      update: {
        id: 0,
        isActive: null,
      },
    };
  },
  async created() {
    await this.allComments(this.currentPage);
  },
  methods: {
    // GET
    async allComments(page) {
      try {
        this.currentPage = page;
        const response = await this.$appAxios.get(`/comment/all?page=${page}`);
        this.dataLength = Math.ceil((await response.data.detail.count) / 10);
        this.comments = await response.data.detail.rows;
        this.count = await response.data.detail.count;
      } catch (error) {
        console.log(error);
      }
    },
    // UPDATE
    async updateComment() {
      try {
        const updateComment = {
          id: this.update.id,
          isActive: this.update.isActive == "true" ? true : false,
        };
        const axiosConfig = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("Authorization")}`,
          },
        };
        this.$appAxios
          .put("/admin/update/comment", updateComment, axiosConfig)
          .then((res) => {
            if (res.data.type === "error") {
              this.errorAlert = res.data.msg;
            } else {
              this.successAlert = res.data.msg;
              this.allComments(this.currentPage);
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
    async deleteComment(id) {
      try {
        if (confirm("Bu maglumaty pozmak isleýärsiňizmi?")) {
          const axiosConfig = {
            headers: {
              Authorization: `${localStorage.getItem("Authorization")}`,
            },
          };
          this.$appAxios
            .delete(`/comment/${id}`, axiosConfig)
            .then((res) => {
              if (res.data.type === "error") {
                this.errorAlert = res.data.msg;
              } else {
                this.successAlert = res.data.msg;
                this.allComments(this.currentPage);
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