//  import dotenv from 'dotenv'
const origin = document.getElementById('origin');
const destination = document.getElementById('destination');
const dateDeparture = document.getElementById('dateDeparture');
const dateArrive = document.getElementById('dateArrive');
const submitsearch = document.getElementById('submitsearch');


//this varablie  to get id for element to update UI
const image = document.querySelector('.image-arrival-city'); 
const ori_city = document.getElementById('ori-city');
const dest_city = document.getElementById('dest-city');
const depart_date =  document.getElementById('depart-date');
const arrive_date = document.getElementById('arrive-date');
const hihgTemp =  document.getElementById('hihg');
const lowTemp = document.getElementById('low');
const descriptionWeather = document.getElementById('description');
//user option
const user_option = document.querySelector('.user-option');

const remove =  document.getElementById('removelocalsroge');
const save_localstorage = document.getElementById('savelocalstorage');
let dataoject ={}
function performAction(e){
 e.preventDefault()
 dataoject['origin']=origin.value;
 dataoject['destination']=destination.value;
 dataoject['dateArrive']=dateArrive.value;
 dataoject['dateDeparture']=dateDeparture.value;
  console.log(dateArrive.value)
  getLangLat(destination.value).then(data=>{
    console.log(data.lat + "this is" + data.lng);
    getweatherbit(data.lat, data.lng).then(data=>{
    for(data of data.data){
     if(data.datetime===dateArrive.value){
      dataoject['high_temp']=data.high_temp;
      dataoject['low_temp']=data.low_temp;
      dataoject['weather_description']=data.weather.description;
        console.log(data.high_temp  , data.low_temp , data.weather.description  );
     }}
     postdata('http://localhost:3001/add',dataoject)
     updateUi('http://localhost:3001/trips')
    })

 }).then( data=>{
   // postdata('http://localhost:3001/add',dataoject)   
 console.log(dataoject);

 })
//  postdata('http://localhost:3001/add',dataoject)  
 getpicofpixabay();
//  updateUi('http://localhost:3001/trips') 
//  postdata('http://localhost:3001/add',dataoject) 
}
// submitsearch.addEventListener('click',performAction);
// this is  a funciotn to get lat and lnag of geonames api 
const getLangLat = async (city)=>{
const res = await fetch(`http://api.geonames.org/searchJSON?q=${city}&username=${process.env.USERNAME}`);
try{
let data =  await res.json();
await console.log(data.geonames[0])
return data.geonames[0];


}catch(error){

console.log("error", error)

}
}
 //this is funciotn to get   forcast weather data
const getweatherbit= async (lat,lon)=>{

    const res = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.API_KEY}`);
    try{
    let data =  await res.json();
    await console.log(data)
    return data;
    
    
    }catch(error){
    
    console.log("error", error)
    
    }
    } 
    //this is funciotn to get  city of getpicofpixabay 

    const getpicofpixabay= async ()=>{
       let city = destination.value;
       city = city.split(" ") 
       city = city.join("+") 
        const res = await fetch(`https://pixabay.com/api/?key=${process.env.API_KEY_apixabay}&q=${city}&image_type=photo`);
        try{
        let data =  await res.json();
      //   dataoject['origin']= await origin.value;
      //   dataoject['destination']=await destination.value;
      //   dataoject['dateArrive']=await dateArrive.value;
      //   dataoject['dateDeparture']=await dateDeparture.value;
        await console.log(data.hits[0].webformatURL)
        dataoject['image']=data.hits[0].webformatURL;
        return data.hits[0].webformatURL;
        
        
        }catch(error){
        
        console.log("error", error)
        
        }
        } 


// this is function to post data to serever.js 
const postdata = async (url='',data={})=>{
   console.log(data)
   const resposne =  await fetch(url,{
   method: 'POST',
   credentials: 'same-origin',
   headers:{   
   'Content-Type': 'application/json'
   },
   body: JSON.stringify(data),  
   
   });
   
     try {
       console.log("hii");
         const newData = await resposne.json();
         console.log(newData);
        console.log("hii");
        return newData;
   
   
   }
   catch(error){       
   
   console.log('error ',error)
   
   }
   
   
   }


//this is as mock api 
function getkey (){

    fetch('http://localhost:3001/route')
    .then(res => res.json())
    .then(function(res) {
        console.log(res)
        document.getElementById('results').innerHTML = res.messag
     });



console.log(`Your API key is 111 `);
}

//function  to update the UI  dynamically by get data from server side .
const updateUi =  async (url)=>{
   const resposne =  await fetch(url)
   try {
   const data = await resposne.json()
   console.log(data)
   ori_city.innerHTML= data.origin
   dest_city.innerHTML = data.destination
   depart_date.innerHTML = data.dateDeparture
   arrive_date .innerHTML = data.dateArrive
   hihgTemp.innerHTML = data.high_temp
   lowTemp.innerHTML = data.low_temp
   descriptionWeather.innerHTML= data.weather_description
   image.src=data.image
   localStorage.setItem("image",image.src);
   localStorage.setItem("ori_city",ori_city.innerHTML);
   localStorage.setItem("dest_city",dest_city.innerHTML);
   localStorage.setItem("depart_date",depart_date.innerHTML);
   localStorage.setItem("arrive_date", arrive_date .innerHTML);
   localStorage.setItem("hihgTemp" ,hihgTemp.innerHTML);
   localStorage.setItem("lowTemp",lowTemp.innerHTML);
   localStorage.setItem("descriptionWeather",descriptionWeather.innerHTML);


   localStorage.setItem("image",image.src);

   }
   
   catch(error){
   
   console.log('error', error)
   
   }
   }
//function  to update the UI  dynamically by get data from local storgage
  function user_options(e){
   
if(e.target.matches('button.save-option')){
   console.log("hihi hi ")
    localStorage.setItem("image",image.src);
    image.src=localStorage.getItem("image");
    localStorage.setItem("ori_city",ori_city.innerHTML);
    dest_city.innerHTML = localStorage.getItem("ori_city");
    localStorage.setItem("dest_city",dest_city.innerHTML);
    dest_city.innerHTML = localStorage.getItem("dest_city");
    localStorage.setItem("depart_date",depart_date.innerHTML);
    depart_date.innerHTML = localStorage.getItem("depart_date");
    localStorage.setItem("arrive_date", arrive_date .innerHTML);
    arrive_date.innerHTML = localStorage.getItem("arrive_date");
    localStorage.setItem("hihgTemp" ,hihgTemp.innerHTML);
    hihgTemp.innerHTML = localStorage.getItem("hihgTemp");
    localStorage.setItem("lowTemp",lowTemp.innerHTML);
    lowTemp.innerHTML = localStorage.getItem("lowTemp");

    localStorage.setItem("descriptionWeather",descriptionWeather.innerHTML);
    descriptionWeather.innerHTML= localStorage.getItem("descriptionWeather");
   //  get_Items_localstorage();

   // console.log(remove)
   
   // dest_city.innerHTML = localStorage.getItem("dest_city");
   // depart_date.innerHTML = localStorage.getItem("depart_date");
   // arrive_date .innerHTML = localStorage.getItem("arrive_date");
   // hihgTemp.innerHTML = localStorage.getItem("hihgTemp");
   // lowTemp.innerHTML = localStorage.getItem("lowTemp");
   // descriptionWeather.innerHTML= localStorage.getItem("descriptionWeather");
   // image.src=localStorage.getItem("image");

}

//  if (e.target.matches('button.remove-option')){
    
   // localStorage.removeItem(ori_city,ori_city.innerHTML)
   // localStorage.removeItem(dest_city,dest_city.innerHTML)
   // localStorage.removeItem(depart_date,depart_date.innerHTML)
   // localStorage.removeItem(arrive_date , arrive_date .innerHTML)
   // localStorage.removeItem(hihgTemp ,hihgTemp.innerHTML)
   // localStorage.removeItem( lowTemp,lowTemp.innerHTML)
   // localStorage.removeItem(descriptionWeather,descriptionWeather.innerHTML)
   // localStorage.removeItem(image,lowTemp.src)


   
// }
  }

// test function  to update the UI  dynamically  to  get data from local storgage

function get_Items_localstorage(e){
   console.log("this cklier" ,e.target)
   document.querySelector('.image-arrival-city').src=localStorage.getItem("image")  
   dest_city.innerHTML = localStorage.getItem("dest_city")
   depart_date.innerHTML = localStorage.getItem("depart_date")
   arrive_date .innerHTML = localStorage.getItem("arrive_date")
   hihgTemp.innerHTML = localStorage.getItem("hihgTemp")
   lowTemp.innerHTML = localStorage.getItem("lowTemp")
   descriptionWeather.innerHTML= localStorage.getItem("descriptionWeather")
  
   // console.log( image.src)
}
//function  to remove data from local storgage
function removeItems_localstorage(){
   console.log("i was cliclked to remove localsrotge item")
   localStorage.clear();


}

getkey()
// this is event listener to  search  for  flight
submitsearch.addEventListener('click',performAction);

user_option.addEventListener('change', user_options);
// save_localstorage.addEventListener('change',get_Items_localstorage );
// save_localstorage.addEventListener('change',get_Items_localstorage );
// save_localstorage.addEventListener('change',get_Items_localstorage);

// this is event listener to remove user search   for  flight from local storage.
remove.addEventListener('click',removeItems_localstorage);
export{getkey, performAction,user_options,get_Items_localstorage, removeItems_localstorage} 