import Vue from 'vue'
import { Breadcrumb, Item } from '../src'
import { expect } from 'chai'
import Router from 'vue-router'
import { toPath } from '../src/util'


describe('vt-breadcrumb', () => {
    it('util toPath', () => {
        expect(toPath({ path: 'https://github.com', query: { q: 'vue-tools' }, hash: '#h1' })).to.equal('https://github.com?q=vue-tools#h1')
        expect(toPath({ path: '/hello', query: { q: 'vue-tools' }, hash: '#h1' })).to.equal('/hello?q=vue-tools#h1')
        expect(toPath({ path: 'hello', query: { q: 'vue-tools' }, hash: '#h1' }, { "pathname": "/search" })).to.equal('/search/hello?q=vue-tools#h1')
        expect(toPath({ path: 'hello', query: { q: 'vue-tools' }, hash: '#h1' }, { "pathname": "/search/" })).to.equal('/search/hello?q=vue-tools#h1')
        expect(toPath({ path: 'hello', query: { q: 'vue-tools' }, hash: '#h1' }, { "pathname": "/search/", search: '?name=breadcrumb' })).to.equal('/search/hello?name=breadcrumb&q=vue-tools#h1')
        expect(toPath({ path: 'hello', query: {} }, { "pathname": "/search/", search: '?name=breadcrumb' })).to.equal('/search/hello?name=breadcrumb')
        expect(toPath({ path: 'hello', query: {} }, { "pathname": "/search/", search: '' })).to.equal('/search/hello')
    })
    it('breadcrumb', () => {
        let vm = new Vue({
            render(h) {
                return (
                    <Breadcrumb separator="/"></Breadcrumb>
                )
            },
            components: {
                Breadcrumb
            }
        }).$mount()

        expect(vm.$el.classList.contains('ui-breadcrumb')).to.equal(true)
    })
    it('breadcrumb item', () => {
        let vm = new Vue({
            render(h) {
                return (
                    <Breadcrumb separator="/">
                        <Item>Home</Item>
                        <Item>Product</Item>
                    </Breadcrumb>
                )
            },
            components: {
                Breadcrumb,
                Item
            }
        }).$mount()
        let items = vm.$el.querySelectorAll('.ui-breadcrumb__item')
        expect(items.length).to.equal(2)
        expect(items[0].querySelector('.ui-breadcrumb__separator').innerHTML).to.equal('/')
    })
    it('breadcrumb item to', () => {
        Vue.use(Router)
        let router = new Router()
        let Ctor = Vue.extend(Item)
        let vm = new Ctor({
            router,
            propsData: {
                to: {
                    path: 'https://github.com/search',
                    query: {
                        q: 'vue-tools'
                    },
                    hash: '#hello'
                }
            }
        }).$mount()
        vm.link()
    })
    it('breadcrumb item replace', () => {
        Vue.use(Router)
        let router = new Router()
        let Ctor = Vue.extend(Item)
        let vm = new Ctor({
            router,
            propsData: {
                replace: true,
                to: {
                    path: 'https://github.com/search',
                    query: {
                        q: 'vue-tools'
                    },
                    hash: '#hello'
                }
            }
        }).$mount()
        vm.link()
    })

    // location cause that the travis page reload, use istanbul ignore it
    /*
    it('breadcrumb item no router', () => {
        let Ctor = Vue.extend(Item)
        let vm = new Ctor({
            propsData: {
                replace: true,
                to: {
                    path: 'https://github.com/search',
                    query: {
                        q: 'vue-tools'
                    },
                    hash: '#hello'
                }
            }
        }).$mount()
        vm.link()
    })
    */
})
