import React, {useEffect, useRef, useState} from 'react'

/*
 * VOXUP lightweight 3D item engine: real polygons with perspective projection.
 * No external 3D library. Item sprites become solid, pixel-thick extruded meshes.
 * Full blocks are textured on six actual cube faces. Dragon egg is voxel-merged
 * into an egg-shaped volume, not a stack of 2D images.
 */
const pixelsCache = new Map()
const meshCache = new Map()
const waiting = new Map()

function color(r,g,b,shade=1){return `rgb(${Math.max(0,Math.min(255,Math.round(r*shade)))},${Math.max(0,Math.min(255,Math.round(g*shade)))},${Math.max(0,Math.min(255,Math.round(b*shade)))})`}
function face(points, rgb, shade=1){return {points, fill:color(rgb[0],rgb[1],rgb[2],shade)}}

function fallbackPixels(id){
  const idSeed=[...id].reduce((a,c)=>a+c.charCodeAt(0)*31,0)
  const base = id.includes('diamond') ? [51,211,215] : id.includes('gold') ? [224,163,48] : id.includes('emerald') ? [38,192,98] : id.includes('nether') ? [81,69,87] : id.includes('egg') ? [34,28,43] : id.includes('iron') ? [185,185,192] : [106,107,107]
  const px=[]
  for(let y=0;y<16;y++)for(let x=0;x<16;x++){
    const variation=((x*17+y*11+idSeed)%37)-18
    px.push([base[0]+variation,base[1]+variation,base[2]+variation,255])
  }
  return px
}
function loadPixels(id,src){
  if(pixelsCache.has(id))return Promise.resolve(pixelsCache.get(id))
  if(waiting.has(id))return waiting.get(id)
  const promise=new Promise(resolve=>{
    const img=new Image()
    img.crossOrigin='anonymous'
    img.onload=()=>{
      try{
        const canvas=document.createElement('canvas');canvas.width=16;canvas.height=16
        const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.imageSmoothingEnabled=false
        ctx.clearRect(0,0,16,16);ctx.drawImage(img,0,0,16,16)
        const rgba=ctx.getImageData(0,0,16,16).data
        const px=Array.from({length:256},(_,i)=>[rgba[i*4],rgba[i*4+1],rgba[i*4+2],rgba[i*4+3]])
        pixelsCache.set(id,px);resolve(px)
      }catch(e){const px=fallbackPixels(id);pixelsCache.set(id,px);resolve(px)}
    }
    img.onerror=()=>{const px=fallbackPixels(id);pixelsCache.set(id,px);resolve(px)}
    img.src=src
  })
  waiting.set(id,promise)
  return promise
}
function pix(px,x,y){return px[((y+1600)%16)*16+((x+1600)%16)]||[90,90,90,255]}

function makeCube(px,topPixels=null,bottomPixels=null){
  const out=[]
  // Each of the six sides is a separate surface in 3D, made of colored 1x1 tiles.
  for(let y=0;y<16;y++)for(let x=0;x<16;x++){
    const left=x-8,right=left+1,top=y-8,bottom=top+1
    const rgb=pix(px,x,y)
    out.push(face([[left,top,8],[right,top,8],[right,bottom,8],[left,bottom,8]],rgb,1))
    out.push(face([[right,top,-8],[left,top,-8],[left,bottom,-8],[right,bottom,-8]],rgb,.57))
    out.push(face([[-8,top,right],[-8,top,left],[-8,bottom,left],[-8,bottom,right]],rgb,.66))
    out.push(face([[8,top,left],[8,top,right],[8,bottom,right],[8,bottom,left]],rgb,.82))
    out.push(face([[left,-8,top],[right,-8,top],[right,-8,bottom],[left,-8,bottom]],topPixels?pix(topPixels,x,y):rgb,1.12))
    out.push(face([[left,8,bottom],[right,8,bottom],[right,8,top],[left,8,top]],bottomPixels?pix(bottomPixels,x,y):rgb,.47))
  }
  return out
}
function makeSprite(px){
  const out=[], isSolid=(x,y)=>x>=0&&x<16&&y>=0&&y<16&&pix(px,x,y)[3]>60
  for(let y=0;y<16;y++)for(let x=0;x<16;x++){
    if(!isSolid(x,y))continue
    const a=x-8,b=a+1,c=y-8,d=c+1,rgb=pix(px,x,y)
    out.push(face([[a,c,1.7],[b,c,1.7],[b,d,1.7],[a,d,1.7]],rgb,1))
    out.push(face([[b,c,-1.7],[a,c,-1.7],[a,d,-1.7],[b,d,-1.7]],rgb,.64))
    if(!isSolid(x-1,y))out.push(face([[a,c,-1.7],[a,c,1.7],[a,d,1.7],[a,d,-1.7]],rgb,.75))
    if(!isSolid(x+1,y))out.push(face([[b,c,1.7],[b,c,-1.7],[b,d,-1.7],[b,d,1.7]],rgb,.79))
    if(!isSolid(x,y-1))out.push(face([[a,c,-1.7],[b,c,-1.7],[b,c,1.7],[a,c,1.7]],rgb,1.13))
    if(!isSolid(x,y+1))out.push(face([[a,d,1.7],[b,d,1.7],[b,d,-1.7],[a,d,-1.7]],rgb,.55))
  }
  return out
}
function makeEgg(px){
  // A real closed voxel egg with exposed square faces. Every part connects to
  // its neighbours; silhouettes and lighting change from every camera angle.
  const widths=[4,6,8,10,12,14,14,14,14,12,12,10,8,8,6,4]
  const filled=new Set()
  for(let y=0;y<16;y++){
    const w=widths[y],from=(16-w)/2
    for(let x=from;x<from+w;x++)for(let z=from;z<from+w;z++)filled.add(`${x},${y},${z}`)
  }
  const has=(x,y,z)=>filled.has(`${x},${y},${z}`),out=[]
  const neighbors=[[1,0,0,.81],[-1,0,0,.65],[0,1,0,.48],[0,-1,0,1.15],[0,0,1,1],[0,0,-1,.58]]
  for(let y=0;y<16;y++)for(let x=0;x<16;x++)for(let z=0;z<16;z++){
    if(!has(x,y,z))continue
    const a=x-8,b=a+1,c=y-8,d=c+1,e=z-8,f=e+1
    for(let n=0;n<neighbors.length;n++){
      const [dx,dy,dz,shade]=neighbors[n]
      if(has(x+dx,y+dy,z+dz))continue
      const rgb=pix(px,(x+z*5+n*3)%16,(y+z*3+n)%16)
      let p
      switch(n){
        case 0:p=[[b,c,f],[b,c,e],[b,d,e],[b,d,f]];break
        case 1:p=[[a,c,e],[a,c,f],[a,d,f],[a,d,e]];break
        case 2:p=[[a,d,f],[b,d,f],[b,d,e],[a,d,e]];break
        case 3:p=[[a,c,e],[b,c,e],[b,c,f],[a,c,f]];break
        case 4:p=[[a,c,f],[b,c,f],[b,d,f],[a,d,f]];break
        default:p=[[b,c,e],[a,c,e],[a,d,e],[b,d,e]]
      }
      out.push(face(p,rgb,shade))
    }
  }
  return out
}
// The beacon is a complex translucent object, not a solid textured cube.
// Build an obsidian pedestal, a glowing 3D core and a clear outer glass shell.
// All pieces are polygons in the same 3D coordinate system as the voxel items.
function solidBox(x0,y0,z0,x1,y1,z1,front,right,top,back=front,left=right,bottom=top){
  return [
    {points:[[x0,y0,z1],[x1,y0,z1],[x1,y1,z1],[x0,y1,z1]],fill:front},
    {points:[[x1,y0,z0],[x0,y0,z0],[x0,y1,z0],[x1,y1,z0]],fill:back},
    {points:[[x1,y0,z1],[x1,y0,z0],[x1,y1,z0],[x1,y1,z1]],fill:right},
    {points:[[x0,y0,z0],[x0,y0,z1],[x0,y1,z1],[x0,y1,z0]],fill:left},
    {points:[[x0,y0,z0],[x1,y0,z0],[x1,y0,z1],[x0,y0,z1]],fill:top},
    {points:[[x0,y1,z1],[x1,y1,z1],[x1,y1,z0],[x0,y1,z0]],fill:bottom}
  ]
}
function makeBeacon(){
  const shapes=[]
  const add=(...args)=>shapes.push(...solidBox(...args))
  // Rough obsidian base and its pale metallic top rim.
  add(-8,4,-8,8,8,8,'#1e1c27','#11111a','#343543')
  add(-7.3,3.3,-7.3,7.3,4.3,7.3,'#8b999d','#5b6a70','#a4b8bc')
  add(-6,2,-6,6,3.4,6,'#1a3639','#163038','#667c75')
  // Real luminous core, inner crystal and beacon lens.
  add(-4.3,-3.4,-4.3,4.3,2.2,4.3,'#a0f3de','#52b9c2','#d5ffef')
  add(-2.4,-5.3,-2.4,2.4,2.4,2.4,'#fcf0a8','#c3e6a9','#fffdd2')
  add(-5,-5.8,-5,5,-4.7,5,'#c0f8fa','#6ac8d6','#edffff')
  // Slim inset blue-green metal edges and corner pillars.
  for(const x of [-6.9,6.1])for(const z of [-6.9,6.1])
    add(x,-7.8,z,x+.8,3.6,z+.8,'rgba(126,237,235,.5)','rgba(83,181,198,.5)','rgba(240,255,255,.6)')
  // Lower and upper glass rims.
  for(const y of [-7.9,2.7]){
    add(-7.7,y,-7.7,7.7,y+.55,-7.0,'rgba(130,234,243,.65)','rgba(61,176,197,.6)','rgba(208,251,254,.75)')
    add(-7.7,y,7.0,7.7,y+.55,7.7,'rgba(130,234,243,.65)','rgba(61,176,197,.6)','rgba(208,251,254,.75)')
    add(-7.7,y,-7.7,-7,y+.55,7.7,'rgba(130,234,243,.55)','rgba(61,176,197,.5)','rgba(208,251,254,.6)')
    add(7.0,y,-7.7,7.7,y+.55,7.7,'rgba(130,234,243,.55)','rgba(61,176,197,.5)','rgba(208,251,254,.6)')
  }
  // Transparent outer walls: the central core remains visible when rotating.
  add(-7.7,-7.8,-7.7,7.7,3.2,7.7,
      'rgba(89,226,235,.12)','rgba(95,194,234,.16)','rgba(185,250,255,.16)',
      'rgba(100,232,250,.09)','rgba(95,194,234,.14)','rgba(140,236,248,.12)')
  return shapes
}


/* Built from separate solids instead of interpreting 2D item/entity sprites as cubes.
 * Original game texture layout for Conduit and Ender Chest is not a square cube atlas.
 * These authored voxel meshes have real depth from all angles, and never rely
 * on an unavailable external entity texture download. */
function makeConduit(){
  const parts=[];const add=(...a)=>parts.push(...solidBox(...a))
  // Dark prismarine cage; a hollow, interlocking ring with open spaces.
  const frame='#244f59',lit='#72d5c2',edge='#417e85',bright='#b3fff2'
  for(const y of [-7,6]){
    add(-7,y,-7,7,y+1, -5, frame,edge,bright)
    add(-7,y,5,7,y+1,7, frame,edge,bright)
    add(-7,y,-5,-5,y+1,5,frame,edge,bright)
    add(5,y,-5,7,y+1,5,frame,edge,bright)
  }
  for(const x of [-7,5])for(const z of [-7,5]){
    add(x,-6,z,x+2,7,z+2,'#235d67','#234c59','#5cb4aa')
    add(x-.4,-7.5,z-.4,x+2.4,-5.8,z+2.4,lit,edge,bright)
    add(x-.4,5.8,z-.4,x+2.4,7.5,z+2.4,lit,edge,bright)
  }
  // Floating pearly core + inner eye, visible through the open sides.
  add(-3.5,-3.5,-3.5,3.5,3.5,3.5,'#50b1c0','#267f92','#97f0e7')
  add(-2.4,-4.5,-2.4,2.4,4.5,2.4,'#b0eec8','#5caeaf','#e4fff8')
  add(-1.8,-1.8,3.6,1.8,1.8,4.3,'#0f2939','#112c37','#25536b')
  add(-.9,-.9,4.35,.9,.9,4.55,'#f7d5a0','#8ed9c8','#ffffd8')
  return parts
}
function makeEnderChest(){
  const parts=[];const add=(...a)=>parts.push(...solidBox(...a))
  // Body, openable top geometry and bevel-like turquoise reinforced seams.
  add(-7,-3,-7,7,7,7,'#171925','#11131d','#2a2830')
  add(-7.5,-7.5,-7.5,7.5,-2.2,7.5,'#282732','#181b26','#313140')
  // Four-sided seam around the lid.
  for(const y of [-7.6,-2.6]){
    add(-7.7,y,-7.7,7.7,y+.8,-6.6,'#225b62','#12414b','#368a84')
    add(-7.7,y,6.6,7.7,y+.8,7.7,'#326b6d','#16515c','#62bdb1')
    add(-7.7,y,-6.6,-6.6,y+.8,6.6,'#265f68','#12414b','#42a5a0')
    add(6.6,y,-6.6,7.7,y+.8,6.6,'#326f73','#174953','#42a5a0')
  }
  // Corner supports and embossed panels.
  for(const x of [-7.6,6.7])for(const z of [-7.6,6.7])
    add(x,-3,z,x+.9,7.6,z+.9,'#235459','#143a42','#37948e')
  add(-5,-1,7.15,5,5.5,7.35,'#171c29','#1a2530','#253e46')
  // Brass latch and the emerald dot on front.
  add(-1.7,-2.1,7.7,1.7,1.5,8.5,'#b4ab84','#777453','#e3dba6')
  add(-.7,-1.2,8.56,.7,.4,8.75,'#3acc9c','#217865','#80f1bf')
  return parts
}
async function getMesh(id,src,blockIds){
  if(meshCache.has(id))return meshCache.get(id)
  if(id==='conduit'){const mesh=makeConduit();meshCache.set(id,mesh);return mesh}
  if(id==='ender_chest'){const mesh=makeEnderChest();meshCache.set(id,mesh);return mesh}
  if(id==='beacon'){
    const mesh=makeBeacon();meshCache.set(id,mesh);return mesh
  }
  const px=await loadPixels(id,src)
  // Certain real Minecraft blocks have different top and bottom textures.
  // Rendering the side atlas on all six sides made the old previews look wrong.
  const surfaces={
    grass_block:['grass_block_top.png','dirt.png'],
    oak_log:['oak_log_top.png','oak_log_top.png'],
    crafting_table:['crafting_table_top.png','oak_planks.png'],
    bookshelf:['oak_planks.png','oak_planks.png'],
    tnt:['tnt_top.png','tnt_bottom.png'],
    ancient_debris:['ancient_debris_top.png','ancient_debris_top.png'],
    barrel:['barrel_top.png','barrel_bottom.png']
  }
  const pair=surfaces[id]
  const root=src.slice(0,src.lastIndexOf('/')+1)
  const topPixels=pair?await loadPixels(id+':top',root+pair[0]):null
  const bottomPixels=pair?await loadPixels(id+':bottom',root+pair[1]):null
  const cube=()=>makeCube(px,topPixels,bottomPixels)
  const mesh=id==='dragon_egg'?makeEgg(px):id==='heavy_core'?cube().map(f=>({...f,points:f.points.map(([x,y,z])=>[x*.52,y*.52+1.5,z*.52])})):blockIds.includes(id)?cube():makeSprite(px)
  meshCache.set(id,mesh)
  return mesh
}
function rotate([x,y,z], ax, ay){
  const cy=Math.cos(ay),sy=Math.sin(ay),cx=Math.cos(ax),sx=Math.sin(ax)
  const X=x*cy+z*sy, Z=-x*sy+z*cy
  return [X,y*cx-Z*sx,y*sx+Z*cx]
}
function render(ctx,faces,width,height,rx,ry,zoom){
  ctx.clearRect(0,0,width,height)
  if(!faces)return
  const focal=42,scale=Math.min(width,height)/29*zoom, quads=[]
  for(const f of faces){
    const verts=f.points.map(p=>rotate(p,rx,ry))
    const u=[verts[1][0]-verts[0][0],verts[1][1]-verts[0][1]]
    const v=[verts[2][0]-verts[0][0],verts[2][1]-verts[0][1]]
    // Cull surfaces whose projected winding faces away (coordinate basis is not
    // relied upon because the cheap painter sort handles hidden faces correctly).
    const depth=verts.reduce((a,p)=>a+p[2],0)/4
    const points=verts.map(([x,y,z])=>{const perspective=focal/(focal-z);return [width/2+x*scale*perspective,height/2+y*scale*perspective]})
    quads.push({points,depth,fill:f.fill})
  }
  quads.sort((a,b)=>a.depth-b.depth)
  for(const f of quads){
    const p=f.points
    ctx.beginPath();ctx.moveTo(p[0][0],p[0][1]);ctx.lineTo(p[1][0],p[1][1]);ctx.lineTo(p[2][0],p[2][1]);ctx.lineTo(p[3][0],p[3][1]);ctx.closePath()
    ctx.fillStyle=f.fill;ctx.fill()
  }
}

export function VoxelThumbnail({id,textureSource,blockIds=[]}){
  return <VoxelCanvas id={id} textureSource={textureSource} blockIds={blockIds} small/>
}
export function VoxelViewer({id,label,textureSource,blockIds=[]}){
  const canvas=useRef(null)
  return <div className="voxel-viewer" role="group" aria-label={`${label} — 3D model`}>
    <VoxelCanvas ref={canvas} id={id} textureSource={textureSource} blockIds={blockIds} interactive/>
    <div className="voxel-actions"><span>DRAG • 3D • SCROLL TO ZOOM</span><button type="button" onClick={()=>canvas.current?.reset()} aria-label="Сбросить поворот">↺</button></div>
  </div>
}

const VoxelCanvas=React.forwardRef(function VoxelCanvas({id,textureSource,blockIds,small=false,interactive=false},forwarded){
  const cnv=useRef(null),angle=useRef({x:-.28,y:.57,zoom:1}),drag=useRef(null),meshes=useRef(null),ready=useRef(false),pending=useRef(0)
  function schedule(){if(pending.current)return;pending.current=requestAnimationFrame(()=>{pending.current=0;const canvas=cnv.current;if(!canvas||!meshes.current)return;const ctx=canvas.getContext('2d');const ratio=Math.min(window.devicePixelRatio||1,2);const w=small?84:204,h=small?84:174;canvas.width=Math.round(w*ratio);canvas.height=Math.round(h*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);render(ctx,meshes.current,w,h,angle.current.x,angle.current.y,angle.current.zoom)})}
  React.useImperativeHandle(forwarded,()=>({reset(){angle.current={x:-.28,y:.57,zoom:1};schedule()}}))
  useEffect(()=>{let alive=true;meshes.current=null;ready.current=false;angle.current={x:-.28,y:.57,zoom:1}
    const el=cnv.current
    const activate=()=>{getMesh(id,textureSource(id),blockIds).then(mesh=>{if(!alive)return;meshes.current=mesh;ready.current=true;schedule()})}
    let observer
    if('IntersectionObserver' in window){observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){activate();observer.disconnect()}},{rootMargin:'250px'});observer.observe(el)}else activate()
    return()=>{alive=false;observer?.disconnect();if(pending.current)cancelAnimationFrame(pending.current)}
  },[id])
  function down(e){if(!interactive)return;drag.current={x:e.clientX,y:e.clientY,ax:angle.current.x,ay:angle.current.y};e.currentTarget.setPointerCapture(e.pointerId)}
  function move(e){if(!drag.current)return;const d=drag.current;angle.current.x=Math.max(-1.43,Math.min(1.43,d.ax-(e.clientY-d.y)*.011));angle.current.y=d.ay+(e.clientX-d.x)*.012;schedule()}
  useEffect(()=>{
    if(!interactive || !cnv.current)return
    const element=cnv.current
    const wheelHandler=(e)=>{e.preventDefault();angle.current.zoom=Math.max(.65,Math.min(1.7,angle.current.zoom+(e.deltaY<0?.1:-.1)));schedule()}
    element.addEventListener('wheel',wheelHandler,{passive:false})
    return()=>element.removeEventListener('wheel',wheelHandler)
  },[interactive,id])
  return <canvas className={'voxel-canvas '+(small?'voxel-thumb':'voxel-large')} ref={cnv} onPointerDown={down} onPointerMove={move} onPointerUp={()=>drag.current=null} onPointerCancel={()=>drag.current=null} onLostPointerCapture={()=>drag.current=null} style={{touchAction:interactive?'none':'auto'}} aria-label={interactive?'Вращаемая 3D модель предмета':undefined}/>
})
