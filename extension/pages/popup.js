const getKeyBtn = document.getElementById('get-key');
const copyKeyBtn = document.getElementById('copy-key');
const keyOutput = document.getElementById('key-output');

getKeyBtn.addEventListener('click', () => {
  getKeyBtn.textContent = 'Fetching...';
  getKeyBtn.disabled = true;

  chrome.runtime.sendMessage({ action: 'getCookies' }, (response) => {
    getKeyBtn.textContent = 'Get API Key';
    getKeyBtn.disabled = false;

    if (response?.success) {
      keyOutput.textContent = response.key;
      keyOutput.classList.replace('error', 'success') || keyOutput.classList.add('success');
    } else {
      keyOutput.textContent = 'Failed to get key. Make sure you are logged into X.';
      keyOutput.classList.replace('success', 'error') || keyOutput.classList.add('error');
    }
  });
});

copyKeyBtn.addEventListener('click', async () => {
  const text = keyOutput.value || keyOutput.textContent;
  if (!text || text.startsWith('Failed') || text.startsWith('Click')) return;

  try {
    await navigator.clipboard.writeText(text);
    copyKeyBtn.textContent = 'Copied!';
    copyKeyBtn.classList.add('btn-copied');

    setTimeout(() => {
      copyKeyBtn.textContent = 'Copy to Clipboard';
      copyKeyBtn.classList.remove('btn-copied');
    }, 2000);
  } catch (err) {
    console.error('Copy failed:', err);
  }
});

document.getElementById('apex-link').addEventListener('click', () => {
  chrome.tabs.create({ url: 'https://apexagents.ai' });
});
