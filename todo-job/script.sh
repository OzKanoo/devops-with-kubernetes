#!/bin/sh
# 1. Zufällige Wikipedia-URL holen (nur den Location-Header)
WIKI_URL=\

echo "Found random article: \"

# 2. Die URL als Todo an das Backend senden
# Wir nutzen den DNS-Namen unseres Backend-Services im Namespace 'project'
curl -X POST http://todo-backend-svc.project.svc.cluster.local:80/todos \
     -H "Content-Type: application/json" \
     -d "{\"todo\": \"Read \\"}"
