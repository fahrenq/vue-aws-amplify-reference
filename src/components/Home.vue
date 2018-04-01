<template>
  <div>
    <h1>Home page</h1>
    <span v-if="$user">
      You're authenticated as {{ $user.attributes.name || $user.attributes.email }}.
    </span>
    <span v-else>You're not authenticated.</span>
  </div>
</template>

<script>
export default {
};
</script>

