var myObj = JSON.stringify('{{ state | tojson | safe}}');
console.log(myObj)