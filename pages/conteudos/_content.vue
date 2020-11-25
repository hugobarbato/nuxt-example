<template>
  <article class="container">
    <h1>{{ page.title }}</h1>
    <nuxt-content :document="page" />
  </article>
</template>

<script>
export default {
  async asyncData ({ $content, params }) {
    let content = params.content ?? 'lista';
    const page = await $content(content).fetch()

    return {
      page
    }
  }
}
</script>