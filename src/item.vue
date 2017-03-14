<style src="./style.css"></style>
<template>
    <div class="ui-breadcrumb__item">
        <span @click="link" class="ui-breadcrumb__inner" :class="{'ui-breadcrumb__link': this.to}" ref="link"><slot></slot></span><span
            class="ui-breadcrumb__separator">{{separator}}</span>
    </div>
</template>
<script>
    import { toPath } from './util'
    export default {
        props: {
            to: Object,
            replace: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                separator: this.$parent ? this.$parent.separator : '/'
            }
        },
        methods: {
            link() {
                if (this.to) {
                    if (this.$router) {
                        if (this.replace) {
                            this.$router.replace(this.to)
                        } else {
                            this.$router.push(this.to)
                        }
                     /* istanbul ignore else */
                    } else {
                        window.location.href = toPath(this.to, window.location)
                    }
                }
            }
        }
    }

</script>