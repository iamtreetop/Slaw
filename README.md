# Slaw

## Overview

Slaw, which stands for Searchable Logs of All Workouts, will be accompanied by a web application which lets users join and create channels, todos, events, and communicate via a live chat with members of their channels! Slaw is a Health and Fitness Social Media application that allows a user to explore many differents communities and allow them to interact with others. Users can form communities with those who have common fitness goals.

Link to Live App: [Slaw](https://slaw-app.herokuapp.com/)

## Engineers on Project
* [Tri Ta](https://www.linkedin.com/in/trivta/)
* [Jacky Li](https://www.linkedin.com/in/xlihuang/) 
* [Kevin Lai](http://linkedin.com/in/kevinlai247)
* [JD Buendia](https://www.linkedin.com/in/jd-buendia-66ab7483/)

## Technologies

**Frontend**
* React/Redux
* JavaScript
* HTML/CSS

**Backend**
* Express.js
* Node.js
* MongoDB

**External Technologies**
* AWS S3 (Connected backend to AWS S3 to host all project images in order to reduce page load and improve server performance, ensuring content security with AWS IAM

* Socket.io (Utilized Socket.io to enable realtime, bidirectional communication between web cliets and servers for live-chat)

* Google Maps API and Active.com API (Leveraged Google Maps and Active.com API to display live events happening within a specific search location)


## Features

This application was designed and developed within a one-week time period. Below are the main features we were able to implement.

**Login**
* Secure User Authorization using BCrypt hashing
* User Authorization errors are displayed in the form
* Demo-Login for users who want to test the website

[![Image from Gyazo](https://i.gyazo.com/8f3f91029d900b9720781dc1e07c2d01.gif)](https://gyazo.com/8f3f91029d900b9720781dc1e07c2d01)

**Channel**
* User's are allowed to create or join channels.
* General event page will be created immediately as default event for each channel to explain what can be done within a channel

[![Image from Gyazo](https://i.gyazo.com/6a5da16d99b8c425e473ba090165855c.gif)](https://gyazo.com/6a5da16d99b8c425e473ba090165855c)

* If created or joined, user will be redirected to the general event page within the channel

[![Image from Gyazo](https://i.gyazo.com/e2b3c1a35e1f1aa1805243a662469d95.gif)](https://gyazo.com/e2b3c1a35e1f1aa1805243a662469d95)

**Events/Event Checklist**
* User's that are part of channel are able to create events
* Other members in the channel are able to commit to the event and the participants tab will show who have committed to that specific event
* Users are allowed to add to the event checklist and list items that must be done 
* Users are allowed to toggle the checklist to saw they have completed the task

[![Image from Gyazo](https://i.gyazo.com/c1a39aeafac647c0143c690697ca005c.gif)](https://gyazo.com/c1a39aeafac647c0143c690697ca005c)

**Announcements**
* User's are allowed to create announcements for specific events and have them displaye

// Place holder for announcements picture

**Google Maps/Active API**
* User's can click on discover events within a channel or click the banner on the navbar to be directed to event discover page
* Type a location to display events from Active.com in that specific area
* Map will be zoomed and markers will be placed on the event location
* Description allows users to add the event to a specific channel or go to the register link provided by Active.com

**Live Chat**
* Within each channel, user's can communicate with each other in real-time
* Each channel is chat-specific and will be private within the channel
* FUTURE IMPLEMENTATION - Provide notifications for the channel's


## Code Snippets

```
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
                    data.map(({ id, description }) => (
                        <ComboboxOption key={id} value={description} className="search-item"/>
                    ))}
            </ComboboxList>
        </ComboboxPopover>
    </Combobox>
</div>
```

Utilizing Google API’s usePlacesAutocomplete, we were able to render a search box onto our map equipped with autocomplete suggestions. As shown in the code snippets, the Combobox element has an onSelect event handler.

```
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
```
    
In our onSelect event handler function called handleSelect, which accepts an address as an argument, we set the state for an object we instantiated using React Hooks called address. In addition, we set the state for another object called submitted to true. We then use the address state as a query to send the http  request to Active.com to receive the events that match the query. For each one of the results,  we create markers on the map for them, that upon a click, will render a window featuring the name, description, and option to create add the event to ones channel.
