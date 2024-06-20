function fetchData() {
    const url = 'https://services.sentinel-hub.com/oauth/token';
    const clientId = '9b0e3953-be42-4e30-8549-5cbe91be0e5f';
    const clientSecret = '1PVB3NnfqQjBzk5ychmbJRJMoROpURBj';

    const formData = new URLSearchParams();
    formData.append('grant_type', 'client_credentials');
    formData.append('client_id', clientId);
    formData.append('client_secret', clientSecret);

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}

fetchData();
