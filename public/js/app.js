  const weatherForm = document.querySelector('form');
  const search = document.querySelector('input');
  const message1 = document.querySelector('#message-1');
  const message2 = document.querySelector('#message-2');
  const error = document.querySelector('#error');

  weatherForm.addEventListener('submit', (e)=> {
       e.preventDefault();
       const location = search.value;
       if(search.value === ''){
          message1.textContent = '';
          message2.textContent = '';
          
            error.style.display = 'block';
            setTimeout(()=>{
               error.style.display = 'none'
             },3000)
          return;
       }
       else
       {
        message1.textContent = 'Loading...';
        message2.textContent = '';
       fetch('/weather?address='+location).then((response) => {
         response.json().then((data)=>{
          
          if(data.error) {
              error.style.display = 'block';
              setTimeout(()=>{
                error.style.display = 'none'
              },3000)
         }
         else{
            message1.textContent = 'Location : '+data.location;
            message2.textContent = 'Weather Forecast : '+data.forecast;
            console.log(data.location);
            console.log(data.forecast);
          }
    });
  
   })
  }    
})
  

