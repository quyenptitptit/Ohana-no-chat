import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import provinceServices from "../api/services/provinceServices";
import Button from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import PROVINCE from "../constants/province";
import { validateAddress } from "../utils/validateForm";

const AddressScreen = (props) => {
    const { handleChangeForm } = props;
    const [data, setData] = useState(null);
    const [textError, setTextError] = useState("");
    const [districtList, setDistrictList] = useState([]);
    const [wardList, setWardList] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (name, value) => {
        setData({
            ...data,
            [name]: value,
        });
    };

    const handleSelectCity = async (item) => {
        setLoading(true);
        setData({ ...data, city: item.name, district: null, ward: null });
        const res = await provinceServices.getDistrictList(item.code);
        setDistrictList(res.data.districts);
        setLoading(false);
    };

    const handleSelectDistrict = async (item) => {
        setLoading(true);
        setData({ ...data, district: item.name });
        const res = await provinceServices.getWardList(item.code);
        setWardList(res.data.wards);
        setLoading(false);
    };

    const handleSelectWard = (item) => {
        setData({ ...data, ward: item.name });
    };

    const handleNext = () => {
        saveData();
        const errorText = validateAddress(data);
        if (errorText) {
            setTextError(errorText);
            return;
        }
        handleChangeForm(2);
    };

    const saveData = async () => {
        try {
            await AsyncStorage.setItem("@postInfo", JSON.stringify(data));
        } catch (e) {
            alert("Đã xảy ra lỗi");
        }
    };

    const readData = async () => {
        try {
            const value = await AsyncStorage.getItem("@postInfo");
            if (value !== null) {
                console.log(value);
                setData(JSON.parse(value));
            }
        } catch (e) {
            alert("Đã xảy ra lỗi");
        }
    };

    useEffect(() => {
        readData();
    }, []);

    return (
        <View style={{ paddingTop: 8, paddingBottom: 16 }}>
            <Select
                label='Thành phố'
                value={data?.city}
                options={PROVINCE}
                handleSelect={handleSelectCity}
                loading={loading}
            />
            <Select
                label='Quận/Huyện'
                value={data?.district}
                options={districtList}
                handleSelect={handleSelectDistrict}
                loading={loading}
            />
            <Select
                label='Phường/Xã'
                value={data?.ward}
                options={wardList}
                handleSelect={handleSelectWard}
                loading={loading}
            />
            <Input
                label='Tên đường'
                placeholder='Nhập tên đường'
                value={data?.streetName}
                onChangeText={(value) => handleChange("streetName", value)}
            />
            <Input
                label='Số nhà'
                placeholder='Nhập số nhà'
                value={data?.houseNumber}
                onChangeText={(value) => handleChange("houseNumber", value)}
            />
            <Text style={styles.textError}>{textError}</Text>
            <View style={{ width: "50%", flexDirection: "row" }}>
                <Button onPress={() => handleChangeForm(0)} type='Secondary'>
                    Quay lại
                </Button>
                <Button onPress={handleNext}>Tiếp theo</Button>
            </View>
        </View>
    );
};

export default AddressScreen;

const styles = StyleSheet.create({
    textError: {
        textAlign: "center",
        color: "red",
        fontSize: 14,
        marginBottom: 8,
    },
});
