import React, {useEffect} from "react";
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
import './map.css'
import {
    Combobox, 
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from '@reach/combobox';
import "../../../node_modules/@reach/combobox/styles.css"
import mapStyles from "./mapStyles";
import usePlacesAutocomplete from "use-places-autocomplete";
import compass from '../../images/compass.svg';
// import fetchEvent from "../../util/map.api_util"
require('dotenv').config()


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

// let map;

// function initMap() {
//   map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 2,
//     center: new google.maps.LatLng(2.8, -187.3),
//     mapTypeId: "terrain",
//   });
//   const script = document.createElement("script");
//   script.src =
//     "https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js";
//   document.getElementsByTagName("head")[0].appendChild(script);
// }

// // Loop through the results array and place a marker for each
// // set of coordinates.
// const eqfeed_callback = function (results) {
//   for (let i = 0; i < results.features.length; i++) {
//     const coords = results.features[i].geometry.coordinates;
//     const latLng = new google.maps.LatLng(coords[1], coords[0]);
//     new google.maps.Marker({
//       position: latLng,
//       map: map,
//     });
//   }
// };


export default function SlawMap() {
    // const onMapClick = React.useCallback((e) => {
    //     setMarkers((current) => [
    //         ...current,
    //         {
    //             lat: e.latLng.lat(),
    //             lng: e.latLng.lng(),
    //             time: new Date(),
    //         },
    //     ]);
    // }, []);

    const [markers, setMarkers] = React.useState([]);
    const [selected, setSelected] = React.useState(null);

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyAde9a-WlLx6LKCOSBUQHgyPwjm55qPpQc",
        // googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
        libraries,
    });

    useEffect(() => {
        const apiUrl = `http://api.amp.active.com/v2/search/?lat_lon=43.2%2C-118&current_page=1&per_page=10&sort=distance&exclude_children=true&api_key=prkm4jcm6g6f68m625ecfv7u`;
        // debugger
        fetch(apiUrl, { method: 'GET', mode: 'no-cors'})
            .then((res) => {
                // debugger
                return res.json()
            })
            .catch((res) => {
                // debugger
                console.log(res);
            });
        }
    );

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";



    return(
        <div className="slaw-map">
            <h1>
                Events{" "}
                <span role="img" aria-label="run">
                    🏃‍♀️🏃‍♂️
                </span>
            </h1>

            <Locate panTo={panTo} />
            <Search panTo={panTo} />

            <GoogleMap mapContainerStyle={mapContainerStyle}
            zoom={8}
            center={center}
            options={options}
            // onClick={onMapClick}
            onLoad={onMapLoad}
            >

            </GoogleMap>
        </div>
    )
}

function Locate({ panTo }) {
    return (
        <button
            className="locate"
            onClick={() => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        panTo({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        });
                    },
                    () => null
                );
            }}
        >
            <img src={compass} alt="compass" />
        </button>
    );
}   

function Search({ panTo }) {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 43.6532, lng: () => -79.3832 },
            radius: 100 * 1000,
        },
    });

    // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

    const handleInput = (e) => {
        setValue(e.target.value);
    };

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();

        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
        } catch (error) {
            console.log("😱 Error: ", error);
        }
    };

    return (
        <div className="search">
            <Combobox onSelect={handleSelect}>
                <ComboboxInput
                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder="Search your location"
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" &&
                            data.map(({ id, description }) => (
                                <ComboboxOption key={id} value={description} />
                            ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    );
}