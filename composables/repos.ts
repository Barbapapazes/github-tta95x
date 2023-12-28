import myzod from 'myzod';

export async function fetchRepoBySlug(slug: string) {
  const data = await $fetch(`/repositories/${slug}`, {
    baseURL: 'https://unjs-metrics-api.barbapapazes.dev',
  });

  const validatedData = myzod
    .object({
      data: myzod.object({
        name: myzod.string(),
        npmName: myzod.string().or(myzod.null()),
        stars: myzod.object({
          current: myzod.object({
            value: myzod.number(),
            fetchedAt: myzod.string(),
          }),
          previous: myzod.object({
            value: myzod.number(),
            fetchedAt: myzod.string(),
          }),
        }),
        downloads: myzod.object({
          current: myzod.object({
            value: myzod.number(),
            start: myzod.string(),
            end: myzod.string(),
          }),
          previous: myzod.object({
            value: myzod.number(),
            start: myzod.string(),
            end: myzod.string(),
          }),
        }),
        starsMetrics: myzod.array(
          myzod.object({
            value: myzod.number(),
            fetchedAt: myzod.string(),
          })
        ),
        downloadsMetrics: myzod.array(
          myzod.object({
            value: myzod.number(),
            fetchedAt: myzod.string(),
          })
        ),
      }),
    })
    .parse(data);

  return validatedData;
}
