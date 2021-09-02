const updateBlog = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#update-title').value.trim();
  const text = document.querySelector('#update-text').value.trim();
  const id = document.querySelector('.edit-form').getAttribute('id');
  const dataid = document.querySelector('.edit-form').getAttribute('data-id')

  if (name && text) {
    const response = await fetch(`/api/blogs/${dataid}`, {
      method: 'PUT',
      body: JSON.stringify({ name , text }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace(`/dashboard/${id}`);
    } else {
      alert('Error');
    }
  }
};

const deleteBlog = async () => {
  const id = document.querySelector('.edit-form').getAttribute('id');
  const dataid = document.querySelector('.edit-form').getAttribute('data-id')

  const response = await fetch(`/api/blogs/${dataid}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace(`/dashboard/${id}`);
  } else {
    alert('Error');
  } 
};

document
.querySelector('#update')
.addEventListener('click', updateBlog);

document
.querySelector('#delete')
.addEventListener('click', deleteBlog);