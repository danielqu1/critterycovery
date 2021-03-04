def stats(arr):
    data = {}

    for i in arr:
        name = i["author_name"]
        if name in data:
            data[name] += 1
        else:
            data[name] = 1

    return data
