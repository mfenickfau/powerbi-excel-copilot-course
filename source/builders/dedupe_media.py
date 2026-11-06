"""Deduplicate identical media parts in a .pptx: point every relationship at one copy and drop the rest."""
import sys, zipfile, hashlib, re, os
src, dst = sys.argv[1], sys.argv[2]
zin = zipfile.ZipFile(src)
names = zin.namelist()
canon, mapping = {}, {}
for n in names:
    if n.startswith("ppt/media/"):
        h = hashlib.md5(zin.read(n)).hexdigest()
        if h in canon: mapping[n] = canon[h]
        else: canon[h] = n
drop = set(mapping)
with zipfile.ZipFile(dst + ".tmp", "w", zipfile.ZIP_DEFLATED, compresslevel=9) as zout:
    for item in zin.infolist():
        n = item.filename
        if n in drop: continue
        data = zin.read(n)
        if n.endswith(".rels") and drop:
            txt = data.decode("utf-8")
            def fix(m):
                t = m.group(1)
                base = os.path.normpath(os.path.join(os.path.dirname(os.path.dirname(n)), t)).replace("\\", "/")
                if base in mapping:
                    return 'Target="' + os.path.relpath(mapping[base], os.path.dirname(os.path.dirname(n))).replace("\\", "/") + '"'
                return m.group(0)
            txt = re.sub(r'Target="([^"]*media/[^"]*)"', fix, txt)
            data = txt.encode("utf-8")
        zout.writestr(item, data)
os.replace(dst + ".tmp", dst)
print(f"{os.path.basename(dst)}: dropped {len(drop)} duplicate media, {os.path.getsize(dst)//1024} KB")
