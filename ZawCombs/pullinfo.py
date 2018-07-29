import csv
import os

acceptdam = []
acceptspd = []
acceptcrit = []
acceptstat = []

intable = open('zawtable.csv','r')
tablereader = csv.reader(intable)
tablereader.__next__()

for row in tablereader:
    if round(float(row[4]),3) not in acceptdam:
        acceptdam.append(round(float(row[4]),3))
    if round(float(row[5]),3) not in acceptspd:
        acceptspd.append(round(float(row[5]),3))
    if round(float(row[6]),3) not in acceptcrit:
        acceptcrit.append(round(float(row[6]),3))
    if round(float(row[7]),3) not in acceptstat:
        acceptstat.append(round(float(row[7]),3))

acceptdam.sort()
acceptspd.sort()
acceptcrit.sort()
acceptstat.sort()

print(acceptdam)
print(len(acceptdam))
print(acceptspd)
print(len(acceptspd))
print(acceptcrit)
print(len(acceptcrit))
print(acceptstat)
print(len(acceptstat))
