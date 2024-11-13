let i=null;const l=()=>{const o=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:e=>{const t=e.textContent.trim().length>0,a=!["SCRIPT","STYLE"].includes(e.parentElement.tagName);return t&&a?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),s=[];let n;for(;n=o.nextNode();)s.push(n);return console.log(s),s},r=(o,s)=>{const n=document.createElement("div"),e=document.createElement("button");n.style.cssText=`
    background-color: transparent;
    color: #ffffff;
    border: 1px solid red;
    position: relative;
    padding: 6px 6px;
  `,e.textContent="Edit",e.style.cssText=`
    background-color: transparent;
    color: #ffffff;
    border: 1px solid #008000;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 6px;
    z-index: 9999;
    padding: 0px 5px;
    cursor: pointer;
  `,n.appendChild(e);const t=document.createElement("div");return t.id="popUp",t.className="pop-up",t.innerHTML=`
    <p style="color:white; font-size:14px; font-weight:500;">${s}</p>
    <button class="translate-btn">Translate</button>
  `,t.style.display="none",n.appendChild(t),e.addEventListener("click",()=>{i&&i!==t&&(i.style.display="none",i.classList.remove("active")),t.classList.toggle("active"),t.style.display=t.classList.contains("active")?"block":"none",i=t.classList.contains("active")?t:null,t.classList.contains("active")&&(t.style.cssText+=`
        position: absolute;
        top:28px;
        right:-151px;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #045b42;
        height: 150px;
        width: 150px;
        border:1px solid black;
        border-radius:8px;
        z-index: 1000;
      `)}),o.parentNode.insertBefore(n,o),n.appendChild(o),n},c=async()=>{const o=await new Promise(e=>{chrome.storage.sync.get("translations",t=>{e(t.translations||{})})}),s=l(),n=[];s.forEach(e=>{console.log(e);const t=e.textContent.trim();if(!o[t]){const a=r(e,t);n.push({text:t,element:a})}}),chrome.runtime.sendMessage({action:"foundUntranslatedText",untranslatedTexts:n})};chrome.runtime.onMessage.addListener(o=>{o.action==="detectUntranslated"&&c()});
