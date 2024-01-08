<template>
    <div class="card-footer d-flex align-items-center">
        <ul class="pagination m-0 ms-auto">
            <li class="page-item">
                <button class="btn" :class="[this.currentPage == 1 ? 'disabled' : '']"
                    @click="setPage(Number(this.currentPage) - 1)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                        stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M15 6l-6 6l6 6" />
                    </svg>
                </button>
            </li>
            <li v-for="page in pages" :key="page" class="page-item">
                <button class="btn" :class="[page == '...' ? 'disabled' : '',
                page == this.currentPage ? 'active' : '']" @click="setPage(page)">
                    {{ page }}
                </button>
            </li>
            <li class="page-item">
                <button class="btn" :class="[this.currentPage == this.dataLength ? 'disabled' : '']"
                    @click="setPage(Number(this.currentPage) + 1)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                        stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M9 6l6 6l-6 6" />
                    </svg>
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "Paginator",
    props: {
        dataLength: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            pages: [],
            currentPage: 1
        }
    },
    methods: {
        async getPages() {
            try {
                this.pages = []
                if (this.currentPage <= 5) {
                    if (Number(this.dataLength) <= 7) {
                        for (let i = 1; i <= Number(this.dataLength); i++) { this.pages.push(String(i)) }
                    } else {
                        for (let i = 1; i <= 5; i++) { this.pages.push(String(i)) }
                        this.pages.push('...')
                        this.pages.push(String(this.dataLength))
                    }
                } else if (this.currentPage > 5 && this.currentPage < Number(this.dataLength) - 4) {
                    this.pages.push('1')
                    this.pages.push('...')
                    this.pages.push(String(Number(this.currentPage) - 1))
                    this.pages.push(String(this.currentPage))
                    this.pages.push(String(Number(this.currentPage) + 1))
                    this.pages.push('...')
                    this.pages.push(String(this.dataLength))
                } else {
                    this.pages.push('1')
                    this.pages.push('...')
                    for (let i = Number(this.dataLength) - 4; i <= Number(this.dataLength); i++) {
                        this.pages.push(String(i))
                    }
                }
            } catch (error) {
                console.log(error)
            }
        },
        async setPage(pageItem) {
            this.currentPage = pageItem
            this.$emit('setPageItem', pageItem)
            this.getPages()
        }
    },
    emits: ['setPageItem']
}
</script>