import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    StyleSheet
} from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function CreateTaskModal({
    visible,
    onClose,
    onSave,
    task,
    setTask
}) {
    const { colors } = useTheme();

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalOverlay}>
                <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
                    <Text style={[styles.modalTitle, { color: colors.text }]}>Nova Tarefa</Text>
                    <TextInput
                        style={[styles.input, { color: colors.text, borderColor: colors.text }]}
                        placeholder="Título"
                        placeholderTextColor={colors.placeHolderTextColor}
                        value={task.title}
                        onChangeText={(t) => setTask({ ...task, title: t })}
                    />

                    <TextInput
                        style={[styles.input, { color: colors.text, borderColor: colors.text }]}
                        placeholder="Descrição"
                        placeholderTextColor={colors.placeHolderTextColor}
                        value={task.description}
                        onChangeText={(d) => setTask({ ...task, description: d })}
                    />

                    <TextInput
                        style={[styles.input, { color: colors.text, borderColor: colors.text }]}
                        placeholder="Data (DD-MM-YYYY)"
                        placeholderTextColor={colors.placeHolderTextColor}
                        value={task.dueDate}
                        onChangeText={(date) => {
                            let formatted = date.replace(/\D/g, "");
                            if (formatted.length > 2) formatted = formatted.slice(0, 2) + "-" + formatted.slice(2);
                            if (formatted.length > 5) formatted = formatted.slice(0, 5) + "-" + formatted.slice(5, 9);
                            setTask({ ...task, dueDate: formatted });
                        }}
                        keyboardType="numeric"
                        maxLength={10}
                    />

                    <View style={styles.modalButtons}>
                        <TouchableOpacity
                            style={[styles.modalButton, { backgroundColor: "gray" }]}
                            onPress={onClose}
                        >
                            <Text style={styles.modalButtonText}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.modalButton, { backgroundColor: colors.button }]}
                            onPress={onSave}
                        >
                            <Text style={[styles.modalButtonText, { color: colors.buttonText }]}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
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
    modalContent: {
        width: "90%",
        borderRadius: 20,
        padding: 24,
        elevation: 8,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
        color: "red",
        textAlign: "center"
    },
    input: {
        borderWidth: 1,
        borderRadius: 14,
        padding: 14,
        marginBottom: 14,
        fontSize: 16,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    modalButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginHorizontal: 5,
        elevation: 3,
    },
    modalButtonText: {
        fontSize: 16,
        fontWeight: "600",
    },
});
