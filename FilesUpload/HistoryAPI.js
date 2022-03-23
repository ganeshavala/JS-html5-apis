import '../assets/css/style.css';

const batters =[
    { id: 1001, type: "Regular" },
    { id: 1002, type: "Chocolate" },
    { id: 1003, type: "Blueberry" },
    { id: 1004, type: "Devil's Food" }
];



const app = document.getElementById('app');
app.innerHTML = `
<h1>JAVASCRIPT Video testing</h1>
<nav class="links">
${batters.map(batter => `<a href="/${batter.id}">${batter.type}</a>`)}
</nav>
<div class="info"></div>`;

const infos = document.querySelector('.info');
const links = [...document.querySelectorAll('.links a')];
const replace = (state)=>{
    
    infos.innerHTML =`
    <h3>${state.type}</h3>
    `
}


const init =()=>{
     console.log(location.pathname);
    if(location.pathname === '/'){
        const batter = batters[0];
        history.replaceState(batter,"",batter.id);
        replace(batter);
        return;
    }

    const id = parseInt(location.pathname.substring(1));
    const batter = batters.find( batt => batt.id === id );
    history.pushState(batter,'',batter.id );
    replace(batter);
}


links.forEach(batter=>{
    batter.addEventListener('click',(e)=>{
        e.preventDefault();
        const id = parseInt(e.target.getAttribute('href').substring(1));
        const batter = batters.find( batt => batt.id === id );
        console.log(batter);
        history.pushState(batter,'',batter.id );
        replace(batter);
    })
})

window.addEventListener('popstate',(e)=>{
    if(!e.state){
        const batter = batters[0];
        history.replaceState(batter,"",batter.id);
        replace(batter);
        return;
    }

    const push = e.state;
    replace(push);
})

if(window.history && window.history.pushState){
    init();
}
