import { ImageResponse } from '@vercel/og';
import fs from 'fs';
import { generateStaticParamsFor, importPage } from 'nextra/pages';
import path from 'path';

const fontData = fs.readFileSync(
  path.join(process.cwd(), './assets/fonts/Inter/Inter-Black.ttf')
);

const tomasImage = fs.readFileSync(
  path.join(process.cwd(), './public/images/people/tomas.jpg')
);
const tomasDataURL =
  'data:image/jpeg;base64,' + new Buffer(tomasImage).toString('base64');

export const generateStaticParams = async () => {
  const params = await generateStaticParamsFor('mdxPath')();
  const post = params.map((param) => {
    const mdxPath = param.mdxPath as string[];

    return {
      ...param,
      mdxPath:
        mdxPath[0] === 'posts'
          ? [...mdxPath.slice(1), 'image.png']
          : [...mdxPath, 'image.png'],
    };
  });
  return post;
};

export async function GET(
  _: Request,
  { params: { mdxPath } }: { params: { mdxPath: string[] } }
) {
  const realPath =
    mdxPath.at(-1) === 'image.png'
      ? mdxPath.slice(0, mdxPath.length - 1)
      : mdxPath;
  const result = await importPage(['posts', ...realPath]);
  const { metadata } = result;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '32px',
        }}
      >
        <div
          style={{
            fontSize: 72,
            color: 'black',
            fontWeight: 900,
            marginBottom: 32,
            fontFamily: '"Inter"',
            boxSizing: 'border-box',
          }}
        >
          {metadata.title}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              marginRight: 16,
            }}
            src={tomasDataURL}
          />
          <div style={{ fontSize: 32, color: '#6a7282' }}>Tomas Reimers</div>
        </div>
      </div>
    ),
    {
      width: 800,
      height: 418,
      fonts: [
        {
          name: 'Inter',
          data: fontData,
          style: 'normal',
          weight: 900,
        },
      ],
    }
  );
}
