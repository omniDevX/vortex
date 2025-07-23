import { StyleSheet } from 'react-native';

export const getWeatherScreenStyles = (currentTheme: any) => StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: currentTheme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: currentTheme.colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: currentTheme.colors.text,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: currentTheme.spacing.xs,
  },
  locationText: {
    fontSize: 14,
    color: currentTheme.colors.textSecondary,
    marginLeft: currentTheme.spacing.xs,
  },
  content: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: currentTheme.spacing.xl,
  },
  errorText: {
    fontSize: 16,
    color: currentTheme.colors.error,
    textAlign: 'center',
    marginBottom: currentTheme.spacing.md,
  },
  retryButton: {
    backgroundColor: currentTheme.colors.primary,
    paddingHorizontal: currentTheme.spacing.lg,
    paddingVertical: currentTheme.spacing.md,
    borderRadius: currentTheme.borderRadius.md,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: currentTheme.colors.textSecondary,
    marginTop: currentTheme.spacing.md,
  },
  forecastContainer: {
    padding: currentTheme.spacing.md,
  },
  forecastTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: currentTheme.colors.text,
    marginBottom: currentTheme.spacing.md,
  },
  forecastItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: currentTheme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: currentTheme.colors.border,
  },
  forecastDate: {
    fontSize: 16,
    color: currentTheme.colors.text,
    flex: 1,
  },
  forecastWeather: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  forecastIcon: {
    fontSize: 20,
    marginRight: currentTheme.spacing.sm,
  },
  forecastDescription: {
    fontSize: 14,
    color: currentTheme.colors.textSecondary,
    flex: 1,
  },
  forecastTemp: {
    fontSize: 16,
    fontWeight: '600',
    color: currentTheme.colors.text,
  },
});

export const getSettingsScreenStyles = (currentTheme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: currentTheme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: currentTheme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: currentTheme.colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: currentTheme.colors.text,
    marginLeft: currentTheme.spacing.md,
  },
  content: {
    flex: 1,
  },
  section: {
    marginVertical: currentTheme.spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: currentTheme.colors.text,
    marginBottom: currentTheme.spacing.sm,
    paddingHorizontal: currentTheme.spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: currentTheme.spacing.md,
    paddingHorizontal: currentTheme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: currentTheme.colors.border,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: currentTheme.colors.text,
    marginBottom: currentTheme.spacing.xs,
  },
  settingDescription: {
    fontSize: 14,
    color: currentTheme.colors.textSecondary,
  },
  unitsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unitButton: {
    paddingHorizontal: currentTheme.spacing.md,
    paddingVertical: currentTheme.spacing.sm,
    borderRadius: currentTheme.borderRadius.sm,
    marginLeft: currentTheme.spacing.sm,
  },
  unitButtonActive: {
    backgroundColor: currentTheme.colors.primary,
  },
  unitButtonInactive: {
    backgroundColor: currentTheme.colors.border,
  },
  unitButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  unitButtonTextActive: {
    color: '#fff',
  },
  unitButtonTextInactive: {
    color: currentTheme.colors.textSecondary,
  },
  dangerSection: {
    marginTop: currentTheme.spacing.xl,
  },
  dangerButton: {
    backgroundColor: currentTheme.colors.error,
    marginHorizontal: currentTheme.spacing.md,
    paddingVertical: currentTheme.spacing.md,
    borderRadius: currentTheme.borderRadius.md,
    alignItems: 'center',
  },
  dangerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 