(()=>{function g(e,t,r,s,p,d){let l=new Image;l.src=t,e.drawImage(l,r,s,p,d)}function E(e,t,r,s,p,d){let l="";t=="roboto"&&(l="24px Roboto"),t=="arial"&&(l="24px Arial"),e.font=l,e.fillStyle=r,e.fillText(s,p,d)}var f={i:0},_=[],b=document.getElementById("game");function A(e,t){for(let r=0;r<e;r++)t=="bugenner"&&i.push({id:r,x:Math.floor(Math.random()*b.width),y:Math.floor(Math.random()*b.height),img:"./assets/sprite_0.png",type:"bugenner",life:3}),t=="singulary"&&i.push({id:r,x:Math.floor(Math.random()*b.width),y:Math.floor(Math.random()*b.height),img:"https://media.discordapp.net/attachments/1087504461364207656/1095427124929769472/Sprite-0005.png?width=46&height=46",type:"singulary",life:5})}function M(){_.forEach(t=>clearTimeout(t)),_=[];let e=0;for(f.i=0;f.i<1e3;f.i++){let t=f.i;if(f.i<50){let r=setTimeout(()=>{A(t*2,"bugenner"),A(t,"singulary")},e);_.push(r),e+=12e3}}}var I=new Audio("./assets/demage.wav");var a=document.getElementById("game"),h=a.getContext("2d"),i=[];a.width=window.innerWidth;a.height=window.innerHeight;var o=0,m,u,w=3,v=!1,y=!1,n=[{type:"a",name:"a",x:-999,y:-999}];addEventListener("mousedown",e=>{if(m=e.clientX,u=e.clientY,v=!0,c(m,u,a.width-16,a.height-16,.1)){if(y==!0)return y=!1;y=!0}if(y==!0&&c(m,u,a.width-64,a.height-256,.05))return o<30?alert("pobre fudido"):(o-=30,n.push({type:"graminea",name:"graminea",x:-999,y:-999,life:3}));if(y==!0&&c(m,u,a.width-64,a.height-220,.05))return o<0?alert("pobre fudido"):(o-=50,n.push({type:"stoneenner",name:"stoneenner",x:-999,y:-999,life:5}));n[n.length-1].type!="a"&&(n[n.length-1].type="pressed"),y==!0&&c(m,u,a.width-64,a.height-300,.05,8)&&alert("a");for(let t=0;t<i.length;t++)if(i[t].type=="bugenner"&&(i[t].life==2&&(i[t].img="./assets/sprite_1.png"),i[t].life==1&&(i[t].img="./assets/sprite_2.png")),i[t].type=="singulary"&&(i[t].life==4&&(i[t].img="./assets/sprite_singulary0.png"),i[t].life==3&&(i[t].img="./assets/sprite_singulary1.png"),i[t].life==2&&(i[t].img="./assets/sprite_singulary2.png"),i[t].life==1&&(i[t].img="./assets/sprite_singulary3.png")),v&&c(i[t].x,i[t].y,m,u,.06)){i[t].life-=1,o+=1;break}});addEventListener("mouseup",e=>{m=0,u=0,v=!1});addEventListener("mousemove",e=>{if(n[n.length-1].type!="pressed"&&n[n.length-1].type!="a")return n[n.length-1].x=e.clientX,n[n.length-1].y=e.clientY});function j(){w<=0&&(i=[],f.i=0,g(h,"./assets/gameover.png",0,0,a.width,a.height),setTimeout(()=>{w=3,o<14?o-=o:o-=15,f.i=0,M()},2e3))}function c(e,t,r,s,p){let d=Math.abs(r-e),l=Math.abs(s-t);return d<=p*a.width&&l<=p*a.height}function D(e,t,r,s,p,d,l){let x=r-e,T=s-t,X=Math.sqrt(x*x+T*T),Y=(d+l)/4;return X<Y+p*a.width}M();function U(){requestAnimationFrame(U),h.clearRect(0,0,a.width,a.height);for(let e=0;e<i.length;e++){let t=20,r=20,s=0,p=a.width/2-i[e].x,d=a.height/2-i[e].y;i[e].type=="bugenner"&&(s=.008),i[e].type=="singulary"&&(s=.004);let l=i[e].x+p*s,x=i[e].y+d*s;i[e].x=l,i[e].y=x,i[e].life<0&&i.splice(e,1),D(i[e].x,i[e].y,a.width/2,a.height/2,.04,t,r)&&(i[e].type=="bugenner"&&(w-=1),i[e].type=="singulary"&&(w-=.5),I.play(),i.splice(e,1)),g(h,i[e].img,i[e].x,i[e].y,50,50)}for(let e=0;e<w;e++)g(h,"https://cdn.discordapp.com/attachments/1087504461364207656/1095433836432740362/Coracao_cheio.png",e*50,0,150,150);y==!0&&(h.globalAlpha=.9,g(h,"https://media.discordapp.net/attachments/1087503910098436158/1095756195362508810/sprite__grama_de_pontos0_1.png?width=120&height=120",a.width-128,a.height-256,128,128),h.globalAlpha=1);for(let e=0;e<n.length;e++){n[e].life<0&&n.splice(e,1);for(let t=0;t<i.length;t++)c(n[e].x,n[e].y,i[t].x,i[t].y,.05)&&n[e].type=="pressed"&&(i[t].type=="bugenner"&&(n[e].life-=1),i[t].type=="singulary"&&(n[e].life-=.5),i.splice(t,1)),c(n[e].x,n[e].y,i[t].x,i[t].y,1)&&n[e].type=="pressed"&&(i[t].x=1);if(n[e].type=="graminea"||n[e].type=="pressed"&&n[e].name=="graminea"){n[e].lastUpdateTime||(n[e].lastUpdateTime=Date.now());let t=Date.now();t-n[e].lastUpdateTime>=3e3&&(n[e].lastUpdateTime=t,o+=1),g(h,"./assets/graminea.png",n[e].x,n[e].y,32,32)}}g(h,"https://media.discordapp.net/attachments/1087504461364207656/1096189471885639750/Sprite-0001-exp40rt.png?width=300&height=300",a.width/2+500,a.height/2-300,64,64),E(h,"roboto","blue",`Points: ${o}`,500,70),g(h,"https://media.discordapp.net/attachments/1087504461364207656/1095456781418893433/image.png?width=120&height=120",a.width-128,a.height-128,128,128),g(h,"https://media.discordapp.net/attachments/1087504461364207656/1097932946888982558/KOtsu-export.png?width=287&height=287",a.width/2,a.height/2,50,50),j()}U();})();
