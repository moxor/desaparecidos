# requisits: python-pip
# pip install requests
# pip install lxml

from lxml import html, etree
import lxml.html
url="http://www.pgr.gob.mx/SPDA/search/opera_consulta.asp?pagina=1&TamPagina=10000&sta=E&nombre=&paterno=&materno=&orden=NOMBRE&edad=T&sexo=A&tipo=IMG&entidad=0"
t = lxml.html.parse(url)
out = open('a.xhtml', 'wb')
out.write(etree.tostring(t))