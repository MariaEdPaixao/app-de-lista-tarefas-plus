import React, { useEffect, useState } from "react";

import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Modal,
    TextInput,
    Button,
    Alert,
} from "react-native";
import { useTheme } from "../src/context/ThemeContext";
import TaskCard from "../src/components/TaskCard";
import { useQuery } from "@tanstack/react-query";
import { getMessageMotivation } from "../src/api/motivacional";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    db,
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    doc,
    updateDoc,
    serverTimestamp,
    Timestamp
} from "../src/services/firebaseConfig";
import { useRouter } from 'expo-router';
import ThemeToggleButton from "../src/components/ThemeToggleButton";
import CreateTaskModal from "../src/components/CreateTaskModal";
import SuccessModal from "../src/components/SuccessModal";
import ToggleButtonsContainer from "../src/components/ToggleButtonsContainer";
import { useTranslation } from "react-i18next";
import * as Notifications from 'expo-notifications';

// Set notification behavior
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default function HomeScreen() {
    const { colors } = useTheme();
    const [tasks, setTasks] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        dueDate: "",
    });
    const [uid, setUid] = useState(null);
    const [expoPushToken, setExpoPushToken] = useState(null);

    const { t } = useTranslation();

    const router = useRouter();

    const handleLogout = async () => {
        await AsyncStorage.removeItem("@user");
        router.push("/");
    };

    // Busca a frase motivacional
    const { data: motivation, isLoading, isError, refetch } = useQuery({
        queryKey: ["motivacional"],
        queryFn: getMessageMotivation,
    });

    // Recupera o usuário salvo
    useEffect(() => {
        (async () => {
            const storedUser = await AsyncStorage.getItem("@user");
            if (storedUser) {
                const parsed = JSON.parse(storedUser);
                setUid(parsed.uid); // pega o uid do Firebase Authentication
            }
        })();
    }, []);

    // Escuta em tempo real as tarefas do usuário
    useEffect(() => {
        if (!uid) return;
        const q = query(
            collection(db, "users", uid, "tasks"),
            orderBy("createdAt", "desc")
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
            setTasks(data);
        });
        return unsubscribe;
    }, [uid]);

    const handleCreateTask = async () => {
        if (!newTask.title || !newTask.dueDate) {
            Alert.alert("Erro!", "Preencha o título e a data!");
            return;
        }
        if (!uid) return;

        const dateRegex = /^(\d{2})-(\d{2})-(\d{4})$/;
        const match = newTask.dueDate.match(dateRegex);

        if (!match) {
            Alert.alert("Erro!", "Formato de data inválido! Use DD-MM-YYYY.");
            return;
        }

        const [, dayStr, monthStr, yearStr] = match;
        const day = parseInt(dayStr, 10);
        const month = parseInt(monthStr, 10) - 1;
        const year = parseInt(yearStr, 10);

        const parsedDate = new Date(year, month, day);

        if (
            parsedDate.getFullYear() !== year ||
            parsedDate.getMonth() !== month ||
            parsedDate.getDate() !== day
        ) {
            Alert.alert("Erro!", "Data inválida! Verifique o dia e mês.");
            return;
        }


        await addDoc(collection(db, "users", uid, "tasks"), {
            title: newTask.title,
            description: newTask.description,
            completed: false,
            dueDate: Timestamp.fromDate(parsedDate),
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });

        // Schedule a notification for the due date
        await Notifications.scheduleNotificationAsync({
            content: {
                title: t("taskReminder") || "Task Reminder",
                body: `${t("yourTask") || "Your task"} "${newTask.title}" ${t("isDueToday") || "is due today!"}`,
                sound: 'default',
            },
            trigger: {
                date: parsedDate, // Schedule for the due date at midnight
            },
        });

        console.log(`Notification scheduled for task: ${newTask.title} on ${parsedDate.toDateString()}`);

        setNewTask({ title: "", description: "", dueDate: "" });
        setModalVisible(false);
        await refetch();
        setSuccessModal(true);
    };


    const toggleComplete = async (id, currentValue) => {
        if (!uid) return;
        const taskRef = doc(db, "users", uid, "tasks", id);
        await updateDoc(taskRef, {
            completed: !currentValue,
            updatedAt: new Date(),
        });

        // If task is being marked as completed, you might want to cancel its notification
        if (!currentValue) {
            // Task is being completed, you can implement notification cancellation here if needed
            console.log(`Task ${id} marked as completed - notification handling could be added here`);
        }
    };

    // Notifications

    const registerForPushNotificationsAsync = async() =>{
        try{
            // For development/testing, we can skip the token generation if it fails
            const tokenData = await Notifications.getExpoPushTokenAsync({
                projectId: "6897cbf9-ab81-42df-8a56-0b40bf649729" // Your EAS project ID
            });
            const token = tokenData.data;
            console.log("Expo Push Token gerado com sucesso: ", token)
            return token
        }catch(error){
            console.log("Erro ao gerar token", error)
            // For local notifications, we don't necessarily need the push token
            console.log("Continuando sem push token - notificações locais funcionarão normalmente")
            return null
        }
    }

    useEffect(()=>{
        (async()=>{
            //Chama a função que registra o dispositivo com o serviço de notificação
            const token = await registerForPushNotificationsAsync()
            //Armazenando o token no estado
            setExpoPushToken(token)
        })()
    },[])

    useEffect(() => {
        //Adiciona um ouvinte(listener) que será chamado sempre que uma notificação for recebida.
        const subscription = Notifications.addNotificationReceivedListener(notification => {
            //Exibir no console a notificação recebida - útil para testes ou debug
            console.log("Notificação recebida: ", notification)
        })

        //Função de limpeza que será chamada
        return () => subscription.remove()
    }, [])

    useEffect(() => {
        (async () => {

            //Verificar se já tem de permisão de notificação
            const { status: existingStatus } = await Notifications.getPermissionsAsync()
            let finalStatus = existingStatus

            //Se não tiver permissão, solicita ao usuário
            if (existingStatus !== "granted") {
                const { status } = await Notifications.requestPermissionsAsync()
                finalStatus = status
            }

            //Se ainda não foi permitido o usuario das notificações
            if (finalStatus !== "granted") {
                alert("Permissão para notificação não concedida")
            }
        })()
    }, [])

    useEffect(() => {
        // Handle notification responses (when user taps on notification)
        const subscription = Notifications.addNotificationResponseReceivedListener(response => {
            console.log('Notification response received:', response);
            // You can navigate to a specific screen or perform actions here
        });

        return () => subscription.remove();
    }, []);


    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>

            <View style={styles.header}>
                <ToggleButtonsContainer/>
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
            <Text style={[styles.welcome, { color: colors.text }]}>
                {t("greeting")}
            </Text>

            {!isLoading && !isError && motivation && (
                <Text style={[styles.motivation, { color: colors.inputText }]}>
                    "{motivation}"
                </Text>
            )}

            <Text style={[styles.sub, { color: colors.inputText }]}>
                {t("letsCreateATask")}
            </Text>

            <TouchableOpacity
                style={[styles.createButton, { backgroundColor: colors.button }]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={[styles.createButtonText, { color: colors.buttonText }]}>
                    ➕ {t("createTask")}
                </Text>
            </TouchableOpacity>

            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TaskCard task={item} onToggleComplete={() => toggleComplete(item.id, item.completed)} />
                )}
                style={{ marginTop: 20 }}
                ListEmptyComponent={
                    <Text style={{ color: colors.inputText, textAlign: "center", marginTop: 40 }}>
                        {t("noTaskCreated")} ✨
                    </Text>
                }
            />

            <CreateTaskModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSave={handleCreateTask}
                task={newTask}
                setTask={setNewTask}
            />

            <SuccessModal
                visible={successModal}
                onClose={() => setSuccessModal(false)}
                message={motivation}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },

    logoutButton: {
        backgroundColor: "#FF6B6B",
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        elevation: 2,
        maxWidth: '25%',
        alignSelf: 'flex-end',
    },

    logoutText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 14,
        textAlign: "center",
    },
    container: {
        flex: 1,
        paddingTop: 70,
        padding: 30,
    },
    welcome: {
        fontSize: 24,
        fontWeight: "700",
        textAlign: "center",
        marginVertical: 8,
    },
    motivation: {
        fontSize: 14,
        fontStyle: "italic",
        textAlign: "center",
        marginBottom: 10,
    },
    sub: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
    },
    createButton: {
        padding: 14,
        borderRadius: 30,
        alignItems: "center",
        marginBottom: 10,
        elevation: 3,
    },
    createButtonText: {
        fontWeight: "bold",
        fontSize: 16,
    },
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
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 6,
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
});
