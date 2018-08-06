#https://docs.python.org/3.6/library/wsgiref.html#module-wsgiref.simple_server

from wsgiref.simple_server import make_server
from urllib.parse import parse_qs
import csv
import json
import os

print(make_server)
def zawreverse(environ, start_response):
    status = '200 OK'
    headers = [('Content-type', 'text/plain; charset=utf-8'),
        ('Access-Control-Allow-Origin', '*'), #change later
        ('Access-Control-Allow-Methods', 'POST, GET, OPTIONS'),
        ('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')]
    start_response(status, headers)

    #https://stackoverflow.com/questions/24243820/wsgi-python-how-to-get-post-data-from-an-html-form
    try:
        request_body_size = int(environ.get('CONTENT_LENGTH', 0))
    except (ValueError):
        request_body_size = 0

    request_body = environ['wsgi.input'].read(request_body_size)
    accept_comb = []
    o = parse_qs(request_body)
    if not (b'zaw' in o): #request for weapons
        tablereader = csv.reader(open("../ZawCombs/zawtable.csv",'r'))
        tablereader.__next__()
        for row in tablereader:
            damFlag = True
            spdFlag = True
            critFlag = True
            statFlag = True
            if (b'comDamage' in o):
                if (float(o[b'comDamage'][0]) == float(row[4])):
                    damFlag = True
                else:
                    damFlag = False
            if (b'comAtkSpd' in o):
                if (float(o[b'comAtkSpd'][0]) == float(row[5])):
                    spdFlag = True
                else:
                    spdFlag = False
            if (b'comCritChance' in o):
                if (float(o[b'comCritChance'][0]) == float(row[6])):
                    critFlag = True
                else:
                    critFlag = False
            if (b'comStatChance' in o):
                if (float(o[b'comStatChance'][0]) == float(row[7])):
                    statFlag = True
                else:
                    statFlag = False
            if (damFlag and spdFlag and critFlag and statFlag):
                accept_comb.append(row[2]+'; '+row[0]+"; "+row[1])

        return [str(accept_comb).encode('utf-8')]
    else: #request for how to build weapon
        parts = str(o[b'zaw'][0]).split('; ') #strike, grip, link
        strike = parts[0][2:]
        strikejson = json.loads(open("../Zaw Parts/Strikes/"+strike+".txt",'r').read())
        requirements = strikejson['requirements']
        grip = parts[1]
        gripjson = json.loads(open("../Zaw Parts/Grips/"+grip+".txt",'r').read())
        gripreqs = gripjson['requirements']
        for key in gripreqs.keys():
            if key in requirements.keys():
                requirements[key] = requirements[key] + gripreqs[key]
            else:
                requirements[key] = gripreqs[key]
        link = parts[2][:-1]
        linkjson = json.loads(open("../Zaw Parts/Links/"+link+".txt",'r').read())
        linkreqs = linkjson['requirements']
        for key in linkreqs.keys():
            if key in requirements.keys():
                requirements[key] = requirements[key] + linkreqs[key]
            else:
                requirements[key] = linkreqs[key]
        return [json.dumps(requirements).encode('utf-8')]

httpd = make_server('',8000, zawreverse)
print ("Serving on port 8000")

httpd.serve_forever()
