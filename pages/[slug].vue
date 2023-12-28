<script lang="ts" setup>
const route = useRoute();
const slug = route.params.slug as string;
const { data: repo, error } = await useAsyncData(slug, () =>
  fetchRepoBySlug(slug)
);

if (error.value) {
  // TODO: it's strange, why this happens?
  if (error.value.statusCode === 404) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Repository not found',
      fatal: true,
    });
  }
}
</script>

<template>
  {{ repo }}
</template>
