const postButton = document.getElementById('postButton');
const textInput = document.getElementById('textInput');
const imageInput = document.getElementById('imageInput');
const postsContainer = document.getElementById('postsContainer');

function generatePostId() {
    return `post-${Date.now()}`;
}

function getCurrentDateTime() {
    const now = new Date();
    return now.toLocaleString();
}

postButton.addEventListener('click', () => {
    const text = textInput.value;
    const imageFile = imageInput.files[0];
    const imageUrl = imageFile ? URL.createObjectURL(imageFile) : null;
    const timestamp = getCurrentDateTime();
    const postId = generatePostId();

    if (text || imageUrl) {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.setAttribute('data-id', postId);

        postElement.innerHTML = `
            <div class="post-header">
                <div class="profile-picture"></div>
                <span class="username">anonnn posted</span>
            </div>
            <p>${text}</p>
            ${imageUrl ? `<img src="${imageUrl}" alt="Post Image">` : ''}
            <p class="timestamp">${timestamp}</p>
            <div class="actions">
                <button class="editButton">Edit</button>
                <button class="deleteButton">Delete</button>
            </div>
        `;

        postsContainer.appendChild(postElement);

        textInput.value = '';
        imageInput.value = '';
    }
});

postsContainer.addEventListener('click', (event) => {
    const post = event.target.closest('.post');
    
    if (!post) return;

    if (event.target.classList.contains('deleteButton')) {
        post.remove();
    }

    if (event.target.classList.contains('editButton')) {
        const postText = post.querySelector('p').innerText;
        const postImage = post.querySelector('img') ? post.querySelector('img').src : null;

        textInput.value = postText;
        imageInput.value = '';

        postButton.innerText = 'Update Post';

        postButton.onclick = function() {
            const updatedText = textInput.value;
            const updatedImage = imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : postImage;

            post.remove();

            const updatedPostElement = document.createElement('div');
            updatedPostElement.classList.add('post');
            updatedPostElement.setAttribute('data-id', generatePostId());

            updatedPostElement.innerHTML = `
                <div class="post-header">
                    <div class="profile-picture"></div>
                    <span class="username">anonn posted(older bro post)</span>
                </div>
                <p>${updatedText}</p>
                ${updatedImage ? `<img src="${updatedImage}" alt="Updated Post Image">` : ''}
                <p class="timestamp">${getCurrentDateTime()}</p>
                <div class="actions">
                    <button class="editButton">Edit</button>
                    <button class="deleteButton">Delete</button>
                </div>
            `;

            postsContainer.appendChild(updatedPostElement);

            postButton.innerText = 'Post';
            textInput.value = '';
            imageInput.value = '';
        };
    }
});
