import { initTranslations } from '@/i18n';
import { Collapse, CollapseGroup, Container } from '@pbcomponents/react';

const MatrixLayout = async ({ children, params }) => {
  const { locale } = await params;
  const { t } = await initTranslations(locale);

  return (
    <Container size='s'>
      <p
        className='text-t24 text-basic-main link w-full'
        dangerouslySetInnerHTML={{ __html: t('matrix:matrixDescription') }}
      />
      <div className='mt-40 flex flex-col gap-16'>
        <span className='text-h24 text-basic-main w-full flex-1'>{t('matrix:headline')}</span>
        <CollapseGroup name='grades'>
          {[1, 2, 3, 4].map((item, index) => (
            <Collapse
              key={index}
              summary={t(`matrix:${item}.title`)}
            >
              {t(`matrix:${item}.description`)}
            </Collapse>
          ))}
        </CollapseGroup>
      </div>
      {children}
    </Container>
  );
};

export default MatrixLayout;
