let user;
let src;
let firestore;
let imgRef;

var firebaseConfig = {
  apiKey: "AIzaSyBljTOvQERNghKSC_3b0j3Uhrf2-NyTtQU",
  authDomain: "tienda-365.firebaseapp.com",
  databaseURL: "https://tienda-365.firebaseio.com",
  projectId: "tienda-365",
  storageBucket: "tienda-365.appspot.com",
  messagingSenderId: "530832378948",
  appId: "1:530832378948:web:dd7ce6db6a3f689a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log(firebase);

firestore = firebase.firestore();
imgRef = firestore.collection("imgstore");

imgRef.onSnapshot(function(snap) {
    let img_layout = document.getElementById("img-layout");
  img_layout.innerHTML="";
  snap.forEach(function(doc) {
    imgList([doc.data()][0]);
  });
});
function writeDoc(obj) {
  let id = imgRef.doc().id;
  imgRef.doc(id).set(obj);
}
function imgList(data) {
  let img_layout = document.getElementById("img-layout");
  let div = document.createElement("div");
  div.classList.add("img-container");
  let title = document.createElement("div");
  title.textContent = data.title;
  title.classList.add("img-title");
  let img = document.createElement("img");
  img.src = data.link;
  img.classList.add("img-content");
  div.appendChild(title);
  div.appendChild(img);
  img_layout.prepend(div);
}

document.getElementById("form-search").addEventListener("click", function(e) {
  e.preventDefault();
  let search = document.getElementById("input-search").value;
  if (search!="") {
      searchFor(search);
  }
  
});
document.getElementById("upload").addEventListener("click", function(e) {
  let container = document.createElement("div");
  let inputName = document.createElement("input");
  let inputFile = document.createElement("input");
  let btnUpload = document.createElement("button");
  let img = document.createElement("img");
  inputName.id = "img-title";
  img.style.display = "none";
  container.classList.add("upload-container");
  inputFile.classList.add("input-search");
  inputName.classList.add("input-search");
  btnUpload.classList.add("btn");
  img.classList.add("uploaded-img");
  btnUpload.textContent = "SUBIR IMAGEN";
  inputFile.type = "file";
  inputName.type = "text";
  inputName.placeholder = "Filename";
  container.appendChild(img);
  container.appendChild(inputFile);
  container.appendChild(inputName);
  container.appendChild(btnUpload);
  btnUpload.addEventListener("click", function(e) {
    /*img.src ="https://firebase.google.com/downloads/brand-guidelines/PNG/logo-vertical.png?hl=es-419";
      img.style.display = "block";*/
    let doc = {
      title: document.getElementById("img-title").value,
      link: src
    };
    writeDoc(doc);
    console.table({ doc });
  });
  inputFile.addEventListener("change", function() {
    let fr = new FileReader();
    fr.readAsDataURL(inputFile.files[0]);
    fr.onload = function() {
      src = fr.result;
      img.src = src;
      img.style.display = "block";
    };
  });
  printModal(container);
});
function gmailLogin() {
    let provider=new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider)
    .then(function(result){
        setUser(result.user);
    })
}
function setUser(data) {
  let username=document.getElementById("username");
  let user_img=document.getElementById("user-img");
  user_img.src=data.photoURL;
  username.textContent=data.displayName;
}
document.getElementById('btn-login').addEventListener('click',function (e) {
    gmailLogin();
})
firebase.auth().onAuthStateChanged(function(u){
    if (!u) {
        console.log("login for publish");
    }
    else
        setUser(u);
});

function searchFor(title) {
    imgRef.where("title","==",title)
    .get()
    .then(function (snap) {
        if (snap.empty) {
            alert("sin resultados");
        }
        else
        {
            let img_layout = document.getElementById("img-layout");
            img_layout.innerHTML="";
            snap.forEach(el=>{
                imgList([el.data()][0]);
            })

        }
    })
}