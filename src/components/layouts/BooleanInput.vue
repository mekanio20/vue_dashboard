<template>
    <label class="form-check">
        <input class="form-check-input" type="checkbox" @change="$emit('update:modelValue', $event.target.checked)"
            :checked="modelValue">
        <span class="form-check-label">{{ label }}</span>
    </label>
</template>

<script>
export default {
    name: "BooleanInput",
    props: {
        modelValue: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: ''
        }
    },
    emits: ['update:modelValue']
}
</script>