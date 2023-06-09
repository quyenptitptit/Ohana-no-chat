import React from "react";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./src/navigation/appNavigation";
// import ConfirmOTPScreen from "./src/screens/ConfirmOTPScreen";
import RegisterScreen from "./src/screens/RegisterScreen";

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <AppNavigation />
                {/* <ConfirmOTPScreen /> */}
            </NavigationContainer>
        </Provider>
    );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#fff",
//         alignItems: "center",
//         justifyContent: "center",
//     },
// });
