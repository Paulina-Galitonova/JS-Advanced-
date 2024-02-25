async  function loadCommits() {
    const username = document.getElementById('username').value;
    const repo = document.getElementById('repo').value;
    const url = `https://api.github.com/repos/${username}/${repo}/commits`;
    const commitsList = document.getElementById('commits');
    commitsList.innerHTML = ''; // Clear the list before adding new items

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} (Not Found)`);
        }
        const data = await response.json();
        for (const commitData of data) {
            const listItem = document.createElement('li');
            listItem.textContent = `${commitData.commit.author.name}: ${commitData.commit.message}`;
            commitsList.appendChild(listItem);
        }
    } catch (error) {
        const listItem = document.createElement('li');
        listItem.textContent = error.message;
        commitsList.appendChild(listItem);
    }
    }

    // let username = document.getElementById("username").value;
    // let repo = document.getElementById("repo").value;
    // let url = `https://api.github.com/repos/${username}/${repo}/commits`


    // fetch(url)
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error(`Error: ${response.status} (Not Found)`)
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         const commitList = document.getElementById("commits");
    //         commitList.innerHTML = "";

    //         data.forEach(commitDate => {
    //             const ListEl = document.createElement("li");
    //             ListEl.textContent = `${commitDate.commit.author.name}: ${commitDate.commit.message}`
    //             commitList.appendChild(ListEl)
    //         })

    //     })
    //     .catch(error => {
    //         const commitList = document.getElementById("commits");
    //         commitList.innerHTML = "";
    //         const ListEl = document.createElement("li");
    //         ListEl.textContent = error.message;
    //         commitList.appendChild(ListEl);
    //     })

