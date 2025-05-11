// throws TypeError: Cannot read properties of null (reading 'useMemo')
'use no memo';

/* eslint sort-keys: error */
import { Link } from 'next-view-transitions';
import {
  Callout,
  Code,
  Details,
  Pre,
  Summary,
  Table,
  withGitHubAlert,
  withIcons,
} from 'nextra/components';
import {
  type MDXComponents,
  useMDXComponents as getNextraMDXComponents,
} from 'nextra/mdx-components';
import type { ComponentProps, FC } from 'react';

import { Meta } from './components/meta';

const createHeading = (
  Tag: `h${2 | 3 | 4 | 5 | 6}`
): FC<ComponentProps<typeof Tag>> =>
  function HeadingLink({ children, id, className, ...props }) {
    return (
      <Tag
        id={id}
        // can be added by footnotes
        className={className === 'sr-only' ? 'sr-only' : ''}
        {...props}
      >
        {children}
        {id && (
          <a
            href={`#${id}`}
            className="not-prose subheading-anchor"
            aria-label="Permalink for this section"
          />
        )}
      </Tag>
    );
  };
const CALLOUT_TYPE = Object.freeze({
  caution: 'error',
  note: 'info',
  tip: 'default',
  warning: 'warning',
});
const Blockquote = withGitHubAlert(({ type, ...props }) => (
  <Callout type={CALLOUT_TYPE[type]} {...props} />
));

type BlogMDXComponents = MDXComponents;

const DEFAULT_COMPONENTS = getNextraMDXComponents({
  blockquote: Blockquote,
  code: Code,
  details: Details,
  h2: createHeading('h2'),
  h3: createHeading('h3'),
  h4: createHeading('h4'),
  h5: createHeading('h5'),
  h6: createHeading('h6'),
  pre: withIcons(Pre),
  summary: Summary,
  table: Table,
  td: Table.Td,
  th: Table.Th,
  tr: Table.Tr,
});

export const useMDXComponents = <T extends BlogMDXComponents>(
  components?: T
) => {
  return {
    ...DEFAULT_COMPONENTS,
    wrapper({ children, metadata }) {
      const hasTags = metadata.tags?.length > 0;

      return (
        <>
          <div className="not-prose uppercase text-xs font-bold">
            <Link
              className="transition-colors no-underline font-bold text-gray-500 hover:text-gray-900 dark:text-gray-400 hover:dark:text-white"
              href="/"
            >
              All posts
            </Link>
            {hasTags && (
              <>
                <span className="text-gray-400 dark:text-gray-500 inline-block mx-1">
                  &rsaquo;
                </span>
                {metadata.tags?.map((t) => (
                  <Link
                    key={t}
                    href={`/tags/${t}`}
                    className="transition-colors no-underline font-bold text-gray-500 hover:text-gray-900 dark:text-gray-400 hover:dark:text-white"
                  >
                    {t}
                  </Link>
                ))}
              </>
            )}
          </div>
          <h1 className="mt-4">{metadata.title}</h1>
          <Meta {...metadata} />
          {children}
        </>
      );
    },
    ...components,
  };
};
