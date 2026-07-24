#!/usr/bin/env python3
"""One-time helper: download the team headshots from the current live site
into images/teamPhotos/ so the new static build is self-contained.
Run once with internet access: python3 fetch_team_photos.py"""
import json, os, urllib.request
os.makedirs("images/teamPhotos", exist_ok=True)
members = json.load(open("content/team.json"))["members"]
for m in members:
    p = m.get("photo")
    if not p:
        continue
    dest = p.lstrip("/")
    if os.path.exists(dest):
        print("exists:", dest); continue
    url = "https://www.sportendorse.com" + p
    try:
        urllib.request.urlretrieve(url, dest)
        print("fetched:", dest)
    except Exception as e:
        print("FAILED:", url, "->", e)
print("Done. Commit images/teamPhotos/ and rebuild.")
