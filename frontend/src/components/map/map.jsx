import React, { useEffect } from "react";
import mapStyles from "./mapStyles";
import usePlacesAutocomplete from "use-places-autocomplete";
import compass from '../../images/compass.svg';
import './map.css';

import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";

import {
    getGeocode,
    getLatLng,
} from 'use-places-autocomplete';

import {
    Combobox, 
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from '@reach/combobox';

require('dotenv').config()


const libraries = ["places"]

const mapContainerStyle = {
    height: "100vh",
    width: "100vw",
};

const center = {
    lat: 37.774929,
    lng: -122.419418,
};

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
};

export default function SlawMap({event,channels, fetchChannels, createEvent, updateChannel, user, redirect}) {
    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const [markers, setMarkers] = React.useState([]);
    const [address, setAddress] = React.useState(null);
    const [submitted, setSubmitted] = React.useState(false);
    const [selectedActivity, setSelectedActivity] = React.useState(null);
    const [channel, setChannel] = React.useState(null);
    const [eventId, setEventId] = React.useState(null);
    const [successMessage, setSuccessMessage] = React.useState(false);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
        libraries,
    }); 
    
    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(13);
    }, []);

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 37.774929, lng: () => -122.419418 },
            radius: 100 * 1000,
        },
        debounce:300
    });

    const handleInput = (e) => {
        setValue(e.target.value);
    };

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();
        setAddress(address)
        setSubmitted(true)
        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
        } catch (error) {
            console.log("😱 Error: ", error);
        }
        const apiUrl = `https://cors-anywhere.herokuapp.com/http://api.amp.active.com/v2/search/?near=${encodeURI(address)}&radius=25&current_page=1&per_page=20&sort=distance&exclude_children=true&api_key=${process.env.REACT_APP_ACTIVE_KEY}`;
            fetch(apiUrl, { method: 'GET', mode: 'cors' })
                .then(function (res) {
                    return res.json()
                })
                .then(function (data) {
                    panTo({
                        lat: Number(data.results[0].place.geoPoint.lat),
                        lng: Number(data.results[0].place.geoPoint.lon)
                    })
                    setMarkers(data.results);

                })
                .catch((res) => {
                    console.log(res);
                }, []);
        setSubmitted(false)
    };

    const handleChannel = (e) => {
        e.preventDefault();
        setChannel(e.currentTarget.value);
    }

    const handleCreateEvent = (eventDetails) => {
       createEvent(eventDetails).then(
            (action) => {
                if (action) {
                    let activeEventId = ([action.event.data._id])
                    updateChannel({ events: activeEventId, id: channel })
                    .then(
                        setSuccessMessage(true)
                    ).then(
                        redirect(`/channels/${channel}/${activeEventId}`)
                    )
                    .catch
                        ((res) => console.log(res))
                }
            }
        )
    }

    useEffect(() => {
        if (Object.keys(channels).length === 0){
            fetchChannels()
        } 
        // if (address !== null && submitted ) {
        //     const apiUrl = `https://cors-anywhere.herokuapp.com/http://api.amp.active.com/v2/search/?near=${encodeURI(address)}&radius=25&current_page=1&per_page=20&sort=distance&exclude_children=true&api_key=${process.env.REACT_APP_ACTIVE_KEY}`;
        //     fetch(apiUrl, { method: 'GET', mode: 'cors'})
        //         .then(function(res) {
        //             return res.json()
        //         })
        //         .then(function (data) {
        //             panTo({
        //                 lat: Number(data.results[0].place.geoPoint.lat),
        //                 lng: Number(data.results[0].place.geoPoint.lon)
        //             })
        //             setMarkers(data.results);

        //         })
        //         .catch((res) => {
        //             console.log(res);
        //         }, []);
        // }
        // setSubmitted(false)
        },[]
    );

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    if (!ready) {
        redirect({pathname: '/channels', state: "/events/discover"})
    }

    return(
        <div className="slaw-map">
            <h1>
                Events{" "}
                <span role="img" aria-label="run">
                    🏃‍♀️🏃‍♂️
                </span>
            </h1>

            <Locate panTo={panTo} />
            
            <div className="search">
                <Combobox onSelect={handleSelect}>
                    <ComboboxInput
                        value={value}
                        onChange={handleInput}
                        disabled={!ready}
                        placeholder="Search your location"
                    />
                    <ComboboxPopover>
                        <ComboboxList className="search-list">
                            {status === "OK" &&
                                data.map(({ description, idx }) => (
                                    <ComboboxOption key={idx} value={description} className="search-item"/>
                                ))}
                        </ComboboxList>
                    </ComboboxPopover>
                </Combobox>
            </div>

            <GoogleMap mapContainerStyle={mapContainerStyle}
                zoom={11}
                center={center}
                options={options}
                onLoad={onMapLoad}
            >
            {markers.map((activity, idx) => (
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
                            <label>Select A Channel to Add Event To
                                    <select required={true} onChange={handleChannel}>
                                    <option value="" selected={channel ? false : true} disabled={true}>Select an channel</option>
                                    {user.channels.map((usersChannel, idx) => (
                                    <option key={idx} value={usersChannel} selected={channel === usersChannel ? true : false}>{channels[usersChannel].title}</option>
                                    ))}
                                </select>
                            </label>
                            <button onClick={() => handleCreateEvent({ title: selectedActivity.assetName, description: selectedActivity.assetChannels[0].channel.channelDsc, participants: [user.id]})}>Add Event to Channel</button>
                            <p className="success-message">{successMessage ? "Success! This event has been added to your channel 🙌" : ""}</p>
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