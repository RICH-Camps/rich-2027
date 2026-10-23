"""Standard-library pre-publication checks for the ten public 2027 pages."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote,urljoin
import re,json,xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parent
ORIGIN='https://www.richcamps.com/itineraries/2027/'
class Page(HTMLParser):
 def __init__(self,s):
  super().__init__();self.tags=[];self.ids=[];self.feed(s)
 def handle_starttag(self,t,a):
  d=dict(a);self.tags.append((t,d))
  if 'id' in d:self.ids.append(d['id'])
 def find(self,t,**attrs):return [d for tag,d in self.tags if tag==t and all(d.get(k)==v for k,v in attrs.items())]
def check():
 files=sorted(ROOT.glob('*.html')); assert len(files)==10
 parsed={p.name:Page(p.read_text()) for p in files}; titles=[];descriptions=[]
 for p in files:
  s=p.read_text();doc=parsed[p.name];canonical=ORIGIN+('' if p.name=='index.html' else p.name)
  assert len(doc.find('h1'))==1,p.name
  assert len(doc.ids)==len(set(doc.ids)),('duplicate id',p.name)
  assert doc.find('link',rel='canonical')==[{'rel':'canonical','href':canonical}],p.name
  title=re.findall(r'<title>(.*?)</title>',s,re.S);assert len(title)==1;pdesc=doc.find('meta',name='description');assert len(pdesc)==1 and pdesc[0].get('content')
  from html import unescape
  title=unescape(title[0]);desc=pdesc[0]['content'];titles.append(title);descriptions.append(desc)
  assert doc.find('meta',property='og:title')[0]['content']==title,p.name
  assert doc.find('meta',property='og:description')[0]['content']==desc,p.name
  assert doc.find('meta',property='og:url')[0]['content']==canonical,p.name
  assert doc.find('meta',name='twitter:title')[0]['content']==title,p.name
  assert doc.find('meta',name='twitter:description')[0]['content']==desc,p.name
  assert not any('noindex' in d.get('content','').lower() for d in doc.find('meta',name='robots')),p.name
  blocks=re.findall(r'<script type="application/ld\+json">(.*?)</script>',s,re.S);assert len(blocks)==1
  graph=json.loads(blocks[0])['@graph'];pages=[x for x in graph if x['@type'] in ('WebPage','CollectionPage')];assert len(pages)==1
  page=pages[0];assert page['url']==canonical and page['name']==title and page['description']==desc,p.name
  assert all(urlsplit(u).hostname=='www.richcamps.com' for u in page.get('relatedLink',[])),p.name
  for t,d in doc.tags:
   if t=='img': assert 'alt' in d,('missing alt',p.name)
   for attr in ('href','src'):
    u=d.get(attr,'');url=urlsplit(urljoin(canonical,u))
    if not u or url.scheme not in ('http','https'):continue
    assert url.hostname!='dev.richcamps.com',p.name
    if url.hostname!='www.richcamps.com' or not url.path.startswith('/itineraries/2027/'):continue
    local=unquote(url.path)[len('/itineraries/2027/'):] or 'index.html'
    assert (ROOT/local).is_file(),('missing file',p.name,u)
    if url.fragment and local.endswith('.html'):assert unquote(url.fragment) in parsed[local].ids,('missing anchor',p.name,u)
  for css in re.findall(r'<link rel="stylesheet" href="([^"]+)"',s):
   path=ROOT/css
   for asset in re.findall(r'url\([\"\']?([^\)\"\']+)',path.read_text()):
    if not asset.startswith(('data:','http')):assert (path.parent/asset).is_file(),('missing css asset',asset)
  if re.fullmatch(r'(beijing|shanghai)-s[1-4]\.html',p.name):
   assert s.count('class="day-module')==16,p.name
   start,end=page['temporalCoverage'].split('/');from datetime import date
   assert (date.fromisoformat(end)-date.fromisoformat(start)).days+1==16,p.name
   assert start in s and end[5:] in ['06-27','07-05','07-21','08-06'],p.name
   for link in doc.find('a'):
    h=unquote(link.get('href',''))
    if 'wa.me/' in h or h.startswith('mailto:'):
     assert p.name in h and p.stem.split('-')[0].title() in h,('wrong enquiry',p.name)
  for block in re.findall(r'<script type="application/json"[^>]*>(.*?)</script>',s,re.S):json.loads(block)
 assert len(set(titles))==10 and len(set(descriptions))==10
 sitemap=ET.parse(ROOT/'sitemap.xml');urls=[x.text for x in sitemap.findall('.//{*}loc')]
 assert set(urls)=={ORIGIN+('' if p.name=='index.html' else p.name) for p in files} and len(urls)==10
 assert 'Disallow: /' not in (ROOT/'robots.txt').read_text()
 for p in ROOT.rglob('*'):
  if p.is_file() and '.git' not in p.parts and p.suffix in ('.html','.js','.css','.json','.xml'):
   assert 'dev.richcamps.com' not in unquote(p.read_text()),('development URL',p)
 print('PASS: 10 pages; unique metadata, canonical/JSON-LD consistency, sitemap, all local links/assets/fragments, 8 date ranges and enquiry payloads.')
if __name__=='__main__':check()
