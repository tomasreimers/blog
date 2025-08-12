import { DateTime } from 'luxon';
import { default as Image } from 'next/image';
import type { FC } from 'react';

import Tomas from '../public/images/people/tomas.jpg';

export const Meta: FC<{ date: string }> = ({ date }) => {
  const dateObj = date && DateTime.fromFormat(date, 'yyyy-MM-dd');

  if (dateObj && !dateObj.isValid) {
    throw new Error(
      `Invalid date "${date}": ${dateObj.invalidReason}.`
    );
  }

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
        <time dateTime={dateObj.toJSDate().toISOString()} className="text-sm">
          {new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }).format(dateObj.toJSDate())}
        </time>
      )}
    </div>
  );
};
