import '../assets/css/style.css';

const app = document.getElementById('app');
app.innerHTML = `
<h1>JAVASCRIPT Video testing</h1>
<pre class="source" contenteditable>class Node{
    constructor(element){
        this.next=null,
        this.element = element
    }</pre>
    <button type="button" class="copy">Copy</button>
    <button type="button" class="paste">Paste</button>
    <div class="destination"></div>
    <style>
    .source{
        width: 90%;
        background: #15181e;
        margin: 25px auto;
        padding: 25px;
        font-size: 16px;
        color: #fff;
        text-align: left;
        border-radius:5px;
        box-sizing: border-box;
    }
    </style>
    `;

const init = ()=>{
const source = document.querySelector('.source');
const copy = document.querySelector('.copy');
const paste = document.querySelector('.paste');
const destination = document.querySelector('.destination');

const copyToClipBoard =async()=>{
    try{
        await navigator.clipboard.writeText(source.innerText);
        console.log('copied');
    } catch(e){
        console.log(`copied failed....${e}`)
    }
}

const pasteToClipBoard =async()=>{
    try{
        const clip = await navigator.clipboard.readText();
        console.log(`paste...${clip}`);
    } catch(e){
        console.log(`paste failed....${e}`)
    }
}

copy.addEventListener('click',copyToClipBoard);
paste.addEventListener('click',pasteToClipBoard);

document.addEventListener('copy',(e)=>{
    e.preventDefault();
    e.clipboardData.setData('text/plain',e.target.innerText.replace('Node','LinkedList'));
});

document.addEventListener('paste',(e)=>{
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    destination.innerText = text;
})

};

if('clipboard' in window.navigator){
    init();
}
