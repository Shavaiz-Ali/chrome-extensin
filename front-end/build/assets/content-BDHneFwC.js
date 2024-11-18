let i=null;const c=()=>{const o=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:n=>{const t=n.textContent.trim().length>0,s=!["SCRIPT","STYLE"].includes(n.parentElement.tagName);return t&&s?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),a=[];let e;for(;e=o.nextNode();)a.push(e);return a},d=async(o,a)=>{var e,n,t;console.log(o,a);try{console.log("Text to be translated:",o);const s=await fetch("http://localhost:5000/api/transltions/update-translations/673b0419554d6a6957f320f1",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:o,translatedText:a})});if((s==null?void 0:s.status)===200){console.log("success");const r=await((e=chrome==null?void 0:chrome.tabs)==null?void 0:e.query({active:!0,currentWindow:!0}));(n=r==null?void 0:r[0])!=null&&n.id&&(console.log(r),(t=chrome==null?void 0:chrome.tabs)==null||t.sendMessage(r[0].id,{action:"updateChromeStorage"}))}if(!s.ok)throw console.error("Translation failed:",s.statusText),new Error("Translation failed");console.log("Translation success:",await s.json())}catch(s){console.error("Error during translation:",s)}},p=(o,a)=>{const e=document.createElement("div"),n=document.createElement("button");e.style.cssText=`
    background-color: #045b42;
    color: #ffffff;
    border: 1px solid white;
    position: relative;
    padding: 6px 6px;
  `,n.textContent="Edit",n.style.cssText=`
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
  `,e.appendChild(n);const t=document.createElement("div");return t.className="pop-up",t.innerHTML=`
    <p style="color:white; font-size:14px; font-weight:500; text-align:center;">
      ${a}
    </p>
    <input type="text" placeholder="Enter your translation" class="translation-input" style="
      width: 136px;
      height: 30px;
      border: 1px solid black;
      background-color: white;
      color: black;
      font-size: 14px;
      font-weight: semibold;
      margin: 5px 0; 
      border-radius: 4px;"/>
    <button class="translate-btn" style="
      background-color: white;
      color: black;
      padding: 2px 20px; 
      border-radius: 3px;">
      Translate
    </button>
  `,t.style.display="none",e.appendChild(t),n.addEventListener("click",()=>{i&&i!==t&&(i.style.display="none",i.classList.remove("active")),t.classList.toggle("active"),t.style.display=t.classList.contains("active")?"block":"none",i=t.classList.contains("active")?t:null,t.classList.contains("active")&&(t.style.cssText+=`
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
      `),t.querySelector(".translate-btn").addEventListener("click",()=>{const l=t.querySelector(".translation-input").value.trim();l?d(a,l):alert("Please enter a valid translation!")})}),o.parentNode.insertBefore(e,o),e.appendChild(o),e},u=async()=>{const o=await new Promise(n=>{chrome.storage.sync.get("translations",t=>{n(t.translations||{})})}),a=c(),e=[];a.forEach(n=>{const t=n.textContent.trim(),s=t.replace(/\./g,"").replace(/\d/g,"");if(!o[s]){const r=p(n,t);e.push({text:t,element:r})}}),chrome.runtime.sendMessage({action:"foundUntranslatedText",untranslatedTexts:e})};chrome.runtime.onMessage.addListener(o=>{o.action==="detectUntranslated"&&u()});
