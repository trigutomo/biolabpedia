import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pillars = [
  'kenali-alat',
  'panduan-penggunaan',
  'bahan-habis-pakai',
  'perawatan-keselamatan',
  'teknik-dasar',
  'pemecahan-masalah',
] as const;

export const PILLAR_LIST = [
  { id: 'kenali-alat', label: 'Kenali alat laboratorium', short: 'Alat' },
  { id: 'panduan-penggunaan', label: 'Panduan penggunaan', short: 'Panduan' },
  { id: 'bahan-habis-pakai', label: 'Memilih dan memahami bahan habis pakai', short: 'Bahan habis pakai' },
  { id: 'perawatan-keselamatan', label: 'Perawatan, penyimpanan, dan keselamatan', short: 'Perawatan & keselamatan' },
  { id: 'teknik-dasar', label: 'Teknik dasar laboratorium', short: 'Teknik dasar' },
  { id: 'pemecahan-masalah', label: 'Pemecahan masalah dan kesalahan umum', short: 'Masalah umum' },
] as const;

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pillar: z.enum(pillars),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    author: z.string().default('Redaksi Biolabpedia'),
    readingTime: z.number().int().positive().optional(),
    sources: z
      .array(
        z.object({
          label: z.string(),
          url: z.string().url().optional(),
        }),
      )
      .default([]),
  }),
});

export const collections = { articles };
