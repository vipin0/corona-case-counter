import json
import ssl
from urllib.request import Request, urlopen

from flask import Flask, render_template

app = Flask(__name__)

host = '0.0.0.0'
port = 80
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE


@app.route('/')
def hello_world():
    url = 'https://api.covid19india.org/data.json'

    req = Request(url, headers={
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                      "Chrome/81.0.4044.129 Safari/537.36"})

    js = urlopen(req, context=ctx, timeout=20).read()
    js1 = json.loads(js)
    return render_template('main.html', data=js1["statewigse"], timestamp=js1["statewgise"][0]["lastupdatedtime"])


@app.route('/get-data/')
def get_data():
    file = open('data12.json', 'r')
    js = json.loads(file.read())
    return json.dumps(js, indent=4)


@app.route('/<string:state>')
def get_district_wise(state):
    url = 'https://api.covid19india.org/state_district_wise.json'

    req = Request(url, headers={
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                      "Chrome/81.0.4044.129 Safari/537.36"})

    js = urlopen(req, context=ctx, timeout=20).read()
    js1 = json.loads(js)
    states = ['Total', 'Maharashtra', 'Gujarat', 'Delhi', 'Madhya Pradesh', 'Rajasthan', 'Tamil Nadu', 'Uttar Pradesh',
              'Andhra Pradesh', 'Telangana', 'West Bengal', 'Jammu and Kashmir', 'Karnataka', 'Kerala', 'Bihar',
              'Punjab', 'Haryana', 'Odisha', 'Jharkhand', 'Chandigarh', 'Uttarakhand', 'Himachal Pradesh', 'Assam',
              'Chhattisgarh', 'Andaman and Nicobar Islands', 'Ladakh', 'Meghalaya', 'Puducherry', 'Goa', 'Manipur',
              'Tripura', 'Mizoram', 'Arunachal Pradesh', 'Nagaland', 'Dadra and Nagar Haveli', 'Daman and Diu',
              'Lakshadweep', 'Sikkim']

    if state in states:
        # {k: v for k, v in sorted(x.items(), key=lambda item: item[1])}
        try:
            data = js1[state]["districtData"]
            data1 = {k: data[k] for k in sorted(data, key=lambda x: (data[x]['confirmed']), reverse=True)}
            # print(data1)
            return render_template("Districtwise.html", state=data1, stateName=state)
        except KeyError as e:
            return render_template('Districtwisenodata.html', stateName=state)
    else:
        return render_template('404.html')


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


if __name__ == '__main__':
    app.run(host, port)