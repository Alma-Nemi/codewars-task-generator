document.getElementById('generateBtn').addEventListener('click', async () => {
  const id = document.getElementById('kataId').value.trim();
  const code = document.getElementById('solutionCode').value.trim();
  const rawTests = document.getElementById('rawTests').value.trim();

  const output = document.getElementById('output');
  output.textContent = "⏳ Processing...";

  const res = await window.electronAPI.generateTask({ id, code, rawTests });

  if (res.success) {
    output.textContent = `✅ Success:\n${JSON.stringify(res.result, null, 2)}`;
  } else {
    output.textContent = `❌ Error:\n${res.error}`;
  }
});