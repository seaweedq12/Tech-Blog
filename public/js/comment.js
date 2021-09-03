const addbut = document.getElementById("add");

const renderComment = (event) => {
  event.preventDefault();
  document.querySelector('.comment_area').remove();
  addbut.disabled = true;

  const container = document.querySelector('.container');
  const formEl = document.createElement('form');
  formEl.classList.add(
    'form', 
    'edit-form'
    );

  const div1El = document.createElement('div');
  const div2El = document.createElement('div');
  div1El.classList.add('form-group');
  div2El.classList.add('form-group');

  const textEl = document.createElement('textarea');
  textEl.setAttribute('class','form-input');
  textEl.setAttribute('placeholder','Comment');
  textEl.setAttribute('type','text');
  textEl.setAttribute('row','20');
  textEl.setAttribute('id','create-com'); 

  const but1El = document.createElement('button');
  but1El.classList.add(
    'btn', 
    'btn-secondary'
    );
  but1El.setAttribute('type','button');
  but1El.setAttribute('id','create');
  but1El.innerText = "Create";

  const but2El = document.createElement('button');
  but2El.classList.add(
    'btn', 
    'btn-secondary'
    );
  but2El.setAttribute('type','button');
  but2El.setAttribute('id','back');
  but2El.innerText = "Go back";

  container.appendChild(formEl);
  formEl.appendChild(div1El);
  formEl.appendChild(div2El);
  div1El.appendChild(textEl);
  div2El.appendChild(but1El);
  div2El.appendChild(but2El);

  but1El.addEventListener('click', create);
  but2El.addEventListener('click', reload);
    
};
const create = async () => {
  const text = document.querySelector('#create-com').value.trim();
  const blog_id = document.querySelector('.blog').getAttribute('id');

  if (text) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ text, blog_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to create comment');
    }
  }

}

const reload = () => {
  window.location.reload();
}

document
  .querySelector('#add')
  .addEventListener('click', renderComment);
