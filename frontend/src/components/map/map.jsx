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
import mapStyles from "./mapStyles";
require('dotenv').config()

// import Dashboard from 'app-b-dashboard/container'


const libraries = ["places"]

const mapContainerStyle = {
    height: "100vh",
    width: "100vw",
};

const center = {
    lat: 43.6532,
    lng: -79.3832,
};

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
};

export default function SlawMap() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyAde9a-WlLx6LKCOSBUQHgyPwjm55qPpQc",
        libraries,
    });
    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";
    return(
        <div>
            <h1>
                Bears{" "}
                <span role="img" aria-label="tent">
                    💪
                </span>
            </h1>

            <GoogleMap mapContainerStyle={mapContainerStyle}
            zoom={8}
            center={center}
            options={options}>
            </GoogleMap>
        </div>
    )
    }
