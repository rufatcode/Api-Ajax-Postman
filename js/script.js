$(document).ready(function(){
    let CityName=$("#watherForecast h1");
    let CountryName=$("#watherForecast h2");
    let Forecact=$("#watherForecast p");
    let sky=$("#watherForecast span");
    let inputCity=$("#city");
    let inputType=$("#degreType");
    let btn=$("#watherForecast form button");
    btn.click(function(){
        $.ajax({
            methood:"get",
            url:`https://api.weatherapi.com/v1/current.json?key=6bc15cfb31414fbda9f95625221905&q=${inputCity.val()}`,
            success:function(data){
                CityName.html("City:"+data.location.region);
                CountryName.html("Country:"+data.location.country)
                if (inputType.val()=="Celcium") {
                    Forecact.html("Whether Forecast:"+data.current.temp_c);
                    if(data.current.temp_c<0){
                        sky.html("Sky Condition:"+'<i class="fa-regular fa-snowflake"></i>'+" snow")
                    }
                    else if (data.current.temp_c<10&&data.current.temp_c>0) {
                        sky.html("Sky Condition:"+'<i class="fa-solid fa-cloud"></i>'+" Cold")
                    }
                    else if (data.current.temp_c>10&&data.current.temp_c<20) {
                        sky.html("Sky Condition:"+'<i class="fa-solid fa-cloud-sun"></i>'+" Cloud Sun")
                    }
                    else if (data.current.temp_c>20) {
                        sky.html("Sky Condition:"+'<i class="fa-solid fa-sun"></i>'+" Sun");
                    }
                }
                else{
                    Forecact.html("Whether Forecast:"+data.current.temp_f);
                    if(data.current.temp_f<32){
                        sky.html("Sky Condition:"+'<i class="fa-regular fa-snowflake"></i>'+"snow")
                    }
                    else if (data.current.temp_f<50&&data.current.temp_f>32) {
                        sky.html("Sky Condition:"+'<i class="fa-solid fa-cloud"></i>'+"Cold")
                    }
                    else if (data.current.temp_f>50&&data.current.temp_f<70) {
                        sky.html("Sky Condition:"+'<i class="fa-solid fa-cloud-sun"></i>'+"Cloud Sun")
                    }
                    else if (data.current.temp_f>70) {
                        sky.html("Sky Condition:"+'<i class="fa-solid fa-sun"></i>'+"Sun")
                    }
                }
            },
            error:function(error){
                CityName.html("city not found");
                CountryName.html("");
                Forecact.html("");
                sky.html("");
            }
        })
    })
    
   
})