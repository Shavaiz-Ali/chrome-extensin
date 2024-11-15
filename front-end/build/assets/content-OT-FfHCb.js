const a=()=>{const o=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:e=>{const t=e.textContent.trim().length>0,s=!["SCRIPT","STYLE"].includes(e.parentElement.tagName);return t&&s?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),i=[];let n;for(;n=o.nextNode();)i.push(n);return console.log(i),i},l=o=>{console.log("Text to be translated:",o)},r=(o,i)=>{const n=document.createElement("div"),e=document.createElement("button");n.style.cssText=`
    background-color: #045b42;
    color: #ffffff;
    border: 1px solid white;
    position: relative;
    padding: 6px 6px;
  `,e.textContent="Edit",e.style.cssText=`
    background-color: #045b42;
    color: #ffffff;
    border: 1px solid white;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 6px;
    z-index: 99999999;
    padding: 0px 5px;
    cursor: pointer;
  `,n.appendChild(e);const t=document.createElement("div");t.className="pop-up",t.innerHTML=`
    <p style="color:white; font-size:14px; font-weight:500; cursor: pointer; text-align:center; -webkit-line-clamp: 3;">
      ${i}
    </p>
    <input type="text" placeholder="Enter your translation" id="translation_input" style="  width:136px;
        height: 30px;
        border:1px solid black;
        backgrund-color:white;
        color:black;
        font-size:14px;
        font-weight:semibold;
        margin:5px 0; border-radius:4px;"/>
    <button class="translate_btn" style="background-color: white; color: black; padding: 2px 20px; border-radius: 3px;">
      Translate
    </button>
  `,t.style.display="none",n.appendChild(t);let s=null;return e.addEventListener("click",()=>{s&&s!==t&&(s.style.display="none",s.classList.remove("active")),t.classList.toggle("active"),t.style.display=t.classList.contains("active")?"block":"none",s=t.classList.contains("active")?t:null,t.classList.contains("active")&&(t.style.cssText+=`
        position: absolute;
        top: 28px;
        right: -151px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #045b42;
        height: 150px;
        width: 150px;
        border: 1px solid black;
        border-radius: 8px;
        z-index: 1000;
      `)}),t.querySelector(".translate_btn").addEventListener("click",()=>l(i)),o.parentNode.insertBefore(n,o),n.appendChild(o),n},c=async()=>{const o=await new Promise(e=>{chrome.storage.sync.get("translations",t=>{e(t.translations||{})})}),i=a(),n=[];i.forEach(e=>{console.log(e);const t=e.textContent.trim();if(!o[t]){const s=r(e,t);n.push({text:t,element:s})}}),chrome.runtime.sendMessage({action:"foundUntranslatedText",untranslatedTexts:n})};chrome.runtime.onMessage.addListener(o=>{o.action==="detectUntranslated"&&c()});
