# General Assembly SEI Final Project ‘An Exquisite Corpse’ 🎨

## Technical Brief:

* **Build a full-stack application** by making the Front and Back-end.
* **Use a Python Django API** using Django REST Framework to serve your data from a Postgres database.
* **Consume your API with a separate Frontend** built with React.
* **Deploy your app online.** Make it publicly accessible.
* **Time Frame**: 7 days.

## Technologies:

* JavaScript
* React.js
* Python
* Django
* Konva.js & HTML Canvas
* CSS & Semantic UI
* Heroku (deployment)

## Demo:

Registration and login:



![registration](./frontend/src/assets/readme-gifs/exquisite-corpse-demo-register.gif)

![login](./frontend/src/assets/readme-gifs/exquisite-corpse-demo-login.gif)

Homepage and starting a drawing:

![demo-1](./frontend/src/assets/readme-gifs/exquisite-corpse-demo-1.gif)

![demo-2](./frontend/src/assets/readme-gifs/exquisite-corpse-demo-2.gif)


Completing your drawing and saving to the back-end, then presented with your completed image:

![demo-3](./frontend/src/assets/readme-gifs/exquisite-corpse-demo-3.gif)

Viewing the gallery of all the other users' previous drawings:

![demo-4](./frontend/src/assets/readme-gifs/exquisite-corpse-demo-4.gif)



## Overview:

As my final project for the General Assembly SEI course, I chose to make a drawing app using Konva.js inside of a React project to work with HTML canvas. The app is full-stack, with a Django back-end.

The basic concept is for the user to take part in creating an [‘Exquisite Corpse’](https://en.wikipedia.org/wiki/Exquisite_corpse) drawing, a simple drawing game in which someone draws a head, folds the paper, then passes it to someone else who draws the body, then again to someone else to draw the legs. When unfolded, it reveals a unique/weird/funny composition of a whole person/animal/thing.

The user chooses to draw a part of the body (head, body or feet). Once completed, they are presented with a full drawing composed of their image combined with randomly generated drawings from previous users. Their original drawing would then be saved to the back-end and used in future users compositions.

The app requires a user to make an account before being able to submit a drawing or view the rest of the database however a viewer can still see a randomly generated example of a full drawing without logging in.

After researching various ways to use HTML canvas techniques to build the drawing functionality, I ended up using [Konva.js](https://konvajs.org/) as it seemed to be more adaptable to React than some of the other options like [P5.js](https://p5js.org/).


## Challenges:
Learning to use a completely new library like Konva and having never used HTML canvas at all prior to starting this project, it was a **lot** to take on board in a very short space of time, so the learning curve was quite steep when working out how to turn the idea into a functioning app.

It was really rewarding when those parts started coming together though and I began to get more comfortable trying different ideas and being more creative with my code as it progressed.


## Resources:
* [Konva.js](https://konvajs.org/)
* [Exquisite Corpse (Wikipedia)](https://en.wikipedia.org/wiki/Exquisite_corpse)

## Deployed Site:
[An Exquisite Corpse](https://an-exquisite-corpse.herokuapp.com/)
