chrome.runtime.onInstalled.addListener(() => {
  	console.log('X Auth Helper installed!');
});

/**
 * The domain whose cookies are to be fetched.
 */
const domain = 'x.com';
  
/**
 * Gets cookies for x.com and encoding them to base64.
 */
async function getCookies() {
    // Getting the cookies for the given domain
	let cookies = await chrome.cookies.getAll({ domain: domain });
      	
	// Filter out required cookies
	cookies = cookies.filter(item => item.name == 'auth_token' || item.name == 'ct0' || item.name == 'kdt' || item.name == 'twid');

	/** Stores the key */
	let key = '';

	// If all required cookies are present
	if (cookies.length == 4) {
		// Appending all cookies to a cookie string
		for (const {name, value} of cookies) {
			key += `${name}=${value};`;
		}

		// Encoding the cookies to base64 to get key
		key = btoa(key);
	}

	return key;
}
  
// Listener for messages from popup
chrome.runtime.onMessage.addListener((request, sender, respond) => {
    if (request.action === 'getCookies') {
      	getCookies().then(key => {
			// If key generation was successful
			if (key.length) {
				respond({ success: true, key: key })
			}
			// If key generation failed
			else {
				throw new Error();
			}
		}).catch(err => respond({ success: false }));
      	
		return true;
    }
}); 