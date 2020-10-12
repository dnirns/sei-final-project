# General Assembly SEI Final Project, Solo - ‘An Exquisite Corpse’

## Technical Brief:

* **Build a full-stack application** by making your own Front and Back-end.
* **Use a Python Django API** using Django REST Framework to serve your data from a Postgres database.
* **Consume your API with a separate Frontend** built with React.
* **Deploy your app online.** Make it publicly accessible.
* **Time Frame**: 7 days.
* **Choice to work solo or in a group**. (I chose to work solo for this one).

## Technologies:

* JavaScript
* React.js
* Python
* Django
* Konva.js & HTML Canvas
* CSS & Material UI
* Heroku (deployment)

## Overview:

As my final project for the General Assembly SEI course, I chose to make a drawing app using Konva.js inside of a React project to work with HTML canvas. The app is full-stack, with a Django back-end.

The basic concept is for the user to take part in creating an [‘Exquisite Corpse’](https://en.wikipedia.org/wiki/Exquisite_corpse) drawing; a simple drawing game in which someone draws a head, folds the paper, then passes it to someone else who draws the body, then again to someone else to draw the legs. When unfolded, it reveals a unique/weird/funny composition of a whole person/animal/thing.

In essense the concept is quite simple, I’d allow someone to pick to draw whichever part of the image they chose, then submit it in order to be presented with their drawing combined into a full picture randomly generated from the rest of the database of images from previous users. With their original drawing in turn being saved to the database for future drawings to be composed from.

The app requires a user to make an account before being able to submit a drawing or view the rest of the database, however a viewer can still see a randomly generated example of a full drawing without logging in.

After researching various ways to use HTML canvas techniques to build the drawing functionality, I ended up using [Konva.js](https://konvajs.org/) as it seemed to be more adaptable to using with React than some other options like [P5.js](https://p5js.org/).



## Challenges:
Learning to use a completely new library like Konva and having never used HTML canvas at all prior to starting this project, it was a **lot** to take on board in a very short space of time, so the learning curve was quite steep when working out how to turn the idea into a functioning app.

It was really rewarding when those parts started coming together though and I began to get more comfortable trying different ideas and being more creative with my code as it progressed.


## Resources:

* [Konva.js](https://konvajs.org/)
* [Exquisite Corpse (Wikipedia)](https://en.wikipedia.org/wiki/Exquisite_corpse)

## Deployed Site:

[An Exquisite Corpse](https://an-exquisite-corpse.herokuapp.com/)
