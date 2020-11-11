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

**Channel**
* User's are allowed to create or join channels.
* General event page will be created immediately as default event for each channel to explain what can be done within a channel
* If created or joined, user will be redirected to the general event page within the channel

**Events/Event Checklist**
* User's that are part of channel are able to create events
* Other members in the channel are able to commit to the event and the participants tab will show who have committed to that specific event
* Users are allowed to add to the event checklist and list items that must be done 
* Users are allowed to toggle the checklist to saw they have completed the task

**Announcements**
* User's are allowed to create announcements for specific events and have them displayed

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
