import csv
import os
import json

#create file
outtable = open("zawtable.csv",'w')
tablewriter = csv.writer(outtable)
tablewriter.writerow(['Grip','Link','Strike','Type','Tot Damage','Atk Spd','Crit %','Stat %'])

#build table of all possible zaw combinations
for gripname in os.listdir("../Zaw Parts/Grips"):
    grip = json.loads(open("../Zaw Parts/Grips/"+gripname,'r').read())
    for linkname in os.listdir("../Zaw Parts/Links"):
        link = json.loads(open("../Zaw Parts/Links/"+linkname,'r').read())
        for strikename in os.listdir("../Zaw Parts/Strikes"):
            strike = json.loads(open("../Zaw Parts/Strikes/"+strikename,'r').read())
            if grip["type"] == "onehand":
                weaptype = strike["type"][0]
            else:
                weaptype = strike["type"][1]
            totdmg = float(grip["damage"]) + float(link["damage"]) + float(strike["damage"])
            atkspd = float(grip["speed"]) + float(link["speed"]) + float(strike["speed"])
            try:
                crit = float(strike["crit"]) + float(link["crit"])
            except:
                crit = float(strike["crit"])
            try:
                stat = float(strike["status"]) + float(link["status"])
            except:
                stat = float(strike["status"])
            tablewriter.writerow([gripname[0:-4],linkname[0:-4],strikename[0:-4],weaptype, totdmg, atkspd, crit, stat])
