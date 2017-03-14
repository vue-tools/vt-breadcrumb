<style src="./style.css"></style>
<template>
    <div class="ui-breadcrumb">
        <slot></slot>
    </div>
</template>
<script>
    import Vue from 'vue'
    export default {
        props: {
            separator: {
                type: String,
                default: '/'
            },
        },
        components: {
        }
    }
</script>
