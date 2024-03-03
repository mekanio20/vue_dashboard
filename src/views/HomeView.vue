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
                  <h3 class="card-title">Operasion sistemalar</h3>
                </div>
                <div class="row">
                  <div class="col">
                    <apexchart width="580" type="bar" :options="OpSystem.chartOptions" :series="OpSystem.series">
                    </apexchart>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="card">
              <div class="card-body">
                <div class="d-flex">
                  <h3 class="card-title">Ulanyjylar</h3>
                </div>
                <div class="row">
                  <div class="col">
                    <apexchart width="580" type="area" :options="users.options" :series="users.series"></apexchart>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="page-body">
        <div class="container-xl">
          <div class="row row-cards">
            <div class="col-md-6 col-xl-3">
              <div class="card card-sm">
                <div class="card-body">
                  <div class="row align-items-center">
                    <div class="col-auto">
                      <span class="bg-red-lt avatar"><!-- Download SVG icon from http://tabler-icons.io/i/arrow-down -->
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                          stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                          stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 5l0 14" />
                          <path d="M18 13l-6 6" />
                          <path d="M6 13l6 6" />
                        </svg>
                      </span>
                    </div>
                    <div class="col">
                      <div class="font-weight-medium">
                        342
                        <span class="float-right font-weight-medium text-red">-4.3%</span>
                      </div>
                      <div class="text-secondary">
                        Sales last 30 days
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-xl-3">
              <div class="card card-sm">
                <div class="card-body">
                  <div class="row align-items-center">
                    <div class="col-auto">
                      <span class="bg-green-lt avatar"><!-- Download SVG icon from http://tabler-icons.io/i/arrow-up -->
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                          stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                          stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 5l0 14" />
                          <path d="M18 11l-6 -6" />
                          <path d="M6 11l6 -6" />
                        </svg>
                      </span>
                    </div>
                    <div class="col">
                      <div class="font-weight-medium">
                        132
                        <span class="float-right font-weight-medium text-green">+6.8%</span>
                      </div>
                      <div class="text-secondary">
                        Customers last 30 days
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-xl-3">
              <div class="card card-sm">
                <div class="card-body">
                  <div class="row align-items-center">
                    <div class="col-auto">
                      <span class="bg-red-lt avatar"><!-- Download SVG icon from http://tabler-icons.io/i/arrow-down -->
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                          stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                          stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 5l0 14" />
                          <path d="M18 13l-6 6" />
                          <path d="M6 13l6 6" />
                        </svg>
                      </span>
                    </div>
                    <div class="col">
                      <div class="font-weight-medium">
                        342
                        <span class="float-right font-weight-medium text-red">-4.3%</span>
                      </div>
                      <div class="text-secondary">
                        Sales last 30 days
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-xl-3">
              <div class="card card-sm">
                <div class="card-body">
                  <div class="row align-items-center">
                    <div class="col-auto">
                      <span class="bg-green-lt avatar"><!-- Download SVG icon from http://tabler-icons.io/i/arrow-up -->
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                          stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                          stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 5l0 14" />
                          <path d="M18 11l-6 -6" />
                          <path d="M6 11l6 -6" />
                        </svg>
                      </span>
                    </div>
                    <div class="col">
                      <div class="font-weight-medium">
                        132
                        <span class="float-right font-weight-medium text-green">+6.8%</span>
                      </div>
                      <div class="text-secondary">
                        Customers last 30 days
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-xl mt-3">
        <div class="row">
          <div class="col-lg-14">
            <div class="card">
              <div class="card-body">
                <div class="d-flex">
                  <h3 class="card-title">Girdejiler</h3>
                </div>
                <div class="row">
                  <div class="col">
                    <apexchart width="100%" height="350" type="area" :options="income.options" :series="income.series">
                    </apexchart>
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
import { format } from 'date-fns';
export default {
  name: "Home",
  components: {
    Header,
    Navbar
  },
  data() {
    return {
      // Operasion systemalar
      OpSystem: {
        chartOptions: {
          chart: {
            id: "basic-bar",
            animations: {
              speed: 500
            }
          },
          dataLabels: {
            enabled: false
          },
          plotOptions: {
            bar: {
              distributed: true
            }
          },
          xaxis: {
            categories: []
          }
        },
        series: [{
          name: 'Operation system',
          data: []
        }]
      },
      // Ulanyjylar
      users: {
        options: {
          chart: {
            type: "area"
          },
          dataLabels: {
            enabled: false
          },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.9,
              stops: [0, 90, 100]
            }
          },
          xaxis: {
            type: 'datetime',
            categories: []
          }
        },
        series: [
          {
            name: "Ulanyjy",
            data: []
          }
        ],
      },
      // Girdeji
      income: {
        options: {
          chart: {
            stacked: false,
            height: 350,
            zoom: {
              type: 'x',
              enabled: true,
              autoScaleYaxis: true
            },
            toolbar: {
              autoSelected: 'zoom'
            }
          },
          dataLabels: {
            enabled: false
          },
          markers: {
            size: 0,
          },
          fill: {
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              inverseColors: false,
              opacityFrom: 0.5,
              opacityTo: 0,
              stops: [0, 90, 100]
            },
          },
          yaxis: {
            labels: {
              formatter: function (val) {
                return (val / 1000000).toFixed(0);
              },
            },
            title: {
              text: 'Price'
            },
          },
          xaxis: {
            type: 'datetime',
          },
          tooltip: {
            shared: false,
            y: {
              formatter: function (val) {
                return (val / 1000000).toFixed(0)
              }
            }
          }
        },
        series: [{
          name: 'Giredji',
          data: [
            {
              x: new Date("2024-02-01").getTime(),
              y: 250
            },
            {
              x: new Date("2024-02-02").getTime(),
              y: 500
            },
            {
              x: new Date("2024-02-03").getTime(),
              y: 28
            },
            {
              x: new Date("2024-02-04").getTime(),
              y: 980
            },
            {
              x: new Date("2024-02-04").getTime(),
              y: 990
            },
          ]
        }],
      }
    }
  },
  async created() {
    await this.getDevices()
    await this.userRegisterStatistic()
  },
  methods: {
    async getDevices() {
      try {
        const axiosConfig = {
          headers: {
            Authorization: `${localStorage.getItem("Authorization")}`,
          },
        };
        const response = await this.$appAxios.get("/admin/all/systems", axiosConfig);
        let device = await response.data.detail.map(item => item.device);
        let count = await response.data.detail.map(item => item.count);
        let len = device.length
        for (let i = 0; i < len; i++) {
          this.OpSystem.chartOptions.xaxis.categories[i] = await device[i];
          this.OpSystem.series[0].data[i] = await count[i];
        }
      } catch (error) {
        console.log(error);
      }
    },
    async userRegisterStatistic() {
      try {
        const axiosConfig = {
          headers: {
            Authorization: `${localStorage.getItem("Authorization")}`,
          },
        };
        const response = await this.$appAxios.get("/admin/register/statistic", axiosConfig);
        let userCount = await response.data.detail.map(item => item.userCount);
        let date = await response.data.detail.map(item => item.date);
        let len = date.length
        for (let i = 0; i < len; i++) {
          let _date = format(new Date(date[i]), 'dd MMM');
          this.users.options.xaxis.categories.push(_date);
          this.users.series[0].data.push(userCount[i]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
<style>
@import "@/assets/css/tabler.min.css";
@import "@/assets/css/tabler-flags.min.css";
@import "@/assets/css/tabler-payments.min.css";
@import "@/assets/css/tabler-vendors.min.css";
@import "@/assets/css/demo.min.css";</style>