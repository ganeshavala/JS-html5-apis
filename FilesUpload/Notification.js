import '../assets/css/style.css';

const app = document.getElementById('app');
app.innerHTML = ``;
console.dir(Notification);

const init = async()=>{
   const permission = await Notification.requestPermission();

   switch(permission){
       case 'granted':{
           console.log('Permission is granted');
           break;
       }

       case 'denied':{
           console.log('Permission is denied');
           break;
       }

      default:{
           console.log('Default permission is applied');
           break;
       }
   }
    setTimeout(showNotification(),2000);
}

const showNotification =()=>{
    
   const notification = notify('🎶 is playing','Bheemla Nayak');
   console.log(notification);
   if(notification){
       notification.addEventListener('click',e=>{
           window.parent.focus();
           e.target.close();
       })
   }
}

const notify =(title,body)=>{
    if(Notification.permission === 'granted'){
        return new Notification(title,{
            body,
            icon: 'https://i.imgur.com/j4x6Fj5.jpeg'
        })
    }
    return null;
    
}

if('Notification' in window){
    init();
}