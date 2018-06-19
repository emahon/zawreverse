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
            if (float(o[b'comCritChance'][0]) == float(row[6])*100):
                critFlag = True
            else:
                critFlag = False
        if (b'comStatChance' in o):
            if (float(o[b'comStatChance'][0]) == float(row[7])*100):
                statFlag = True
            else:
                statFlag = False
        if (damFlag and spdFlag and critFlag and statFlag):
            accept_comb.append(row[2]+'; '+row[0]+"; "+row[1])

    return [str(accept_comb).encode('utf-8')]

httpd = make_server('',8000, zawreverse)
print ("Serving on port 8000")

httpd.serve_forever()
