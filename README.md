# squandr

## Installation
``` bash
yarn install # or npm
```

## Run development server
``` bash
yarn run dev # or npm
```

and open `localhost:8080` in your browser

## TODO

- I was working on an improvement of the box packing. Basically I want the squares to be packed in a way that they are as large as possible while still fitting the screen. I already thought of a better algorithm, and got some tips on [Stack Overflow](https://stackoverflow.com/questions/53041297/finding-the-largest-possible-scaling-factor-for-squares-that-are-box-packed-give/53064877) on how to improve it even more. Right now it kind of sucks (see `addElements` method in `src/MainContainer.js` )

- Obviously things should have better names than 'MainContainer' and 'ContainerElement'

- The amount of money should be displayed on the squares

- I thought it would be cool if you could drag and drop one square into another, so that the other would fill up, and you could see that this square is x percentage of this square (by comparing sizes but also by showing the actual percentage value)

- When you click the square, I thought maybe a window/dialog could open where you could see the metadata (source where the amount of money is based on, short description, is it a one time thing or a yearly thing, etc.)

- The current JSON files are fine for testing, but eventually everything should probably be put into MongoDB

- Allowing user submissions

- Picking a category or just the squares that you are actually interested before starting this part of the application

- Better graphic design/UI/UX

- Obviously a lot more, also everything is open for discussion! So don't hesitate to branch off and go crazy with it, or start discussions in the issues/wiki (when that is set up)
