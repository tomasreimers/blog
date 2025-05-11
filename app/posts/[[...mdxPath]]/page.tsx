import { generateStaticParamsFor, importPage } from 'nextra/pages';

import { useMDXComponents as getMDXComponents } from '../../../mdx-components';

export const generateStaticParams = async () => {
  const params = await generateStaticParamsFor('mdxPath')();
  const post = params.map((param) => {
    if (param.mdxPath[0] === 'posts') {
      return {
        ...param,
        mdxPath: param.mdxPath.slice(1),
      };
    }

    return param;
  });
  return post;
};

export async function generateMetadata(props) {
  const params = await props.params;
  const data = await importPage(['posts', ...params.mdxPath]);

  const { metadata: frontMatter } = data;

  return {
    title: frontMatter?.title,
    description: frontMatter?.description,
    openGraph: {
      images: [
        {
          url: `/social-images/${params.mdxPath}/image.png`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@tomasreimers',
    },
  };
}

const Wrapper = getMDXComponents().wrapper;

export default async function Page(props) {
  const params = await props.params;
  const result = await importPage(['posts', ...params.mdxPath]);
  const { default: MDXContent, toc, metadata } = result;
  return (
    <Wrapper toc={toc} metadata={metadata}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  );
}
