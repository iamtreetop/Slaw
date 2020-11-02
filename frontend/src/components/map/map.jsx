import React, {useEffect} from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
    useGoogleMap,
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
import {Link} from "react-router-dom"
// import fetchEvent from "../../util/map.api_util"
import * as activeData from "./activeData.json"
require('dotenv').config()


const libraries = ["places"]

const mapContainerStyle = {
    height: "100vh",
    width: "100vw",
};

const center = {
    lat: 34.0522,
    lng: -118.2437,
};

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
};

// function Map(){
//     return(
//         <GoogleMap
//             defaultZoom={10}
//             defaultCenter={ center }
//         >
//             {activeData.results.map((activity, idx) => (
//                 <Marker
//                     key={idx}
//                     position={{
//                         lat: activity.place.geoPoint.lat,
//                         lng: activity.place.geoPoint.lon
//                     }}
//                 />
//             ))}
//         </GoogleMap>
//     )
// }



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

    const [selectedActivity, setSelectedActivity] = React.useState(null);
    const [markers, setMarkers] = React.useState([]);

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(8);
    }, []);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
        // googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
        libraries,
    });

    // useEffect(() => {
    //     const apiUrl = `http://api.amp.active.com/v2/search/?lat_lon=43.2%2C-118&current_page=1&per_page=10&sort=distance&exclude_children=true&api_key={ACTIVE_KEY}`;
    //     debugger
    //     fetch(apiUrl, { method: 'GET', mode: 'no-cors'})
    //         .then((res) => {
    //             debugger
    //             return res.json()
    //         })
    //         .catch((res) => {
    //             // debugger
    //             console.log(res);
    //         });
    //     }
    // );

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";


    debugger
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
            zoom={11}
            center={center}
            options={options}
            // onClick={onMapClick}
            onLoad={onMapLoad}
            >
            {activeData.results.map((activity, idx) => (
                <Marker
                    key={idx}
                    position={{
                        lat: Number(activity.place.geoPoint.lat),
                        lng: Number(activity.place.geoPoint.lon)
                    }}
                    onClick={() => {
                        setSelectedActivity(activity);
                    }}
                    icon={{
                        url: "/hiclipart.com.png",
                        scaledSize: new window.google.maps.Size(25, 25)
                    }}
                />
            ))}

            {selectedActivity && (
                <InfoWindow
                    position={{
                        lat: Number(selectedActivity.place.geoPoint.lat),
                        lng: Number(selectedActivity.place.geoPoint.lon)
                    }}
                    onCloseClick={() => {
                        setSelectedActivity(null);
                    }}
                >
                    <div className="info-window-details">
                        <h3>{selectedActivity.assetName}</h3>
                        <p>{selectedActivity.assetChannels[0].channel.channelDsc}</p>
                        <a target="_blank" href={`${selectedActivity.registrationUrlAdr}`}>Registration Link</a>
                    </div>
                </InfoWindow>
            )}
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