const createBlog = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#blog-title').value.trim();
  const text = document.querySelector('#blog-text').value.trim();
  const id = document.querySelector('.create-form').getAttribute('id');

  if (name && text) {
    const response = await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify({ name , text }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace(`/dashboard/${id}`);
    } else {
      alert('Failed to create project');
    }
  }
};

document
  .querySelector('.create-form')
  .addEventListener('submit', createBlog);





