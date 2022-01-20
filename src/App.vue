<template>
    <div id="app" class="spectre">
        <img alt="Vue logo" src="./assets/logo.png" />
        <HelloWorld msg="Hello Vue 2 + Vite" :count="count" />
        <SpectreButton @click="click" variant="primary" label="SpectreButton" badge="badge" />
        <!-- <span>SpectreButton</span> -->
        <!-- </SpectreButton> -->
    </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue"
// import { Button } from "svelte-spectre"
// import toVue from "svelte-adapter/vue";
import SpectreButton from "./svelte_components/Button"
// import { createSlot } from './slot'


export default {
    components: {
        HelloWorld,
        SpectreButton,
    },
    methods: {
        click: (e) => (console.log('click SpectreButton', e))
    }
}

// let text = document.createTextNode('data')

// // const click = (e) => console.log('click', e);
// const button = new Button({
//     // slots: createSlots({
//     //     default: Button
//     // })
//     target: document.querySelector('#app'),
//     props: {
//         $$scope: {},
//         // $$slots: { default: [text] }
//         $$slots: createSlot({ default: [text] })
//     }
// })

// console.log(SpectreButton, Button, button)
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>