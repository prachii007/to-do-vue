<script setup>

</script>

<template>
  <div class="">
    <div>
      <router-link :to="{ name: 'home' }">Home</router-link> |
      <router-link :to="{ name: 'add' }">Add Task</router-link>|
      <router-link to="/non-existent-path">Broken Link</router-link>
    </div>
    <div>
      <router-view />
    </div>
  </div>

</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
