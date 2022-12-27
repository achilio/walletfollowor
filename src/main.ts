import { defineCustomElement } from 'vue';
import widget from './components/Widget.ce.vue';

const myWidget = defineCustomElement(widget);

customElements.define('wallet-followor', myWidget);
