<template>
    <div class="card-footer d-flex align-items-center">
        <div class="pagination m-0 ms-auto" v-if="pages.length < 5 && pages.length > 0">
            <button class="btn prev" v-if="current_page != first_page"
                @click="set_page(current_page - 1)">
                <svg class="mx-auto" width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 11L1 6L6 1" stroke="#253858" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
            <button class="btn"
                :class="[current_page == page ? 'rounded-lg border border-solid border-ml-border bg-ml-main text-white' : '', '']"
                v-for="(page, index) in pages" :key="index" @click="set_page(page)">{{ page }}</button>
            <button class="btn next" v-if="current_page != last_page"
                @click="set_page(current_page + 1)">
                <svg class="mx-auto" width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6 6L1 11" stroke="#253858" stroke-linecap="round" stroke-linejoin="round" />
                </svg></button>
        </div>
        <div class="pagination m-0 ms-auto" v-else>
            <button class="btn prev" v-if="current_page != first_page"
                @click="set_page(current_page - 1)">
                <svg class="mx-auto" width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 11L1 6L6 1" stroke="#253858" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
            <button class="btn" disabled v-show="current_page > 2">...</button>
            <button class="btn"
                :class="[current_page == page_1 ? 'rounded-lg border border-solid border-ml-border bg-ml-main text-white' : '', '']"
                @click="set_page(page_1)">{{ page_1 }}</button>
            <button class="btn"
                :class="[current_page == page_2 ? 'rounded-lg border border-solid border-ml-border bg-ml-main text-white' : '', '']"
                @click="set_page(page_2)">{{ page_2 }}</button>
            <button class="btn"
                :class="[current_page == page_3 ? 'rounded-lg border border-solid border-ml-border bg-ml-main text-white' : '', '']"
                @click="set_page(page_3)">{{ page_3 }}</button>
            <button class="btn" disabled v-show="current_page < pages.length">...</button>
            <button class="btn next" v-if="current_page != last_page"
                @click="set_page(current_page + 1)">
                <svg class="mx-auto" width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6 6L1 11" stroke="#253858" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
    dataLength: {
        type: Number,
        default: 0
    },
    itemsPerPage: {
        type: Number,
        default: 0
    },
    alignment: {
        type: String,
        default: 'left'
    }
})
const emit = defineEmits(['get-page'])


const pages = ref([])
const first_page = ref(0)
const last_page = ref(0)
const current_page = ref(0)
const page_1 = ref(1)
const page_2 = ref(2)
const page_3 = ref(3)


const get_number_of_pages = () => {
    let number_of_pages = Math.ceil(props.dataLength / props.itemsPerPage)

    for (let i = 1; i <= number_of_pages; i++) {
        pages.value.push(i)
    }

    current_page.value = pages.value[0]
    first_page.value = pages.value[0]
    last_page.value = pages.value.length

}
const updateVisiblePages = (increment) => {
  const delta = increment ? 1 : -1;
  page_1.value += delta;
  page_2.value += delta;
  page_3.value += delta;
};

const set_page = (page) => {
    let action
    if (page == page_1.value && page > 1) {
        updateVisiblePages(false);

    }
    if (page == page_3.value && page < pages.value.length) {
        updateVisiblePages(true);

    }

    if (current_page.value < page){
        action = 'next'
    }
    else if (current_page.value == page){
        action = 'same'
    }
    else{
        action = 'prev'
    }
    current_page.value = page

    emit('get-page', {page: current_page.value, action: action})
}

get_number_of_pages()

</script>