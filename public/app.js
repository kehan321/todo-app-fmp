import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getDatabase, ref, set, onChildAdded, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwN9Cp_aEMWgwzZg-qUQzIfM-uQAOauj0",
  authDomain: "fmp-todo-12967.firebaseapp.com",
  projectId: "fmp-todo-12967",
  storageBucket: "fmp-todo-12967.appspot.com",
  messagingSenderId: "471570944669",
  appId: "1:471570944669:web:143fb288d13ce39e4e3a74",
  measurementId: "G-DCGWTYRZ4P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();



// Initialize Firebase End

let main = document.getElementById("main");
let inp = document.getElementById("inp");

window.add = function(){
    if(!inp.value){
        alert("Please Enter Todo");
    }
    else{
        let obj = {
            input: inp.value,

        };
        obj.key = Math.random().toString().slice(2);
        const reference = ref(database,`Todo_app/${obj.key}/`)
        set(reference,obj);
    }
    
}

window.getData = function(){
    let dataList = [];
    const taskRef = ref(database,`Todo_app/`);
    onChildAdded(taskRef, function (dt) {
      dataList.push(dt.val());  
      main.innerHTML = "";
      for (let i = 0; i < dataList.length; i++) {
          main.innerHTML += `<li id="list" class="my-2">${dataList[i].input} <br>  <br> <button style="padding=10px" onclick="edittodo(this)" class="   edi">EDIT</button> <button onclick="deletetodo(this)" class="remo  ">DELETE </button> </li>  <br>`;
      }
      let inp = document.getElementById("inp").value = "";
  })
}
getData();


window.deleteAll = function (id) {
    remove(ref(database, `Todo_app/`))
    main.remove();
}

window.edittodo = function(element) {
    var val = prompt("Update Todo Value is ", element.parentNode.firstChild.nodeValue);
    element.parentNode.firstChild.nodeValue = val;
}

window.deletetodo = function (element) {
    const refrence = ref(database, "Todo_app/")
    remove(refrence, `${element.id}`)
    element.parentNode.remove();
}