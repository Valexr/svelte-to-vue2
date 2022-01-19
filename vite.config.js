const { createVuePlugin } = require('vite-plugin-vue2');
const { svelte } = require('@sveltejs/vite-plugin-svelte');

module.exports = {
  plugins: [createVuePlugin(), svelte()],
  server: {
    port: 2020,
  },
};
