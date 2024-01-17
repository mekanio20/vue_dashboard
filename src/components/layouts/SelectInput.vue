<template>
    <div>
        <label class="form-label" :class="{ 'required': required !== 'false' }">{{ label }}</label>
        <select class="form-select" @input="$emit('update:modelValue', $event.target.value)" :value="modelValue">
            <option v-for="item in options" :key="item" :value="item">{{ item }}</option>
        </select>
    </div>
</template>

<script>
export default {
    name: "SelectInput",
    props: {
        modelValue: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        required: {
            type: String,
            default: 'false'
        },
        options: {
            type: Array,
            default: []
        }
    },
    emits: ['update:modelValue']
}
</script>