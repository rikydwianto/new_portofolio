// Minimal admin JS for mostly static interactions or confirmations
document.addEventListener('DOMContentLoaded', () => {
    // Add any admin specific JS here, like previewing images before upload
    const thumbnailInput = document.getElementById('thumbnail');

    if (thumbnailInput) {
        thumbnailInput.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                // Could create a preview element dynamically here
            }
        });
    }
});
