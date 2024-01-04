<!-- <template>
    <div class="row">
        <div v-if="successAlert" class="alert alert-success" :class="{ 'block': successAlert }" role="alert">{{ successAlert }}</div>
        <div v-if="errorAlert" class="alert alert-danger" :class="{ 'block': errorAlert }" role="alert">{{ errorAlert }} </div>
    </div>
</template>

<script>
export default {
    name: "Warning",
    props: {
        successAlert: {
            type: String,
            default: null
        },
        errorAlert: {
            type: String,
            default: null
        }
    },
    methods: {
        async autoClick() {
            
        },
        async successMessage(msg) {
            this.successAlert = msg
            setTimeout(() => {
                this.successAlert = null
            }, 3000)
        },
        async errorMessage(msg) {
            this.errorAlert = msg
            setTimeout(() => {
                this.errorAlert = null
            }, 3000)
        }
    }
}
</script> -->