import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Switch, Text, View } from 'react-native'
import { useLanguage } from '../context/LanguageContext';

export default function LanguageToggleButton() {

    const { t } = useTranslation();
    const { isChecked, toggleIsChecked } = useLanguage();

    return (
        <View style={styles.languageContainer}>
            <Text>{t("language")}</Text>
            <Switch
                style={styles.languageButton}
                value={isChecked}
                onValueChange={toggleIsChecked}
            />
            {/* <Text style={styles.languageText}>{t("languageStatus")}</Text> */}
        </View>
    )
}

const styles = StyleSheet.create({
    languageContainer: {
        alignItems: 'center',
        flexDirection: 'row',
    }
})