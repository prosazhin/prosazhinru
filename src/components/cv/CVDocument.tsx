import career from '@/data/career';
import contacts from '@/data/contacts';
import skills from '@/data/skills';
import { getDiffJobDate, getFormatJobDate, getYearsDiff, ucFirst } from '@/utils/formatter';
import { Document, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

const stripHtml = (html: string): string =>
  html
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim();

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Roboto',
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    marginBottom: 4,
  },
  meta: {
    fontSize: 9,
    color: '#666',
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 4,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 4,
  },
  contactLink: {
    color: '#0066cc',
    marginRight: 8,
  },
  jobBlock: {
    marginBottom: 12,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  jobDate: {
    fontSize: 9,
    color: '#666',
  },
  jobPosition: {
    fontSize: 10,
    marginBottom: 2,
  },
  jobDescription: {
    fontSize: 9,
    color: '#444',
    marginBottom: 4,
    lineHeight: 1.4,
  },
  jobDetails: {
    marginLeft: 8,
    marginBottom: 4,
  },
  jobDetailItem: {
    fontSize: 9,
    marginBottom: 2,
    flexDirection: 'row',
  },
  jobDetailBullet: {
    marginRight: 4,
  },
  stack: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 4,
  },
  stackItem: {
    fontSize: 8,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 2,
  },
  skillBlock: {
    marginBottom: 8,
  },
  skillTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  skillDescription: {
    fontSize: 9,
    color: '#444',
    lineHeight: 1.4,
  },
  dismissal: {
    fontSize: 8,
    color: '#888',
    marginTop: 4,
  },
});

export type CVDocumentProps = {
  t: (key: string, options?: Record<string, unknown>) => string;
  locale: string;
};

const CVDocument = ({ t, locale }: CVDocumentProps) => {
  const ageYears = getYearsDiff('1993-03-20', String(new Date()));
  const expDesignYears = getYearsDiff('2011-01-01', String(new Date()));
  const expDevYears = getYearsDiff('2014-01-01', String(new Date()));

  return (
    <Document
      title={t('metaTitle')}
      author={t('name')}
      subject={t('metaDescription')}
    >
      <Page
        size='A4'
        style={styles.page}
      >
        <View style={styles.header}>
          <Text style={styles.name}>{t('name')}</Text>
          <Text style={styles.meta}>
            {t('location')} · {t('age')}: {t('plurals.year.year', { count: ageYears })} ·{' '}
            {t('experienceDesign')}: {t('plurals.year.year', { count: expDesignYears })} ·{' '}
            {t('experienceDev')}: {t('plurals.year.year', { count: expDevYears })}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('cv.contacts')}</Text>
          <View style={styles.contactRow}>
            {contacts.map(({ title, url, link }, index) =>
              link ? (
                <Link
                  key={index}
                  href={url}
                  style={styles.contactLink}
                >
                  {title}
                </Link>
              ) : (
                <Text key={index}>{title}</Text>
              )
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('pages:career.title')}</Text>
          {career.map(({ type, url, positions, dateFrom, dateTo, dismissal }, index) => {
            const formatDateFrom = ucFirst(getFormatJobDate(dateFrom, locale));
            const formatDateTo =
              dateTo === 'now' ? t('now') : ucFirst(getFormatJobDate(dateTo, locale));
            const diffDate = getDiffJobDate(
              dateFrom,
              dateTo === 'now' ? String(new Date()) : dateTo,
              locale
            );
            const companyTitle = t(`career:${type}.title`);

            return (
              <View
                key={index}
                style={styles.jobBlock}
              >
                <View style={styles.jobHeader}>
                  <Text style={styles.jobTitle}>
                    {typeof url === 'string' ? (
                      <Link
                        href={url}
                        style={styles.contactLink}
                      >
                        {companyTitle}
                      </Link>
                    ) : (
                      companyTitle
                    )}
                  </Text>
                  <Text style={styles.jobDate}>
                    {formatDateFrom} – {formatDateTo}, {diffDate}
                  </Text>
                </View>
                {positions.map((position, posIndex) => (
                  <View key={posIndex}>
                    <Text style={styles.jobPosition}>{t(`career:positions.${position.type}`)}</Text>
                    <Text style={styles.jobDescription}>
                      {t(`career:${type}.positions.${position.type}`)}
                    </Text>
                    {position.hasDetails && (
                      <View style={styles.jobDetails}>
                        {(
                          t(`career:${type}.details.${position.type}`, {
                            returnObjects: true,
                          }) as unknown as string[]
                        ).map((item, i) => (
                          <View
                            key={i}
                            style={styles.jobDetailItem}
                          >
                            <Text style={styles.jobDetailBullet}>—</Text>
                            <Text>{stripHtml(item)}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                    <View style={styles.stack}>
                      {position.stack.map((tool) => (
                        <View
                          key={tool}
                          style={styles.stackItem}
                        >
                          <Text>{tool}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
                {dismissal && (
                  <Text style={styles.dismissal}>
                    {t('dismissal')}: {t(`career:${type}.dismissal`)}
                  </Text>
                )}
              </View>
            );
          })}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('cv.skills')}</Text>
          {skills
            .filter((s) => s.type !== 'about')
            .map(({ type }) => (
              <View
                key={type}
                style={styles.skillBlock}
              >
                <Text style={styles.skillTitle}>{t(`skills:${type}.title`)}</Text>
                <Text style={styles.skillDescription}>{t(`skills:${type}.description`)}</Text>
              </View>
            ))}
        </View>
      </Page>
    </Document>
  );
};

export default CVDocument;
