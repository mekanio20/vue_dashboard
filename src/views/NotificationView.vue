<template>
  <div>
    <Header />
    <Navbar />
    <div class="container-xl mt-3 mb-6">
      <Alert v-if="errorAlert || successAlert" :errorAlert="errorAlert" :successAlert="successAlert" />
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
                  <th>Receivers</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>UserId</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in notifications" :key="item.id">
                  <td>#{{ item.id }}</td>
                  <td>{{ item.receivers }}</td>
                  <td>{{ item.title }}</td>
                  <td>{{ item.status }}</td>
                  <td>{{ item.userId }}</td>
                  <td>
                    <a href="#update" class="btn btn-blue" @click="
                      (update.id = item.id),
                      (update.status = item.status)
                      ">Edit
                    </a>
                  </td>
                  <td>
                    <button class="btn btn-danger" @click="deleteNotification(item.id)">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Paginator :dataLength="dataLength" @setPageItem="allNotifications" :count="count" />
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <div class="col-lg-4" style="margin-right: 30px">
          <div class="row row-cards">
            <form @submit.prevent="addNotification" class="card">
              <div class="card-header">
                <h2 class="card-title">Add Notifications</h2>
              </div>
              <div class="card-body">
                <div class="mb-3">
                  <TextInput label="Title" placeholder="title" v-model="post.title" required="true">
                  </TextInput>
                </div>
                <div class="mb-3">
                  <TextInput label="Description" placeholder="desc" v-model="post.desc" required="true">
                  </TextInput>
                </div>
                <div class="mb-3">
                  <SelectInput label="Type" v-model="post.status" required="true" :options="[
                    'on-wait',
                    'sent'
                  ]" />
                </div>
              </div>
              <FormButton />
            </form>
          </div>
        </div>
        <div id="update" class="col-lg-4">
          <div class="row row-cards">
            <form @submit.prevent="updateNotification" class="card">
              <div class="card-header">
                <h3 class="card-title">Update Notification</h3>
              </div>
              <div class="card-body">
                <div class="row row-cards">
                  <div class="mb-3 col-sm-8 col-md-8">
                    <SelectInput label="Status" v-model="update.status" required="false" :options="[
                      'on-wait',
                      'sent'
                    ]" />
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
      notifications: null,
      successAlert: null,
      errorAlert: null,
      currentPage: 1,
      dataLength: 0,
      count: 0,
      post: {
        title: null,
        desc: null,
        status: null
      },
      update: {
        id: 0,
        status: null
      }
    };
  },
  async created() {
    this.allNotifications(this.currentPage);
  },
  methods: {
    // GET
    async allNotifications(page) {
      try {
        this.currentPage = page;
        const axiosConfig = {
          headers: {
            Authorization: `${localStorage.getItem("Authorization")}`,
          },
        };
        const response = await this.$appAxios.get(
          `/notification/all?page=${page}`,
          axiosConfig
        );
        this.dataLength = Math.ceil((await response.data.detail.count) / 10);
        this.notifications = await response.data.detail.rows;
        this.count = await response.data.detail.count;
      } catch (error) {
        console.log(error);
      }
    },
    // POST
    async addNotification() {
      try {
        const postData = {
          receivers: this.receivers,
          title: this.title,
          desc: this.desc
        }
        const axiosConfig = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("Authorization")}`,
          },
        };
        this.$appAxios
          .post("/notification/add", postData, axiosConfig)
          .then((res) => {
            if (res.data.type === "error") {
              this.errorAlert = res.data.msg;
            } else {
              this.successAlert = res.data.msg;
              this.allNotificationss(this.currentPage);
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
    // UPDATE
    async updateNotification() {
      try {
        const updateData = {
          id: this.update.id,
          status: this.update.status
        };
        const axiosConfig = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("Authorization")}`,
          },
        };
        this.$appAxios
          .put("/notification/update", updateData, axiosConfig)
          .then((res) => {
            if (res.data.type === "error") {
              this.errorAlert = res.data.msg;
            } else {
              this.successAlert = res.data.msg;
              this.allNotifications(this.currentPage);
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
    async deleteNotification(id) {
      try {
        if (confirm("Bu maglumaty pozmak isleýärsiňizmi?")) {
          const axiosConfig = {
            headers: {
              Authorization: `${localStorage.getItem("Authorization")}`,
            },
          };
          this.$appAxios
            .delete(`/notification/${id}`, axiosConfig)
            .then((res) => {
              if (res.data.type === "error") {
                this.errorAlert = res.data.msg;
              } else {
                this.successAlert = res.data.msg;
                this.allNotifications(this.currentPage);
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