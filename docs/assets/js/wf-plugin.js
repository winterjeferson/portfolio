export class Helper{getUrlParameter(t){const e=top.location.search.substring(1).split("&");for(let i=0;i<e.length;i++){let n=e[i].split("=");if(n[0]===t)return n[1]}}getUrlWord(t){return new RegExp("\\b"+t+"\\b","i").test(window.location.href)}offset(t){let e=t.getBoundingClientRect();const i=window.pageXOffset||document.documentElement.scrollLeft,n=window.pageYOffset||document.documentElement.scrollTop;return{top:e.top+n,left:e.left+i}}verifyUrlRoute(t){return window.location.pathname.split("/").indexOf(t)>-1}wrapItem(t,e){const i=document.createElement("div");i.className=e,t.parentNode.insertBefore(i,t),i.appendChild(t)}};export class Layout{constructor(){this.breakPointExtraSmall=0,this.breakPointSmall=576,this.breakPointMedium=768,this.breakPointBig=992,this.breakPointExtraBig=1200,this.breakPointFullHd=1920}};export class LoadingMain{constructor(){this.cssHide="hide",this.cssAnimation="animate",this.elWrapper=document.querySelector(".loading-main"),this.elLoading=this.elWrapper.querySelector(".loading"),this.elBody=document.querySelector("body")}hide(){this.elWrapper.classList.add(this.cssHide),this.elLoading.classList.remove(this.cssAnimation),this.elBody.style.overflow="auto"}};export class Theme{init(){setInterval(this.buildSkill,80)}buildSkill(){document.querySelector(".grid__content-dark").querySelectorAll("[data-width]").forEach(t=>{const e=Number(t.getAttribute("data-width"));let i=Number(t.getAttribute("data-width-current"));i>=e-3&&(i-=7),(i+=3)<e&&(t.setAttribute("data-width-current",i),t.setAttribute("style",`transform: scaleX(${i}%) translate(0, 0)`))})}};window.theme=new Theme,window.loadingMain=new LoadingMain,window.addEventListener("load",window.loadingMain.hide(),window.theme.init(),{once:!0});