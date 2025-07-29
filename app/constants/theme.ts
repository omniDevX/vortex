import { AppTheme } from '../types/index';

export const lightTheme: AppTheme = {
    colors: {
        primary: '#ffffff',
        secondary: '#e2e8f0',
        background: '#ffffff',
        surface: 'rgba(255, 255, 255, 0.2)',
        text: '#ffffff',
        textSecondary: '#e2e8f0',
        error: '#fecaca',
        success: '#dcfce7',
        warning: '#fef3c7',
        border: 'rgba(255, 255, 255, 0.3)',
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
    },
    borderRadius: {
        sm: 4,
        md: 8,
        lg: 12,
    },
};

export const darkTheme: AppTheme = {
    colors: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        background: '#0f172a',
        surface: 'rgba(255, 255, 255, 0.2)',
        text: '#fff',
        textSecondary: '#cfd8dc',
        error: '#f87171',
        success: '#4ade80',
        warning: '#fbbf24',
        border: '#334155',
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
    },
    borderRadius: {
        sm: 4,
        md: 8,
        lg: 12,
    },
}; 