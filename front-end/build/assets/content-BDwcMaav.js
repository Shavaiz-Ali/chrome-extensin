let l=null;const d=()=>{const e=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:a=>{const t=a.textContent.trim().length>0,n=!["SCRIPT","STYLE"].includes(a.parentElement.tagName);return t&&n?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}}),o=[];let s;for(;s=e.nextNode();)o.push(s);return o},p=async(e,o)=>{var s,a,t;console.log(e,o);try{console.log("Text to be translated:",e);const n=await fetch("http://localhost:5000/api/transltions/update-translations/673b0419554d6a6957f320f1",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:e,translatedText:o})});if((n==null?void 0:n.status)===200){console.log("success");const r=await((s=chrome==null?void 0:chrome.tabs)==null?void 0:s.query({active:!0,currentWindow:!0}));(a=r==null?void 0:r[0])!=null&&a.id&&(console.log(r),(t=chrome==null?void 0:chrome.tabs)==null||t.sendMessage(r[0].id,{action:"updateChromeStorage"}))}if(!n.ok)throw console.error("Translation failed:",n.statusText),new Error("Translation failed");console.log("Translation success:",await n.json())}catch(n){console.error("Error during translation:",n)}},u=(e,o)=>{const s=document.createElement("div"),a=document.createElement("button");s.style.cssText=`
    background-color: #045b42;
    color: #ffffff;
    border: 1px solid white;
    position: relative;
    padding: 6px 6px;
  `,a.textContent="Edit",a.style.cssText=`
    background-color: #045b42;
    color: #ffffff;
    border: 1px solid white;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 6px;
    z-index: 999999999999 !important;
    padding: 0px 5px;
    cursor: pointer;
  `,s.appendChild(a);const t=document.createElement("div");return t.className="pop-up",t.innerHTML=`
    <p style="color:white; font-size:14px !important; font-weight:500 !important; text-align:center;">
      ${o}
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
      padding: 2px 20px !important; 
      border-radius: 3px !important;">
      Translate
    </button>
  `,t.style.display="none",s.appendChild(t),a.addEventListener("click",()=>{l&&l!==t&&(l.style.display="none",l.classList.remove("active")),t.classList.toggle("active"),t.style.display=t.classList.contains("active")?"block":"none",l=t.classList.contains("active")?t:null,t.classList.contains("active")&&(t.style.cssText+=`
        position: absolute;
        top: 28px;
        right: -151px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #045b42;
        height: 150px !important;
        width: 150px !important;
        border: 1px solid black;
        border-radius: 8px;
        z-index: 9999999999999999999999999 !important;
      `),t.querySelector(".translate-btn").addEventListener("click",()=>{const i=t.querySelector(".translation-input").value.trim();i?p(o,i):alert("Please enter a valid translation!")})}),e.parentNode.insertBefore(s,e),s.appendChild(e),s},h=async e=>{const o=await new Promise(t=>{chrome.storage.sync.get("translations",n=>{t(n.translations||{})})}),s=d(),a=[];s.forEach(t=>{const n=t.textContent.trim(),r=n.replace(/\./g,"").replace(/\d/g,"");if(!o[e]||Object.keys(o[e]).length===0){console.log(`No translations found for ${e}`);return}const i=o[e];if(console.log(i),!i[r]){const c=u(t,n);a.push({text:n,element:c})}}),chrome.runtime.sendMessage({action:"foundUntranslatedText",untranslatedTexts:a})};chrome.runtime.onMessage.addListener(e=>{if(e.action==="detectUntranslated"){const o=e.language;h(o)}});
