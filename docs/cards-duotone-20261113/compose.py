import sys,os,json
import numpy as np
from PIL import Image,ImageDraw,ImageFont
S=os.path.dirname(os.path.abspath(__file__))
INK=np.array([0x15,0x12,0x0E],float)
def twotone(path,accent):
    a=np.asarray(Image.open(path).convert('RGB'),float)
    mx=a.max(2); mn=a.min(2)
    sat=np.where(mx>0,(mx-mn)/np.maximum(mx,1),0)
    orange=np.clip((sat-0.25)/0.35,0,1)*np.clip((a[...,0]-a[...,2])/90,0,1)
    alpha=np.clip(1-mn/255.0,0,1)
    alpha=np.clip((alpha-0.06)/0.80,0,1)
    acc=np.array(accent,float)
    rgb=INK[None,None,:]*(1-orange[...,None])+acc[None,None,:]*orange[...,None]
    out=np.dstack([rgb,alpha*255]).astype('uint8')
    return Image.fromarray(out,'RGBA')
def card(slug,title,tag,accent,W=760,H=460,scale=2):
    em=twotone(f'{S}/raw/{slug}.png',accent)
    bb=em.getchannel('A').point(lambda v:255 if v>24 else 0).getbbox(); em=em.crop(bb)
    w,h=W*scale,H*scale
    im=Image.new('RGBA',(w,h),(0,0,0,0))
    box_w,box_h=int(w*0.50),int(h*0.92)
    r=min(box_w/em.width,box_h/em.height); em=em.resize((int(em.width*r),int(em.height*r)),Image.LANCZOS)
    im.alpha_composite(em,(w-em.width-int(w*0.035)-(box_w-em.width)//2,(h-em.height)//2))
    d=ImageDraw.Draw(im)
    f1=ImageFont.truetype(f'{S}/fonts/cormorant.ttf',int(46*scale))
    f2=ImageFont.truetype(f'{S}/fonts/courierprime.ttf',int(14*scale))
    x=int(38*scale); lines=title.split('\n'); lh=int(48*scale)
    block=lh*len(lines)+int(34*scale); y=(h-block)//2
    for i,l in enumerate(lines): d.text((x,y+i*lh),l,font=f1,fill=(0x15,0x12,0x0E,255))
    ty=y+lh*len(lines)+int(12*scale)
    d.text((x,ty),tag,font=f2,fill=(0x3A,0x33,0x2B,255))
    d.line([(x,ty+int(24*scale)),(x+int(d.textlength(tag,font=f2)),ty+int(24*scale))],fill=tuple(accent)+(150,),width=scale)
    d.rectangle([0,0,int(4*scale),h],fill=tuple(accent)+(255,))
    return im.resize((W,H),Image.LANCZOS)
if __name__=='__main__':
    cfg=json.load(open(f'{S}/cards.json'))
    only=sys.argv[1:]
    for c in cfg:
        if only and c['slug'] not in only: continue
        if not os.path.exists(f"{S}/raw/{c['slug']}.png"): print('skip',c['slug']); continue
        card(c['slug'],c['title'],c['tag'],(0xD9,0x5A,0x1E)).save(f"{S}/out/{c['slug']}.png")
        print('ok',c['slug'])
