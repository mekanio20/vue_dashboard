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
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Quantity</th>
                  <th>Org price</th>
                  <th>Sale price</th>
                  <th>Subcategory</th>
                  <th>Brand</th>
                  <th>Seller</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in products" :key="item.id">
                  <td>#{{ item.id }}</td>
                  <td>{{ item.tm_name }}</td>
                  <td>{{ item.gender }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>{{ item.org_price }}</td>
                  <td>{{ item.sale_price }}</td>
                  <td>{{ item.subcategory?.tm_name || "null" }}</td>
                  <td>{{ item.brand?.tm_name || "null" }}</td>
                  <td>{{ item.seller?.name }}</td>
                  <td>{{ item.rating }}</td>
                  <td>{{ item.comment }}</td>
                  <td>
                    <a href="#update" class="btn btn-blue">Edit </a>
                  </td>
                  <td>
                    <button class="btn btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Paginator
            :dataLength="dataLength"
            @setPageItem="allProducts"
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
import Alert from "@/components/Alert.vue";
export default {
  name: "Products",
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
      products: null,
      errorAlert: null,
      successAlert: null,
      currentPage: 1,
      dataLength: 0,
      count: 0,
    };
  },
  async created() {
    await this.allProducts(this.currentPage);
  },
  methods: {
    // GET
    async allProducts(page) {
      try {
        this.currentPage = page;
        const response = await this.$appAxios.get(`/product/all?page=${page}`);
        this.dataLength = Math.ceil((await response.data.detail.count) / 10);
        this.products = await response.data.detail.rows;
        this.count = await response.data.detail.count;
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