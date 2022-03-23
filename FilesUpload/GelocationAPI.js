import '../assets/css/style.css';


const app = document.getElementById('app');


const init =()=>{
    const handleSuccess =(({coords})=>{
        // console.log(coords);
        const {latitude,longitude, accuracy} =coords;
        console.log(latitude,longitude,accuracy);
        app.innerHTML = `
        <h1>JAVASCRIPT HTML5 API</h1>
        <p>Accuracy: ${accuracy}</p>
        <iframe
        width="600"
        height="250"
        frameborder="0"
        src="https://maps.google.com/maps?q=${latitude},${longitude}&amp;z=14&amp;output=embed"
        </iframe>`;
    });

    const handleError =(error)=>{
        console.log(error);
        switch(error.code){
            case error.PERMISSION_DENIED:{
                console.log(error.message);
                break;
            }

            case error.POSITION_UNAVAILABLE:{
                console.log(error.message);
                break;
            }

            case error.TIMEOUT:{
                console.log(error.message);
                break;
            }

            default:{
                console.log("Unknown error");
            }
        }
    }

    const options ={
        timeout: 1000,
        maximumAge:0,
        enableHighAccuracy:true
    }

    navigator.geolocation.getCurrentPosition(handleSuccess,handleError,options);

    // const watcher = navigator.geolocation.watchPosition(handleSuccess,handleError,options);
    // console.log(watcher);
    // setTimeout(()=>navigator.geolocation.clearWatch(watcher),2000);

};

if('geolocation' in window.navigator){
 console.log('Geolocation is supported');
 init();
}
else{
    console.log('Geolocation is not supported');
}