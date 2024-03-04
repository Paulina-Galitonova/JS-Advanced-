function attachEvents() {
    const blogUrl = `http://localhost:3030/jsonstore/blog/posts`;
    const commentsUrl = `http://localhost:3030/jsonstore/blog/comments`;
    const loadButtonRef = document.getElementById("btnLoadPosts");
    const viewButtonRef = document.getElementById("btnViewPost");
    const select = document.getElementById("posts");
    const title = document.getElementById("post-title");
    const postBody = document.getElementById("post-body");
    const list = document.getElementById("post-comments");

    let postsCache = []; // Cache for posts

    loadButtonRef.addEventListener("click", loadPosts);
    viewButtonRef.addEventListener("click", onView);

    async function fetchWithErrorHandling(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error("Fetch error: ", error.message);
            throw error; // Re-throwing to handle it in the calling context if needed
        }
    }

    async function loadPosts() {
        try {
            const data = await fetchWithErrorHandling(blogUrl);
            select.innerHTML = "";
            postsCache = Object.values(data); // Cache posts
            postsCache.forEach(post => {
                const option = document.createElement("option");
                option.value = post.id;
                option.textContent = post.title;
                select.appendChild(option);
            });
        } catch (error) {
            // Handle or display error to the user
            console.error("Error loading posts: ", error);
        }
    }

    async function onView() {
        try {
            const postId = select.value;
            const postInfo = postsCache.find(post => post.id === postId); // Use cached posts
            if (!postInfo) return;

            title.innerHTML = postInfo.title; // Update title
            postBody.innerHTML = postInfo.body; // Update body

            await showComments(postId); // Show comments for the post
        } catch (error) {
            // Handle or display error to the user
            console.error("Error viewing post: ", error);
        }
    }

    async function showComments(postId) {
        try {
            const response = await fetchWithErrorHandling(`${commentsUrl}?postId=${postId}`);
            const allComments = Object.values(response);

            list.innerHTML = ""; // Clear comments

            allComments.forEach(comment => {
                let li = document.createElement("li");
                li.id = comment.id;
                li.textContent = comment.text;
                list.appendChild(li);
            });
        } catch (error) {
            // Handle or display error to the user
            console.error("Error loading comments: ", error);
        }
    }
}

attachEvents();
