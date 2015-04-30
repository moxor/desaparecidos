import urllib
import os
import collections
import json
import time
from bs4 import BeautifulSoup 
begin=1000
pages=1494
b=begin
print b
des=[]
dat=[]
tit=[]
loc=[]
img=[]
imgFile=[]
d = collections.defaultdict(list)

counter=0
for z in range(begin, pages):
    try:
        e = collections.defaultdict(list)
        e["titel"].append( tit )
        e["description"].append( des )
        e["dateCase"].append( dat )
        e["location"].append(loc)
        e["picture"].append( imgFile) 
        e["img"].append( img) 
        out_file = open("test.json","w")
    
    # Save the dictionary into this file
    # (the 'indent=4' is optional, but makes it more readable)
        json.dump(e,out_file, indent=4)                                    
    
    # Close the file
        out_file.close()
        print begin 
        print z
        #time.sleep(5)
        y=str(z)
        print y
        call= "curl -L -b cookies.txt -c cookies.txt -A 'Mozilla/3.0 (Win95; I)' -o out"+y+" https://desapariciones.crowdmap.com/reports?page="+y
        print call
        a = os.system(call)
        path="out"+y
        f = urllib.urlopen(path)
        soup = BeautifulSoup(f.read())
        f.close()
        os.remove(path)
        resDes=soup.findAll("div", { "class" : "r_description" })
        resDat=soup.findAll("p", { "class" : "r_date" })
        resTit=soup.findAll("div",{ "class" : "r_details"})
        resLoc=soup.findAll("p",{"class" : "r_location"})
        resImg=soup.findAll("p",{"class" : "r_photo"})
        for x in range(0, len(resDes)):
            des.append(resDes[x].contents[0])
            dat.append(resDat[x].contents[0])
            tit.append(resTit[x].contents[1].contents[0].text)
            loc.append(resLoc[x].text)
            img.append(resImg[x].contents[1].img['src'])
            imgFi= urllib.urlopen(resImg[x].contents[1].img['src'])
            imgPath ='../public/caseImg/case_'+str(counter)+time.strftime("%d_%m_%Y_%H%M%S")+'.jpg'
            imgPathS='/caseImg/case_'+str(counter)+time.strftime("%d_%m_%Y_%H%M%S")+'.jpg'
            imgFile.append(imgPathS)
            localFile = open(imgPath, 'w+')
            localFile.write(imgFi.read())
            localFile.close()
            counter=counter+1
            
    except KeyboardInterrupt:
    # quit
        sys.exit()
    except:
         print "Oops! "

d["titel"].append( tit )
d["description"].append( des )
d["dateCase"].append( dat )
d["location"].append(loc)
d["picture"].append( imgFile) 
d["img"].append( img) 
out_file = open("test.json","w")

# Save the dictionary into this file
# (the 'indent=4' is optional, but makes it more readable)
json.dump(d,out_file, indent=4)                                    

# Close the file
out_file.close()

