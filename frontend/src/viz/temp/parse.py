import json

def parseRestaurants(path):

    with open(path) as f:
        data = json.load(f)

    #label: bigger, val: smaller (num)
    toRet = {}

    for i in data:
        if i["type"] in toRet:
            toRet[i["type"]] += 1
        else:
            toRet[i["type"]] = 1
    
    d = []
    for i in toRet:
        temp = {"label": i, "value": toRet[i]}
        d.append(temp)

    print(d)

p = "../vizdata/aroundatx-restaurants.json"
parseRestaurants(p)

