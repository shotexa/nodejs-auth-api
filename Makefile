run:
	docker-compose up
dev:
	cd ./auth-api && npm install 
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
test:
	cd ./auth-api && npm test