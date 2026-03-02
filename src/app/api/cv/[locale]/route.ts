import fs from 'fs';
import path from 'path';

import CVDocument from '@/components/cv/CVDocument';
import { i18nConfig, initTranslations } from '@/i18n';
import { Font, renderToBuffer } from '@react-pdf/renderer';
import { NextResponse } from 'next/server';
import React from 'react';

const toDataUrl = (filePath: string, mime = 'font/ttf'): string => {
  const buffer = fs.readFileSync(filePath);
  return `data:${mime};base64,${buffer.toString('base64')}`;
};

const fontsDir = path.join(process.cwd(), 'public', 'fonts');

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: toDataUrl(path.join(fontsDir, 'Roboto-Regular.ttf')),
      fontWeight: 'normal',
    },
    {
      src: toDataUrl(path.join(fontsDir, 'Roboto-Bold.ttf')),
      fontWeight: 'bold',
    },
  ],
});

export const dynamic = 'force-dynamic';

export async function GET(_request: Request, { params }: { params: Promise<{ locale: string }> }) {
  try {
    const { locale } = await params;

    if (!i18nConfig.locales.includes(locale)) {
      return NextResponse.json({ error: 'Invalid locale' }, { status: 400 });
    }

    const { t } = await initTranslations(locale);
    const document = React.createElement(CVDocument, { t, locale });
    const pdfBuffer = await renderToBuffer(
      document as React.ReactElement<import('@react-pdf/renderer').DocumentProps>
    );

    const filename = `${t('metaTitle')}.pdf`;
    const safeFilename = encodeURIComponent(filename);
    const asciiFallback = 'Evgenii-Sazhin-CV.pdf';

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${asciiFallback}"; filename*=UTF-8''${safeFilename}`,
        'Content-Length': String(pdfBuffer.length),
      },
    });
  } catch (error) {
    console.error('CV generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate CV', details: String(error) },
      { status: 500 }
    );
  }
}
