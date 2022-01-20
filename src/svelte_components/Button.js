// import toVue from "svelte-adapter/vue";
import toVue from "../tovue"
// import { Button } from "svelte-spectre";
import { Button } from "../svelte-spectre/components/Button"
export default toVue(Button, {}, "div")