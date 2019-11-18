# keyboard-close-reset-scroll

On iOS devices, the keyboard may push the page up to the top, and will not reset automatically when the keyboard closed.
This module can solve this problem, avoid page dislocation.

## Install

`npm install kcrs --save`

## Uses

```js
import kcrs from 'krcs';

// init module, will init event listeners
var success = kcrs.init();
console.log('kcrs init success: ', success);

// destroy module, will remove event listeners
kcrs.destroy();
```

## License

The MIT License (MIT)

