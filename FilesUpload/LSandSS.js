import '../assets/css/style.css';
import { storage } from './storage';

const ls = storage('local');
const ss = storage('session');

const app = document.getElementById('app');
app.innerHTML = `
<h1>JAVASCRIPT HTML5 API</h1>
<div data-cookie>
<h2>Do you want a cookie 🍪??</h2>
<button type="button" data-cookie-accept>Yes</button>
<button type="button" data-cookie-reject>No</button>
</div>
`;
// console.log(window.sessionStorage.constructor === Storage);
// console.log(window.localStorage.constructor === Storage);
// console.log(typeof Storage);


// const ls = window.localStorage;
const init =()=>{

const cookie = document.querySelector('[data-cookie]');
const accept = document.querySelector('[data-cookie-accept]');
const reject = document.querySelector('[data-cookie-reject]');



const showCookie = ()=>{cookie.style.display = 'block'};
const hideCookie = ()=>{cookie.style.display = 'none'};



accept.addEventListener('click',()=>{
    ls.set('cookies',true);
    hideCookie();
    });
    
reject.addEventListener('click',()=>{
    ss.set('cookies',false);
    hideCookie();
    });
console.log(!cookie || ls.get('cookies')|| ss.get('cookies') === 'false');
if(!cookie || ls.get('cookies')|| ss.get('cookies') === false){
    return;
 }
 setInterval(showCookie,2000);
}


// const getValue =(key)=>{
//     const value = JSON.parse(ls.getItem(key));
//     return value;
// }

// const removeItem = (key)=>{
//     ls.removeItem(key);

// }

// const empty =()=>{
//     ls.clear();
// }

// setValue('cookies',true);
// console.log(getValue('cookies'));

// setTimeout(()=>{removeItem('cookies')},2000);
// console.log(getValue('cookies'));

// empty();



if(ls.isSupported && ss.isSupported){
    init();
}

// ls.onChange('cookies',(e)=>{
// console.log(e);
// });

console.log(ls.getValues());

window.addEventListener('storage',(e)=>{
    console.log(e);
})

// ls.set('foo', new Array(24*1024*1024).join('-'));