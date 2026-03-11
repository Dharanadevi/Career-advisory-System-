# Simple-TypeWriter-React

A simple and easy to use library for typewriter effect in react

## DEMO

![Demo TypeWriter](https://github.com/uzzam-web-dev/simple-typewriter-react/blob/main/resources/typewriter-demo.gif)

## Install

#### npm
```
npm i simple-typewriter-react 
```

#### Yarn
```
yarn add simple-typewriter-react
```

#### Bun
```
bun add simple-typewriter-react
```
___

## Usage

```jsx
import React from 'react'
import SimpleTypeWriter from 'simple-typewriter-react'

const TestComponent = () => { 

    return (
        <div>
            <SimpleTypeWriter
                words={["Dream", "Believe", "Do", "Repeat"]} 
                loop={true} 
                typeSpeed={120}
                deleteSpeed={80}
                delay={1500}
                cursor={true}
                cursorStyle="|"
                styles={{fontWeight: "700", "...all other css styles"}} 
                fontSize="20px" 
                color="red" 
            />
        </ div>
    )
}

```

### Component Props

| Prop | Type | Description | Default |
|:------|:------|:-------------|:---------|
| words | array | String array holding words to show | ["Hello", "..."]|
| typeSpeed | number | Typing speed of individual characters | 80 |
| deleteSpeed | number | Delete speed of individual characters | 50 |
| delay | number | Delay between words | 1500 |
| loop | bool | Controls if words should loop after finishing | true |
| cursor | bool | Controls if cursor is displayed | trye |
| cursorStyle | string | Change the cursor style if enabled | "\|" |


