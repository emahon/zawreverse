"""
Reads attack speed from zaw file built by https://semlar.com/zawcalc
and puts it in the standard used by this program
"""

import json

zawfil = open('zaws5.json','r')
zawjson = json.loads(zawfil.read())
#pull grip data - has two arrays, for 1 and 2 handed
for ar in zawjson['grips']:
    for grip in ar:
        gripfilname = "../Zaw Parts/Grips/"+grip['name'].title()+'.txt'
        gripfil = open(gripfilname,'r')
        gripdat = json.loads(gripfil.read())
        gripdat['speed'] = grip['fireRate']
        gripfil.close()
        gripout = json.dumps(gripdat)
        gripfil = open(gripfilname,'w')
        gripfil.write(gripout)
        gripfil.close()

for link in zawjson['links']:
    linkfilname = "../Zaw Parts/Links/"+link['name'].title()+'.txt'
    linkfilname = linkfilname.replace('Ii','II') #special casing numbers
    linkfil = open(linkfilname,'r')
    linkdat = json.loads(linkfil.read())
    linkdat['speed'] = link['upgrades']['WEAPON_FIRE_RATE']['value']
    linkfil.close()
    linkout = json.dumps(linkdat)
    linkfil = open(linkfilname,'w')
    linkfil.write(linkout)
    linkfil.close()

for strike in zawjson['strikes']:
    strikefilname = "../Zaw Parts/Strikes/"+strike['name'].title()+'.txt'
    strikefil = open(strikefilname,'r')
    strikedat = json.loads(strikefil.read())
    if 'WEAPON_FIRE_RATE' in strike['upgrades']: #some don't affect speed
        strikedat['speed'] = strike['upgrades']['WEAPON_FIRE_RATE']['value']
        strikefil.close()
        strikeout = json.dumps(strikedat)
        strikefil = open(strikefilname,'w')
        strikefil.write(strikeout)
        strikefil.close()
