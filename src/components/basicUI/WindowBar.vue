<template>
    <div class="basic-windowBar row">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name:'WindowBar'
}
</script>
<style scoped>
.basic-windowBar{
    background: #303336;
    flex-wrap: wrap;
    min-height: 20px;
    border: 0.5px solid #43444c;
}
</style>