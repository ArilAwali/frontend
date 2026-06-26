import os

dir_path = r'd:\pa teguh\frontend\user'

for filename in os.listdir(dir_path):
    if filename.endswith('.html'):
        file_path = os.path.join(dir_path, filename)
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace <button class="btn-logout"> with <button class="btn-logout" onclick="window.location.href='login.html'">
        # To be safe, let's just do a string replacement.
        old_str = '<button class="btn-logout">'
        new_str = '<button class="btn-logout" onclick="window.location.href=\'login.html\'">'
        
        if old_str in content:
            new_content = content.replace(old_str, new_str)
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f'Updated {filename}')
