import '../assets/css/style.css';

const app = document.getElementById('app');
app.innerHTML = `<h1>JavaScript HTML5 APIs</h1>
<div class="uploader">
    <h2>Upload Your Files here ✨</h2>
    <p>Accepts only .png .jpg .svg files</p>
    <input type="file" class="files" accept="image/*" multiple>
    <div class="dropzone">📂 drag files to upload</div>
    <div class="list"></div>
</div>

<style>
.uploader{
    box-sizing: border-box;
    max-width:90%;
    border-radius:10px;
    border-bottom:3px solid #d2dfda;
    margin: 25px auto;
    padding: 25px;
    background: #fff
}
.dragme{
    background: #ce1f99;
    border-radius:5px;
    width:50px;
    height:50px;
}
.dropzone{
    border-radius:5px;
    border: 2px dashed #d2dfda;
    margin-top: 20px;
    padding: 25px;
    background: #f1f2f5;
}
.active{
    background: #ebfff6;
    border-color: #24b373;
}
</style>
`;

const init =()=>{
    const dropzone = document.querySelector('.dropzone');
    const list = document.querySelector('.list');
    const files = document.querySelector('.files');
    // const dragme = document.querySelector('.dragme');
    // dragme.addEventListener('dragstart',(e)=>{
    //     e.dataTransfer.setData('text/plain',e.target.id);
    // });

    dropzone.addEventListener('dragenter', (e)=> e.target.classList.add('active'));
    dropzone.addEventListener('dragleave', (e)=> e.target.classList.remove('active'));
    dropzone.addEventListener('dragover',(e)=>{
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect ='copy';

    });

    const isFileAllowed =(file)=>{
        return ['image/jpeg','image/png','image/svg+xml'].includes(file.type);
    }

    const showFilePreview = (file)=>{
        const reader=  new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('load',(e)=>{
            const div = document.createElement('div');
            div.innerHTML =`<div style="display:flex">
            <img src="${e.target.result}" alt="${file.name}" style="width:20px;margin-right:10px;"/>
            <p>Name: ${file.name} has<span> ${file.size} by bytes</span></p> 
            </div>`;
            list.append(div);
        });

        console.log(reader);
    }

    const uploadFormData =async(fileCollection)=>{
        const form = new FormData();
        [...fileCollection].forEach(file => form.append(file.name,file));
        console.log([...form.entries()]);
        const request = await fetch('//dragdropfiles.glitch.me/upload',{
            method: 'POST',
            body: form
        });

        return await request.json();
    }

    const handleFileUpload = async(files)=>{
        const filesForUpload = [...files].filter(isFileAllowed);
        filesForUpload.forEach(showFilePreview);
        console.log(filesForUpload);
        const uploaded = await uploadFormData(filesForUpload);
        if(uploaded){
            console.log(uploaded);
        }
        else{
            console.log('Not uploaded');
        }

    }

    files.addEventListener('change', (e)=> {
        const {files} = e.target;
        handleFileUpload(files);
    });
    dropzone.addEventListener('drop',(e)=>{
        
        e.preventDefault();
        e.stopPropagation();
        e.target.classList.remove('active');
        const {files} = e.dataTransfer;
        console.log(files);
        handleFileUpload(files);
        // const ele = document.getElementById(e.dataTransfer.getData('text/plain'));
        // console.dir(ele);
        // dropzone.append(ele);
    });

    document.addEventListener('dragover',(e)=>e.preventDefault());
    document.addEventListener('drop',(e)=>e.preventDefault());

};

if('draggable' in document.createElement('div')){
    init();
}