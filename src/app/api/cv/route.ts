import CVDocument from '@/components/cv/CVDocument';
import { initTranslations } from '@/i18n';
import { getLocale } from '@/utils/get-locale';
import { renderToBuffer } from '@react-pdf/renderer';
import { createElement } from 'react';

export const dynamic = 'force-dynamic';

export async function GET() {
  const locale = await getLocale();
  const { t } = await initTranslations(locale);

  const document = createElement(CVDocument, { t, locale });
  // CVDocument returns <Document>; renderToBuffer expects Document root
  const pdfBuffer = await renderToBuffer(document as Parameters<typeof renderToBuffer>[0]);

  return new Response(new Uint8Array(pdfBuffer), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="cv.pdf"',
    },
  });
}
