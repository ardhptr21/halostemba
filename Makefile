APP_NAME = halostemba

all: prepare deps db lint test build start

start:
	@echo "---- RUNNING START STAGE ----"
	@pm2 start pnpm --name $(APP_NAME) -- start
	@echo "---- START COMPLETED ----"

restart:
	@echo "---- RUNNING RESTART STAGE ----"
	@pm2 restart $(APP_NAME)
	@echo "---- RESTART COMPLETED ----"

build:
	@echo "---- RUNNING BUILD STAGE ----" 
	@pnpm run build
	@echo "---- BUILD COMPLETED ----"

lint:
	@echo "---- RUNNING LINT STAGE ----" 
	@pnpm run lint
	@echo "---- LINT COMPLETED ----"

test:
	@echo "---- RUNNING TEST STAGE ----" 
	@pnpm run test
	@echo "---- TEST COMPLETED ----"

deps:
	@echo "---- RUNNING DEPS STAGE ----" 
	@pnpm install --frozen-lockfile
	@echo "---- DEPS COMPLETED ----"

prepare:
	@echo "---- RUNNING PREPARE STAGE ----"
	@echo "[+] Checking if Node.js is installed."
	@which node 2>/dev/null || (echo "[!] Node.js is not installed." && exit 1)
	@echo "[+] Checking if pnpm is installed."
	@which pnpm 2>/dev/null || (echo "[!] pnpm is not installed." && exit 1)
	@echo "[+] Checking if Docker is installed."
	@which docker 2>/dev/null || (echo "[!] Docker is not installed." && exit 1)
	@echo "[+] Checking if pm2 is installed."
	@which pm2 2>/dev/null || (echo "[!] pm2 is not installed." && exit 1)
	@echo "---- PREPARE STAGE COMPLETED ----"

db:
	@echo "---- RUNNING DB STAGE ----" 
	@cd docker/database && sudo docker compose up -d --build
	
	@echo "[i] Waiting for the database to start..."
	@sleep 10
	
	@cd packages/db && pnpm prisma migrate deploy
	@cd packages/db && pnpm prisma generate
	@cd packages/db && pnpm prisma db seed production
	@echo "---- DB COMPLETED ----"