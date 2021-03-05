import requests

def stats():

    commitsLink = "https://gitlab.com/api/v4/projects/24707879/repository/commits"
    issuesLink = "https://gitlab.com/api/v4/projects/24707879/issues"
    commitsResponse = requests.get(commitsLink).json()
    issuesResponse = requests.get(issuesLink).json()
    
    data = {}
    totalCommits = 0
    totalIssues = 0

    for i in commitsResponse:
        totalCommits += 1
        name = i["author_name"]
        if name in data:
            data[name][0] += 1
        else:
            data[name] = [1, 0, 0]

    for i in issuesResponse:
        totalIssues += 1
        if i["state"] == "closed":
            """if none assigned, add for everyone"""
            if not i["assignees"]:
                for person in data:
                    data[person][1] += 1
            else:
                for person in i["assignees"]:
                    data[person["name"]][1] += 1

    data["total"] = [totalCommits, totalIssues, 0]
    
    return data
