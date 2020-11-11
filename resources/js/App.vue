<template>
  <div>
    <Navbar v-if="$route.name != 'mainpage'"></Navbar>
    <main class="py-4">
      <router-view />
    </main>
    <notifications group="foo"  position="bottom right"></notifications>
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
