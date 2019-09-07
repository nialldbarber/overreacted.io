---
title: Higher Order Functions & Arrays
date: '2019-09-05'
spoiler: Understanding the basics
---

### Problem
In JavaScript you often need to parse data and return results from it. This can be anything from looping over an array of clients to see which ones have a profit of over £1 million (`filter`) - to mapping an array of dogs to get their age but in dog years (`map`). 
 
I can speak from personal experience that when tasked with working these things out (especially as a beginner), achieving this was hard. Luckily with ES6 we have numerous ways we can acheive this, with the added bonus that the syntax is easy to reason about. 

In this post I'll show the old and new ways of solving these problems. 

---
### `forEach`
Let's say we have an array of dogs: 

```jsx
const doggos = [
  { name: "Lassie", age: 2 },
  { name: "Colin", age: 8 },
  { name: "Borko", age: 13 },
]
```
and we want to simply return all of the dog names.The old tried and tested way of achieving this would be a `for loop`. 

```jsx
for (let i = 0; i < doggos.length; i++) {
  console.log(doggos[i].name)
}

// Lassie, Colin, Borko
```
Let's look at this with the `forEach` method. 

```jsx
doggos.forEach(function(dog) {
  console.log(dog.name)
})

// Lassie, Colin, Borko
```

Ah much better! It's cleaner and much easier to reason about. But it could be shortened by using ES6 syntax and by destructuring the array. 

```jsx
doggos.forEach(({ name }) => console.log(name))

// Lassie, Colin, Borko
```

---

### `filter`
Suppose you want to find out what age millionaires became billionaires (you know, to make yourself feel even worse than you already do), and see if any of them became a billionaire before they were 35. 

```jsx
const richPeeps = [
  { name: "Warren Buffett", billionaire: 56 },
  { name: "Bill Gates", billionaire: 31 },
  { name: "Jeff Bezos", billionaire: 35 },
  { name: "Larry Ellison", billionaire: 49 },
  { name: "Mark Zuckerberg", billionaire: 23 },
]
```
Again we could achieve this with a `for loop`: 

```jsx
let youngBillionaires = []

for (let i = 0; i < richPeeps.length; i++) {
  if (richPeeps[i].billionaire <= 35) {
    youngBillionaires.push(richPeeps[i])
  }  
}

console.log(youngBillionaires)

//  [
//    { name: "Bill Gates", billionaire: 31 },
//    { name: "Jeff Bezos", billionaire: 35 },
//    { name: "Mark Zuckerberg", billionaire: 23 },
//  ]
```
Seems like a lot of boilerplate code for just extracting the ages we need. Well, this can once again be massively simplified with a `filter` method: 

```jsx
const getRichPeeps = richPeeps.filter(function(peep) {
  return peep.billionaire <= 35)
})

console.log(getRichPeeps)

//  [
//    { name: "Bill Gates", billionaire: 31 },
//    { name: "Jeff Bezos", billionaire: 35 },
//    { name: "Mark Zuckerberg", billionaire: 23 },
//  ]
```
Not bad! But I think we can shorten this even further like before. 

```jsx
const getRichPeeps = richPeeps.filter(({ billionaire }) => billionaire <= 35)

console.log(getRichPeeps)

//  [
//    { name: "Bill Gates", billionaire: 31 },
//    { name: "Jeff Bezos", billionaire: 35 },
//    { name: "Mark Zuckerberg", billionaire: 23 },
//  ]
```

---

### `map`
We got a list of dogs from the `doggos` array earlier with a `forEach` method. But what if we wanted to get the age of each dog in dog years? 

```jsx

const doggos = [
  { name: "Lassie", age: 2 },
  { name: "Colin", age: 8 },
  { name: "Borko", age: 13 },
]

```

This (as you may have guessed) can be achieved with a `for loop`: 

```jsx

let doggosAge = []

for (let i = 0; i < doggos.length; i++) {
  doggosAge.push(doggos[i].age * 7)
}

console.log(doggosAge)

// [14, 56, 91]
```

With the `map` method, we can shorten this and make it more readable. 

```jsx

const goodBoiz = doggos.map(function(boi) {
  return boi.age * 7
})

console.log(goodBoiz)

// [14, 56, 91]
```

There's not a lot of logic going on here, so we can shorten this with ES6.

```jsx

const goodBoiz = doggos.map(({ age }) => age * 7)

console.log(goodBoiz)

// [14, 56, 91]
```

---

### `reduce`
Say you want to find out how much money you have in your bank from the saving you've put in. 

We start with an array of savings you've put in: 

```jsx

const bankAccount = [50, 5, 15, 21, 35, 65, 100, 60, 200]

```

To get the total amount of this array without a higher order function, you could use a `for loop`: 

```jsx

let savings = 0

for (let i = 0; i < bankAccount.length; i++) {
  savings += bankAccount[i]
}

console.log(savings);

// 551

```

Now this isn't too hard to understand, but it can be simplified with a `reduce` method: 

```jsx

const mySavings = bankAccount.reduce(function(accumulator, currentValue) {
  return accumulator + currentValue
})

console.log(mySavings);

// 551

```

This syntax is much easier to reason about. The method takes an accumulator argument, which stores the value of the array as you loop through it and a current value argument that represents the current value when you are iterating through the array. 

Once again, this can be shortened to a one-liner: 

```jsx

const mySavings = bankAccount.reduce((accumulator, currentValue) => accumulator + currentValue)

console.log(mySavings)

// 551

```
