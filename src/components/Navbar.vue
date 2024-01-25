<template>
  <header class="navbar-expand-md">
    <div class="collapse navbar-collapse" id="navbar-menu">
      <div class="navbar">
        <div class="container-xl">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="/">
                <span class="nav-link-icon d-md-none d-lg-inline-block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                    <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                    <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                  </svg>
                </span>
                <span class="nav-link-title"> Home </span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/login">
                <span class="nav-link-icon d-md-none d-lg-inline-block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-login"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path
                      d="M15 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"
                    ></path>
                    <path d="M21 12h-13l3 -3"></path>
                    <path d="M11 15l-3 -3"></path>
                  </svg>
                </span>
                <span class="nav-link-title"> Login </span>
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#navbar-base"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                role="button"
                aria-expanded="false"
              >
                <span class="nav-link-icon d-md-none d-lg-inline-block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5"></path>
                    <path d="M12 12l8 -4.5"></path>
                    <path d="M12 12l0 9"></path>
                    <path d="M12 12l-8 -4.5"></path>
                    <path d="M16 5.25l-8 4.5"></path>
                  </svg>
                </span>
                <span class="nav-link-title"> Admin </span>
              </a>
              <div class="dropdown-menu">
                <div class="dropdown-menu-columns">
                  <div class="dropdown-menu-column">
                    <a class="dropdown-item" href="/groups">
                      <span class="nav-link-icon d-md-none d-lg-inline-block">
                        <img
                          src="../../public/svg/users-group-svgrepo-com.svg"
                        />
                      </span>
                      <span class="nav-link-title ms-2"> Groups </span>
                    </a>
                    <a class="dropdown-item" href="/permissions">
                      <span class="nav-link-icon d-md-none d-lg-inline-block">
                        <img
                          src="../../public/svg/access-locked-svgrepo-com.svg"
                        />
                      </span>
                      <span class="nav-link-title ms-2"> Permissions </span>
                    </a>
                    <a class="dropdown-item" href="/subscriptions">
                      <span class="nav-link-icon d-md-none d-lg-inline-block">
                        <img src="../../public/svg/magazines-svgrepo-com.svg" />
                      </span>
                      <span class="nav-link-title ms-2"> Subscriptions </span>
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#navbar-base"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                role="button"
                aria-expanded="false"
              >
                <span class="nav-link-icon d-md-none d-lg-inline-block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5"></path>
                    <path d="M12 12l8 -4.5"></path>
                    <path d="M12 12l0 9"></path>
                    <path d="M12 12l-8 -4.5"></path>
                    <path d="M16 5.25l-8 4.5"></path>
                  </svg>
                </span>
                <span class="nav-link-title"> Users </span>
              </a>
              <div class="dropdown-menu">
                <div class="dropdown-menu-columns">
                  <div class="dropdown-menu-column">
                    <a class="dropdown-item" href="/users">
                      <span class="nav-link-icon d-md-none d-lg-inline-block">
                        <img
                          src="../../public/svg/users-group-svgrepo-com.svg"
                        />
                      </span>
                      <span class="nav-link-title ms-2"> Users </span>
                    </a>
                    <a class="dropdown-item" href="/customers">
                      <span class="nav-link-icon d-md-none d-lg-inline-block">
                        <img
                          src="../../public/svg/customer-service-svgrepo-com.svg"
                        />
                      </span>
                      <span class="nav-link-title ms-2"> Customers </span>
                    </a>
                    <a class="dropdown-item" href="/sellers">
                      <span class="nav-link-icon d-md-none d-lg-inline-block">
                        <img src="../../public/svg/seller-svgrepo-com.svg" />
                      </span>
                      <span class="nav-link-title ms-2"> Sellers </span>
                    </a>
                  </div>
                </div>
              </div>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#navbar-base"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                role="button"
                aria-expanded="false"
              >
                <span class="nav-link-icon d-md-none d-lg-inline-block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5"></path>
                    <path d="M12 12l8 -4.5"></path>
                    <path d="M12 12l0 9"></path>
                    <path d="M12 12l-8 -4.5"></path>
                    <path d="M16 5.25l-8 4.5"></path>
                  </svg>
                </span>
                <span class="nav-link-title"> Storages </span>
              </a>
              <div class="dropdown-menu">
                <div class="dropdown-menu-columns">
                  <div class="dropdown-menu-column">
                    <a class="dropdown-item" href="/category">
                      <span class="nav-link-icon d-md-none d-lg-inline-block">
                        <img src="../../public/svg/category-svgrepo-com.svg" />
                      </span>
                      <span class="nav-link-title ms-2"> Categories </span>
                    </a>
                    <a class="dropdown-item" href="/subcategory">
                      <span class="nav-link-icon d-md-none d-lg-inline-block">
                        <img src="../../public/svg/category-svgrepo-com.svg" />
                      </span>
                      <span class="nav-link-title ms-2"> Subcategories </span>
                    </a>
                    <a class="dropdown-item" href="/brands">
                      <span class="nav-link-icon d-md-none d-lg-inline-block">
                        <img
                          src="../../public/svg/brand-dribbble-svgrepo-com.svg"
                        />
                      </span>
                      <span class="nav-link-title ms-2"> Brands </span>
                    </a>
                    <a class="dropdown-item" href="/products">
                      <span class="nav-link-icon d-md-none d-lg-inline-block">
                        <img src="../../public/svg/products-svgrepo-com.svg" />
                      </span>
                      <span class="nav-link-title ms-2"> Products </span>
                    </a>
                    <a class="dropdown-item" href="/comments">
                      <span class="nav-link-icon d-md-none d-lg-inline-block">
                        <img src="../../public/svg/comment-3-svgrepo-com.svg" />
                      </span>
                      <span class="nav-link-title ms-2"> Comments </span>
                    </a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default { name: "Navbar" };
</script>