
import { Document, Page, Text, View, StyleSheet, } from '@react-pdf/renderer';
// import { ReactNode } from 'react';

// Create styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    borderBottomStyle: 'solid',
  },
  logo: {
    width: 120,
  },
  headerRight: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: '#666',
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: '#444',
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    minHeight: 30,
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: '#F9FAFB',
  },
  tableCell: {
    flex: 1,
    padding: 5,
    textAlign: 'center',
    fontSize: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: 'grey',
    fontSize: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    borderTopStyle: 'solid',
    paddingTop: 10,
  },
  chart: {
    marginVertical: 15,
    height: 200,
    alignSelf: 'center',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  statItem: {
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 5,
    width: '30%',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 10,
    marginTop: 5,
    color: '#666',
  },
});

// Generate PDF for Analytics Report
export const AnalyticsReport = ({
  title,
  subtitle,
  dateRange,
  metrics,
  topProducts,
  trafficSources,
}: {
  title: string;
  subtitle: string;
  dateRange: string;
  metrics: { title: string; value: string }[];
  topProducts: { name: string; category: string; sales: string; revenue: string }[];
  trafficSources: { source: string; visitors: string; percentage: string }[];
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>VendorSphere</Text>
        <View style={styles.headerRight}>
          <Text style={{ fontSize: 12 }}>Analytics Report</Text>
          <Text style={styles.date}>Generated: {new Date().toLocaleDateString()}</Text>
        </View>
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.date}>{dateRange}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Metrics Overview</Text>
        <View style={styles.stats}>
          {metrics && metrics.map((metric, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={styles.statValue}>{metric.value}</Text>
              <Text style={styles.statLabel}>{metric.title}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Products</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>Product</Text>
            <Text style={styles.tableCell}>Category</Text>
            <Text style={styles.tableCell}>Sales</Text>
            <Text style={styles.tableCell}>Revenue</Text>
          </View>
          {topProducts && topProducts.map((product, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{product.name}</Text>
              <Text style={styles.tableCell}>{product.category}</Text>
              <Text style={styles.tableCell}>{product.sales}</Text>
              <Text style={styles.tableCell}>${product.revenue}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Traffic Sources</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>Source</Text>
            <Text style={styles.tableCell}>Visitors</Text>
            <Text style={styles.tableCell}>Percentage</Text>
          </View>
          {trafficSources && trafficSources.map((source, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{source.source}</Text>
              <Text style={styles.tableCell}>{source.visitors}</Text>
              <Text style={styles.tableCell}>{source.percentage}%</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Text>© {new Date().getFullYear()} VendorSphere. All rights reserved.</Text>
        <Text>This report is confidential and for internal use only.</Text>
      </View>
    </Page>
  </Document>
);

// Generate PDF for Marketing Report
export const MarketingReport = ({
  title,
  subtitle,
  dateRange,
  metrics,
  campaigns,
  adSets,
  keywords,
}: {
  title: string;
  subtitle: string;
  dateRange: string;
  metrics: { title: string; value: string }[];
  campaigns: { name: string; spend: string; clicks: string; conv: string; roas: string }[];
  adSets: { name: string; spend: string; clicks: string; conv: string; roas: string }[];
  keywords: { keyword: string; clicks: string; impressions: string; ctr: string; cpc: string; cost: string }[];
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>VendorSphere</Text>
        <View style={styles.headerRight}>
          <Text style={{ fontSize: 12 }}>Marketing Report</Text>
          <Text style={styles.date}>Generated: {new Date().toLocaleDateString()}</Text>
        </View>
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.date}>{dateRange}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Performance Indicators</Text>
        <View style={styles.stats}>
          {metrics && metrics.map((metric, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={styles.statValue}>{metric.value}</Text>
              <Text style={styles.statLabel}>{metric.title}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Campaign Performance</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>Campaign</Text>
            <Text style={styles.tableCell}>Spend</Text>
            <Text style={styles.tableCell}>Clicks</Text>
            <Text style={styles.tableCell}>Conv.</Text>
            <Text style={styles.tableCell}>ROAS</Text>
          </View>
          {campaigns && campaigns.map((campaign, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{campaign.name}</Text>
              <Text style={styles.tableCell}>${campaign.spend}</Text>
              <Text style={styles.tableCell}>{campaign.clicks}</Text>
              <Text style={styles.tableCell}>{campaign.conversions}</Text>
              <Text style={styles.tableCell}>{campaign.roas}x</Text>
            </View>
          ))}
        </View>
      </View>

      {adSets && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ad Sets Performance</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCell}>Ad Set</Text>
              <Text style={styles.tableCell}>Spend</Text>
              <Text style={styles.tableCell}>Impr.</Text>
              <Text style={styles.tableCell}>CPC</Text>
              <Text style={styles.tableCell}>Conv.</Text>
            </View>
            {adSets.map((adSet, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{adSet.name}</Text>
                <Text style={styles.tableCell}>${adSet.spend}</Text>
                <Text style={styles.tableCell}>{adSet.impressions}</Text>
                <Text style={styles.tableCell}>${adSet.cpc}</Text>
                <Text style={styles.tableCell}>{adSet.conversions}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {keywords && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Performing Keywords</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCell}>Keyword</Text>
              <Text style={styles.tableCell}>Position</Text>
              <Text style={styles.tableCell}>Traffic</Text>
            </View>
            {keywords.map((keyword, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{keyword.term}</Text>
                <Text style={styles.tableCell}>{keyword.position}</Text>
                <Text style={styles.tableCell}>{keyword.traffic}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <View style={styles.footer}>
        <Text>© {new Date().getFullYear()} VendorSphere. All rights reserved.</Text>
        <Text>This report is confidential and for internal use only.</Text>
      </View>
    </Page>
  </Document>
);
