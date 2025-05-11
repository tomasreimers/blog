import { default as Image } from 'next/image';
import type { FC } from 'react';

import Tomas from '../public/images/people/tomas.jpg';
import { isValidDate } from './is-valid-date';

export const Meta: FC<{ date: string }> = ({ date }) => {
  if (date && !isValidDate(date)) {
    throw new Error(
      `Invalid date "${date}". Provide date in "YYYY/M/D", "YYYY/M/D H:m", "YYYY-MM-DD", "[YYYY-MM-DD]T[HH:mm]" or "[YYYY-MM-DD]T[HH:mm:ss.SSS]Z" format.`
    );
  }

  const dateObj = date && new Date(date);

  return (
    <div className="not-prose mt-2 flex items-center border-b pb-2 border-gray-200 dark:border-gray-700">
      <a
        href="https://twitter.com/tomasreimers"
        target="_blank"
        className="flex items-center group"
      >
        <Image
          className="w-8 rounded-full mr-2! my-1"
          alt="Tomas Reimers"
          src={Tomas}
        />
        <div className="text-sm transition-colors group-hover:text-gray-900 group-hover:dark:text-white">
          Tomas Reimers
        </div>
      </a>
      <div className="flex grow" />
      {dateObj && (
        <time dateTime={dateObj.toISOString()} className="text-sm">
          {new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }).format(dateObj)}
        </time>
      )}
    </div>
  );
};
