
<template>
  <div class="widget">
    <h1>Widget</h1>
    <h2>Address {{ address }}</h2>
    <p>Last transaction</p>
    <p>From: {{ transaction.from }}</p>
    <p>To: {{ transaction.to }}</p>
    <p>Value: {{ transaction.value }}</p>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';
const props = defineProps({
  address: {
    type: String,
    default: null,
    required: true,
  },
});

interface Transaction {
  from: string;
  to: string;
  value: number;
}

const transaction = ref({} as Transaction);

const generateRandomEthereumTransaction = () => {
  const randomFrom = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const randomTo = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const randomTransaction = {
    from: randomFrom,
    to: randomTo,
    value: Math.floor(Math.random() * 1000000000000000000),
  };
  transaction.value = randomTransaction;
};

setInterval(generateRandomEthereumTransaction, 1000);

</script>

<style scoped>
.widget {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px;
}
</style>