# Ritz Carlton Car Service

## Table of Contents
 - [Table of Contents](#table-of-contents)
 - [Demo](#demo)
 - [Contributors](#contributors)
 - [About](#about)
 - [What does the app do?](#what-does-the-app-do)
 - [Technologies](#technologies)
 - [SetUp and Requirements](#setup-and-requirements)
 - [Scripts](#scripts)
 - [How to Use?](#how-to-use)

## Demo
![GIF OF DEMO](https://thumbs.gfycat.com/FamiliarAdvancedConey-size_restricted.gif)

## Contributors
* [Taylor George](https://github.com/atgeorge11)
* [James Jamail](http://github.com/jamesjamail)
* [Keenan Johns]
* [Jonathan Keane](https://github.com/jkeane889)
* [Mario Morales]
* [Rob Peschke](https://github.com/RSP531)

## About
Ritz Carlton Ride Service is a ride service application designed for use by private ride services with a defined client pool.

In addition to performing all scheduling operations automatically, our application streamlines communication and record-keeping among clients, drivers, and managers.

## What does the app do?
Users can create and customize an account which allows them to schedule and keep track of upcoming rides.

Users can decide between requesting a ride immediately or scheduling one at any point in the future.

Users will be continuously updated via text, phone, and push notifications as to the status and timing of upcoming pickups.

Users can access route, arrival and departure time, and car and driver information for any of their scheduled pickups.

Users can see the predicted route for any given pickup, whether scheduled yet or not, since the app's UI is structured around a map component.

Drivers can keep track of all of their future scheduled pickups and will be notified whenever one is added.

Data concerning past pickups is stored, allowing it to inform management decisions.

App is compatible with both Android and iOS platforms.

## Technologies
#### Front End
* React-Native
* React-Redux
* Expo
* React-Native Paper
* 
#### Back End
* MySQL
* Express
* Node.js
* AWS RDS
#### Additional Technologies
* Firebase
* Mailjet
* Docker
* Travis CI
* Google Maps API
* AWS Elastic Beanstalk

## Future Plans

Ritz Carlton Ride Share was developed as a tech demo. As such, its core features are fully functional, but we plan to introduce many more before deployment. These include:

* Ride share functionality
* A management console that managers can use to add driver accounts, schedule driver shifts, and view all data for past and future pickups
* A map and directions feature for the driver console
* A more reactive series of app state changes and notifications for both the user and driver consoles immediately before, during, and after pickup (making use of Socket.IO)
* Driver time card tracking
