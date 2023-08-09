$(document).ready(function(){
    let CityName=$("#watherForecast h1");
    let CountryName=$("#watherForecast h2");
    let Forecact=$("#watherForecast p");
    let sky=$("#watherForecast span");
    let inputCity=$("#city");
    let inputType=$("#degreType");
    $("#watherForecast form button").click(function(){
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


    let tbody=$("table tbody");
    let inputDate=$("#prayerTimes #date");
    let inputWidth=$("#width");
    let inputLength=$("#length");
    $("table").css({
        "border-collapse": "collapse",
        "border": "1px solid orange",
    })
    
    $("th").css({
        "border-collapse": "collapse",
        "border": "1px solid orange",
    })
    $("#prayerTimes .month").click(function(){
        tbody.html("");
        let day=inputDate.val().split("-")[2];
        let month=inputDate.val().split("-")[1];
        let year=inputDate.val().split("-")[0];
        let url=`http://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${inputWidth.val()}&longitude=${inputLength.val()}&method=2`;
         $.ajax({
            methood:"get",
            url:url,
            success:function(datas){
                datas.data.forEach(data => {
                    let tr=CreateTableItem(data.timings.Fajr,data.timings.Sunrise,data.timings.Dhuhr,data.timings.Asr,
                        data.timings.Sunset,data.timings.Maghrib,data.timings.Isha,data.timings.Imsak,data.date.readable,
                        data.meta.timezone.split("/")[0],data.meta.timezone.split("/")[1]);
                    tbody.append(tr);   
                    $("td").css({
                        "border-collapse": "collapse",
                        "border": "1px solid orange",
                    })
                });
            },
            error:function(error){
                alert("please enter correct location and Dates");
            }
        })
        inputWidth.val("");
        inputLength.val("");
        inputDate.val("");
    })
    $("#prayerTimes .day").click(function(){
        tbody.html("");
        let day=inputDate.val().split("-")[2];
        let month=inputDate.val().split("-")[1];
        let year=inputDate.val().split("-")[0];
        let url=`http://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${inputWidth.val()}&longitude=${inputLength.val()}&method=2`;
         $.ajax({
            methood:"get",
            url:url,
            success:function(datas){
                datas.data.forEach(data => {
                    if (data.date.readable.split(" ")[0]==day) {
                        let tr=CreateTableItem(data.timings.Fajr,data.timings.Sunrise,data.timings.Dhuhr,data.timings.Asr,
                            data.timings.Sunset,data.timings.Maghrib,data.timings.Isha,data.timings.Imsak,data.date.readable,
                            data.meta.timezone.split("/")[0],data.meta.timezone.split("/")[1]);
                        tbody.append(tr);    
                        $("td").css({
                            "border-collapse": "collapse",
                            "border": "1px solid orange",
                        })
                    }
                    
                });
            },
            error:function(error){
                alert("please enter correct location and Dates");
            }
        })
        inputWidth.val("");
        inputLength.val("");
        inputDate.val("");
    })
    function CreateTableItem(){
        let arr=Array.from(arguments);
        let tr=$("<tr>");
        
        let tdFajr=$("<td>");
        tdFajr.html(arr[0]);
        let tdSunrise=$("<td>");
        tdSunrise.html(arr[1]);
        let tdDhuhr=$("<td>");
        tdDhuhr.html(arr[2]);
        let tdAsr=$("<td>");
        tdAsr.html(arr[3]);
        let tdSunset=$("<td>");
        tdSunset.html(arr[4]);
        let tdMaghrib=$("<td>");
        tdMaghrib.html(arr[5]);
        let tdIsha=$("<td>");
        tdIsha.html(arr[6]);
        let tdImsak=$("<td>");
        tdImsak.html(arr[7]);
        let tdDate=$("<td>");
        tdDate.html(arr[8]);
        let tdRegion=$("<td>");
        tdRegion.html(arr[9]);
        let tdCity=$("<td>");
        tdCity.html(arr[10]);
        
        tr.append(tdFajr,tdSunrise,tdDhuhr,tdAsr,tdSunset,tdMaghrib,tdIsha,tdImsak,tdDate,tdRegion,tdCity);
        
        
        return tr;
    }

})

