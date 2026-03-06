import { initTranslations } from '@/i18n';
import { getLocale } from '@/utils/get-locale';
import { Collapse, CollapseGroup, Container } from '@pbcomponents/react';

const MatrixLayout = async ({ children }) => {
  const locale = await getLocale();
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
          {t('matrix:levels', { returnObjects: true }).map((level) => (
            <Collapse
              key={level.title}
              summary={level.title}
            >
              {level.description}
            </Collapse>
          ))}
        </CollapseGroup>
      </div>
      {children}
    </Container>
  );
};

export default MatrixLayout;
