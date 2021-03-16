import requests

def stats():

	branches = ['master', 'dev']

	data = {"total": {"name": "total", "commits": 0, "issues": 0, "unittests": 0}}

	for branch in branches:

		commitsLink = "https://gitlab.com/api/v4/projects/24707879/repository/commits?ref_name=" + branch + "&per_page=100"
		#issuesLink = "https://gitlab.com/api/v4/projects/24707879/issues"
		commitsResponse = requests.get(commitsLink).json()
		#issuesResponse = requests.get(issuesLink).json()
	
		num = 0

		for i in commitsResponse:

			data["total"]["commits"] += 1
			name = i["author_name"][:2].lower()

			if name[0] == 'w':			# handle William's two usernames
				name = 'w';

			if name in data:
				data[name]["commits"] += 1
			else:
				data[name] = {"name": name, "commits": 1, "issues": 0, "unittests": 0}

			num += 1

		#print("num =", num, " for branch ", branch)

	issuesLink = "https://gitlab.com/api/v4/projects/24707879/issues"
	issuesResponse = requests.get(issuesLink).json()

	for i in issuesResponse:
		if i["state"] == "closed":
			data["total"]["issues"] += 1
			"""if none assigned, add for everyone"""
			if not i["assignees"]:
				for person in data:
					data[person]["issues"] += 1
			else:
				for person in i["assignees"]:
					name = person["name"][:2].lower()
					if name in data:
						data[name]["issues"] += 1
					else:
						data[name] = {"name": name, "commits": 0, "issues": 1, "unittests": 0}

	return {"stats": list(data.values())}
