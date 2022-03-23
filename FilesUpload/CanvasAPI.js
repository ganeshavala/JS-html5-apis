import '../assets/css/style.css';

const app = document.getElementById('app');
app.innerHTML = `
<h1>JAVASCRIPT Video testing</h1>
<h2>E-Signature ✍</h2>
<canvas width="420" height="160">
Your Browser does not support Canvas
</canvas>
<button type="button" class="save">Save</button>
<style>
canvas{
    background: #fff; border-radius: 5px; border: 3px dotted #d2d5da; cursor:crosshair
}
</style>
`;

const save= document.querySelector('.save');

const init =()=>{
    const canvas = document.querySelector('canvas');
    const context = canvas.getContext('2d');
    const {left,top} = canvas.getBoundingClientRect();
    context.fillStyle = 'green';
    context.lineCap ='round';
    context.lineJoin = 'round';
    context.lineWidth =4;
    // context.fillRect(10, 10, 150, 100);
    // context.beginPath();
    // context.moveTo(10,10);

    // context.lineTo(20,10);
    // context.lineTo(20,20);
    // context.lineTo(10,20);
    // context.closePath();
    // context.stroke();

    let state ={
        start:{
            x:null,
            y:null
        },
        end:{
            x:null,
            y:null
        }
    };

    canvas.addEventListener('mousedown',({clientX,clientY})=>{
        state = {...state,drawing:true,start:{x:clientX-left,y:clientY-top}};
        // console.log(state);
    });

    canvas.addEventListener('mousemove',({clientX,clientY})=>{
        state = {...state,end:{x:clientX-left,y:clientY-top}};
        // console.log(state);
    });

    canvas.addEventListener('mouseup',()=>{
        state = {...state,drawing: false};
        console.log(state);
    });

    canvas.addEventListener('mouseleave',()=>{
        state = {...state,drawing:false};
        console.log(state);
    });

    canvas.addEventListener('dblclick',()=>{
        context.clearRect(0,0,canvas.width,canvas.height);
    });

    save.addEventListener('click',()=>{
        const a = document.createElement('a');
        a.href = canvas.toDataURL();
        a.innerText ="Download";
        a.setAttribute('download','CanvasImage');
        app.append(a);
    });

    (function render(){
        if(state.drawing){
            context.beginPath();
            context.moveTo(state.start.x,state.start.y);
            context.lineTo(state.end.x,state.end.y);
            context.stroke();
            state ={...state, start:{...state.end}};
            console.log(state);
        }
        window.requestAnimationFrame(render);
        
    })();

}

if(window.HTMLCanvasElement){
    init();
}