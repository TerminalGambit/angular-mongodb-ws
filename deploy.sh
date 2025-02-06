#!/bin/bash

# Define colors for better visibility
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting Auto Deployment for Quick Notes...${NC}"

# Step 1: Pull latest changes from GitHub
echo -e "${GREEN}📥 Pulling latest changes from GitHub...${NC}"
git pull origin main

# Step 2: Commit and push local changes to GitHub
echo -e "${GREEN}📝 Committing and pushing local changes...${NC}"
git add .
git commit -m "Auto-deploy: $(date)"
git push origin main

# Step 3: Stop and remove old containers and volumes
echo -e "${GREEN}🧹 Stopping and cleaning up old containers...${NC}"
docker-compose down -v

# Step 4: Rebuild and deploy containers
echo -e "${GREEN}🔧 Rebuilding the Docker containers...${NC}"
docker-compose up -d --build

# Step 5: Show running containers
echo -e "${GREEN}🐳 Listing running containers...${NC}"
docker ps

# Step 6: Tail backend logs for debugging (optional)
echo -e "${GREEN}📜 Showing backend logs...${NC}"
docker-compose logs -f backend