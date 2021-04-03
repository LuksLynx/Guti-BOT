import requests, hashlib, sys, os, random, time, mimetypes, glob
import wand, wand.color, wand.drawing
from io import BytesIO
from PIL import Image

#Sys argvs
picUrl = sys.argv[1]
guild_id = sys.argv[2]

scale = random.randint(0, 10)
extension = ''
formats = ['.jpg','.png','.bmp','.ico']

try :
    request = requests.get(picUrl)
    picType = request.headers['Content-Type']
    extension = mimetypes.guess_extension(picType)

    if extension.lower() == ".jpe":
        extension = ".jpg"
except :
    print('error_requests')

path = "images/"+guild_id+"/"

filename_temp = str(time.time())+path+str(random.randint(0, 999999))
filename = hashlib.sha224(filename_temp.encode('utf-8')).hexdigest()

isDir = os.path.isdir(path)
if isDir == False:
    os.mkdir(path)
    
def magik() :
    
    image = request.content

    loadedImage = wand.image.Image(blob=image)
    loadedImage.alpha_channel = True #linha misteriosa
    loadedImage.transform(resize='800x800')
    loadedImage.liquid_rescale(width=int(loadedImage.width*0.5), height=int(loadedImage.height*0.5), delta_x=int(0.5*scale), rigidity=0)
    loadedImage.liquid_rescale(width=int(loadedImage.width*1.5), height=int(loadedImage.height*1.5), delta_x=int(scale), rigidity=0)
    loadedImage.save(filename=path+filename+'.jpg')

    print(filename+'.jpg')
    
if extension.lower() in formats:
    magik()
else:
    print('error_extension')