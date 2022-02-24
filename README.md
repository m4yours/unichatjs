# UniChatJS: Simple unichat-to-unichat with WebRTC #

UniChatJS provides a complete, configurable, and easy-to-use unichat-to-unichat API built on top of WebRTC, supporting both data channels and media streams.

## Live Example

Here's an example application that uses both media and data connections: https://glitch.com/~unichatjs-video. The example also uses its own [UnichatServer](https://github.com/nzldev/unichatjs-server).

## Setup


**Include the library**

  with npm:
        `npm install unichatjs`
        
  with yarn:
        `yarn add unichatjs`
  ```js
  // The usage -
  import Unichat from 'unichatjs';
  ```


**Create a Unichat**  
```javascript
var name = prompt('What's your name?');

var peer = new Peer(name, { 
  host: 'localhost',
  port: 9000,
  secure: true
});

// peer.on('open', function(name){
//   alert(name + ' connected');
// });

or
const unichat = new Unichat('pick-an-id'); 
// You can pick your own id or omit the id if you want to get a random one from the server.
```

## Data connections
**Connect**
```javascript
const conn = unichat.connect('another-peers-id');
conn.on('open', () => {
  conn.send('hi!');
});
```
**Receive**
```javascript
unichat.on('connection', (conn) => {
  conn.on('data', (data) => {
    // Will print 'hi!'
    console.log(data);
  });
  conn.on('open', () => {
    conn.send('hello!');
  });
});
```

## Media calls
**Call**
```javascript
navigator.mediaDevices.getUserMedia({video: true, audio: true}, (stream) => {
  const call = unichat.call('another-peers-id', stream);
  call.on('stream', (remoteStream) => {
    // Show stream in some <video> element.
  });
}, (err) => {
  console.error('Failed to get local stream', err);
});

```
**Answer**
```javascript
unichat.on('call', (call) => {
  navigator.mediaDevices.getUserMedia({video: true, audio: true}, (stream) => {
    call.answer(stream); // Answer the call with an A/V stream.
    call.on('stream', (remoteStream) => {
      // Show stream in some <video> element.
    });
  }, (err) => {
    console.error('Failed to get local stream', err);
  });
});
```

## Running tests

```bash
npm test
```

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- |
| last 4 versions| last 4 versions| 12.1+

## Safari

1. Safari supports only string data when sending via DataConnection. Use JSON serialization type if you want to communicate with Safari. By default, DataConnection uses Binary serialization type.

## FAQ

Q. I have a message ```Critical dependency: the request of a dependency is an expression``` in browser's console

A. The message occurs when you use UniChatJS with Webpack. It is not critical! It relates to Parcel https://github.com/parcel-bundler/parcel/issues/2883 We'll resolve it when updated to Parcel V2.


## Links
 
### [UnichatServer](https://github.com/nzldev/unichatjs-server)


## License

UniChatJS is licensed under the [MIT License](https://tldrlegal.com/l/mit).

