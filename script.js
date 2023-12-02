const loadMoreBtn = document.querySelector('.loadmore'),
    content = document.querySelector('.content'),
    totalValue = 10;

let data = [], initialValue = 0;

// Function to fetch the api
const fetchData = async () => {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');

        if (!res.ok) {
            console.log('Response not found');
        }
        else {
            data = await res.json();
            console.log(data);
        }

    } catch (err) {
        console.log('Internal server error')
    }
}

// Function to render the items
const renderItems = (initialValue, totalValue) => {
    let title = '';

    for (let i = initialValue; i < totalValue && i < data.length; i++) {
        title += `<li>
        <h1>${i + data[i].title}</h1>
        <p>${i + data[i].body}</p>
        </li>`;
    }

    content.innerHTML += title;
}

const loadInitialPosts = async () => {
    await fetchData();
    renderItems(0, totalValue);
    initialValue += totalValue;
}
// Load initial posts on page load
loadInitialPosts();

const generateItems = () => {
    renderItems(initialValue, initialValue + totalValue);
    initialValue += totalValue;
}

loadMoreBtn.addEventListener('click', generateItems);

