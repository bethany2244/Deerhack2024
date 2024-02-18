## Transformit ⭐


## Inspiration
As students who study away from home, we often found ourselves relying on public transit to get from place to place. While this was often perfectly acceptable, there was one thing we always hated about public transit: transfers. To us, the only purpose of a transfer was to make it take longer to get from point A to B, and they were a massive waste of time. On the other hand, as university students, we spent much of our time working and studying with little free time. When we did have free time, we spent most of it getting dopamine hits from our phones or computers, making it difficult for us to truly recharge our mind. This project is our attempt at resolving these issues by giving people like us something to do to slow down and relax while waiting for their next bus. In addition, by making transfers better, we hoped to increase the appeal of public transit as a whole and encourage its use over less eco-friendly transportation methods.


## What it does
Transformit allows users to enter two locations they want to travel between by transit. Then, it shows the user the route to travel along, as well as the points of interest at each transit stop/transfer.


## How we built it
Our project mainly used MapBox API to fetch desired points of interest and HERE API to fetch the transit locations based on users search results from the navigation bar. We used MapBox API and its attributes to display the point of interest near the transit locations retrieved  from HERE API. In addition, we used the MapBox GL JS library to create most of our front-end code, including the navigation controller and the map itself. The rest of our front-end code was created with anime.js and css for a clean web page design.



## Challenges we ran into
We initially struggled a lot with which APIs to use in our project; many of them didn’t have everything we were looking for, and the ones that did often required payment or billing information. We settled on using both MapBox API and HERE API to cover everything we needed, but that meant we needed to grasp both MapBox API and HERE API in a short amount of time. We ran into difficulties when trying to fetch the list of coordinates from a start point to an end point by retrieving the coordinates from the input search bar. We also had a hard time with fetching information from the MapBox API because of the complicated structure of the JSON objects. In addition, many of our tools were either very niche or outdated, meaning there was very little outside documentation to draw from; we had to experiment and find workarounds to do what we wanted. However, by collaboration and actively trying out different solutions, we were able to resolve our challenges, retrieve all of the data from the two API, and populate the information successfully to our web application interface. 



## Accomplishments that we're proud of
One accomplishment is that we are resilient and encouraging to each other through this journey. Despite facing many difficulties and failures, we still keep a positive attitude and actively seek different approaches to resolve the problem. We are also very proud of the supportive and collaborative culture of our team. By helping each other and discussing our own implementation ideas of building our application, we not only were able to incorporate innovative ideas into our application but also gained enriching experience in software development practice.



## What we learned

Our journey has been an incredible experience in exploring more API, Javascript, and Node modules to efficiently display transit routes and points of interest for users to explore during their commute journey. We started this project with very little knowledge about how to even access an API, but we managed to learn so much about using libraries, communicating and working in a team, and connecting our frontend and backend code. Even though we only had a short amount of time, the knowledge and experience that we gained was invaluable.



- [Installation]
- [Usage]


## Installation

1. Clone the repository: `https://github.com/bethany2244/Deerhack2024.git`
2. Install dependencies: `npm install`



