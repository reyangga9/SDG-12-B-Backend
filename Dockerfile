# Gunakan image Node.js versi 14 sebagai base image
FROM node:14

# Set direktori kerja di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json untuk instalasi dependensi
COPY package*.json ./

# Install dependensi
RUN npm install

# Salin seluruh proyek ke dalam container
COPY . .

# Expose port yang digunakan oleh aplikasi
EXPOSE 3000

# Perintah untuk menjalankan aplikasi ketika container dijalankan
CMD ["npm", "start"]

# Set variabel lingkungan DATABASE
ENV DATABASE=mongodb+srv://admin:admin12345@midterm.22o1sh8.mongodb.net/capstone_project

ENV JWT_SECRET_KEY = "valuenya bebas"


# cara build
# docker build -t sdg12-backend:latest .

# Cara menjalankan
# docker run -p 3000:3000 -d sdg12-backend:latest

