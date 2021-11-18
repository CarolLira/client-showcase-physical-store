import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { storeApi } from "../../Services/nominatimApi";

import {
    Store,
    Localization
} from "./interfaces";

import {
    SafeAreaView,
    StyleSheet,
    View
} from 'react-native';


const StoreMap: React.FC = () => {
    const [storeName] = useState('Renner');
    const [userCity] = useState('Cotia');
    const [userState] = useState('São Paulo');
    const [userCoutry] = useState('Brazil');

    const [currentLocalization, setCurrentLocalization] = useState<Localization>({
        latitude: -23.609475507346477,
        longitude: -46.93173658848744,
        latitudeDelta: 0.4,
        longitudeDelta: 0.4,
    });

    const [storesList, setStoresList] = useState<Store[]>([]);

    useEffect(() => {
        storeApi.get(`search?q=${storeName}+${userState}&addressdetails=1&limit=15&format=json`)
            .then(response => {
                setStoresList(response.data);
                const stores = response.data.slice();
                console.log(stores);
                setCurrentLocalization((oldLocalization: Localization) => {
                    return {
                        latitude: Number(stores[0].lat),
                        longitude: Number(stores[0].lon),
                        latitudeDelta: oldLocalization.latitudeDelta,
                        longitudeDelta: oldLocalization.longitudeDelta
                    }
                });
            }).catch(error => console.log(error));
    }, []);

    function onRegionChange(region: Localization) {
        setCurrentLocalization(region);
    }

    function titleSetting(storeName: string) {
        const commaIndex = storeName.indexOf(',');
        const newStoreName = storeName.substring(0, commaIndex);
        return newStoreName || '';
    }

    return (
        <SafeAreaView
            style={styles.container}
        >
            <MapView
                region={currentLocalization}
                onRegionChange={onRegionChange}
                style={styles.container}
            >
                {storesList.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: Number(marker.lat),
                            longitude: Number(marker.lon)
                        }}
                        title={titleSetting(marker.display_name)}
                    />
                ))}
            </MapView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
});

export default StoreMap;