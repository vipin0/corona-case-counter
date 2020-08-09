 fetch("https://api.covid19india.org/state_district_wise.json").then(
        res => {
            res.json().then(
                myObj => {
                        var statecode = "AR";
                        var temp = "";
                        var totaldata = "";
                        var total = [0,0,0];
                        console.log(myObj.statecode);
                        var j=1;
                        for (var i in myObj.statecode.districtData) {
                            var u = myObj.statecode.districtData[i];
                            console.log(u)
                            temp += "<tr>";
                            // if(u.state == "Total"){
                            //     continue;
                            // }
                            temp += "<td>" + j++ + "</td>";
                            temp += "<td>" + u.state + "</td>";
                            temp += "<td>" + u.confirmed + "</td>";
                            temp += "<td>" + u.active + "</td>";
                            temp += "<td>" + u.recovered + "</td>";
                            temp += "<td>" + u.deaths + "</td>";
                            // temp += "<td>" + u[5] + "</td>";
                            temp += "</tr>";
                        }
                            totaldata += "<tr>";
                            totaldata += "<td></td>";
                            totaldata += "<td>Total</td>";
                            totaldata += "<td>" + myObj.statewise[0].confirmed + "</td>";
                            totaldata += "<td>" + myObj.statewise[0].active + "</td>";
                            totaldata += "<td>" + myObj.statewise[0].recovered + "</td>";
                            totaldata += "<td>" + myObj.statewise[0].deaths + "</td>";
                            totaldata += "</tr>";
                        document.getElementById("data").innerHTML = temp;
                        var time = myObj.statewise[0].lastupdatedtime;
                    document.getElementById("date").innerHTML = time;
                    document.getElementById("totaldata").innerHTML = totaldata;

                    document.getElementById("data-update").innerHTML = "Updated at : "+time;
                    document.getElementById("active").innerHTML = myObj.statewise[0].active;
                    document.getElementById("discharged").innerHTML = myObj.statewise[0].recovered;
                    document.getElementById("death").innerHTML =  myObj.statewise[0].deaths;
                }
            )
        }
    )