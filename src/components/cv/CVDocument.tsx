import careerByType from '@/data/career';
import contacts from '@/data/contacts';
import projectsBySlug from '@/data/projects';
import skillsByType from '@/data/skills';
import { getDiffJobDate, getFormatJobDate, getYearsDiff, ucFirst } from '@/utils/formatter';
import { Document, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

const stripHtml = (html: string): string =>
  html
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim();

const colors = {
  basicMain: '#000000',
  basicLight: '#78909c',
  primaryDarker: '#2962ff',
  secondaryLighter: '#eceff1',
  secondaryLight: '#cfd8dc',
};

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
    color: colors.basicMain,
  },
  meta: {
    fontSize: 9,
    color: colors.basicLight,
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
    borderBottomColor: colors.secondaryLighter,
    paddingBottom: 4,
    color: colors.basicMain,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 4,
  },
  contactLink: {
    color: colors.primaryDarker,
    marginRight: 8,
  },
  jobBlock: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.secondaryLighter,
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 16,
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
    color: colors.basicMain,
  },
  jobDate: {
    fontSize: 9,
    color: colors.basicLight,
  },
  jobPosition: {
    fontSize: 10,
    marginBottom: 2,
    color: colors.basicMain,
  },
  jobDescription: {
    fontSize: 9,
    color: colors.basicMain,
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
    color: colors.basicMain,
  },
  jobDetailText: {
    fontSize: 9,
    color: colors.basicMain,
  },
  stack: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 4,
  },
  stackItem: {
    fontSize: 8,
    backgroundColor: colors.secondaryLighter,
    borderWidth: 1,
    borderColor: colors.secondaryLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  skillBlock: {
    marginBottom: 8,
  },
  skillTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 2,
    color: colors.basicMain,
  },
  skillDescription: {
    fontSize: 9,
    color: colors.basicMain,
    lineHeight: 1.4,
  },
  dismissal: {
    fontSize: 8,
    color: colors.basicLight,
    marginTop: 4,
  },
  projectBlock: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.secondaryLighter,
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  projectTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 4,
    color: colors.basicMain,
  },
  projectDescription: {
    fontSize: 9,
    color: colors.basicMain,
    lineHeight: 1.4,
    marginBottom: 6,
  },
  projectLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
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
          <Text style={styles.sectionTitle}>{t('cv.skills')}</Text>
          {(
            (
              t('skills:entries', { returnObjects: true }) as unknown as Array<{
                type: string;
                title: string;
                description: string;
              }>
            )
              .map((entry) => {
                const extra = skillsByType[entry.type as keyof typeof skillsByType];
                return {
                  ...extra,
                  type: entry.type,
                  title: entry.title,
                  description: entry.description,
                };
              })
              .filter((item) => item.type !== 'about') as unknown as Array<{
              type: string;
              title: string;
              description: string;
              matrixUrl: string;
              tools: string[];
            }>
          ).map(({ type, title, description, tools }) => (
            <View
              key={type}
              style={styles.skillBlock}
            >
              <Text style={styles.skillTitle}>{title}</Text>
              <Text style={styles.skillDescription}>{description}</Text>
              {Array.isArray(tools) && tools.length > 0 && (
                <View style={styles.stack}>
                  {tools.map((tool) => (
                    <View
                      key={tool}
                      style={styles.stackItem}
                    >
                      <Text>{tool}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('pages:career.title')}</Text>
          {(
            t('career:entries', { returnObjects: true }) as unknown as Array<{
              type: string;
              title: string;
              positions?: Record<string, string>;
              details?: Record<string, string[]>;
              dismissal?: string;
            }>
          )
            .map((entry, index) => {
              const extra = careerByType[entry.type as keyof typeof careerByType];
              if (!extra) return null;

              const { positions, dateFrom, dateTo } = extra;
              const url = 'url' in extra ? (extra as { url?: string }).url : undefined;
              const formatDateFrom = ucFirst(getFormatJobDate(dateFrom, locale));
              const formatDateTo =
                dateTo === 'now' ? t('now') : ucFirst(getFormatJobDate(dateTo, locale));
              const diffDate = getDiffJobDate(
                dateFrom,
                dateTo === 'now' ? String(new Date()) : dateTo,
                locale
              );
              const hasDismissal =
                entry.dismissal != null && String(entry.dismissal).trim().length > 0;

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
                          {entry.title}
                        </Link>
                      ) : (
                        entry.title
                      )}
                    </Text>
                    <Text style={styles.jobDate}>
                      {formatDateFrom} – {formatDateTo}, {diffDate}
                    </Text>
                  </View>
                  {positions.map((position, posIndex) => {
                    const detailsList = entry.details?.[position.type];
                    const hasDetails = Array.isArray(detailsList) && detailsList.length > 0;
                    return (
                      <View key={posIndex}>
                        <Text style={styles.jobPosition}>
                          {t(`career:positions.${position.type}`)}
                        </Text>
                        <Text style={styles.jobDescription}>
                          {entry.positions?.[position.type] ?? ''}
                        </Text>
                        {hasDetails && (
                          <View style={styles.jobDetails}>
                            {detailsList.map((item, i) => (
                              <View
                                key={i}
                                style={styles.jobDetailItem}
                              >
                                <Text style={styles.jobDetailBullet}>—</Text>
                                <Text style={styles.jobDetailText}>{stripHtml(item)}</Text>
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
                    );
                  })}
                  {hasDismissal && (
                    <Text style={styles.dismissal}>
                      {t('dismissal')}: {entry.dismissal}
                    </Text>
                  )}
                </View>
              );
            })
            .filter(Boolean)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('pages:projects.title')}</Text>
          {(
            (
              t('projects:entries', { returnObjects: true }) as unknown as Array<{
                slug: string;
                title: string;
                description: string;
              }>
            )
              .map((entry) => {
                const extra = projectsBySlug[entry.slug as keyof typeof projectsBySlug];
                if (!extra) return null;
                return {
                  ...entry,
                  order: extra.order,
                  resourceLinks: extra.resourceLinks ?? [],
                };
              })
              .filter(Boolean)
              .sort(
                (a, b) => (a as { order: number }).order - (b as { order: number }).order
              ) as Array<{
              slug: string;
              title: string;
              description: string;
              resourceLinks: Array<{ url: string; title: string }>;
            }>
          ).map((project) => (
            <View
              key={project.slug}
              style={styles.projectBlock}
            >
              <Text style={styles.projectTitle}>{project.title}</Text>
              <Text style={styles.projectDescription}>{project.description}</Text>
              {project.resourceLinks.length > 0 && (
                <View style={styles.projectLinks}>
                  {project.resourceLinks.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      href={link.url}
                      style={styles.contactLink}
                    >
                      {link.title}
                    </Link>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default CVDocument;
