<template>
    <div>
        <Header />
        <Navbar />
    </div>
</template>

<script>
    import Header from '@/components/Header.vue'
    import Navbar from '@/components/Navbar.vue'
    export default {
        name: "Home",
        components: {
            Header,
            Navbar
        },
        data() {
            return {
                
            }
        }
    }
</script>

<style>
@import '@/assets/css/tabler.min.css';
@import '@/assets/css/tabler-flags.min.css';
@import '@/assets/css/tabler-payments.min.css';
@import '@/assets/css/tabler-vendors.min.css';
@import '@/assets/css/demo.min.css';
</style>