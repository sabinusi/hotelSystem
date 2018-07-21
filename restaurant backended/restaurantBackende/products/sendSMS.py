import http.client
import base64
import json


def send_sms(phone="", message='', sender="Mobilepower"):
    encode = base64.b64encode(bytes('kacefBS:Fredrica29.',encoding='utf-8'))
    print(encode)
    print(encode.decode("utf-8"))
    conn = http.client.HTTPSConnection("api.infobip.com")
    data = {
        "from": sender,
        "to": phone,
        "text": message
    }

    headers = {
        'authorization': "Basic %s" % encode.decode("utf-8"),
        'content-type': "application/json",
        'accept': "application/json"
    }
    print(headers)
    conn.request("POST", "/sms/1/text/single", json.dumps(data), headers)

    res = conn.getresponse()
    data = res.read()

    print(data.decode("utf-8"))

