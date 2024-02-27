<template>
  <div>
    <Header />
    <Navbar />
    <div class="page-header d-print-none mt-3">
      <div class="container-xl">
        <div class="row g-2 align-items-center">
          <div class="col">
            <h2 class="page-title">
              Home
            </h2>
          </div>
        </div>
      </div>
    </div>
    <div class="page-body">
      <div class="container-xl">
        <div class="row row-cards">
          <div class="col-lg-6">
            <div class="card">
              <div class="card-body">
                <div class="d-flex">
                  <h3 class="card-title">Ulanyjylar</h3>
                </div>
                <div class="row">
                  <div class="col">
                    <apexchart width="580" type="line" :options="users.options" :series="users.series"></apexchart>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="card">
              <div class="card-body">
                <div class="d-flex">
                  <h3 class="card-title">Girdejiler</h3>
                </div>
                <div class="row">
                  <div class="col">
                    <apexchart width="580" type="bar" :options="income.options" :series="income.series"></apexchart>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Navbar from "@/components/Navbar.vue";
export default {
  name: "Home",
  components: {
    Header,
    Navbar
  },
  data() {
    return {
      users: {
        options: {
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
          }
        },
        series: [{
          name: 'series-1',
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }]
      },
      income: {
        options: {
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
          }
        },
        series: [{
          name: 'series-2',
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }]
      }
    }
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