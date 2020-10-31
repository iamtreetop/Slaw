import React from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";

import UsePlacesAutoComplete, {
    getGeocode,
    getLatLng,
} from 'use-places-autocomplete';

import {
    Combobox, 
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    CombocboxOption,
} from '@reach/combobox';
import "../../../node_modules/@reach/combobox/styles.css"

const libraries = ["places"]

const mapContainerStyle = {
    height: "100vh",
    width: "100vw",
};

const center = {
    lat: 43.6532,
    lng: -79.3832,
};

export default function Map() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });
    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";
    return(
        <div>
            <GoogleMap mapContainerStyle={mapContainerStyle}
            zoom={8}
            center={center}>

            </GoogleMap>
        </div>
    )
    }
