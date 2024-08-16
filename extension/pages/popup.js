// Handles click event for getting API-Key
document.getElementById('get-key').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'getCookies' }, response => {
      	// Getting the output area
		const output = document.getElementById('key-output');
		
		if (response.success) {
        	output.textContent = response.key;
      	}
		else {
			output.textContent = "Failed to get key! Please try again.";
		}
    });
});

// Handles copying the key using the button
document.getElementById('copy-key').addEventListener('click', () => {
	navigator.clipboard.writeText(document.getElementById('key-output').value);
})
  