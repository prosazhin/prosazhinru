import { initTranslations } from '@/i18n';
import { Collapse, CollapseGroup, Container } from '@pbcomponents/react';

const MatrixLayout = async ({ children, params: { locale } }) => {
  const { t } = await initTranslations(locale);

  return (
    <Container size="s">
      <p
        className="w-full text-t24 text-basic-main link"
        dangerouslySetInnerHTML={{ __html: t('matrixDescription') }}
      />
      <div className="flex flex-col gap-16 mt-40">
        <span className="flex-1 w-full text-h24 text-basic-main">{t('grades.headline')}</span>
        <CollapseGroup name="grades">
          {[1, 2, 3, 4].map((item, index) => (
            <Collapse key={index} summary={t(`grades.${item}.title`)}>
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
