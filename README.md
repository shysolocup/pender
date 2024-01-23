# Promise Payloads
JavaScript package for promises that stops pending data from getting called upon until it is awaited<br>
Payloading reduces hang when getting large amounts of data

- easy to use
- open source

<br>

```console
npm i pyld
```
```console
npm i paishee/pyld
```

<br>

<table>
<tr>
<td>JS</td><td>Output</td>
</tr>
<tr>
<td>
  
```js
require('node-fetch');
const payload = require('pyld');

let payload = fetch.payload("https://google.com");

console.log(payload);
console.log(await payload);
```

</td>

<td>

```js
Payload <pending>        

_Response { ... }
```
  
</td>

</tr>
</table>
