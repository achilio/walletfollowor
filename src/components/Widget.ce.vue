<template>

  <div class="w-96 text-gray-900 bg-white border border-gray-200">
    <div class="items-center justify-between px-4 py-3 border-b border-gray-200">
      <h3 class="text-base font-medium">Transactions</h3>
      <h4 class="text-xs">Address: <a :href="`https://www.blockchain.com/explorer/addresses/btc/${address}`" target="_blank">{{ address }}</a></h4>
      <h4 class="text-xs">Network: {{ network }}</h4>
      <h4 class="text-xs">Blockchain: {{ blockchain }}</h4>
    </div>
    <button v-for="tx in computedTransactions" :key="tx.id" @click="openTransaction(tx.id)" type="button" class="inline-flex relative items-center py-2 px-4 w-full text-xs font-medium rounded-t-lg border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 light:border-gray-600 light:hover:bg-gray-600 light:hover:text-white light:focus:ring-gray-500 light:focus:text-white">
      <div class="flex space-x-4">
        <div class="flex-auto">
          {{ tx.fmtId }}
        </div>
        <div class="flex-auto">
          {{ tx.fmtDate }}
        </div>
        <div class="flex-auto">
          {{ tx.value }} BTC
        </div>
      </div>  
    </button>
</div>

</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import moment from "moment";
const props = defineProps({
  address: {
    type: String,
    default: null,
    required: true,
  },
  network: {
    type: String,
    default: null,
    required: true,
  },
  blockchain: {
    type: String,
    default: null,
    required: true,
  },
});

interface Transaction {
  id: string;
  from: string;
  to: string;
  value: number;
  date: Date;
}

const transactions = ref([] as Transaction[]);
const computedTransactions = computed(() => {
  return transactions.value.map((tx) => {
    return {
      ...tx,
      fmtId: tx.id.substring(0, 6) + "-" +  tx.id.substring(tx.id.length - 6, tx.id.length),
      fmtDate: moment(tx.date).format("HH:mm"),
      value: tx.value.toFixed(5),
    };
  }).reverse();
});

// Open transaction in new tab
const openTransaction = (id: string) => {
  window.open(`https://www.blockchain.com/explorer/transactions/btc/${id}`, "_blank");
};

const generateRandomEthereumTransaction = () => {
  const randomFrom =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  const randomTo =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  const randomTransaction = {
    from: randomFrom,
    to: randomTo,
    value: Math.random() * 20,
    date: new Date(),
    id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
  }; 
  // remove first element if array is longer than 10
  transactions.value.length >= 10 && transactions.value.shift();
  transactions.value.push(randomTransaction);
};

// Generate random transactions
const generateRandomTransactions = () => {
  for (let i = 0; i < 10; i++) {
    generateRandomEthereumTransaction();
  }
};
// Initialize with random transactions
generateRandomTransactions();
// Generate new random transactions every second
setInterval(() => {
  generateRandomEthereumTransaction();
}, 1000);
</script>

<style>
@import "../style.css";

* {
  font-family: "Courier New", Courier, monospace;
}
</style>
