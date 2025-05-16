import { initTranslations } from '@/i18n';
import { Collapse, CollapseGroup, Container } from '@pbcomponents/react';

const MatrixLayout = async ({ children, params: { locale } }) => {
  const { t } = await initTranslations(locale);

  return (
    <Container size='s'>
      <p
        className='text-t24 text-basic-main link w-full'
        dangerouslySetInnerHTML={{ __html: t('matrixDescription') }}
      />
      <div className='mt-40 flex flex-col gap-16'>
        <span className='text-h24 text-basic-main w-full flex-1'>{t('grades.headline')}</span>
        <CollapseGroup name='grades'>
          {[1, 2, 3, 4].map((item, index) => (
            <Collapse
              key={index}
              summary={t(`grades.${item}.title`)}
            >
              {t(`grades.${item}.description`)}
            </Collapse>
          ))}
        </CollapseGroup>
      </div>
      {children}
    </Container>
  );
};

export default MatrixLayout;
