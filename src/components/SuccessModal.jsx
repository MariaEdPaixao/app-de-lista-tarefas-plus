import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function SuccessModal({ visible, onClose, message }) {
    const { colors } = useTheme();

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.modalOverlay}>
                <View style={[styles.successBox, { backgroundColor: colors.input }]}>
                    <Text style={[styles.successText, { color: colors.text }]}>
                        🎉 Tarefa criada com sucesso!
                    </Text>
                    {message && (
                        <Text style={[styles.motivation, { color: colors.text }]}>
                            "{message}"
                        </Text>
                    )}
                    <TouchableOpacity
                        style={[styles.closeButton, { backgroundColor: colors.button }]}
                        onPress={onClose}
                    >
                        <Text style={[styles.closeButtonText, { color: colors.buttonText }]}>
                            Fechar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    successBox: {
        width: "75%",
        padding: 20,
        borderRadius: 16,
        alignItems: "center",
        elevation: 5,
    },
    successText: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 12,
        textAlign: "center",
    },
    motivation: {
        fontSize: 14,
        fontStyle: "italic",
        textAlign: "center",
        marginBottom: 12,
    },
    closeButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    closeButtonText: {
        fontWeight: "bold",
        fontSize: 16,
    },
});
