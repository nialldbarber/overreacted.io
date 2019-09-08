---
title: Learning Svelte
date: '2019-09-07'
spoiler: 
---

### Why Svelte

It's 2019 and there is another new JavaScript framework making waves in the community. Move aside React and Vue, there's a newer, cooler and more importantly quicker framework on the block.

If you are familar with any of the main frameworks in JavaScript right now, you've most likely heard the term - virtual DOM. 

From the React docs: 
> "The virtual DOM (VDOM) is a programming concept where an ideal, or “virtual”, representation of a UI is kept in memory and synced with the “real” DOM by a library such as ReactDOM. This process is called reconciliation."

The way the virtual DOM works (in React at least) is that when new UI elements are added; a virtual DOM is created. Each element that is added is basically a node on a tree and when the state in any of these nodes, a new virtual DOM is created and diffed against the last version to see the changes. Once completed, the virtual DOM will then calculate the best possible way to insert this change into the real DOM. 

This sounds like a pretty optimal way of adding new elements to the DOM right? Well not according to the Svelte creator Rich Harris. To quote Rich Harris: 

> Virtual DOM is pure overhead

Svelte doesn't create a virtual DOM, instead it runs at build time, converting components into imperative (as opposed to declarative) code that is inserted into the DOM. The idea is that Svelte apps are quick and have the potential to be used to make huge apps that run efficiently. 

If you're familiar with [Vue](https://github.com/vuejs/vue), then you'll feel right at home with Svelte. A `.svelte` file, like Vue, is laid out in one file with scripts, styles and markup. So enough with the why, let's get our hands dirty with a project! To get our head around how Svelte behaves, we're going to make (you guessed it) a todo app.

--- 

### Set up

Firstly open up your terminal and enter `npx degit sveltejs/template todo-app && cd todo-app && npm i`. This is essentially the same thing as cloning a repo, but doesn't come with git history and finds the latest commit. Surprise surpise [Degit](https://github.com/Rich-Harris/degit) was created by the Svelte creator, Rich Harris.

Hit `npm run dev` and we're rolling! Also notice how quick that was?! 

Once this has downloaded, open your text editor of choice and open the `App.svelte` located in `src/App.svelte` and delete it's contents.

### Let's get coding!

We'll start with the basic anatomy of a Svelte file. As I said earlier it's a lot like Vue in that everything is in one file. Abstractions can and should be made, but for now we'll stick with one file. 

```html

<script>
  // JavaScript goes here
</script>

<style>
  /* CSS goes here */
</style>

<!-- HTML goes here -->

```

As you can see it's pretty simple as there is no Svelte-specific syntax here - it's just HTML. 

With that said, let's add some basic scaffolding to create our todo app. If you are a Vue aficionado, then it's just like creating `data` - if you are a React connoisseur then it's just like initialising state. With Svelte we will just create an array of objects - each one representing a todo.

```html

<script>
  let todos = [
    { id: 1, title: "Learn Svelte", completed: false },
    { id: 2, title: "Learn React", completed: false },
    { id: 3, title: "Learn Vue", completed: false }
  ];
</script>

```

Next we will add some basic styles to make our todo app somewhat ok to look at (this tutorial is not focussed on making a nice looking todo app, but rather to teach the fundamentals of Svelte - so feel free to go ham after you've finished this tutorial! 😎).

```html

<style>
  ul {
    padding: 0;		
  }

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    list-style: none;
    border-bottom: 1px solid lightgrey;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
  }
</style>

```

Great! Now we have styles we can add the structure of what our app will look like. First things first, let's add an unordered list to show our todo items. 

```html

<ul>
  <li>
    <span>Todo item</span>
    <button>❌</button>
  </li>
</ul>

```

With the structure complete, let's make this dynamic. Svelte makes no bones about being a framework with regards to logic, whilst React goes for a more 'pure' approach; with the aim of having vanilla JavaScript syntax, Svelte adopts a Svelte-specific syntax. If you've ever used Liquid before you might feel right at home. 

To loop over our todos, we need to implement each blocks: 

```html

<ul>
  {#each todos as todo}
    <li>
      <span>{todo.title}</span>
      <button>❌</button>
    </li>
  {/each}
</ul>

```

Now we have a list of todos, let's build on this by creating todos and adding them to the todo list. Within the scripts let's create an empty string where our todo input will go: 

```html 

<script>
  let newTodo = "";

  let todos = [
    { id: 1, title: "Learn Svelte", completed: false },
    { id: 2, title: "Learn React", completed: false },
    { id: 3, title: "Learn Vue", completed: false }
  ];
</script>

```

We need to associate this value with something now, otherwise it's just a useless variable. Now, in our HTML let's create a form and bind the `newTodo` value to our input. 

```html
<form>
  <input type="text" placeholder="Add todo..." bind:value={newTodo} />
  <button>✅</button>
</form>
<ul>
  {#each todos as todo}
    <li>
      <span>{todo.title}</span>
      <button>❌</button>
    </li>
  {/each}
</ul>

```

So now we have a value for a new todo, let's add that value to the `todos` array. We'll need to create a function that fires when the form submits, which adds the value in the `newTodo` to the `todos` array: 


```html

<script>
  let newTodo = "";

  let todos = [
    { id: 1, title: "Learn Svelte", completed: false },
    { id: 2, title: "Learn React", completed: false },
    { id: 3, title: "Learn Vue", completed: false }
  ];

  function addTodo(e) {
    e.preventDefault();
    if (!todoInput) return;
    todos = [
      ...todos,
      { id: Math.random(), title: todoInput, completed: false }
    ];
    todoInput = "";
  };
</script>

```

This is a pretty simple function that: 

 * Prevents the default behaviour of a form by submitting and therefore refreshing the page 
 * Checks if the `todoInput` is not empty, if it is then don't do anything
 * If `todoInput` contains a string, then add the new todo to the `todos` array by using the spread operator
 * Once that is done, clear the text in the input - ready for the next todo 

 So we have the function that adds a new todo to the `todos` array, let's now add this to the form submit event: 

 ```html
<form on:submit={addTodo}>
  <input type="text" placeholder="Add todo..." bind:value={newTodo} />
  <button>✅</button>
</form>
<ul>
  {#each todos as todo}
    <li>
      <span>{todo.title}</span>
      <button>❌</button>
    </li>
  {/each}
</ul>

```

And there you have it! A simple todo app with Svelte. 
