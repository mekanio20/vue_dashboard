<template>
    <label class="form-label" :class="{ 'required': required !== 'false' }">{{ label }}</label>
    <input type="number" class="form-control" :placeholder="placeholder" min="0"
        @input="$emit('update:modelValue', $event.target.value)" :value="modelValue">
</template>

<script>
export default {
    name: "NumberInput",
    props: {
        modelValue: {
            type: String,
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        required: {
            type: String,
            default: "false"
        }
    },
    emits: ['update:modelValue']
}
</script>