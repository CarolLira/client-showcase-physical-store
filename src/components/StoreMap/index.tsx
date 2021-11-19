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
import { IAdressDetails, IAdresses, ILocalization } from '../../Types';
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
    const [markerAddress, setMarkerAddress] = useState<IAdresses | undefined>(undefined);

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

    const handleMarkerClick = (address: IAdresses | undefined) => {
        setMarkerAddress(address);
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
                {storesList?.list.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: marker.localization.lat,
                            longitude: marker.localization.lng,
                        }}
                        pinColor="#9540BF"
                        onSelect={() => handleMarkerClick(marker)}
                        onDeselect={() => handleMarkerClick(undefined)}
                    >
                        <Callout>
                            <View style={styles.calloutStyle}>
                                <Text style={styles.calloutTitle}>{storesList.storeDetails.label}</Text>
                                <Image source={{ uri: storesList.storeDetails.logo }} style={styles.logoStyle} />
                                <TouchableOpacity
                                    onPress={() => handleNavigation('Endereços')}>
                                </TouchableOpacity>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            {markerAddress &&
                <View style={styles.addressContainer}>
                    <Text style={styles.addressTitle}>Endereço</Text>
                    <Text style={styles.addressText}>{markerAddress.street}</Text>
                    <Text style={styles.addressText}>{markerAddress.city}</Text>
                    <Text style={styles.addressText}>CEP: {markerAddress.zipcode}</Text>
                </View>
            }
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
    addressContainer: {
        display: 'flex',
        paddingHorizontal: 30,
        paddingVertical: 20,
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#fffffff1'
    },
    addressTitle: {
        marginBottom: 15,
        fontSize: 18,
        fontWeight: '500'
    },
    addressText: {
        marginBottom: 5,
        fontSize: 16
    }
});

export default StoreMap;
