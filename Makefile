.PHONY: db server frontend run

build:
	docker compose build

db: 
	docker compose up -d postgres

server:
	docker compose up -d server

frontend:
	docker compose up -d frontend

run: frontend