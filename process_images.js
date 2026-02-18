const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'public/images/logo_riky.png');
const outputProfile = path.join(__dirname, 'public/images/profile_pic.png');
const outputFavicon = path.join(__dirname, 'public/images/favicon.png');

async function processImages() {
    try {
        if (!fs.existsSync(inputPath)) {
            console.error('❌ Error: File public/images/logo_riky.png tidak ditemukan!');
            console.log('Pastikan Anda sudah menaruh file logo_riky.png di folder public/images/');
            process.exit(1);
        }

        console.log('🔄 Memulai pemrosesan gambar...');

        // 1. Buat Profile Picture (300x300, compressed PNG)
        await sharp(inputPath)
            .resize(300, 300, { fit: 'cover' }) // Crop tengah
            .png({ quality: 80, compressionLevel: 9 })
            .toFile(outputProfile);
        console.log('✅ Profile Picture berhasil dibuat: public/images/profile_pic.png');

        // 2. Buat Favicon (64x64)
        await sharp(inputPath)
            .resize(64, 64)
            .png()
            .toFile(outputFavicon);
        console.log('✅ Favicon berhasil dibuat: public/images/favicon.png');

    } catch (error) {
        console.error('❌ Terjadi kesalahan saat memproses gambar:', error);
    }
}

processImages();
