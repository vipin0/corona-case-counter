 fetch("https://api.covid19india.org/data.json").then(
        res => {
            res.json().then(
                myObj => {
                    // console.log(myObj);
                    // if (myObj.data.length > 0) {
                        var temp = "";
                        var totaldata = "";
                        var total = [0,0,0];
                        var j=1;
                        for (var i in myObj.statewise.slice(1,myObj.statewise.length)) {
                            var u = myObj.statewise[i];
                            // console.log(u)
                            temp += "<tr>";
                            // for(var j in u){
                            //     temp += "<td>" + u[j] + "</td>";
                            // }
                            // temp += "<td>" + u[0] + "</td>";
                            // temp += "<td>" + u[1] + "</td>";
                            // temp += "<td>" + u[2] + "</td>";
                            // temp += "<td>" + u[3] + "</td>";
                            // temp += "<td>" + u[4] + "</td>";
                            // temp += "<td>" + u[5] + "</td>";
                            // temp += "</tr>";
            //                 "active": "24558",
			// "confirmed": "34780",
			// "deaths": "1151",
			// "deltaconfirmed": "1717",
			// "deltadeaths": "72",
			// "deltarecovered": "631",
			// "lastupdatedtime": "30/04/2020 22:12:45",
			// "recovered": "9068",
			// "state": "Total",
			// "statecode": "TT",
			// "statenotes": ""
                            if(u.state == "Total"){
                                continue;
                            }
                            temp += "<td>" + j++ + "</td>";
                            temp += "<td class='lin'>" + u.state + "</td>";
                            temp += "<td>" + u.confirmed + "</td>";
                            temp += "<td>" + u.active + "</td>";
                            temp += "<td>" + u.recovered + "</td>";
                            temp += "<td>" + u.deaths + "</td>";
                            // temp += "<td>" + u[5] + "</td>";
                            temp += "</tr>";
                            // total[0]+=parseInt(u.confirmed );
                            // total[1]+=parseInt(u.recovered);
                            // total[2]+=parseInt(u.deaths);
                        }
                            totaldata += "<tr>";
                            totaldata += "<td></td>";
                            totaldata += "<td>Total</td>";
                            totaldata += "<td>" + myObj.statewise[0].confirmed + "</td>";
                            totaldata += "<td>" + myObj.statewise[0].active + "</td>";
                            totaldata += "<td>" + myObj.statewise[0].recovered + "</td>";
                            totaldata += "<td>" + myObj.statewise[0].deaths + "</td>";
                            totaldata += "</tr>";
                        //document.getElementById("data").innerHTML = temp;
                        var time = myObj.statewise[0].lastupdatedtime;
                    // }
                    //var time =new Date(myObj.updated_date);
                    // console.log(time);
                    // time.toString().slice(0,28);;
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