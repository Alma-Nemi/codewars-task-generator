document.getElementById('generateBtn').addEventListener('click', async () => {
  const id = document.getElementById('kataId').value.trim();
  const code = document.getElementById('solutionCode').value.trim();
  const output = document.getElementById('output');

  output.textContent = "⏳ Processing...";

  try {
    const res = await window.electronAPI.generateTask({ id, code });

    if (res.success) {
      output.textContent = `✅ Success:\n${JSON.stringify(res.result, null, 2)}`;
    } else {
      output.textContent = `❌ Error:\n${res.error}`;
    }
  } catch (err) {
    output.textContent = `❌ Unexpected error:\n${err.message}`;
  }
});

document.getElementById('cleanBtn').addEventListener('click', () => {
  document.getElementById('kataId').value = '';
  document.getElementById('solutionCode').value = '';
  document.getElementById('output').textContent = '';
});

document.getElementById('exitBtn').addEventListener('click', () => {
  window.electronAPI.exitApp();
});

document.getElementById('openArchiveBtn').addEventListener('click', () => {
  window.electronAPI.openArchive();
});
