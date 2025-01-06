import nextra from 'nextra'
import path from "path";
import process from "process";

import { wordCountPlugin } from './plugins/word_count.mjs'

const __dirname = import.meta.dirname || "";

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  search: {
    codeblocks: false
  },
  mdxOptions: {
    remarkPlugins: [wordCountPlugin]
  }
})

export default withNextra({
  output: "export",
  distDir: 'dist',
  images: {
    unoptimized: true
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
})
