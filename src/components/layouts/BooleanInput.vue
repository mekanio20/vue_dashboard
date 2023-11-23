<template>
    <div class="mb-3">
        <label class="form-check">
            <input class="form-check-input" type="checkbox"
                @input="$emit('update:modelValue', $event.target.value)" :value="modelValue">
            <span class="form-check-label">{{ label }}</span>
        </label>
    </div>
</template>

<script>
export default {
    name: "BooleanInput",
    props: {
        modelValue: {
            type: Boolean,
            default: true
        },
        label: {
            type: String,
            default: ''
        }
    },
    emits: ['update:modelValue']
}
</script>

<style>
@import '@/assets/main.css';
@import '@/assets/css/tabler.min.css';
@import '@/assets/css/tabler-flags.min.css';
@import '@/assets/css/tabler-payments.min.css';
@import '@/assets/css/tabler-vendors.min.css';
@import '@/assets/css/demo.min.css';
</style>