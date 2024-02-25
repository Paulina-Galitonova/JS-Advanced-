function loadRepos() {
    const username = document.getElementById('username').value;
    const url = `https://api.github.com/users/${username}/repos`;
    const reposList = document.getElementById('repos');
    
    reposList.innerHTML = ''; // Clear the list before adding new content

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Not Found');
            }
            return response.json();
        })
        .then(data => {
            data.forEach(repo => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = repo.html_url;
                link.textContent = repo.full_name;
                listItem.appendChild(link);
                reposList.appendChild(listItem);
            });
        })
        .catch(error => {
            const listItem = document.createElement('li');
            listItem.textContent = 'Not Found';
            reposList.appendChild(listItem);
        });
}
