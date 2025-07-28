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

export const getStormListScreenStyles = (currentTheme: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: currentTheme.colors.background,
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
    addButton: {
        backgroundColor: currentTheme.colors.primary,
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: currentTheme.spacing.xl,
    },
    emptyIcon: {
        fontSize: 64,
        color: currentTheme.colors.textSecondary,
        marginBottom: currentTheme.spacing.md,
    },
    emptyText: {
        fontSize: 18,
        color: currentTheme.colors.textSecondary,
        textAlign: 'center',
        marginBottom: currentTheme.spacing.md,
    },
    emptySubtext: {
        fontSize: 14,
        color: currentTheme.colors.textSecondary,
        textAlign: 'center',
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
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: currentTheme.spacing.md,
        backgroundColor: currentTheme.colors.surface,
        margin: currentTheme.spacing.sm,
        borderRadius: currentTheme.borderRadius.md,
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: currentTheme.colors.primary,
    },
    statLabel: {
        fontSize: 12,
        color: currentTheme.colors.textSecondary,
        marginTop: currentTheme.spacing.xs,
    },
});

export const getStormDetailScreenStyles = (currentTheme: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: currentTheme.colors.background,
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
        fontSize: 20,
        fontWeight: 'bold',
        color: currentTheme.colors.text,
    },
    backButton: {
        color: currentTheme.colors.primary,
        fontSize: 16,
    },
    content: {
        flex: 1,
    },
    photoContainer: {
        width: '100%',
        height: 300,
        backgroundColor: currentTheme.colors.surface,
    },
    photo: {
        width: '100%',
        height: '100%',
    },
    infoContainer: {
        padding: currentTheme.spacing.md,
    },
    stormHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: currentTheme.spacing.md,
    },
    stormType: {
        fontSize: 24,
        fontWeight: 'bold',
        color: currentTheme.colors.text,
        marginRight: currentTheme.spacing.sm,
    },
    stormIcon: {
        fontSize: 28,
    },
    date: {
        fontSize: 16,
        color: currentTheme.colors.textSecondary,
        marginBottom: currentTheme.spacing.lg,
    },
    section: {
        marginBottom: currentTheme.spacing.lg,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: currentTheme.colors.text,
        marginBottom: currentTheme.spacing.md,
    },
    weatherCard: {
        backgroundColor: currentTheme.colors.surface,
        padding: currentTheme.spacing.md,
        borderRadius: currentTheme.borderRadius.md,
        marginBottom: currentTheme.spacing.md,
    },
    weatherRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: currentTheme.spacing.sm,
    },
    weatherLabel: {
        fontSize: 14,
        color: currentTheme.colors.textSecondary,
    },
    weatherValue: {
        fontSize: 14,
        fontWeight: '600',
        color: currentTheme.colors.text,
    },
    locationCard: {
        backgroundColor: currentTheme.colors.surface,
        padding: currentTheme.spacing.md,
        borderRadius: currentTheme.borderRadius.md,
        marginBottom: currentTheme.spacing.md,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: currentTheme.spacing.xs,
    },
    locationIcon: {
        marginRight: currentTheme.spacing.xs,
    },
    locationText: {
        fontSize: 14,
        color: currentTheme.colors.text,
    },
    notesCard: {
        backgroundColor: currentTheme.colors.surface,
        padding: currentTheme.spacing.md,
        borderRadius: currentTheme.borderRadius.md,
    },
    notesText: {
        fontSize: 14,
        color: currentTheme.colors.text,
        lineHeight: 20,
    },
    noNotes: {
        fontSize: 14,
        color: currentTheme.colors.textSecondary,
        fontStyle: 'italic',
    },
    metadataCard: {
        backgroundColor: currentTheme.colors.surface,
        padding: currentTheme.spacing.md,
        borderRadius: currentTheme.borderRadius.md,
        marginTop: currentTheme.spacing.md,
    },
    metadataRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: currentTheme.spacing.xs,
    },
    metadataLabel: {
        fontSize: 12,
        color: currentTheme.colors.textSecondary,
    },
    metadataValue: {
        fontSize: 12,
        color: currentTheme.colors.text,
    },
});

export const getCaptureStormScreenStyles = (currentTheme: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: currentTheme.colors.background,
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
    cancelButton: {
        color: currentTheme.colors.primary,
        fontSize: 16,
    },
    content: {
        flex: 1,
        padding: currentTheme.spacing.md,
    },
    photoSection: {
        marginBottom: currentTheme.spacing.lg,
    },
    photoContainer: {
        width: '100%',
        height: 200,
        backgroundColor: currentTheme.colors.surface,
        borderRadius: currentTheme.borderRadius.md,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: currentTheme.spacing.md,
        overflow: 'hidden',
    },
    photo: {
        width: '100%',
        height: '100%',
    },
    photoPlaceholder: {
        fontSize: 48,
        color: currentTheme.colors.textSecondary,
        marginBottom: currentTheme.spacing.sm,
    },
    photoText: {
        fontSize: 16,
        color: currentTheme.colors.textSecondary,
        textAlign: 'center',
    },
    photoButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    photoButton: {
        backgroundColor: currentTheme.colors.primary,
        paddingHorizontal: currentTheme.spacing.lg,
        paddingVertical: currentTheme.spacing.md,
        borderRadius: currentTheme.borderRadius.md,
        flexDirection: 'row',
        alignItems: 'center',
    },
    photoButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: currentTheme.spacing.xs,
    },
    formSection: {
        marginBottom: currentTheme.spacing.lg,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: currentTheme.colors.text,
        marginBottom: currentTheme.spacing.md,
    },
    pickerContainer: {
        backgroundColor: currentTheme.colors.surface,
        borderRadius: currentTheme.borderRadius.md,
        marginBottom: currentTheme.spacing.md,
    },
    picker: {
        color: currentTheme.colors.text,
    },
    inputContainer: {
        backgroundColor: currentTheme.colors.surface,
        borderRadius: currentTheme.borderRadius.md,
        marginBottom: currentTheme.spacing.md,
    },
    textInput: {
        padding: currentTheme.spacing.md,
        color: currentTheme.colors.text,
        fontSize: 16,
        minHeight: 100,
        textAlignVertical: 'top',
    },
    weatherInfo: {
        backgroundColor: currentTheme.colors.surface,
        padding: currentTheme.spacing.md,
        borderRadius: currentTheme.borderRadius.md,
        marginBottom: currentTheme.spacing.lg,
    },
    weatherRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: currentTheme.spacing.xs,
    },
    weatherLabel: {
        fontSize: 14,
        color: currentTheme.colors.textSecondary,
    },
    weatherValue: {
        fontSize: 14,
        fontWeight: '600',
        color: currentTheme.colors.text,
    },
    saveButton: {
        backgroundColor: currentTheme.colors.success,
        paddingVertical: currentTheme.spacing.md,
        borderRadius: currentTheme.borderRadius.md,
        alignItems: 'center',
        marginTop: currentTheme.spacing.lg,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
});

export const getWeatherCardStyles = (currentTheme: any) => StyleSheet.create({
    container: {
        borderRadius: currentTheme.borderRadius.lg,
        overflow: 'hidden',
        margin: currentTheme.spacing.md,
    },
    gradient: {
        padding: currentTheme.spacing.lg,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: currentTheme.spacing.lg,
    },
    temperatureContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        flex: 1,
    },
    temperature: {
        fontSize: 48,
        fontWeight: 'bold',
        color: currentTheme.colors.text,
        marginRight: currentTheme.spacing.sm,
    },
    description: {
        fontSize: 16,
        color: currentTheme.colors.textSecondary,
    },
    weatherIcon: {
        fontSize: 48,
    },
    hourlySection: {
        marginTop: currentTheme.spacing.md,
    },
    hourlyTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: currentTheme.colors.text,
        marginBottom: currentTheme.spacing.sm,
    },
    hourlyScrollView: {
        flexGrow: 0,
    },
    hourlyItem: {
        alignItems: 'center',
        marginRight: currentTheme.spacing.md,
        minWidth: 50,
    },
    hourlyTime: {
        fontSize: 12,
        color: currentTheme.colors.textSecondary,
        marginBottom: currentTheme.spacing.xs,
    },
    hourlyIcon: {
        fontSize: 20,
        marginBottom: currentTheme.spacing.xs,
    },
    hourlyTemp: {
        fontSize: 14,
        fontWeight: '600',
        color: currentTheme.colors.text,
    },
    hourlyPrecipitation: {
        fontSize: 10,
        color: currentTheme.colors.textSecondary,
        marginTop: currentTheme.spacing.xs,
    },
}); 