/*
 * 单词勇者岛 V9
 * 目标：以 V6 为母版，不改原有 Google TTS 选择逻辑；新增：
 * 1) 更积极地等待/唤醒 Android 浏览器音色列表；
 * 2) 跟读录音、显式停止按钮、录音回放；
 * 3) SpeechRecognition 可用时自动评分，不可用时录音功能仍能工作；
 * 4) 识别偏差时给出“识别结果 + 美式参考音标 + 纠音建议”。
 */

const V9_IPA={"accident":"ˈæksədənt","activity":"æktˈɪvəti","afternoon":"ˌæftɚnˈun","animal":"ˈænəməl","apple":"ˈæpəl","art room":"ˈɑrt rˈum","astronaut":"ˈæstrənˌɑt","aunt":"ˈænt","baby":"bˈeɪbi","bad":"bˈæd","badminton":"bˈædmˌɪntən","bag":"bˈæɡ","ball":"bˈɔl","banana":"bənˈænə","bank":"bˈæŋk","basketball":"bˈæskətbˌɔl","bathroom":"bˈæθrˌum","beach":"bˈitʃ","bean":"bˈin","bed":"bˈɛd","bedroom":"bˈɛdrˌum","behind":"bɪhˈaɪnd","better":"bˈɛtɚ","between":"bɪtwˈin","birthday":"bˈɝθdˌeɪ","black":"blˈæk","blue":"blˈu","book":"bˈʊk","bookcase":"bˈʊkkˌeɪs","boy":"bˈɔɪ","break":"brˈeɪk","breakfast":"brˈɛkfəst","brother":"brˈʌðɚ","brown":"brˈaʊn","bus stop":"bˈʌs stˈɑp","buy":"bˈaɪ","cabbage":"kˈæbədʒ","cake":"kˈeɪk","camera":"kˈæmɚə","can":"kˈæn","candle":"kˈændəl","car":"kˈɑr","careful":"kˈɛrfəl","carrot":"kˈærət","catch":"kˈætʃ","centimeter":"sˈɛntəmˌitɚ","chair":"tʃˈɛr","cheap":"tʃˈip","chicken":"tʃˈɪkən","city":"sˈɪti","classroom":"klˈæsrˌum","clock":"klˈɑk","clothes":"klˈoʊðz","cloud":"klˈaʊd","cloudy":"klˈaʊdi","coat":"kˈoʊt","cold":"kˈoʊld","color":"kˈʌlɚ","come":"kˈʌm","computer":"kəmpjˈutɚ","concert":"kˈɑnsɚt","corn":"kˈɔrn","dance":"dˈæns","dancer":"dˈænsɚ","date":"dˈeɪt","desk":"dˈɛsk","different":"dˈɪfɚənt","dinner":"dˈɪnɚ","doctor":"dˈɑktɚ","doll":"dˈɑl","door":"dˈɔr","draw":"drˈɔ","dress":"drˈɛs","drink":"drˈɪŋk","drum":"drˈʌm","early":"ˈɝli","earth":"ˈɝθ","eight":"ˈeɪt","evening":"ˈivnɪŋ","expensive":"ɪkspˈɛnsɪv","fall":"fˈɔl","family":"fˈæməli","farmer":"fˈɑrmɚ","fast":"fˈæst","father":"fˈɑðɚ","favorite":"fˈeɪvɚɪt","February":"fˈɛbjəwˌɛri","first":"fˈɝst","five":"fˈaɪv","fix":"fˈɪks","floor":"flˈɔr","food":"fˈud","football":"fˈʊtbˌɔl","forty":"fˈɔrti","four":"fˈɔr","fox":"fˈɑks","fresh":"frˈɛʃ","Friday":"frˈaɪdi","friend":"frˈɛnd","fruit":"frˈut","future":"fjˈutʃɚ","get up":"ɡˈɛt ˈʌp","gift":"ɡˈɪft","girl":"ɡˈɝl","go":"ɡˈoʊ","go to bed":"ɡˈoʊ tˈu bˈɛd","goat":"ɡˈoʊt","good":"ɡˈʊd","goodbye":"ɡˌʊdbˈaɪ","grandfather":"ɡrˈændfˌɑðɚ","grandmother":"ɡrˈændmˌʌðɚ","green":"ɡrˈin","guitar":"ɡɪtˈɑr","happen":"hˈæpən","he":"hˈi","headache":"hˈɛdˌeɪk","heavy":"hˈɛvi","height":"hˈaɪt","hello":"həlˈoʊ","hi":"hˈaɪ","high":"hˈaɪ","homework":"hˈoʊmwˌɝk","horse":"hˈɔrs","hospital":"hˈɑspˌɪtəl","hot":"hˈɑt","hotel":"hoʊtˈɛl","house":"hˈaʊs","how much":"hˈaʊ mˈʌtʃ","hungry":"hˈʌŋɡri","hurry":"hˈɝi","hurt":"hˈɝt","I":"ˈaɪ","ill":"ˈɪl","in front of":"ɪn frˈʌnt ˈʌv","is":"ˈɪz","January":"dʒˈænjuˌɛri","jeans":"dʒˈinz","job":"dʒˈɑb","juice":"dʒˈus","jump":"dʒˈʌmp","kilogram":"kˈɪləɡrˌæm","kitchen":"kˈɪtʃən","know":"nˈoʊ","large":"lˈɑrdʒ","late":"lˈeɪt","learn":"lˈɝn","left":"lˈɛft","lemon":"lˈɛmən","library":"lˈaɪbrɛrˌi","life":"lˈaɪf","light":"lˈaɪt","like":"lˈaɪk","lion":"lˈaɪən","listen":"lˈɪsən","litter":"lˈɪtɚ","living room":"lˈɪvɪŋ rˈum","long":"lˈɔŋ","lose":"lˈuz","lunch":"lˈʌntʃ","March":"mˈɑrtʃ","Mars":"mˈɑrz","matter":"mˈætɚ","measure":"mˈɛʒɚ","medicine":"mˈɛdəsən","medium":"mˈidiəm","menu":"mˈɛnju","Monday":"mˈʌndi","money":"mˈʌni","monkey":"mˈʌŋki","month":"mˈʌnθ","moon":"mˈun","morning":"mˈɔrnɪŋ","mother":"mˈʌðɚ","mountain":"mˈaʊntən","move":"mˈuv","music":"mjˈuzɪk","music room":"mjˈuzɪk rˈum","my":"mˈaɪ","name":"nˈeɪm","near":"nˈɪr","new":"nˈu","next to":"nˈɛkst tˈu","night":"nˈaɪt","nine":"nˈaɪn","no":"nˈoʊ","noodles":"nˈudəlz","nurse":"nˈɝs","o'clock":"əklˈɑk","office":"ˈɔfɪs","on":"ˈɑn","one":"wˈʌn","onion":"ˈʌnjən","orange":"ˈɔrəndʒ","panda":"pˈændə","park":"pˈɑrk","parking":"pˈɑrkɪŋ","party":"pˈɑrti","peach":"pˈitʃ","pear":"pˈɛr","pen":"pˈɛn","pencil":"pˈɛnsəl","photo":"fˈoʊtˌoʊ","piano":"piˈænoʊ","picture":"pˈɪktʃɚ","pilot":"pˈaɪlət","pink":"pˈɪŋk","place":"plˈeɪs","plane":"plˈeɪn","planet":"plˈænət","play":"plˈeɪ","playground":"plˈeɪɡrˌaʊnd","police station":"pəlˈis stˈeɪʃən","policeman":"pəlˈismən","position":"pəzˈɪʃən","possible":"pˈɑsəbəl","post office":"pˈoʊst ˈɔfɪs","potato":"pətˈeɪtˌoʊ","prize":"prˈaɪz","purple":"pˈɝpəl","rabbit":"rˈæbət","rain":"rˈeɪn","rainy":"rˈeɪni","read":"riːd","ready":"rˈɛdi","red":"rˈɛd","rest":"rˈɛst","restaurant":"rˈɛstɚˌɑnt","rice":"rˈaɪs","ride":"rˈaɪd","right":"rˈaɪt","robot":"rˈoʊbˌɑt","room":"rˈum","ruler":"rˈulɚ","run":"rˈʌn","running":"rˈʌnɪŋ","Saturday":"sˈætɚdi","school":"skˈul","second":"sˈɛkənd","sell":"sˈɛl","seven":"sˈɛvən","she":"ʃˈi","sheep":"ʃˈip","shirt":"ʃˈɝt","shoes":"ʃˈuz","shop":"ʃˈɑp","shopping":"ʃˈɑpɪŋ","short":"ʃˈɔrt","shorts":"ʃˈɔrts","show":"ʃˈoʊ","sign":"sˈaɪn","sing":"sˈɪŋ","singer":"sˈɪŋɚ","sister":"sˈɪstɚ","six":"sˈɪks","size":"sˈaɪz","skirt":"skˈɝt","sleep":"slˈip","slow":"slˈoʊ","small":"smˈɔl","snow":"snˈoʊ","snowy":"snˈoʊi","socks":"sˈɑks","sofa":"sˈoʊfə","song":"sˈɔŋ","soup":"sˈup","sour":"sˈaʊɚ","space":"spˈeɪs","spaceship":"spˈeɪsʃˌɪp","sport":"spˈɔrt","star":"stˈɑr","stomach":"stˈʌmək","store":"stˈɔr","street":"strˈit","student":"stˈudənt","study":"stˈʌdi","suddenly":"sˈʌdənli","sun":"sˈʌn","Sunday":"sˈʌndˌeɪ","sunny":"sˈʌni","supermarket":"sˈupɚmˌɑrkɪt","sweater":"swˈɛtɚ","sweet":"swˈit","swim":"swˈɪm","swimming":"swˈɪmɪŋ","table":"tˈeɪbəl","talent":"tˈælənt","tall":"tˈɔl","taste":"tˈeɪst","teacher":"tˈitʃɚ","team":"tˈim","tell":"tˈɛl","ten":"tˈɛn","tennis":"tˈɛnəs","than":"ðˈæn","that":"ðˈæt","thirsty":"θˈɝsti","thirty":"θˈɝdˌi","this":"ðˈɪs","three":"θrˈi","throw":"θrˈoʊ","Thursday":"θˈɝzdˌeɪ","tiger":"tˈaɪɡɚ","time":"tˈaɪm","today":"tədˈeɪ","together":"təɡˈɛðɚ","tomato":"təmˈeɪtˌoʊ","tomorrow":"təmˈɑrˌoʊ","touch":"tˈʌtʃ","train":"trˈeɪn","train station":"trˈeɪn stˈeɪʃən","travel":"trˈævəl","trip":"trˈɪp","trousers":"trˈaʊzɚz","Tuesday":"tˈuzdi","twenty":"twˈɛnti","two":"tˈu","uncle":"ˈʌŋkəl","under":"ˈʌndɚ","vacation":"veɪkˈeɪʃən","vegetable":"vˈɛdʒtəbəl","vet":"vˈɛt","violin":"vaɪəlˈɪn","visit":"vˈɪzɪt","walk":"wˈɔk","watch":"wˈɑtʃ","watch TV":"wˈɑtʃ tˈivˈi","water":"wˈɔtɚ","watermelon":"wˈɔtɚmˌɛlən","weather":"wˈɛðɚ","Wednesday":"wˈɛnzdi","week":"wˈik","weight":"wˈeɪt","what":"wˈʌt","white":"wˈaɪt","who":"hˈu","will":"wˈɪl","win":"wˈɪn","wind":"wˈaɪnd","window":"wˈɪndoʊ","windy":"wˈɪndi","winner":"wˈɪnɚ","world":"wˈɝld","write":"rˈaɪt","year":"jˈɪr","yellow":"jˈɛloʊ","yes":"jˈɛs","yesterday":"jˈɛstɚdˌeɪ","you":"jˈu","your":"jˈɔr","live":"lɪv","close":"kloʊz","use":"juz","present":"ˈprɛzənt","toothache":"ˈtuθeɪk"};

let v9Capture=null;
let v9Urls={challenge:null,regular:null};
let v9ChallengeAttempts=0;
let v9ChallengePendingFailure=false;

function v9Escape(s){
  return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
function v9Delay(ms){return new Promise(r=>setTimeout(r,ms))}
function v9Timeout(p,ms,fallback){
  return Promise.race([p,new Promise(r=>setTimeout(()=>r(fallback),ms))]);
}
function v9SetDisplay(id,show,display="block"){const e=document.getElementById(id);if(e)e.style.display=show?display:"none"}
function v9SetClass(id,cls,add=true){const e=document.getElementById(id);if(e)e.classList.toggle(cls,add)}
function v9HideReview(kind){
  const review=document.getElementById(kind==="challenge"?"repeatChallengeReview":"repeatReview");
  if(review)review.classList.remove("show");
}
function v9ShowReview(kind){
  const review=document.getElementById(kind==="challenge"?"repeatChallengeReview":"repeatReview");
  if(review)review.classList.add("show");
}
function v9SetAudio(kind,url){
  const id=kind==="challenge"?"repeatChallengeAudio":"repeatAudio";
  const a=document.getElementById(id);if(!a)return;
  if(v9Urls[kind]){try{URL.revokeObjectURL(v9Urls[kind])}catch(e){}}
  v9Urls[kind]=url||null;
  a.src=url||"";
  if(url)a.load();
}
function playMyRecordingV9(kind){
  const a=document.getElementById(kind==="challenge"?"repeatChallengeAudio":"repeatAudio");
  if(!a||!a.src)return toast("还没有录音");
  try{a.currentTime=0;const p=a.play();if(p?.catch)p.catch(()=>{})}catch(e){}
}
window.playMyRecordingV9=playMyRecordingV9;

function v9RecognitionClass(){return window.SpeechRecognition||window.webkitSpeechRecognition||null}
function v9SpeechErrorText(code){
  const map={
    "no-speech":"没有识别到清晰语音",
    "audio-capture":"自动识别暂时无法同时读取麦克风",
    "network":"自动语音识别网络不可用",
    "not-allowed":"语音识别权限不可用",
    "service-not-allowed":"当前浏览器不允许语音识别服务",
    "language-not-supported":"当前识别服务不支持 en-US",
    "aborted":"自动识别已结束"
  };
  return map[code]||"自动语音识别暂不可用";
}
function v9MimeType(){
  if(!window.MediaRecorder)return "";
  const candidates=["audio/webm;codecs=opus","audio/webm","audio/mp4","audio/ogg;codecs=opus"];
  for(const x of candidates){try{if(MediaRecorder.isTypeSupported(x))return x}catch(e){}}
  return "";
}
function v9RecorderSupported(){return !!(navigator.mediaDevices?.getUserMedia&&window.MediaRecorder)}

async function v9BeginCapture(kind,target){
  if(v9Capture)throw new Error("已有录音正在进行");
  if(!v9RecorderSupported())throw new Error("当前浏览器不支持网页录音（MediaRecorder）");
  if(!window.isSecureContext)throw new Error("录音需要 HTTPS 页面");
  if("speechSynthesis" in window)try{speechSynthesis.cancel()}catch(e){}

  const stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:true,channelCount:1}});
  try{setMicUI("ready","已允许","麦克风正在用于跟读录音。")}catch(e){}

  const mime=v9MimeType();
  const recorder=mime?new MediaRecorder(stream,{mimeType:mime}):new MediaRecorder(stream);
  const chunks=[];
  let recorderResolve;
  const recorderDone=new Promise(r=>recorderResolve=r);
  recorder.ondataavailable=e=>{if(e.data&&e.data.size)chunks.push(e.data)};
  recorder.onerror=e=>{console.warn("V9 recorder error",e)};
  recorder.onstop=()=>{
    const type=recorder.mimeType||mime||"audio/webm";
    const blob=new Blob(chunks,{type});
    recorderResolve({blob,url:blob.size?URL.createObjectURL(blob):null});
  };
  recorder.start(120);

  let recognition=null,sttResolve,sttSettled=false;
  const transcripts=[];
  let sttError="";
  const sttDone=new Promise(r=>sttResolve=r);
  function settleStt(){if(!sttSettled){sttSettled=true;sttResolve({transcripts:[...new Set(transcripts)],error:sttError})}}
  const SR=v9RecognitionClass();
  if(SR){
    try{
      recognition=new SR();
      recognition.lang="en-US";
      recognition.interimResults=true;
      recognition.maxAlternatives=10;
      recognition.continuous=false;
      recognition.onresult=e=>{
        for(let ri=e.resultIndex||0;ri<e.results.length;ri++){
          const result=e.results[ri];
          for(let i=0;i<result.length;i++){const t=String(result[i].transcript||"").trim();if(t)transcripts.push(t)}
        }
      };
      recognition.onerror=e=>{sttError=String(e?.error||e?.name||"unknown");};
      recognition.onend=settleStt;
      await v9Delay(160);
      try{recognition.start()}catch(e){sttError=String(e?.name||"start-error");settleStt()}
    }catch(e){sttError=String(e?.name||"recognition-error");settleStt()}
  }else{sttError="unsupported";settleStt()}

  const autoTimer=setTimeout(()=>{
    if(v9Capture&&v9Capture.kind===kind){
      if(kind==="challenge")stopRepeatChallengeRecordingV9(true);
      else stopRegularRecordingV9(true);
    }
  },12000);

  v9Capture={kind,target,stream,recorder,recognition,recorderDone,sttDone,settleStt,autoTimer,stopping:false};
  return v9Capture;
}

async function v9StopCapture(kind){
  const c=v9Capture;
  if(!c||c.kind!==kind)return null;
  if(c.stopping)return c.stopPromise||null;
  c.stopping=true;
  clearTimeout(c.autoTimer);
  c.stopPromise=(async()=>{
    try{if(c.recorder.state!=="inactive"){try{c.recorder.requestData()}catch(e){}c.recorder.stop()}}catch(e){}
    try{if(c.recognition)c.recognition.stop()}catch(e){try{c.recognition?.abort()}catch(_){}}
    const rec=await v9Timeout(c.recorderDone,2500,{blob:null,url:null});
    const stt=await v9Timeout(c.sttDone,1800,{transcripts:[],error:"timeout"});
    try{c.settleStt()}catch(e){}
    try{c.stream.getTracks().forEach(t=>t.stop())}catch(e){}
    v9Capture=null;
    return {...rec,...stt,target:c.target};
  })();
  return c.stopPromise;
}

function v9AbortCapture(){
  const c=v9Capture;if(!c)return;
  clearTimeout(c.autoTimer);
  try{c.recognition?.abort()}catch(e){}
  try{if(c.recorder?.state!=="inactive")c.recorder.stop()}catch(e){}
  try{c.stream?.getTracks().forEach(t=>t.stop())}catch(e){}
  try{c.settleStt()}catch(e){}
  v9Capture=null;
}

function v9Ipa(target){
  const exact=V9_IPA[target]||V9_IPA[String(target).toLowerCase()];
  return exact||"";
}
function v9PronTip(target,best){
  const t=normalizeSpeech(target),b=normalizeSpeech(best);
  const tips=[];
  if(t.includes("th"))tips.push("遇到 th 时，舌尖轻触上下齿之间送气，不要直接读成 s / z / d。 ");
  if(t.includes("v"))tips.push("v 音用上齿轻触下唇并让气流摩擦，不要读成 w。 ");
  if(t.includes("r"))tips.push("美式 r 注意舌尖不要顶住上颚，舌身微卷、声音保持连贯。 ");
  if(t.endsWith("t")||t.endsWith("d")||t.endsWith("k")||t.endsWith("p")||t.endsWith("s")||t.endsWith("z"))tips.push("注意把结尾辅音交代清楚，不要吞掉词尾。 ");
  if(b){
    if(t[0]&&b[0]&&t[0]!==b[0])tips.unshift("按识别结果，先重点检查单词开头的第一个音。 ");
    if(t.at(-1)&&b.at(-1)&&t.at(-1)!==b.at(-1))tips.unshift("按识别结果，重点检查词尾是否读完整。 ");
  }
  if(!tips.length)tips.push("先听一次标准音，把单词放慢读清楚，再听自己的录音对比重音和词尾。 ");
  return tips.slice(0,2).join("");
}
function v9Evaluate(target,transcripts,error){
  const targetN=normalizeSpeech(target);
  let best="",bestScore=0;
  (transcripts||[]).forEach(x=>{const score=speechSimilarity(x,targetN);if(score>bestScore){bestScore=score;best=x}});
  const pass=!!best&&(bestScore>=0.82||(targetN.length>=6&&bestScore>=0.75));
  const graded=!!best;
  return {target,best,bestScore,pass,graded,error:error||"",ipa:v9Ipa(target),tip:v9PronTip(target,best)};
}
function v9CorrectionHtml(result){
  const ipa=result.ipa?`<div>🇺🇸 美式参考音标：<span class="ipa">/${v9Escape(result.ipa)}/</span></div>`:"";
  if(!result.graded){
    const why=result.error&&result.error!=="unsupported"?v9SpeechErrorText(result.error):"当前浏览器没有可用的自动英语识别";
    return {kind:"",html:`<b>🎧 录音已保存，可以直接回放。</b><br>${ipa}<div>⚠️ ${v9Escape(why)}，所以这次不做“读对/读错”的自动判定。</div><div>纠音方法：先听标准发音 → 播放自己的录音 → 对照音标再录一次。</div>`};
  }
  if(result.pass){
    return {kind:"good",html:`<b>🌟 发音基本通过</b><br>识别到：<b>${v9Escape(result.best)}</b> · 匹配度 ${Math.round(result.bestScore*100)}%<br>${ipa}<div>继续对照自己的录音和标准音，保持重音、词尾清楚。</div>`};
  }
  return {kind:"bad",html:`<b>🛠️ 这次需要再纠正一下</b><br>系统听起来更像：<b>${v9Escape(result.best||"未识别清楚")}</b><br>目标单词：<b>${v9Escape(result.target)}</b> · 匹配度 ${Math.round(result.bestScore*100)}%<br>${ipa}<div><b>建议重点检查：</b>${v9Escape(result.tip)}</div><div>点“标准发音”听一遍，再播放自己的录音对照，然后“再录一次”。</div>`};
}
function v9RenderCorrection(kind,result){
  const id=kind==="challenge"?"repeatChallengeCorrection":"repeatCorrection";
  const box=document.getElementById(id);if(!box)return;
  const x=v9CorrectionHtml(result);box.className="pron-correction"+(x.kind?" "+x.kind:"");box.innerHTML=x.html;
}

function v9UpdateChallengeRunning(running){
  const mic=document.getElementById("repeatChallengeMic"),stop=document.getElementById("repeatChallengeStop");
  if(mic){mic.disabled=running;mic.classList.toggle("listening",running);mic.textContent=running?"🎤":"🎙️"}
  if(stop){stop.classList.toggle("show",running);stop.disabled=false}
}
function v9UpdateRegularRunning(running){
  const mic=document.getElementById("repeatMicBtn"),stop=document.getElementById("repeatStopBtn");
  if(mic){mic.disabled=running;mic.classList.toggle("listening",running);mic.textContent=running?"🎤 录音中…":"🎙️ 开始跟读"}
  if(stop){stop.classList.toggle("show",running);stop.disabled=false}
}

const v9BaseRenderRepeatChallenge=renderRepeatChallenge;
renderRepeatChallenge=function(){
  v9AbortCapture();v9ChallengeAttempts=0;v9ChallengePendingFailure=false;v9HideReview("challenge");v9SetAudio("challenge",null);v9UpdateChallengeRunning(false);
  v9BaseRenderRepeatChallenge();
  const next=document.getElementById("repeatChallengeNext");if(next)next.textContent="下一词 →";
};
window.renderRepeatChallenge=renderRepeatChallenge;

startRepeatChallengeMic=async function(){
  const q=repeatGame.questions[repeatGame.i];if(!q||repeatGame.attempted||v9Capture)return;
  const status=document.getElementById("repeatChallengeStatus");
  v9HideReview("challenge");v9SetAudio("challenge",null);
  if(status){status.innerHTML="🎙️ 正在录音，请读出这个单词。<br><small>读完后点击下面的“⏹ 停止录音”。</small>";status.className="repeat-challenge-status"}
  try{
    await v9BeginCapture("challenge",q.en);v9UpdateChallengeRunning(true);
  }catch(e){
    v9UpdateChallengeRunning(false);
    if(status){status.textContent="录音启动失败："+(e?.message||e);status.className="repeat-challenge-status bad"}
  }
};
window.startRepeatChallengeMic=startRepeatChallengeMic;

async function stopRepeatChallengeRecordingV9(auto=false){
  if(!v9Capture||v9Capture.kind!=="challenge")return;
  const status=document.getElementById("repeatChallengeStatus"),stop=document.getElementById("repeatChallengeStop");
  if(stop){stop.disabled=true;stop.textContent="正在结束…"}
  if(status){status.textContent=auto?"已达到最长录音时间，正在处理…":"录音结束，正在生成回放和发音反馈…";status.className="repeat-challenge-status"}
  const data=await v9StopCapture("challenge");
  v9UpdateChallengeRunning(false);if(stop)stop.textContent="⏹ 停止录音";
  if(!data)return;
  if(data.url)v9SetAudio("challenge",data.url);
  v9ShowReview("challenge");
  const result=v9Evaluate(data.target,data.transcripts,data.error);v9RenderCorrection("challenge",result);
  v9ChallengeAttempts++;
  const next=document.getElementById("repeatChallengeNext");

  if(result.pass){
    repeatGame.attempted=true;repeatGame.score++;repeatGame.combo++;repeatGame.bestCombo=Math.max(repeatGame.bestCombo,repeatGame.combo);
    state.stats.done=(state.stats.done||0)+1;state.stats.right=(state.stats.right||0)+1;dailyAdd("repeat",1);
    state.stats.bestCombo=Math.max(state.stats.bestCombo||0,repeatGame.bestCombo);saveState(state);updateTop();
    document.getElementById("repeatCombo").textContent=repeatGame.combo;
    if(status){status.textContent=`🌟 发音通过！已保存本次录音，可先回放再进入下一词。`;status.className="repeat-challenge-status good"}
    if(next){next.style.display="block";next.textContent="下一词 →"};playSfx("repeatGood");v9ChallengePendingFailure=false;
  }else if(!result.graded){
    // 录音成功但自动识别不可用：不惩罚孩子，按完成跟读计入，仍然保留回放与人工对照。
    repeatGame.attempted=true;repeatGame.score++;repeatGame.combo++;repeatGame.bestCombo=Math.max(repeatGame.bestCombo,repeatGame.combo);
    state.stats.done=(state.stats.done||0)+1;dailyAdd("repeat",1);saveState(state);updateTop();
    document.getElementById("repeatCombo").textContent=repeatGame.combo;
    if(status){status.innerHTML="✅ 录音完成并可回放。<br><small>自动识别不可用，本词不判错、不扣生命，按完成跟读计入。</small>";status.className="repeat-challenge-status good"}
    if(next){next.style.display="block";next.textContent="下一词 →"};v9ChallengePendingFailure=false;
  }else{
    // 先纠音、允许重录；只有主动“跳过本词”才记一次失败，避免一次误识别直接扣生命。
    repeatGame.attempted=false;v9ChallengePendingFailure=true;
    if(status){status.innerHTML=`🛠️ 还差一点。先听纠音并回放自己的录音，然后可以“再录一次”。<br><small>如果不想重录，可直接跳过本词。</small>`;status.className="repeat-challenge-status bad"}
    if(next){next.style.display="block";next.textContent="跳过本词 →"};playSfx("repeatTry");
  }
}
window.stopRepeatChallengeRecordingV9=stopRepeatChallengeRecordingV9;

function retryChallengeRecordingV9(){
  if(v9Capture)return;
  if(repeatGame.attempted){
    // 已通过后允许再听/再录做练习，但不重复计分：先清 attempted 只用于录音，评分后会被视为练习。
    toast("本词已经完成；进入下一词后再继续闯关");return;
  }
  const next=document.getElementById("repeatChallengeNext");if(next)next.style.display="none";
  startRepeatChallengeMic();
}
window.retryChallengeRecordingV9=retryChallengeRecordingV9;

const v9BaseNextRepeatChallenge=nextRepeatChallenge;
nextRepeatChallenge=function(){
  if(v9Capture){toast("请先停止录音");return}
  if(!repeatGame.attempted){
    if(!v9ChallengePendingFailure){toast("请先完成一次跟读录音");return}
    const q=repeatGame.questions[repeatGame.i];
    repeatGame.attempted=true;repeatGame.lives--;repeatGame.combo=0;state.stats.done=(state.stats.done||0)+1;
    state.wrong[q.en]={en:q.en,zh:q.zh,miss:(state.wrong[q.en]?.miss||0)+1,book:repeatGame.book};
    saveState(state);updateTop();
  }
  repeatGame.i++;renderRepeatChallenge();
};
window.nextRepeatChallenge=nextRepeatChallenge;

const v9BaseShowRepeatPanel=showRepeatPanel;
showRepeatPanel=function(q){
  v9AbortCapture();v9HideReview("regular");v9SetAudio("regular",null);v9UpdateRegularRunning(false);
  v9BaseShowRepeatPanel(q);
};
window.showRepeatPanel=showRepeatPanel;

startRepeat=async function(){
  const q=game.questions[game.i];if(!q||v9Capture)return;
  const status=document.getElementById("repeatStatus");v9HideReview("regular");v9SetAudio("regular",null);
  if(status){status.innerHTML="🎙️ 正在录音。读完后点击“⏹ 停止录音”。";status.className="repeat-status"}
  try{await v9BeginCapture("regular",q.en);v9UpdateRegularRunning(true)}catch(e){v9UpdateRegularRunning(false);if(status){status.textContent="录音启动失败："+(e?.message||e);status.className="repeat-status bad"}}
};
window.startRepeat=startRepeat;

async function stopRegularRecordingV9(auto=false){
  if(!v9Capture||v9Capture.kind!=="regular")return;
  const status=document.getElementById("repeatStatus"),stop=document.getElementById("repeatStopBtn");
  if(stop){stop.disabled=true;stop.textContent="正在结束…"}
  if(status)status.textContent=auto?"达到最长录音时间，正在处理…":"正在生成你的录音回放和发音反馈…";
  const data=await v9StopCapture("regular");v9UpdateRegularRunning(false);if(stop)stop.textContent="⏹ 停止录音";
  if(!data)return;if(data.url)v9SetAudio("regular",data.url);v9ShowReview("regular");
  const result=v9Evaluate(data.target,data.transcripts,data.error);v9RenderCorrection("regular",result);
  if(status){
    if(result.pass){status.textContent="🌟 跟读基本正确。现在播放自己的录音和标准音做一次对照。";status.className="repeat-status good";playSfx("repeatGood")}
    else if(result.graded){status.textContent="🛠️ 已给出纠音建议。对照录音后可以重新录一次。";status.className="repeat-status bad";playSfx("repeatTry")}
    else{status.textContent="🎧 录音已完成；自动评分不可用，但仍可正常回放和对照标准发音。";status.className="repeat-status"}
  }
}
window.stopRegularRecordingV9=stopRegularRecordingV9;
function retryRegularRecordingV9(){if(v9Capture)return;startRepeat()}
window.retryRegularRecordingV9=retryRegularRecordingV9;

// ===== V9 Android / Chrome 音色列表增强 =====
// 保留 V6 的 getVoices / Google 优先逻辑，只补充“等待、重新扫描、用户点击时静音唤醒 TTS 引擎”。
async function v9ScanVoices(retries=[0,180,450,900,1600,2800]){
  let last=-1;
  for(const ms of retries){
    if(ms)await v9Delay(ms);
    try{speechSynthesis.resume();refreshVoiceList(false);last=americanVoices.length;if(last>0)break}catch(e){}
  }
  return last;
}
async function refreshPhoneVoicesV9(){
  if(!("speechSynthesis" in window))return toast("当前浏览器不支持语音朗读");
  let n=await v9ScanVoices([0,120,250]);
  if(n<=0){
    // 某些 Android/Chrome 只有真正初始化一次 TTS 后才填充 getVoices()；静音唤醒，不改变 V6 选音规则。
    try{
      const u=new SpeechSynthesisUtterance("hello");u.lang="en-US";u.volume=0;u.rate=1;
      speechSynthesis.cancel();speechSynthesis.speak(u);await v9Delay(450);speechSynthesis.cancel();
    }catch(e){}
    n=await v9ScanVoices([0,250,650,1200,2200]);
  }
  refreshVoiceList(false);
  toast(americanVoices.length?`找到 ${americanVoices.length} 个美式音色`:`仍未读取到 en-US 音色`);
}
window.refreshPhoneVoicesV9=refreshPhoneVoicesV9;

const v9BasePreviewVoice=previewVoice;
previewVoice=function(){
  try{refreshVoiceList(false)}catch(e){}
  v9BasePreviewVoice();
  setTimeout(()=>{try{refreshVoiceList(false)}catch(e){}},500);
};
window.previewVoice=previewVoice;

function v9InstallVoiceListeners(){
  if(!("speechSynthesis" in window))return;
  try{speechSynthesis.addEventListener("voiceschanged",()=>refreshVoiceList(false))}catch(e){}
  window.addEventListener("focus",()=>{try{refreshVoiceList(false)}catch(e){}});
  window.addEventListener("pageshow",()=>{try{refreshVoiceList(false)}catch(e){}});
  document.addEventListener("visibilitychange",()=>{if(!document.hidden)try{refreshVoiceList(false)}catch(e){}});
  [400,1000,2200,4500,8000].forEach(ms=>setTimeout(()=>{try{refreshVoiceList(false)}catch(e){}},ms));
}

v9InstallVoiceListeners();
setTimeout(()=>v9ScanVoices([0,250,700,1500,3000]),120);

// 离开当前页面/进入下一题时，避免麦克风在后台继续录音。
const v9BaseShow=show;
show=function(id){
  const current=document.querySelector('.screen.active')?.id||'';
  if(v9Capture && current && current!==id)v9AbortCapture();
  return v9BaseShow(id);
};
window.show=show;

const v9BaseNextQuestion=nextQuestion;
nextQuestion=function(){
  if(v9Capture){toast('请先点击“停止录音”');return;}
  return v9BaseNextQuestion();
};
window.nextQuestion=nextQuestion;

window.addEventListener('pagehide',()=>v9AbortCapture());
