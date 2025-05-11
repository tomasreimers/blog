import { Link } from 'next-view-transitions';
import type { FC } from 'react';

type PostCardProps = {
  post: {
    route: string;
    frontMatter: {
      description?: string;
      date?: string;
      title?: string;
    };
  };
  readMore?: string;
};

export const PostCard: FC<PostCardProps> = ({
  post,
  readMore = 'Read More →',
}) => {
  const { description, title } = post.frontMatter;
  return (
    <div key={post.route}>
      <h2 className="mt-8 mb-2 text-xl font-semibold">
        <Link href={post.route} className="no-underline!">
          {title}
        </Link>
      </h2>
      {description && (
        <p className="mb-2 dark:text-gray-400 text-gray-600">
          {description}
          {readMore && (
            <Link href={post.route} className="ml-2">
              {readMore}
            </Link>
          )}
        </p>
      )}
    </div>
  );
};
