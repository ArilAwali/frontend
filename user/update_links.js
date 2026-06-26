const fs = require('fs');
const path = require('path');

const dir = 'd:\\pa teguh\\frontend\\user';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const mappings = [
    { regex: /<a[^>]*href="([^"]*)"[^>]*>(\s*)<i[^>]*class="[^"]*fa-home"[^>]*><\/i>\s*Beranda\s*<\/a>/gi, href: 'branda pmb.html' },
    { regex: /<a[^>]*href="([^"]*)"[^>]*>(\s*)<i[^>]*class="[^"]*fa-user"[^>]*><\/i>\s*Biodata\s*<\/a>/gi, href: 'biodaata.html' },
    { regex: /<a[^>]*href="([^"]*)"[^>]*>(\s*)<i[^>]*class="[^"]*fa-file-alt"[^>]*><\/i>\s*Formulir Pendaftaran\s*<\/a>/gi, href: 'formulir pendaftaran.html' },
    { regex: /<a[^>]*href="([^"]*)"[^>]*>(\s*)<i[^>]*class="[^"]*fa-folder"[^>]*><\/i>\s*Dokumen\s*<\/a>/gi, href: 'dokumen step 1.html' },
    { regex: /<a[^>]*href="([^"]*)"[^>]*>(\s*)<i[^>]*class="[^"]*fa-check-circle"[^>]*><\/i>\s*Status Pendaftaran\s*<\/a>/gi, href: 'a_status.html' },
    { regex: /<a[^>]*href="([^"]*)"[^>]*>(\s*)<i[^>]*class="[^"]*fa-columns"[^>]*><\/i>\s*Dashboard Akademik\s*<\/a>/gi, href: 'dashboard akademik user.html' },
    { regex: /<a[^>]*href="([^"]*)"[^>]*>(\s*)<i[^>]*class="[^"]*fa-file-signature"[^>]*><\/i>\s*KRS\s*<\/a>/gi, href: 'krs.html' },
    { regex: /<a[^>]*href="([^"]*)"[^>]*>(\s*)<i[^>]*class="[^"]*fa-star"[^>]*><\/i>\s*KHS \(Nilai\)\s*<\/a>/gi, href: 'khs user.html' },
    { regex: /<a[^>]*href="([^"]*)"[^>]*>(\s*)<i[^>]*class="[^"]*fa-file-invoice"[^>]*><\/i>\s*Transkrip\s*<\/a>/gi, href: 'a_transkip_user.html' },
    { regex: /<a[^>]*href="([^"]*)"[^>]*>(\s*)<i[^>]*class="[^"]*fa-calendar-alt"[^>]*><\/i>\s*Jadwal Kuliah\s*<\/a>/gi, href: 'jadwal.html' },
    { regex: /<a[^>]*href="([^"]*)"[^>]*>(\s*)<i[^>]*class="[^"]*fa-bullhorn"[^>]*><\/i>\s*Pengumuman\s*<\/a>/gi, href: 'informasi.html' },
    { regex: /<a[^>]*href="([^"]*)"[^>]*>(\s*)<i[^>]*class="[^"]*fa-comments"[^>]*><\/i>\s*Diskusi \/ Forum\s*<\/a>/gi, href: 'forum.html' },
    { regex: /<a[^>]*href="([^"]*)"[^>]*>(\s*)<i[^>]*class="[^"]*fa-wallet"[^>]*><\/i>\s*Keuangan\s*<\/a>/gi, href: 'keuangan.html' },
    { regex: /<a[^>]*href="([^"]*)"[^>]*>(\s*)<i[^>]*class="[^"]*fa-sign-out-alt"[^>]*><\/i>\s*Keluar\s*<\/a>/gi, href: 'login.html' },
];

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    for (const mapping of mappings) {
        const newContent = content.replace(mapping.regex, (match) => {
            return match.replace(/href="[^"]*"/, `href="${mapping.href}"`);
        });
        if (newContent !== content) {
            content = newContent;
            changed = true;
        }
    }
    
    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    }
}
