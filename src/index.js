let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  loadImages();
  //postImage();
});

const imgURL = "http://localhost:3000/toys/"

//------------------------------------CHALLENGE 1------------------------------------//
//Use fetch to make a GET request: Fetch Andy's Toy's
function loadImages(){
  fetch(imgURL)
    .then(resp => resp.json())
    .then(json => json.forEach(image => {
      
      addImage(image);
    }))
}

function addImage(image){
  //console.log(image);
  let pageContainer = document.querySelector('#toy-collection');
  
  let h2 = document.createElement('h2');
  h2.innerText = image.name

  let img = document.createElement('img');
  img.setAttribute('src', image.image)
  img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p');
  p.innerText = `${image.likes} likes`

  let btn = document.createElement('button');
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', image.id)
  btn.innerText = "like"
  btn.addEventListener('click', (e) => {
    console.log(e.target.dataset);
    likes(e)
  })

  let imageDiv = document.createElement('div');
  imageDiv.classList.add('card');
  imageDiv.append(h2, img, p, btn)

  pageContainer.appendChild(imageDiv);
}

//------------------------------------CHALLENGE 2------------------------------------//
//Use fetch to make a POST request

//Event listener for form submit-Pillar 1 Recognize Events
document.querySelector(".add-toy-form").addEventListener('submit', handleEvent)

//-Pillar 2 Use it to manipulate the DOM
function handleEvent(event){
  event.preventDefault();
  console.log(event.target);

  toyObject = {
    name : event.target.name.value,
    image : event.target.image.value,
    likes : 0
  }
  console.log(toyObject);
  addImage(toyObject);
  postImage(toyObject);
};

//-Pillar 3 Update the server
function postImage(){
  console.log("Hey")
  fetch(imgURL,{
    method : 'POST',
    headers : {
      'Content-Type' : 'application/json',
      'Accept' : "application/json"
    },
    body : JSON.stringify(toyObject)
  })
  .then(resp => resp.json())
  .then(json => console.log(json))
}

//------------------------------------CHALLENGE 3------------------------------------//
//Use fetch to make a PATCH request

//Event listener for like button-Pillar 1 Recognize Events- ADDED ON BUTTON PROPERTY

function likes(e) {
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": more
      })
    })
    .then(res => res.json())
    .then((like_obj => {
      e.target.previousElementSibling.innerText = `${more} likes`;
    }))
}


