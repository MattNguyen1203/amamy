- Quick start

* mở terminal và gõ lệnh 'npm install' để render ra node_module
* tạo file .env cùng cấp với .env.local
* copy file .env.local sang .env
* mở terminal và gõ lệnh 'npm run dev' để chạy project

---

Các bước build lên VPS: Trên local:

- Đăng nhập Docker
- Build: docker compose -f docker-compose.yml build
- Push lên docker và tạo image mới: docker push docker.io/okhubvn/nextjs14-okhub:latest

docker compose -f docker-compose.yml build && docker push docker.io/okhubvn/nextjs14-okhub:latest
Trên VPS: Lần đẩy đầu tiên: docker pull
docker.io/okhubvn/nextjs14-okhub:latest && docker run -d -p 3000:3000 --name nextjs14-okhub docker.io/okhubvn/nextjs14-okhub:latest

- Pull image mới về: docker pull docker.io/okhubvn/nextjs14-okhub:latest
- Xóa container cũ:

* docker stop nextjs14-okhub
* docker rm nextjs14-okhub

- Run app: docker run -d -p 3000:3000 --name nextjs14-okhub
  docker.io/okhubvn/nextjs14-okhub:latest

docker pull docker.io/okhubvn/nextjs14-okhub:latest && docker stop nextjs14-okhub && docker rm
nextjs14-okhub && docker run -d -p 3000:3000 --name nextjs14-okhub docker.io/okhubvn/nextjs14-okhub:latest
