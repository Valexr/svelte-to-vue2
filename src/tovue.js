import Vue from "vue"
import createSlots from './slots'
// const replaceContainer = function (Component, options) {
//     const frag = document.createDocumentFragment();
//     const component = new Component(Object.assign({}, options, { target: frag }));

//     options.target.replaceWith(frag);

//     return component;
// };

function replaceTarget(Component, target, props, slots) {
    // let text = document.createTextNode('data')
    const component = new Component({
        target: target.parentElement,
        props: {
            // $$slots: { default: slots },
            // $$scope: {},
            ...props,
        },
        anchor: target,
        // $$slots: {
        //     default: target.innerHTML,
        //     // foo: someOtherDomNodeOrFragment
        // }
    })
    console.log(Component, target, props, slots)
    target.remove()
    return component
}

export default (Component, style = {}, tag = "span") =>
    Vue.component("vue-svelte-adaptor", {
        render(createElement) {
            return createElement(tag, {
                ref: "container",
                props: this.$attrs,
                style
            })
        },
        data() {
            return {
                comp: null
            }
        },
        mounted() {
            // this.comp = new Component({
            //     target: this.$refs.container,
            //     props: this.$attrs,
            //     $$slots: {
            //         default: 'button',
            //         // foo: someOtherDomNodeOrFragment
            //     }
            // });

            this.comp = replaceTarget(Component, this.$refs.container, this.$attrs, this)

            let watchers = []

            for (const key in this.$listeners) {
                this.comp.$on(key, this.$listeners[key])
                const watchRe = /watch:([^]+)/

                const watchMatch = key.match(watchRe)

                if (watchMatch && typeof this.$listeners[key] === "function") {
                    watchers.push([
                        `${watchMatch[1][0].toLowerCase()}${watchMatch[1].slice(1)}`,
                        this.$listeners[key]
                    ])
                }
            }

            if (watchers.length) {
                let comp = this.comp
                const update = this.comp.$$.update
                this.comp.$$.update = function () {
                    watchers.forEach(([name, callback]) => {
                        const index = comp.$$.props[name]
                        callback(comp.$$.ctx[index])
                    })
                    update.apply(null, arguments)
                }
            }
        },
        updated() {
            this.comp.$set(this.$attrs)
        },
        destroyed() {
            this.comp.$destroy()
        }
    })