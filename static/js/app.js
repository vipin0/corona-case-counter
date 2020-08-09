 fetch("/get-data").then(
        res => {
            res.json().then(
                data => {
                    //console.log(data);
                    if (data.results.length > 0) {
                        var temp = ""
                        for (var i in data.results) {
                            var u = data.results[i];
                            //console.log(u)
                            temp += "<tr>";
                            temp += "<td>" + u.id + "</td>";
                            temp += "<td>" + u.State + "</td>";
                            temp += "<td>" + u.Total + "</td>";
                            temp += "<td>" + u.Discharged + "</td>";
                            temp += "<td>" + u.Death + "</td>";
                            temp += "</tr>";
                        }
                        document.getElementById("data").innerHTML = temp;
                    }
                    var time = data.time;
                    //console.log(time);
                    document.getElementById("date").innerHTML = time;
                }
            )
        }
    )