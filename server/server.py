#https://docs.python.org/3.6/library/wsgiref.html#module-wsgiref.simple_server

from wsgiref.simple_server import make_server
from urllib.parse import parse_qs
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
    o = parse_qs(request_body)
    accept_grips = []
    for filename in os.listdir("../Zaw Parts/Grips"):
        print(filename)
        dat = json.loads(open("../Zaw Parts/Grips/"+filename,'r').read())
        print(dat)
        if dat["damage"] < o["comDamage"]:
            accept_grips.append(filename[0:-4])
        print(accept_grips)

    return ["test".encode('utf-8')]

httpd = make_server('',8000, zawreverse)
print ("Serving on port 8000")

httpd.serve_forever()
