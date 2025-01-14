const uploadForm = document.getElementById('uploadForm');
    const output = document.getElementById('output');

    uploadForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const fileInput = document.getElementById('fileInput');
      const file = fileInput.files[0];

      if (!file) {
        output.textContent = 'Please select a file to upload.';
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
          method: 'POST',
          headers: {
            pinata_api_key: '7365fd46eaaaf34afb07',
            pinata_secret_api_key: '8320154debb644a8a06e860edfb9c76a0cc831adce6cd1e4dc352dc15d0c82f8',
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const data = await response.json();
        output.innerHTML = `
          <p>File uploaded successfully!</p>
          <p><strong>IPFS Hash:</strong> ${data.IpfsHash}</p>
          <a href="https://gateway.pinata.cloud/ipfs/${data.IpfsHash}" target="_blank">View on IPFS</a>
        `;
      } catch (error) {
        console.error(error);
        output.textContent = 'Failed to upload the file. Please check your API keys or try again.';
      }
    });