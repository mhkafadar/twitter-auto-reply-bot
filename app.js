const Twit = require('twit');
const config = require('./config');
const T = new Twit(config);

console.log('bot started');

const stream = T.stream('statuses/filter', { track: 'javascript', language: 'en'})

let hi;
function hiMaker() {
	let hiNumber;
	function getRandomInt() {
		hiNumber = Math.floor(Math.random() * Math.floor(3));
	}
	getRandomInt();
	if (hiNumber === 0) { hi = 'Hello' }
	else if (hiNumber === 1) { hi = 'Hi'}
	else if (hiNumber === 2) { hi = 'Hey'}	
	return hi;
}
console.log(hiMaker());

stream.on('tweet', function(tweet) {
	let hi = hiMaker();
	let params = {
			status: '@' + tweet.user.screen_name + ' ' + hi + ' I want to show you that..',
			in_reply_to_status_id: tweet.id_str
	}
	console.log(tweet.text);
	T.post('statuses/update', params, function(err, data, response) {
		if (err) {console.log(err)}
		else {
			console.log(data.text);
		}
	})
})
