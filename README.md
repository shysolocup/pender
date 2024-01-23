# Promise Pender
JavaScript package for promises that stops data from getting called upon until it is awaited<br>
Pending data reduces lag when getting large amounts of data at one time

- easy to use
- open source

<br>

```console
npm i pender
```
```console
npm i paishee/pender
```

<br>

<table>
<tr>
<td>JS</td><td>Output</td>
</tr>
<tr>
<td>
  
```js
const pend = require('pender');
import('node-fetch');

let res = pend( () => fetch("https://google.com") );

console.log(res);
console.log(await res);
```

</td>

<td>

```js
Pender Promise <pending>        

_Response { ... }
```
  
</td>

</tr>
</table>
