# UniChatJS: Simple unichat-to-unichat with WebRTC #

UniChatJS provides a complete, configurable, and easy-to-use unichat-to-unichat API built on top of WebRTC, supporting both data channels and media streams.

## Live Example

Here's an example application that uses both media and data connections: https://glitch.com/~unichatjs-video. The example also uses its own [PeerServer](https://github.com/nzldev/unichatjs-server).

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

### [Documentation / API Reference](https://unichatjs.com/docs.html)

### [PeerServer](https://github.com/nzldev/unichatjs-server)

### [Discuss UniChatJS on our Telegram Channel](https://t.me/joinchat/ENhPuhTvhm8WlIxTjQf7Og)

### [Changelog](https://github.com/nzldev/unichatjs/blob/master/changelog.md)

## Contributors

This project exists thanks to all the people who contribute.
<a href="https://github.com/nzldev/unichatjs/graphs/contributors"><img src="https://opencollective.com/unichat/contributors.svg?width=890&button=false" /></a>

## Backers

Thank you to all our backers! [[Become a backer](https://opencollective.com/unichat#backer)]

<a href="https://opencollective.com/unichat/backer/0/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/0/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/1/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/1/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/2/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/2/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/3/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/3/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/4/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/4/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/5/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/5/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/6/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/6/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/7/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/7/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/8/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/8/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/9/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/9/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/10/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/10/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/11/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/11/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/12/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/12/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/13/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/13/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/14/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/14/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/15/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/15/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/16/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/16/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/17/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/17/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/18/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/18/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/19/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/19/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/20/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/20/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/21/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/21/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/22/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/22/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/23/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/23/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/24/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/24/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/25/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/25/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/26/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/26/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/27/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/27/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/28/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/28/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/29/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/29/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/30/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/30/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/31/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/31/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/32/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/32/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/33/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/33/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/34/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/34/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/35/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/35/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/36/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/36/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/37/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/37/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/38/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/38/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/39/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/39/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/40/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/40/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/41/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/41/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/42/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/42/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/43/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/43/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/44/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/44/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/45/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/45/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/46/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/46/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/47/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/47/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/48/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/48/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/49/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/49/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/50/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/50/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/51/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/51/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/52/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/52/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/53/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/53/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/54/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/54/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/55/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/55/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/56/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/56/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/57/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/57/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/58/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/58/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/59/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/59/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/60/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/60/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/61/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/61/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/62/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/62/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/63/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/63/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/64/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/64/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/65/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/65/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/66/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/66/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/67/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/67/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/68/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/68/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/69/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/69/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/70/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/70/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/71/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/71/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/72/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/72/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/73/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/73/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/74/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/74/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/75/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/75/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/76/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/76/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/77/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/77/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/78/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/78/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/79/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/79/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/80/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/80/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/81/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/81/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/82/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/82/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/83/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/83/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/84/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/84/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/85/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/85/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/86/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/86/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/87/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/87/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/88/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/88/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/89/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/89/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/90/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/90/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/91/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/91/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/92/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/92/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/93/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/93/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/94/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/94/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/95/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/95/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/96/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/96/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/97/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/97/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/98/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/98/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/99/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/99/avatar.svg?requireActive=false"></a>
<a href="https://opencollective.com/unichat/backer/100/website?requireActive=false" target="_blank"><img src="https://opencollective.com/unichat/backer/100/avatar.svg?requireActive=false"></a>


## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/unichat#sponsor)]

<a href="https://opencollective.com/unichat/sponsor/0/website" target="_blank"><img src="https://opencollective.com/unichat/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/unichat/sponsor/1/website" target="_blank"><img src="https://opencollective.com/unichat/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/unichat/sponsor/2/website" target="_blank"><img src="https://opencollective.com/unichat/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/unichat/sponsor/3/website" target="_blank"><img src="https://opencollective.com/unichat/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/unichat/sponsor/4/website" target="_blank"><img src="https://opencollective.com/unichat/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/unichat/sponsor/5/website" target="_blank"><img src="https://opencollective.com/unichat/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/unichat/sponsor/6/website" target="_blank"><img src="https://opencollective.com/unichat/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/unichat/sponsor/7/website" target="_blank"><img src="https://opencollective.com/unichat/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/unichat/sponsor/8/website" target="_blank"><img src="https://opencollective.com/unichat/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/unichat/sponsor/9/website" target="_blank"><img src="https://opencollective.com/unichat/sponsor/9/avatar.svg"></a>



## License

UniChatJS is licensed under the [MIT License](https://tldrlegal.com/l/mit).

