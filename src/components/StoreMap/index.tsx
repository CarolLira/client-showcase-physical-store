import React, { useEffect, useState } from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { IAdressDetails, ILocalization } from '../../Types';
import { useSelector } from 'react-redux';
import { IGlobalStoreId } from '../../Store/Modules/ListDetails/Types';
import api from '../../Services/api';
import { useNavigation } from '@react-navigation/core';

const StoreMap = () => {
    const navigate = useNavigation();
    const storeId = useSelector((state: IGlobalStoreId) => state.store_id);
    const [currentLocalization, setCurrentLocalization] = useState<ILocalization>({
        latitude: -23.609475507346477,
        longitude: -46.93173658848744,
        latitudeDelta: 0.4,
        longitudeDelta: 0.4,
    });
    const [storesList, setStoresList] = useState<IAdressDetails>();

    useEffect(() => {
        api
            .get(`addresses?store=${storeId}`)
            .then(response => {
                if (response.data.length > 0) {
                    api
                        .get(`stores/${storeId}`)
                        .then(res => {
                            setStoresList({ ...response.data[0], storeDetails: res.data });
                            const stores = response.data[0]?.list.map((item: any) => item.localization);
                            setCurrentLocalization((oldLocalization: ILocalization) => {
                                return {
                                    latitude: stores[0].lat,
                                    longitude: stores[0].lng,
                                    latitudeDelta: oldLocalization.latitudeDelta,
                                    longitudeDelta: oldLocalization.longitudeDelta,
                                };
                            });
                        })
                        .catch(e => console.log(e));
                }
            })
            .catch(e => console.log(e));
    }, [storeId]);

    const onRegionChange = (region: ILocalization) => {
        setCurrentLocalization(region);
    };

    const handleNavigation = (screen: any) => {
        navigate.navigate(screen);
    };

    return (
        <SafeAreaView
            style={styles.container}
        >
            <MapView
                region={currentLocalization}
                onRegionChange={onRegionChange}
                style={styles.container}
            >
                {storesList?.list.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: marker.localization.lat,
                            longitude: marker.localization.lng,
                        }}
                        pinColor="#9540BF"
                    >
                        <Callout>
                            <View style={styles.calloutStyle}>
                                <Text style={styles.calloutTitle}>{storesList.storeDetails.label}</Text>
                                <Image source={{ uri: storesList.storeDetails.logo }} style={styles.logoStyle} />
                                <TouchableOpacity
                                    onPress={() => handleNavigation('Endereços')}>
                                    <Text>Saber mais</Text>
                                </TouchableOpacity>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    logoStyle: {
        height: 50,
        width: 50,
        resizeMode: 'contain',
    },
    calloutStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
    },
    calloutTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#9540BF',
    },
});

export default StoreMap;
