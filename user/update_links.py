import os
import re

dir_path = r'd:\pa teguh\frontend\user'

mappings = [
    ('Beranda', 'branda pmb.html'),
    ('Biodata', 'biodaata.html'),
    ('Formulir Pendaftaran', 'formulir pendaftaran.html'),
    ('Dokumen', 'dokumen step 1.html'),
    ('Status Pendaftaran', 'a_status.html'),
    ('Dashboard Akademik', 'dashboard akademik user.html'),
    ('KRS', 'krs.html'),
    ('KHS \(Nilai\)', 'khs user.html'),
    ('Transkrip', 'a_transkip_user.html'),
    ('Jadwal Kuliah', 'jadwal.html'),
    ('Pengumuman', 'informasi.html'),
    ('Diskusi / Forum', 'forum.html'),
    ('Keuangan', 'keuangan.html'),
    ('Keluar', 'login.html'),
]

for filename in os.listdir(dir_path):
    if filename.endswith('.html'):
        file_path = os.path.join(dir_path, filename)
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        for text, new_href in mappings:
            pattern = re.compile(rf'(<a[^>]*href=")([^"]*)("[^>]*>(?:(?!</?a>)[\s\S])*?){text}((?:(?!</?a>)[\s\S])*?</a>)', re.IGNORECASE)
            replacement_text = text.replace(r"\(", "(").replace(r"\)", ")")
            content = pattern.sub(rf'\g<1>{new_href}\g<3>{replacement_text}\g<4>', content)
            
            # Also handle btn-logout which is a button, wait Keluar might be a button!
            if text == 'Keluar':
                pattern_btn = re.compile(rf'(<button[^>]*class="[^"]*logout[^"]*"[^>]*>(?:(?!</?button>)[\s\S])*?){text}((?:(?!</?button>)[\s\S])*?</button>)', re.IGNORECASE)
                # For buttons we might want to change them to anchor tags?
                # The user just said "pastikan saling terhubung", if Keluar is a button, maybe wrap it in an <a> or add onclick.
                # Actually, in biodaata.html:
                # <button class="btn-logout">...Keluar</button>
                # Let's change button to anchor tag with href for Keluar.
                pass
            
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'Updated {filename}')
