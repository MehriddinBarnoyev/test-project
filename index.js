const userTable = document.getElementById('user-table-body');
const userPosts = document.getElementById('post-list');
const postCCommentsButton = document.getElementById('Post-comments-button');
const commentsPart = document.getElementById('comments');



const getData = async () => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        renderData(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
getData()

const renderData = (data) => {
    userTable.innerHTML = '';
    data.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
           <tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>${user.username}</td>
                    <td>${user.website}</td>
                    <td>${user.address.city} ${user.address.street}</td>
                    <button class="btn btn-primary mt-3" onclick="getUserPost(${user.id})">Posts</button>
                </tr>
        `;
        userTable.appendChild(row);
    });
}

const getUserPost = async (userId) => {
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${userId}`);
        userPosts.innerHTML = '';
        commentsPart.innerHTML = ''

        const h4 = document.createElement('h4');
        h4.innerHTML = `<strong>UserId:</strong> ${response.data.id} <br> <strong>Title:</strong> ${response.data.title} <br> <strong>Body:</strong> ${response.data.body}`;
        userPosts.appendChild(h4);

        userPosts.appendChild(document.createElement('br'));
        const commentsButton = document.createElement('button');
        commentsButton.className = "btn btn-secondary mt-2";
        commentsButton.textContent = "Get Comments";
        commentsButton.onclick = () => {
            getPostComments(response.data.id)
        };
        userPosts.appendChild(commentsButton);
    } catch (error) {
        console.error('Error fetching user posts:', error);
    }
}

const getPostComments = async (postId) => {
    try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        // commentsPart.innerHTML = '';
        commentsPart.innerHTML = `
            <h4>Comments:</h4>
            <ul class="list-group text-secondary">
                ${res.data.map(comment => `
                    <li class="list-group-item">
                        <strong>${comment.name.charAt(0).toUpperCase() + comment.name.slice(1)}</strong>: ${comment.body}
                    </li>
                `).join('')}
            </ul>
        `
    } catch (error) {
        console.error('Error fetching user posts:', error);

    }
}