<template>
  <div class="posts">
    <PostComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import PostComponent from '@/components/PostComponent.vue';

export default {
  name: 'posts',
  components: {
    PostComponent,
  },
};
</script>
