# react-native-custom-code-input

A simple react native code input component for both iOS and android plaforms.



## Import
```js
 import CodeInput from "react-native-custom-code-input";
```

## Example

```js
 <CodeInput
    onInputComplete={() => console.log('Done!')} // must pass complete prop
    number={6} // You must pass number prop
    autoFocusFirst={true} // auto-focus on first element (default true)
   />
```


and pin inputs could be achieved by obfuscation prop

```js
 <CodeInput
    obfuscation={true} // to hide input (default false)
    container={{ backgroundColor: "#fff" }} // parent view prop
    item={{ backgroundColor: "#fff" }} // child textinput prop
    onInputComplete={() => console.log('Done!')} // must pass complete prop
    number={6} // must pass number prop
    autoFocusFirst={true} // auto-focus on first element (default true)
   />
```

## props

| prop              | type                      | description                       | isRequired   | default value |
| ----------------- | ------------------------- | --------------------------------- | ------------ | ------------ |
| number            | number                    | length of code input              | not required | 6       |
| onInputComplete   | function                  | call on input completes           | required     |        |
| autoFocusFirst    | boolean                   | to focus on firt code element                    | not required| true |
| container         | style                     | parent container(view element styles) | not required | |
| item              | style                     | code element(textinput element styles)| not required|  |
| obfuscation       | boolean                   | for pin inputs                    | not required| false |
