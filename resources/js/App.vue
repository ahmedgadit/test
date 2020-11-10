<template>
  <div>
    <Navbar></Navbar>
    <main class="py-4">
      <router-view />
    </main>
  </div>
</template>
<script>
  import Navbar from './components/navbar'
  export default {
      components: {
          Navbar,
      },
  }
</script>
