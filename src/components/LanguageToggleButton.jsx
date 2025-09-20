import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Switch, Text, View } from 'react-native'
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from "../context/ThemeContext";

export default function LanguageToggleButton() {
    const { colors } = useTheme();
    const { t } = useTranslation();
    const { isChecked, toggleIsChecked } = useLanguage();

    return (
        <View style={styles.languageContainer}>
            <Text style={[styles.languageButton, { color: colors.text }]}>{t("language")}</Text>
            <Switch
                style={styles.languageButton}
                value={isChecked}
                onValueChange={toggleIsChecked}
                trackColor={{ false: colors.border }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    languageContainer: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    languageButton: {
        marginTop: 20,
    }
})