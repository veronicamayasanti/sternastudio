# 🌊 Sterna Studio — Panduan Deploy ke DigitalOcean VPS

Panduan lengkap untuk men-deploy website **sternastudio.com** ke VPS DigitalOcean menggunakan Nginx + SSL.

---

## 📋 Checklist Progress

- [ ] Buat akun DigitalOcean
- [ ] Buat Droplet (VPS)
- [ ] Arahkan domain ke DigitalOcean
- [ ] Setup server (Nginx + Node.js)
- [ ] Push project ke GitHub
- [ ] Deploy & build di server
- [ ] Setup SSL (HTTPS)

---

## Step 1 — Buat Akun & Droplet (VPS)

1. Daftar di [digitalocean.com](https://digitalocean.com)
2. Klik **Create → Droplets**
3. Pilih konfigurasi berikut:

| Setting | Rekomendasi |
|---|---|
| **Region** | Singapore (paling dekat Indonesia) |
| **OS** | Ubuntu 24.04 LTS |
| **Plan** | Basic → Regular **$6/bulan** (1GB RAM, 1 vCPU, 25GB SSD) |
| **Authentication** | SSH Key *(lebih aman dari password)* |
| **Hostname** | `sternastudio` |

---

## Step 2 — Connect Domain ke DigitalOcean

### Di DigitalOcean
Masuk ke **Networking → Domains**, lalu tambahkan domain:
```
sternastudio.com
```

Tambahkan DNS record berikut:
```
A    @    →  [IP Droplet kamu]
A    www  →  [IP Droplet kamu]
```

### Di Registrar Domain (Niagahoster / GoDaddy / Namecheap / dll)
Ubah **Nameserver** ke:
```
ns1.digitalocean.com
ns2.digitalocean.com
ns3.digitalocean.com
```

> ⏳ Propagasi DNS membutuhkan waktu beberapa menit hingga 48 jam.

---

## Step 3 — Akses Server via SSH

Setelah Droplet aktif, buka terminal dan koneksikan ke server:

```bash
ssh root@[IP-DROPLET-KAMU]
```

Lalu update sistem dan install kebutuhan server:

```bash
# Update sistem
apt update && apt upgrade -y

# Install Nginx (web server)
apt install nginx -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install nodejs -y

# Install Git
apt install git -y
```

Verifikasi instalasi:
```bash
nginx -v
node -v
git --version
```

---

## Step 4 — Push Project ke GitHub

Di komputer lokal kamu, buka terminal di folder project:

```bash
# Inisialisasi git (jika belum)
git init
git add .
git commit -m "first commit"

# Push ke GitHub
git remote add origin https://github.com/[username]/sternastudio.git
git branch -M main
git push -u origin main
```

---

## Step 5 — Deploy Website di Server

Kembali ke terminal SSH server, lalu clone dan build project:

```bash
# Clone project dari GitHub
cd /var/www
git clone https://github.com/[username]/sternastudio.git
cd sternastudio

# Install dependencies
npm install

# Build untuk production
npm run build
```

Folder `dist/` akan otomatis terbuat berisi file siap produksi.

---

## Step 6 — Konfigurasi Nginx

Buat file konfigurasi Nginx untuk domain:

```bash
nano /etc/nginx/sites-available/sternastudio
```

Isi dengan konfigurasi berikut:

```nginx
server {
    listen 80;
    server_name sternastudio.com www.sternastudio.com;

    root /var/www/sternastudio/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Aktifkan konfigurasi dan reload Nginx:

```bash
# Buat symlink ke sites-enabled
ln -s /etc/nginx/sites-available/sternastudio /etc/nginx/sites-enabled/

# Test konfigurasi (pastikan tidak ada error)
nginx -t

# Reload Nginx
systemctl reload nginx
```

---

## Step 7 — Setup SSL Gratis dengan Let's Encrypt

Install Certbot dan aktifkan HTTPS:

```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d sternastudio.com -d www.sternastudio.com
```

Ikuti instruksi di layar, masukkan email, dan pilih opsi **redirect HTTP ke HTTPS**.

SSL akan **auto-renew** otomatis. Untuk memverifikasi:
```bash
certbot renew --dry-run
```

---

## 🔄 Update Website (Setelah Perubahan Kode)

Setiap kali ada update, jalankan di server:

```bash
cd /var/www/sternastudio
git pull origin main
npm install
npm run build
systemctl reload nginx
```

---

## 🛠️ Perintah Berguna

```bash
# Cek status Nginx
systemctl status nginx

# Restart Nginx
systemctl restart nginx

# Lihat log error Nginx
tail -f /var/log/nginx/error.log

# Lihat log akses Nginx
tail -f /var/log/nginx/access.log

# Cek SSL certificate
certbot certificates
```

---

## 📦 Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Web Server**: Nginx
- **SSL**: Let's Encrypt (Certbot)
- **Hosting**: DigitalOcean Droplet (Ubuntu 24.04)
- **Domain**: sternastudio.com

---

*Dibuat untuk Sterna Studio — [sternastudio.com](https://sternastudio.com)*
