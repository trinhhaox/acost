"use strict";var ft=Object.create;var K=Object.defineProperty;var vt=Object.getOwnPropertyDescriptor;var bt=Object.getOwnPropertyNames;var yt=Object.getPrototypeOf,xt=Object.prototype.hasOwnProperty;var Tt=(l,t)=>{for(var e in t)K(l,e,{get:t[e],enumerable:!0})},ct=(l,t,e,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of bt(t))!xt.call(l,s)&&s!==e&&K(l,s,{get:()=>t[s],enumerable:!(r=vt(t,s))||r.enumerable});return l};var w=(l,t,e)=>(e=l!=null?ft(yt(l)):{},ct(t||!l||!l.__esModule?K(e,"default",{value:l,enumerable:!0}):e,l)),Pt=l=>ct(K({},"__esModule",{value:!0}),l);var wt={};Tt(wt,{activate:()=>Ct,deactivate:()=>Mt});module.exports=Pt(wt);var g=w(require("vscode")),O=w(require("fs")),at=w(require("path")),gt=w(require("os"));var F=w(require("fs")),N=w(require("path")),ut=w(require("os"));var kt={"gemini-3.7-flash":{displayName:"Gemini 3.7 Flash",provider:"Google",inputPricePerMillion:.15,outputPricePerMillion:.6,cacheReadPricePerMillion:.0375},"gemini-3.6-flash":{displayName:"Gemini 3.6 Flash",provider:"Google",inputPricePerMillion:.15,outputPricePerMillion:.6,cacheReadPricePerMillion:.0375},"gemini-3.5-flash":{displayName:"Gemini 3.5 Flash",provider:"Google",inputPricePerMillion:.1,outputPricePerMillion:.4,cacheReadPricePerMillion:.025},"gemini-3.1-pro":{displayName:"Gemini 3.1 Pro",provider:"Google",inputPricePerMillion:1.25,outputPricePerMillion:5,cacheReadPricePerMillion:.3125},"gemini-2.5-pro":{displayName:"Gemini 2.5 Pro",provider:"Google",inputPricePerMillion:1.25,outputPricePerMillion:5,cacheReadPricePerMillion:.3125},"gemini-2.5-flash":{displayName:"Gemini 2.5 Flash",provider:"Google",inputPricePerMillion:.075,outputPricePerMillion:.3,cacheReadPricePerMillion:.01875},"gemini-1.5-pro":{displayName:"Gemini 1.5 Pro",provider:"Google",inputPricePerMillion:1.25,outputPricePerMillion:5,cacheReadPricePerMillion:.3125},"gemini-1.5-flash":{displayName:"Gemini 1.5 Flash",provider:"Google",inputPricePerMillion:.075,outputPricePerMillion:.3,cacheReadPricePerMillion:.01875},"claude-sonnet-4.6":{displayName:"Claude Sonnet 4.6 (Thinking)",provider:"Anthropic",inputPricePerMillion:3,outputPricePerMillion:15,cacheReadPricePerMillion:.3},"claude-opus-4.6":{displayName:"Claude Opus 4.6 (Thinking)",provider:"Anthropic",inputPricePerMillion:15,outputPricePerMillion:75,cacheReadPricePerMillion:1.5},"claude-3.7-sonnet":{displayName:"Claude 3.7 Sonnet",provider:"Anthropic",inputPricePerMillion:3,outputPricePerMillion:15,cacheReadPricePerMillion:.3},"claude-3.5-sonnet":{displayName:"Claude 3.5 Sonnet",provider:"Anthropic",inputPricePerMillion:3,outputPricePerMillion:15,cacheReadPricePerMillion:.3},"claude-3.5-haiku":{displayName:"Claude 3.5 Haiku",provider:"Anthropic",inputPricePerMillion:.8,outputPricePerMillion:4,cacheReadPricePerMillion:.08},"claude-3-opus":{displayName:"Claude 3 Opus",provider:"Anthropic",inputPricePerMillion:15,outputPricePerMillion:75,cacheReadPricePerMillion:1.5},"gpt-4o":{displayName:"GPT-4o",provider:"OpenAI",inputPricePerMillion:2.5,outputPricePerMillion:10,cacheReadPricePerMillion:1.25},"gpt-4o-mini":{displayName:"GPT-4o mini",provider:"OpenAI",inputPricePerMillion:.15,outputPricePerMillion:.6,cacheReadPricePerMillion:.075},"o3-mini":{displayName:"o3-mini",provider:"OpenAI",inputPricePerMillion:1.1,outputPricePerMillion:4.4,cacheReadPricePerMillion:.55},o1:{displayName:"o1",provider:"OpenAI",inputPricePerMillion:15,outputPricePerMillion:60,cacheReadPricePerMillion:7.5},default:{displayName:"Standard AI Model",provider:"Other",inputPricePerMillion:.5,outputPricePerMillion:1.5,cacheReadPricePerMillion:.1}},z=class{pricingTable;config;constructor(t){if(this.config=t,this.pricingTable={...kt},t.customPricing)for(let[e,r]of Object.entries(t.customPricing))this.pricingTable[e]?this.pricingTable[e]={...this.pricingTable[e],...r}:r.inputPricePerMillion!==void 0&&r.outputPricePerMillion!==void 0&&(this.pricingTable[e]={displayName:r.displayName||e,provider:r.provider||"Other",inputPricePerMillion:r.inputPricePerMillion,outputPricePerMillion:r.outputPricePerMillion,cacheReadPricePerMillion:r.cacheReadPricePerMillion||0})}normalizeModelKey(t){if(!t)return"gemini-3.7-flash";let e=t.toLowerCase();return e.includes("3.7")&&e.includes("flash")?"gemini-3.7-flash":e.includes("3.6")&&e.includes("flash")?"gemini-3.6-flash":e.includes("3.5")&&e.includes("flash")?"gemini-3.5-flash":e.includes("3.1")&&e.includes("pro")?"gemini-3.1-pro":e.includes("2.5")&&e.includes("pro")?"gemini-2.5-pro":e.includes("2.5")&&e.includes("flash")?"gemini-2.5-flash":e.includes("1.5")&&e.includes("pro")?"gemini-1.5-pro":e.includes("1.5")&&e.includes("flash")?"gemini-1.5-flash":e.includes("claude")&&e.includes("sonnet")&&e.includes("4.6")?"claude-sonnet-4.6":e.includes("claude")&&e.includes("opus")&&e.includes("4.6")?"claude-opus-4.6":e.includes("claude")&&e.includes("3.7")&&e.includes("sonnet")?"claude-3.7-sonnet":e.includes("claude")&&e.includes("3.5")&&e.includes("sonnet")?"claude-3.5-sonnet":e.includes("claude")&&e.includes("haiku")?"claude-3.5-haiku":e.includes("claude")&&e.includes("opus")?"claude-3-opus":e.includes("gpt-4o-mini")||e.includes("4o-mini")?"gpt-4o-mini":e.includes("gpt-4o")||e.includes("4o")?"gpt-4o":e.includes("o3-mini")?"o3-mini":e.includes("o1")?"o1":e.includes("gemini")?"gemini-3.7-flash":e.includes("claude")?"claude-sonnet-4.6":e.includes("gpt")?"gpt-4o":"default"}getModelPricing(t){let e=this.normalizeModelKey(t);return this.pricingTable[e]||this.pricingTable.default}calculateCostUSD(t,e,r,s=0){let p=this.getModelPricing(t),d=r+s,o=e/1e6*p.inputPricePerMillion,a=d/1e6*p.outputPricePerMillion;return o+a}usdToVnd(t){return Math.round(t*this.config.vndExchangeRate)}calculateValuation(t,e,r,s){let p=this.usdToVnd(t),d=e/3600,o=Math.max(1,Math.round((d*4.5+r/5e4*1.5)*10)/10),a=this.config.humanHourlyRate,h=Math.round(o*a),T=this.usdToVnd(h),m=a*.6,M=d*m,x=Math.round((t*this.config.markupMultiplier+M+s*.5)*100)/100,I=this.usdToVnd(x),k=Math.max(0,h-x),S=this.usdToVnd(k);return{apiCostUSD:Math.round(t*1e4)/1e4,apiCostVND:p,humanHoursEquivalent:o,humanHourlyRate:a,humanCostEquivalentUSD:h,humanCostEquivalentVND:T,markupMultiplier:this.config.markupMultiplier,recommendedValuationUSD:x,recommendedValuationVND:I,savingsUSD:k,savingsVND:S}}};var Y=w(require("fs")),R=w(require("path")),dt=w(require("readline"));var $=class{static estimateTokens(t){if(!t||t.length===0)return 0;let e=t.length;if(e<4)return 1;let r=0,s=0,p=0;for(let T=0;T<Math.min(e,2e3);T++){let m=t.charCodeAt(T);m>255?r++:m===32||m===10||m===9||m===13?p++:(m>=33&&m<=47||m>=58&&m<=64||m>=91&&m<=96||m>=123&&m<=126)&&s++}let d=Math.min(e,2e3),o=r/d,a=s/d,h=3.8;return o>.15?h=2.6:a>.25&&(h=3.3),Math.ceil(e/h)}static estimateObjectTokens(t){if(!t)return 0;try{let e=typeof t=="string"?t:JSON.stringify(t);return this.estimateTokens(e)}catch{return 0}}};var W=class{pricingEngine;constructor(t){this.pricingEngine=t}async parseFile(t,e){if(!Y.existsSync(t))return null;let r=R.basename(R.dirname(R.dirname(t))),s=Y.createReadStream(t,{encoding:"utf8"}),p=dt.createInterface({input:s,crlfDelay:1/0}),d="",o="",a="gemini-3.7-flash",h=new Set,T=new Set,m=0,M=0,x=0,I=0,k=null,S=null,A=0,V=null;for await(let n of p)if(n.trim())try{let i=JSON.parse(n),u=i.type||"",b=i.source||"",c=i.content||"",G=i.created_at,U=null;if(G){let f=new Date(G).getTime();if(!isNaN(f)){if(U=f,(k===null||f<k)&&(k=f),(S===null||f>S)&&(S=f),V!==null){let C=(f-V)/1e3;C>0&&C<300&&(A+=C)}V=f}}if(c.includes("Model Selection")||c.includes("USER_SETTINGS_CHANGE")){let f=c.match(/Model Selection` from [^\n]+? to (.+?)\.\s*No need/i)||c.match(/Model Selection` from [^\n]+? to ([^\.\n<]+)/i)||c.match(/setting `Model Selection` from [^\n]+? to ([^\n<]+)/i);if(f&&f[1]){let C=f[1].trim();a=this.pricingEngine.normalizeModelKey(C),h.add(a)}}if(!d){let f=c.match(/\[URI\] -> \[CorpusName\]:\s*([^\s\n]+)/);if(f&&f[1])d=f[1].trim();else{let C=c.match(/Active Document:\s*([^\n\r]+)/);if(C&&C[1]){let D=C[1].trim();d=R.dirname(D)}else{let D=c.match(/@\[([^\]]+)\]/);if(D&&D[1]){let lt=D[1].trim();lt.startsWith("/")&&(d=lt)}}}}if(u==="USER_INPUT"&&!o){let f=c.match(/<USER_REQUEST>([\s\S]*?)<\/USER_REQUEST>/);f&&f[1]?o=f[1].trim().replace(/\n+/g," ").slice(0,80):o=c.replace(/<[^>]+>/g,"").trim().slice(0,80)}if(u==="USER_INPUT")I++,m+=$.estimateTokens(c);else if(u==="KNOWLEDGE_ARTIFACTS"||u==="CONVERSATION_HISTORY"||u==="SYSTEM_MESSAGE"||u==="VIEW_FILE"||u==="GREP_SEARCH"||u==="LIST_DIRECTORY"||u==="RUN_COMMAND"||u==="READ_URL_CONTENT"||u==="MCP_TOOL")m+=$.estimateTokens(c);else if(u==="PLANNER_RESPONSE"){if(i.thinking&&(x+=$.estimateTokens(i.thinking)),c&&(M+=$.estimateTokens(c)),i.tool_calls&&Array.isArray(i.tool_calls))for(let f of i.tool_calls){M+=$.estimateObjectTokens(f);let C=f.args||{},D=C.AbsolutePath||C.TargetFile||C.DirectoryPath;D&&typeof D=="string"&&D.startsWith("/")&&T.add(D.replace(/^"|"$/g,""))}}else b==="MODEL"?M+=$.estimateTokens(c):m+=$.estimateTokens(c)}catch{}if(h.size===0&&h.add(a),e&&d){let n=R.normalize(e).toLowerCase(),i=R.normalize(d).toLowerCase();if(!(i.startsWith(n)||n.startsWith(i)))return null}let L=k&&S?Math.max(1,Math.round((S-k)/1e3)):Math.max(1,Math.round(A)),ot=Math.min(L,Math.max(15,Math.round(A))),H=Array.from(h)[0]||"gemini-3.7-flash",j=this.pricingEngine.calculateCostUSD(H,m,M,x),nt=this.pricingEngine.usdToVnd(j);return{sessionId:r,workspacePath:d||e||"Unknown Workspace",title:o||`Session ${r.slice(0,8)}`,startTime:k?new Date(k).toISOString():new Date().toISOString(),endTime:S?new Date(S).toISOString():new Date().toISOString(),durationSeconds:L,activeTimeSeconds:ot,modelsUsed:Array.from(h),turnsCount:Math.max(1,I),inputTokens:m,outputTokens:M,thinkingTokens:x,totalTokens:m+M+x,costUSD:Math.round(j*1e4)/1e4,costVND:nt,filesTouched:Array.from(T),filePath:t}}};var Q=class{pricingEngine;parser;brainDir;cache=new Map;constructor(t,e){this.pricingEngine=new z(t),this.parser=new W(this.pricingEngine),this.brainDir=e||N.join(ut.homedir(),".gemini","antigravity-ide","brain")}updateConfig(t){this.pricingEngine=new z(t),this.parser=new W(this.pricingEngine),this.cache.clear()}async scanWorkspace(t,e="all"){let r=t?N.basename(t):"All Projects",s=[],p=new Map;if(!F.existsSync(this.brainDir))return this.buildEmptyReport(t||"",r,e);let d=[];try{d=F.readdirSync(this.brainDir)}catch{return this.buildEmptyReport(t||"",r,e)}for(let n of d){let i=N.join(this.brainDir,n,".system_generated","logs","transcript.jsonl");if(F.existsSync(i))try{let u=F.statSync(i),b=this.cache.get(i),c=null;if(b&&b.mtime===u.mtimeMs?c=b.data:(c=await this.parser.parseFile(i),this.cache.set(i,{mtime:u.mtimeMs,data:c})),c){s.push(c);let G=c.workspacePath||"Unknown",U=p.get(G)||{sessions:0,tokens:0,costUSD:0,lastActive:c.startTime};U.sessions++,U.tokens+=c.totalTokens,U.costUSD+=c.costUSD,new Date(c.startTime).getTime()>new Date(U.lastActive).getTime()&&(U.lastActive=c.startTime),p.set(G,U)}}catch{}}let o=[];for(let[n,i]of p.entries())o.push({workspacePath:n,projectName:n==="Unknown"?"Unknown Project":N.basename(n),totalSessions:i.sessions,totalTokens:i.tokens,totalCostUSD:Math.round(i.costUSD*1e4)/1e4,totalCostVND:this.pricingEngine.usdToVnd(i.costUSD),lastActive:i.lastActive});o.sort((n,i)=>i.totalCostUSD-n.totalCostUSD);let a=s;if(t&&t!=="ALL"&&t!=="All Projects"){let n=N.normalize(t).toLowerCase();a=s.filter(i=>{let u=N.normalize(i.workspacePath).toLowerCase();return u.startsWith(n)||n.startsWith(u)})}let h=Date.now();if(e==="today"){let n=new Date;n.setHours(0,0,0,0);let i=n.getTime();a=a.filter(u=>new Date(u.startTime).getTime()>=i)}else if(e==="7d"){let n=h-6048e5;a=a.filter(i=>new Date(i.startTime).getTime()>=n)}else if(e==="30d"){let n=h-2592e6;a=a.filter(i=>new Date(i.startTime).getTime()>=n)}a.sort((n,i)=>new Date(i.startTime).getTime()-new Date(n.startTime).getTime());let T=0,m=0,M=0,x=0,I=0,k=0,S=0,A=new Map,V=new Map;for(let n of a){T+=n.inputTokens,m+=n.outputTokens,M+=n.thinkingTokens,x+=n.costUSD,I+=n.activeTimeSeconds,k+=n.durationSeconds,S+=n.turnsCount;for(let i of n.modelsUsed){let u=A.get(i)||{input:0,output:0,thinking:0,costUSD:0},b=1/n.modelsUsed.length;u.input+=Math.round(n.inputTokens*b),u.output+=Math.round(n.outputTokens*b),u.thinking+=Math.round(n.thinkingTokens*b),u.costUSD+=n.costUSD*b,A.set(i,u)}if(n.filesTouched&&n.filesTouched.length>0){let i=Math.round(n.totalTokens/n.filesTouched.length),u=n.costUSD/n.filesTouched.length;for(let b of n.filesTouched){let c=V.get(b)||{count:0,estimatedTokens:0,costUSD:0};c.count++,c.estimatedTokens+=i,c.costUSD+=u,V.set(b,c)}}}let L=T+m+M,ot=this.pricingEngine.usdToVnd(x),H=[];for(let[n,i]of A.entries()){let u=this.pricingEngine.getModelPricing(n),b=i.input+i.output+i.thinking;H.push({modelName:n,displayName:u.displayName||n,provider:u.provider||"Other",inputTokens:i.input,outputTokens:i.output,thinkingTokens:i.thinking,totalTokens:b,costUSD:Math.round(i.costUSD*1e4)/1e4,costVND:this.pricingEngine.usdToVnd(i.costUSD),percentageOfCost:x>0?Math.round(i.costUSD/x*1e3)/10:0,percentageOfTokens:L>0?Math.round(b/L*1e3)/10:0})}H.sort((n,i)=>i.costUSD-n.costUSD);let j=[];for(let[n,i]of V.entries())j.push({fileName:N.basename(n),filePath:n,touchesCount:i.count,estimatedTokens:i.estimatedTokens,estimatedCostUSD:Math.round(i.costUSD*1e4)/1e4});j.sort((n,i)=>i.estimatedCostUSD-n.estimatedCostUSD);let nt=this.pricingEngine.calculateValuation(x,I,L,S);return{workspacePath:t||"All Workspaces",projectName:t&&t!=="ALL"?r:"T\u1EA5t C\u1EA3 D\u1EF1 \xC1n",generatedAt:new Date().toISOString(),dateFilter:e,totalSessions:a.length,totalTurns:S,totalInputTokens:T,totalOutputTokens:m,totalThinkingTokens:M,totalTokens:L,totalCostUSD:Math.round(x*1e4)/1e4,totalCostVND:ot,activeDurationSeconds:I,totalDurationSeconds:k,models:H,topFiles:j.slice(0,20),sessions:a,allProjects:o,valuation:nt}}buildEmptyReport(t,e,r){let s=this.pricingEngine.calculateValuation(0,0,0,0);return{workspacePath:t,projectName:e,generatedAt:new Date().toISOString(),dateFilter:r,totalSessions:0,totalTurns:0,totalInputTokens:0,totalOutputTokens:0,totalThinkingTokens:0,totalTokens:0,totalCostUSD:0,totalCostVND:0,activeDurationSeconds:0,totalDurationSeconds:0,models:[],topFiles:[],sessions:[],allProjects:[],valuation:s}}};var v=class{static formatNumber(t){return new Intl.NumberFormat("en-US").format(Math.round(t))}static formatDuration(t){if(t<=0)return"0s";let e=Math.floor(t/3600),r=Math.floor(t%3600/60),s=Math.floor(t%60),p=[];return e>0&&p.push(`${e}h`),r>0&&p.push(`${r}m`),(s>0||p.length===0)&&p.push(`${s}s`),p.join(" ")}static generateMarkdown(t,e){let r=e.currency==="VND",s=r?"\u20AB":"$",p=(a,h)=>r?`${this.formatNumber(h)} \u20AB (${a.toFixed(4)} USD)`:`$${a.toFixed(4)} (${this.formatNumber(h)} \u20AB)`,d=(a,h)=>r?`${this.formatNumber(h)} \u20AB ($${a.toFixed(2)} USD)`:`$${a.toFixed(2)} (${this.formatNumber(h)} \u20AB)`,o=`# \u{1F4CA} B\xC1O C\xC1O \u0110\u1ECANH GI\xC1 & CHI PH\xCD L\u1EACP TR\xCCNH AI (AI PROJECT VALUATION REPORT)

`;o+=`> **D\u1EF1 \xE1n:** \`${t.projectName}\`  
`,o+=`> **\u0110\u01B0\u1EDDng d\u1EABn:** \`${t.workspacePath}\`  
`,o+=`> **Th\u1EDDi gian xu\u1EA5t b\xE1o c\xE1o:** \`${new Date(t.generatedAt).toLocaleString("vi-VN")}\`  
`,o+=`> **C\xF4ng c\u1EE5 \u0111o l\u01B0\u1EDDng:** Antigravity Cost & Valuation Extension v1.0.0

`,o+=`---

`,o+=`## 1. \u{1F4B0} T\u1ED5ng Quan \u0110\u1ECBnh Gi\xE1 & Chi Ph\xED (Executive Summary)

`,o+=`| Ch\u1EC9 S\u1ED1 | Gi\xE1 Tr\u1ECB \u0110o L\u01B0\u1EDDng | Ghi Ch\xFA |
`,o+=`| :--- | :--- | :--- |
`,o+=`| **T\u1ED5ng Chi Ph\xED AI API Th\u1EF1c T\u1EBF** | **${p(t.totalCostUSD,t.totalCostVND)}** | Chi ph\xED token tr\u1EA3 cho nh\xE0 cung c\u1EA5p AI |
`,o+=`| **\u0110\u1ECBnh Gi\xE1 Ho\xE0n Th\xE0nh \u0110\u1EC1 Xu\u1EA5t** | **${d(t.valuation.recommendedValuationUSD,t.valuation.recommendedValuationVND)}** | \xC1p d\u1EE5ng h\u1EC7 s\u1ED1 Markup **x${t.valuation.markupMultiplier}** + C\xF4ng v\u1EADn h\xE0nh AI |
`,o+=`| **Chi Ph\xED Dev Truy\u1EC1n Th\u1ED1ng T\u01B0\u01A1ng \u0110\u01B0\u01A1ng** | **${d(t.valuation.humanCostEquivalentUSD,t.valuation.humanCostEquivalentVND)}** | \u01AF\u1EDBc t\xEDnh ${t.valuation.humanHoursEquivalent}h @ $${t.valuation.humanHourlyRate}/h |
`,o+=`| **Ti\u1EBFt Ki\u1EC7m So V\u1EDBi Dev Truy\u1EC1n Th\u1ED1ng** | **${d(t.valuation.savingsUSD,t.valuation.savingsVND)}** | Ti\u1EBFt ki\u1EC7m ~${t.valuation.humanCostEquivalentUSD>0?Math.round(t.valuation.savingsUSD/t.valuation.humanCostEquivalentUSD*100):0}% ng\xE2n s\xE1ch |
`,o+=`| **T\u1ED5ng Token Ti\xEAu Th\u1EE5** | **${this.formatNumber(t.totalTokens)} tokens** | In: ${this.formatNumber(t.totalInputTokens)} | Out: ${this.formatNumber(t.totalOutputTokens)} | Thinking: ${this.formatNumber(t.totalThinkingTokens)} |
`,o+=`| **Th\u1EDDi Gian Active Coding** | **${this.formatDuration(t.activeDurationSeconds)}** | T\u1ED5ng th\u1EDDi gian AI tr\u1EF1c ti\u1EBFp t\u1EA1o code & suy ngh\u0129 |
`,o+=`| **T\u1ED5ng S\u1ED1 Phi\xEAn L\xE0m Vi\u1EC7c (Sessions)** | **${t.totalSessions} sessions** | ${t.totalTurns} l\u01B0\u1EE3t prompt/t\u01B0\u01A1ng t\xE1c |

`,o+=`## 2. \u{1F916} Ph\xE2n B\u1ED5 Theo AI Models

`,o+=`| AI Model | Nh\xE0 Cung C\u1EA5p | Input Tokens | Output Tokens | Thinking Tokens | Chi Ph\xED (USD) | T\u1EF7 L\u1EC7 Chi Ph\xED |
`,o+=`| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
`;for(let a of t.models)o+=`| **${a.displayName}** | ${a.provider} | ${this.formatNumber(a.inputTokens)} | ${this.formatNumber(a.outputTokens)} | ${this.formatNumber(a.thinkingTokens)} | $${a.costUSD.toFixed(4)} | **${a.percentageOfCost}%** |
`;o+=`
`,o+=`## 3. \u{1F4DD} L\u1ECBch S\u1EED Chi Ti\u1EBFt C\xE1c Phi\xEAn Coding (Session Breakdown)

`,o+=`| Th\u1EDDi Gian | Y\xEAu C\u1EA7u / N\u1ED9i Dung | Model | Tokens | Th\u1EDDi L\u01B0\u1EE3ng | Chi Ph\xED (USD) |
`,o+=`| :--- | :--- | :--- | :--- | :--- | :--- |
`;for(let a of t.sessions.slice(0,50)){let h=new Date(a.startTime).toLocaleString("vi-VN"),T=a.title.replace(/\|/g,"\\|"),m=a.modelsUsed.join(", ");o+=`| ${h} | ${T} | ${m} | ${this.formatNumber(a.totalTokens)} | ${this.formatDuration(a.activeTimeSeconds)} | $${a.costUSD.toFixed(4)} |
`}return t.sessions.length>50&&(o+=`
*...v\xE0 ${t.sessions.length-50} phi\xEAn l\xE0m vi\u1EC7c kh\xE1c \u0111\xE3 \u0111\u01B0\u1EE3c t\u1ED5ng h\u1EE3p v\xE0o chi ph\xED chung.*
`),o+=`
---
`,o+=`*B\xE1o c\xE1o \u0111\u01B0\u1EE3c sinh t\u1EF1 \u0111\u1ED9ng b\u1EDFi [Antigravity Cost & Valuation Extension](file://${t.workspacePath}).*
`,o}static generateHtml(t,e){let r=e.currency==="VND";return`<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>B\xE1o C\xE1o \u0110\u1ECBnh Gi\xE1 D\u1EF1 \xC1n - ${t.projectName}</title>
    <style>
        :root {
            --bg: #0f172a;
            --card-bg: #1e293b;
            --text: #f8fafc;
            --text-muted: #94a3b8;
            --primary: #38bdf8;
            --success: #10b981;
            --warning: #f59e0b;
            --border: #334155;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background: var(--bg);
            color: var(--text);
            margin: 0;
            padding: 32px;
            line-height: 1.6;
        }
        .container {
            max-width: 1000px;
            margin: 0 auto;
        }
        .header {
            background: linear-gradient(135deg, #1e293b, #0f172a);
            border: 1px solid var(--border);
            padding: 28px;
            border-radius: 16px;
            margin-bottom: 24px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }
        h1 { margin: 0 0 8px 0; color: #fff; font-size: 26px; }
        .meta { color: var(--text-muted); font-size: 14px; }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 16px;
            margin-bottom: 24px;
        }
        .card {
            background: var(--card-bg);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 20px;
            text-align: center;
        }
        .card-label { font-size: 13px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; }
        .card-value { font-size: 24px; font-weight: bold; margin: 8px 0; color: var(--primary); }
        .card-sub { font-size: 13px; color: var(--text-muted); }
        .card.highlight { border-color: var(--success); background: linear-gradient(180deg, rgba(16, 185, 129, 0.1), var(--card-bg)); }
        .card.highlight .card-value { color: var(--success); }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 16px 0 32px 0;
            background: var(--card-bg);
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid var(--border);
        }
        th, td { padding: 14px 16px; text-align: left; border-bottom: 1px solid var(--border); font-size: 14px; }
        th { background: #182234; color: var(--text-muted); font-weight: 600; }
        tr:last-child td { border-bottom: none; }
        .badge { display: inline-block; padding: 3px 8px; border-radius: 6px; font-size: 12px; font-weight: 600; background: #334155; }
        .badge.google { background: #1e3a8a; color: #93c5fd; }
        .badge.anthropic { background: #78350f; color: #fde68a; }
        .badge.openai { background: #064e3b; color: #6ee7b7; }
        .btn-print { background: var(--primary); color: #000; border: none; padding: 10px 20px; border-radius: 8px; font-weight: bold; cursor: pointer; float: right; }
        @media print {
            body { background: #fff; color: #000; padding: 0; }
            .btn-print { display: none; }
            .card, table, .header { border-color: #ddd; background: #fff; color: #000; box-shadow: none; }
            .card-value { color: #0284c7; }
            th { background: #f1f5f9; color: #333; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <button class="btn-print" onclick="window.print()">\u{1F5A8}\uFE0F In / Xu\u1EA5t PDF</button>
            <h1>\u{1F4CA} B\xE1o C\xE1o \u0110\u1ECBnh Gi\xE1 & Chi Ph\xED L\u1EADp Tr\xECnh AI</h1>
            <div class="meta">
                D\u1EF1 \xE1n: <strong>${t.projectName}</strong> | Workspace: <code>${t.workspacePath}</code><br>
                Ng\xE0y t\u1EA1o: ${new Date(t.generatedAt).toLocaleString("vi-VN")}
            </div>
        </div>

        <div class="grid">
            <div class="card">
                <div class="card-label">Chi Ph\xED AI Token Th\u1EF1c T\u1EBF</div>
                <div class="card-value">$${t.totalCostUSD.toFixed(2)}</div>
                <div class="card-sub">${this.formatNumber(t.totalCostVND)} \u20AB</div>
            </div>
            <div class="card highlight">
                <div class="card-label">\u0110\u1ECBnh Gi\xE1 \u0110\u1EC1 Xu\u1EA5t (Valuation)</div>
                <div class="card-value">$${t.valuation.recommendedValuationUSD.toFixed(2)}</div>
                <div class="card-sub">${this.formatNumber(t.valuation.recommendedValuationVND)} \u20AB (x${t.valuation.markupMultiplier} Markup)</div>
            </div>
            <div class="card">
                <div class="card-label">Dev Truy\u1EC1n Th\u1ED1ng T\u01B0\u01A1ng \u0110\u01B0\u01A1ng</div>
                <div class="card-value">$${t.valuation.humanCostEquivalentUSD}</div>
                <div class="card-sub">${t.valuation.humanHoursEquivalent}h @ $${t.valuation.humanHourlyRate}/h</div>
            </div>
            <div class="card">
                <div class="card-label">T\u1ED5ng Tokens Ti\xEAu Th\u1EE5</div>
                <div class="card-value">${this.formatNumber(t.totalTokens)}</div>
                <div class="card-sub">Active Time: ${this.formatDuration(t.activeDurationSeconds)}</div>
            </div>
        </div>

        <h2>\u{1F916} Ph\xE2n B\u1ED5 Theo AI Models</h2>
        <table>
            <thead>
                <tr>
                    <th>AI Model</th>
                    <th>Nh\xE0 Cung C\u1EA5p</th>
                    <th>Input Tokens</th>
                    <th>Output Tokens</th>
                    <th>Thinking Tokens</th>
                    <th>Chi Ph\xED (USD)</th>
                    <th>T\u1EF7 L\u1EC7</th>
                </tr>
            </thead>
            <tbody>
                ${t.models.map(s=>`
                <tr>
                    <td><strong>${s.displayName}</strong></td>
                    <td><span class="badge ${s.provider.toLowerCase()}">${s.provider}</span></td>
                    <td>${this.formatNumber(s.inputTokens)}</td>
                    <td>${this.formatNumber(s.outputTokens)}</td>
                    <td>${this.formatNumber(s.thinkingTokens)}</td>
                    <td>$${s.costUSD.toFixed(4)}</td>
                    <td><strong>${s.percentageOfCost}%</strong></td>
                </tr>
                `).join("")}
            </tbody>
        </table>

        <h2>\u{1F4DD} Chi Ti\u1EBFt C\xE1c Phi\xEAn L\xE0m Vi\u1EC7c (Sessions)</h2>
        <table>
            <thead>
                <tr>
                    <th>Th\u1EDDi Gian</th>
                    <th>Y\xEAu C\u1EA7u / Prompt</th>
                    <th>Models</th>
                    <th>Tokens</th>
                    <th>Th\u1EDDi L\u01B0\u1EE3ng</th>
                    <th>Chi Ph\xED (USD)</th>
                </tr>
            </thead>
            <tbody>
                ${t.sessions.slice(0,100).map(s=>`
                <tr>
                    <td>${new Date(s.startTime).toLocaleString("vi-VN")}</td>
                    <td>${s.title}</td>
                    <td>${s.modelsUsed.join(", ")}</td>
                    <td>${this.formatNumber(s.totalTokens)}</td>
                    <td>${this.formatDuration(s.activeTimeSeconds)}</td>
                    <td>$${s.costUSD.toFixed(4)}</td>
                </tr>
                `).join("")}
            </tbody>
        </table>
    </div>
</body>
</html>`}static generateJson(t){return JSON.stringify(t,null,2)}};var _=w(require("vscode"));var Z=class{statusBarItem;constructor(){this.statusBarItem=_.window.createStatusBarItem(_.StatusBarAlignment.Right,95),this.statusBarItem.command="antigravity-cost.menu",this.statusBarItem.text="$(sparkle) AI Cost: Scanning...",this.statusBarItem.tooltip="\u0110ang qu\xE9t d\u1EEF li\u1EC7u chi ph\xED d\u1EF1 \xE1n...",this.statusBarItem.show()}update(t,e){if(!t||t.totalSessions===0){this.statusBarItem.text="$(sparkle) AI Cost: $0.00",this.statusBarItem.tooltip=new _.MarkdownString("Ch\u01B0a ph\xE1t hi\u1EC7n phi\xEAn l\xE0m vi\u1EC7c AI n\xE0o trong workspace n\xE0y.");return}let s=e.currency==="VND"?`${v.formatNumber(t.totalCostVND)} \u20AB`:`$${t.totalCostUSD.toFixed(2)}`,p=t.totalTokens>1e6?`${(t.totalTokens/1e6).toFixed(1)}M`:`${Math.round(t.totalTokens/1e3)}k`,d=v.formatDuration(t.activeDurationSeconds);this.statusBarItem.text=`$(sparkle) ${s} (${p} tok)`;let o=new _.MarkdownString;if(o.isTrusted=!0,o.appendMarkdown(`### \u{1F4CA} **Antigravity AI Cost & Valuation**

`),o.appendMarkdown(`- **Chi ph\xED AI Token:** \`$${t.totalCostUSD.toFixed(4)}\` (~${v.formatNumber(t.totalCostVND)} \u20AB)
`),o.appendMarkdown(`- **\u0110\u1ECBnh gi\xE1 \u0111\u1EC1 xu\u1EA5t:** \`$${t.valuation.recommendedValuationUSD.toFixed(2)}\` (~${v.formatNumber(t.valuation.recommendedValuationVND)} \u20AB)
`),o.appendMarkdown(`- **T\u1ED5ng Tokens:** \`${v.formatNumber(t.totalTokens)}\` tokens
`),o.appendMarkdown(`- **Active Coding Time:** \`${d}\` (${t.totalSessions} sessions)

`),t.models.length>0){o.appendMarkdown(`**Models S\u1EED D\u1EE5ng:**
`);for(let a of t.models)o.appendMarkdown(`- **${a.displayName}:** ${a.percentageOfCost}% ($${a.costUSD.toFixed(3)})
`)}o.appendMarkdown(`
*Nh\u1EA5p \u0111\u1EC3 m\u1EDF menu qu\u1EA3n l\xFD & xu\u1EA5t b\xE1o c\xE1o.*`),this.statusBarItem.tooltip=o}dispose(){this.statusBarItem.dispose()}};var B=w(require("vscode"));var tt=class{constructor(t,e,r,s,p){this._extensionUri=t;this._currentConfig=e,this._onRefreshCallback=r,this._onExportCallback=s,this._onUpdateConfigCallback=p}_view;_currentReport=null;_currentConfig;_onRefreshCallback;_onExportCallback;_onUpdateConfigCallback;resolveWebviewView(t,e,r){this._view=t,t.webview.options={enableScripts:!0,localResourceRoots:[this._extensionUri]},t.webview.html=this._getHtmlForWebview(t.webview),t.webview.onDidReceiveMessage(async s=>{switch(s.type){case"refresh":await this._onRefreshCallback(s.workspacePath,s.dateFilter);break;case"exportReport":await this._onExportCallback(s.format||"markdown");break;case"updateConfig":await this._onUpdateConfigCallback(s.config);break;case"copySummary":{if(this._currentReport){let p=this._currentConfig.currency==="VND",d=p?`${v.formatNumber(this._currentReport.totalCostVND)} \u20AB`:`$${this._currentReport.totalCostUSD.toFixed(3)}`,o=p?`${v.formatNumber(this._currentReport.valuation.recommendedValuationVND)} \u20AB`:`$${this._currentReport.valuation.recommendedValuationUSD.toFixed(2)}`,a=`\u{1F4CA} [Antigravity AI Cost] D\u1EF1 \xE1n: ${this._currentReport.projectName}
- Chi ph\xED Token AI: ${d}
- \u0110\u1ECBnh gi\xE1 \u0111\u1EC1 xu\u1EA5t: ${o}
- T\u1ED5ng Tokens: ${v.formatNumber(this._currentReport.totalTokens)}
- Active Time: ${v.formatDuration(this._currentReport.activeDurationSeconds)} (${this._currentReport.totalSessions} sessions)`;await B.env.clipboard.writeText(a),B.window.showInformationMessage("\u0110\xE3 sao ch\xE9p t\xF3m t\u1EAFt \u0111\u1ECBnh gi\xE1 v\xE0o Clipboard!")}break}case"openSettings":B.commands.executeCommand("workbench.action.openSettings","antigravityCost");break}}),this._currentReport&&this.updateReport(this._currentReport,this._currentConfig)}updateReport(t,e){this._currentReport=t,this._currentConfig=e,this._view&&this._view.webview.postMessage({type:"update",report:t,config:e})}_getHtmlForWebview(t){return`<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Antigravity Project AI Cost</title>
    <style>
        :root {
            --bg-color: var(--vscode-sideBar-background, #18181b);
            --card-bg: var(--vscode-editor-background, #27272a);
            --card-border: var(--vscode-widget-border, #3f3f46);
            --text-color: var(--vscode-foreground, #f4f4f5);
            --text-muted: var(--vscode-descriptionForeground, #a1a1aa);
            --primary: #38bdf8;
            --success: #10b981;
            --warning: #f59e0b;
            --danger: #ef4444;
            --purple: #a855f7;
        }

        body {
            font-family: var(--vscode-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
            font-size: var(--vscode-font-size, 13px);
            color: var(--text-color);
            background-color: var(--bg-color);
            padding: 12px;
            margin: 0;
            line-height: 1.5;
            box-sizing: border-box;
        }

        * { box-sizing: border-box; }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
            padding-bottom: 8px;
            border-bottom: 1px solid var(--card-border);
        }

        .header-title {
            font-weight: 700;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .header-actions {
            display: flex;
            gap: 6px;
        }

        .btn-icon {
            background: transparent;
            border: 1px solid var(--card-border);
            color: var(--text-color);
            padding: 4px 8px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            display: flex;
            align-items: center;
            gap: 4px;
        }
        .btn-icon:hover {
            background: var(--card-bg);
            border-color: var(--primary);
        }

        /* Project Switcher Dropdown */
        .project-select-box {
            margin-bottom: 10px;
        }
        .select-full {
            width: 100%;
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            color: var(--text-color);
            padding: 6px 8px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 600;
        }

        /* Filter Pills */
        .filter-pills {
            display: flex;
            gap: 4px;
            margin-bottom: 12px;
        }
        .pill {
            flex: 1;
            text-align: center;
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            color: var(--text-muted);
            padding: 4px 0;
            border-radius: 4px;
            font-size: 11px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.2s ease;
        }
        .pill.active {
            background: var(--primary);
            color: #0f172a;
            border-color: var(--primary);
            font-weight: 700;
        }

        /* Valuation Hero Card */
        .hero-card {
            background: linear-gradient(145deg, rgba(56, 189, 248, 0.12), rgba(16, 185, 129, 0.08));
            border: 1px solid rgba(56, 189, 248, 0.3);
            border-radius: 8px;
            padding: 14px;
            margin-bottom: 12px;
            text-align: center;
            position: relative;
        }

        .hero-label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: var(--primary);
            font-weight: 600;
        }

        .hero-value {
            font-size: 24px;
            font-weight: 800;
            margin: 4px 0;
            color: #fff;
        }

        .hero-sub {
            font-size: 12px;
            color: var(--text-muted);
        }

        .btn-copy-float {
            position: absolute;
            top: 8px;
            right: 8px;
            background: rgba(255,255,255,0.06);
            border: 1px solid var(--card-border);
            color: var(--text-muted);
            border-radius: 4px;
            padding: 2px 6px;
            font-size: 11px;
            cursor: pointer;
        }
        .btn-copy-float:hover {
            background: var(--primary);
            color: #000;
        }

        /* Stats Grid */
        .grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            margin-bottom: 12px;
        }

        .stat-card {
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: 6px;
            padding: 10px;
        }

        .stat-label {
            font-size: 11px;
            color: var(--text-muted);
            margin-bottom: 4px;
        }

        .stat-val {
            font-size: 15px;
            font-weight: 700;
            color: var(--text-color);
        }

        .stat-sub {
            font-size: 11px;
            color: var(--text-muted);
            margin-top: 2px;
        }

        /* Section Titles & Tabs */
        .section-title {
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin: 14px 0 8px 0;
            color: var(--text-muted);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .tab-bar {
            display: flex;
            border-bottom: 1px solid var(--card-border);
            margin-bottom: 10px;
        }
        .tab-item {
            padding: 6px 10px;
            font-size: 11px;
            font-weight: 600;
            color: var(--text-muted);
            cursor: pointer;
            border-bottom: 2px solid transparent;
        }
        .tab-item.active {
            color: var(--primary);
            border-bottom-color: var(--primary);
        }

        /* Model Distribution Bars */
        .model-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-bottom: 14px;
        }

        .model-item {
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: 6px;
            padding: 8px 10px;
        }

        .model-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
            margin-bottom: 6px;
        }

        .model-name {
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .model-badge {
            font-size: 9px;
            padding: 2px 4px;
            border-radius: 3px;
            font-weight: 700;
            text-transform: uppercase;
        }
        .badge-google { background: rgba(59, 130, 246, 0.2); color: #60a5fa; }
        .badge-anthropic { background: rgba(245, 158, 11, 0.2); color: #fbbf24; }
        .badge-openai { background: rgba(16, 185, 129, 0.2); color: #34d399; }
        .badge-other { background: rgba(168, 85, 247, 0.2); color: #c084fc; }

        .progress-bar {
            height: 6px;
            background: rgba(255, 255, 255, 0.08);
            border-radius: 3px;
            overflow: hidden;
            position: relative;
        }

        .progress-fill {
            height: 100%;
            border-radius: 3px;
            transition: width 0.3s ease;
        }

        .fill-google { background: #3b82f6; }
        .fill-anthropic { background: #f59e0b; }
        .fill-openai { background: #10b981; }
        .fill-other { background: #a855f7; }

        /* Configuration / Controls Form */
        .controls-card {
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: 6px;
            padding: 10px;
            margin-bottom: 14px;
        }

        .form-group {
            margin-bottom: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .form-group:last-child { margin-bottom: 0; }

        .form-label {
            font-size: 11px;
            color: var(--text-muted);
        }

        .form-input, .form-select {
            background: var(--bg-color);
            border: 1px solid var(--card-border);
            color: var(--text-color);
            padding: 4px 6px;
            border-radius: 4px;
            font-size: 12px;
            width: 100px;
            text-align: right;
        }

        /* Buttons Action Bar */
        .action-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6px;
            margin-top: 14px;
        }

        .btn-primary {
            background: var(--primary);
            color: #0f172a;
            border: none;
            padding: 8px 12px;
            border-radius: 4px;
            font-weight: 600;
            font-size: 12px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 4px;
        }
        .btn-primary:hover { opacity: 0.9; }

        .btn-secondary {
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            color: var(--text-color);
            padding: 8px 12px;
            border-radius: 4px;
            font-weight: 500;
            font-size: 12px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 4px;
        }
        .btn-secondary:hover { border-color: var(--primary); }

        /* File List & Sessions List */
        .list-item {
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: 4px;
            padding: 8px;
            margin-bottom: 6px;
            font-size: 11px;
        }
        .list-title {
            font-weight: 600;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 2px;
        }
        .list-meta {
            display: flex;
            justify-content: space-between;
            color: var(--text-muted);
        }

        .empty-state {
            text-align: center;
            padding: 24px 12px;
            color: var(--text-muted);
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="header-title">
            <span>\u2728 AI Project Cost</span>
        </div>
        <div class="header-actions">
            <button class="btn-icon" id="btnRefresh" title="L\xE0m m\u1EDBi d\u1EEF li\u1EC7u">\u{1F504}</button>
            <button class="btn-icon" id="btnSettings" title="C\xE0i \u0111\u1EB7t">\u2699\uFE0F</button>
        </div>
    </div>

    <!-- Project Switcher -->
    <div class="project-select-box">
        <select class="select-full" id="selectProject">
            <option value="CURRENT">\u0110ang t\u1EA3i danh s\xE1ch d\u1EF1 \xE1n...</option>
        </select>
    </div>

    <!-- Filter Pills -->
    <div class="filter-pills">
        <div class="pill active" data-filter="all">T\u1EA5t c\u1EA3</div>
        <div class="pill" data-filter="today">H\xF4m nay</div>
        <div class="pill" data-filter="7d">7 ng\xE0y</div>
        <div class="pill" data-filter="30d">30 ng\xE0y</div>
    </div>

    <!-- Hero Card: Valuation -->
    <div class="hero-card">
        <button class="btn-copy-float" id="btnCopySummary" title="Sao ch\xE9p t\xF3m t\u1EAFt">\u{1F4CB} Copy</button>
        <div class="hero-label">\u0110\u1ECBnh Gi\xE1 Ho\xE0n Th\xE0nh \u0110\u1EC1 Xu\u1EA5t</div>
        <div class="hero-value" id="valRecommended">$0.00</div>
        <div class="hero-sub" id="valSub">Markup x2.5 + C\xF4ng v\u1EADn h\xE0nh AI</div>
    </div>

    <!-- Stats Grid -->
    <div class="grid-2">
        <div class="stat-card">
            <div class="stat-label">Chi Ph\xED AI Token</div>
            <div class="stat-val" id="statApiCost">$0.00</div>
            <div class="stat-sub" id="statApiTokens">0 tokens</div>
        </div>
        <div class="stat-card">
            <div class="stat-label">Dev Truy\u1EC1n Th\u1ED1ng</div>
            <div class="stat-val" id="statHumanCost">$0</div>
            <div class="stat-sub" id="statHumanHours">0h @ $25/h</div>
        </div>
        <div class="stat-card">
            <div class="stat-label">Active Coding Time</div>
            <div class="stat-val" id="statActiveTime">0s</div>
            <div class="stat-sub" id="statSessions">0 sessions</div>
        </div>
        <div class="stat-card">
            <div class="stat-label">Ti\u1EBFt Ki\u1EC7m Ng\xE2n S\xE1ch</div>
            <div class="stat-val" style="color: var(--success);" id="statSavings">$0</div>
            <div class="stat-sub" id="statSavingsPct">0% ti\u1EBFt ki\u1EC7m</div>
        </div>
    </div>

    <!-- Pricing / Valuation Settings -->
    <div class="section-title">
        <span>\u2699\uFE0F Tham S\u1ED1 \u0110\u1ECBnh Gi\xE1</span>
    </div>
    <div class="controls-card">
        <div class="form-group">
            <span class="form-label">Ti\u1EC1n t\u1EC7</span>
            <select class="form-select" id="selectCurrency">
                <option value="USD">USD ($)</option>
                <option value="VND">VND (\u20AB)</option>
            </select>
        </div>
        <div class="form-group">
            <span class="form-label">Markup Multiplier</span>
            <input class="form-input" type="number" step="0.1" min="1" max="10" id="inputMarkup" value="2.5" />
        </div>
        <div class="form-group">
            <span class="form-label">Dev Hourly Rate ($)</span>
            <input class="form-input" type="number" step="1" min="5" max="200" id="inputHourlyRate" value="25" />
        </div>
    </div>

    <!-- Models Breakdown -->
    <div class="section-title">
        <span>\u{1F916} T\u1EF7 L\u1EC7 AI Models</span>
    </div>
    <div class="model-list" id="modelList">
        <div class="empty-state">\u0110ang t\u1EA3i d\u1EEF li\u1EC7u...</div>
    </div>

    <!-- Actions -->
    <div class="action-grid">
        <button class="btn-primary" id="btnExportMd">\u{1F4C4} Xu\u1EA5t Markdown</button>
        <button class="btn-secondary" id="btnExportHtml">\u{1F310} Xu\u1EA5t HTML / In</button>
    </div>

    <!-- Tabs for Sessions vs Top Files -->
    <div style="margin-top: 18px;">
        <div class="tab-bar">
            <div class="tab-item active" id="tabSessionsBtn">\u{1F4DD} Phi\xEAn G\u1EA7n \u0110\xE2y (<span id="sessionCount">0</span>)</div>
            <div class="tab-item" id="tabFilesBtn">\u{1F4C2} File Chi Ph\xED Cao (<span id="fileCount">0</span>)</div>
        </div>
        <div id="tabSessionsContent">
            <div id="sessionList"></div>
        </div>
        <div id="tabFilesContent" style="display: none;">
            <div id="fileList"></div>
        </div>
    </div>

    <script>
        const vscode = acquireVsCodeApi();
        let currentFilter = 'all';
        let currentSelectedWs = '';

        function formatNumber(num) {
            return new Intl.NumberFormat('en-US').format(Math.round(num));
        }

        function formatDuration(sec) {
            if (!sec || sec <= 0) return '0s';
            const h = Math.floor(sec / 3600);
            const m = Math.floor((sec % 3600) / 60);
            const s = Math.floor(sec % 60);
            if (h > 0) return h + 'h ' + m + 'm';
            if (m > 0) return m + 'm ' + s + 's';
            return s + 's';
        }

        window.addEventListener('message', event => {
            const message = event.data;
            if (message.type === 'update') {
                render(message.report, message.config);
            }
        });

        function render(report, config) {
            if (!report) return;

            const isVnd = config.currency === 'VND';
            document.getElementById('selectCurrency').value = config.currency;
            document.getElementById('inputMarkup').value = config.markupMultiplier;
            document.getElementById('inputHourlyRate').value = config.humanHourlyRate;

            // Project Switcher populate
            const selectProject = document.getElementById('selectProject');
            if (report.allProjects && report.allProjects.length > 0) {
                let optionsHtml = '<option value="CURRENT">\u{1F4CD} D\u1EF1 \xE1n hi\u1EC7n t\u1EA1i (' + report.projectName + ')</option>';
                optionsHtml += '<option value="ALL">\u{1F310} T\u1EA5t C\u1EA3 D\u1EF1 \xC1n Trong M\xE1y</option>';
                for (const p of report.allProjects) {
                    const pCost = isVnd ? formatNumber(p.totalCostVND) + ' \u20AB' : '$' + p.totalCostUSD.toFixed(2);
                    optionsHtml += '<option value="' + p.workspacePath + '">' + p.projectName + ' (' + pCost + ')</option>';
                }
                selectProject.innerHTML = optionsHtml;
                if (currentSelectedWs) {
                    selectProject.value = currentSelectedWs;
                }
            }

            // Filter pills active update
            document.querySelectorAll('.pill').forEach(p => {
                if (p.getAttribute('data-filter') === report.dateFilter) {
                    p.classList.add('active');
                } else {
                    p.classList.remove('active');
                }
            });

            // Hero Valuation
            const recVal = isVnd
                ? formatNumber(report.valuation.recommendedValuationVND) + ' \u20AB'
                : '$' + report.valuation.recommendedValuationUSD.toFixed(2);
            document.getElementById('valRecommended').innerText = recVal;
            document.getElementById('valSub').innerText = 'Markup x' + report.valuation.markupMultiplier + ' + C\xF4ng v\u1EADn h\xE0nh AI';

            // Stats
            document.getElementById('statApiCost').innerText = isVnd
                ? formatNumber(report.totalCostVND) + ' \u20AB'
                : '$' + report.totalCostUSD.toFixed(3);
            document.getElementById('statApiTokens').innerText = formatNumber(report.totalTokens) + ' tokens';

            document.getElementById('statHumanCost').innerText = isVnd
                ? formatNumber(report.valuation.humanCostEquivalentVND) + ' \u20AB'
                : '$' + report.valuation.humanCostEquivalentUSD;
            document.getElementById('statHumanHours').innerText = report.valuation.humanHoursEquivalent + 'h @ $' + report.valuation.humanHourlyRate + '/h';

            document.getElementById('statActiveTime').innerText = formatDuration(report.activeDurationSeconds);
            document.getElementById('statSessions').innerText = report.totalSessions + ' sessions (' + report.totalTurns + ' turns)';

            const savingsVal = isVnd
                ? formatNumber(report.valuation.savingsVND) + ' \u20AB'
                : '$' + report.valuation.savingsUSD;
            const savingsPct = report.valuation.humanCostEquivalentUSD > 0
                ? Math.round((report.valuation.savingsUSD / report.valuation.humanCostEquivalentUSD) * 100)
                : 0;
            document.getElementById('statSavings').innerText = savingsVal;
            document.getElementById('statSavingsPct').innerText = savingsPct + '% ti\u1EBFt ki\u1EC7m';

            // Render Models
            const modelListEl = document.getElementById('modelList');
            if (!report.models || report.models.length === 0) {
                modelListEl.innerHTML = '<div class="empty-state">Ch\u01B0a ph\xE1t hi\u1EC7n d\u1EEF li\u1EC7u model trong b\u1ED9 l\u1ECDc n\xE0y.</div>';
            } else {
                modelListEl.innerHTML = report.models.map(m => {
                    const provClass = m.provider ? m.provider.toLowerCase() : 'other';
                    const costDisplay = isVnd ? formatNumber(m.costVND) + ' \u20AB' : '$' + m.costUSD.toFixed(3);
                    return \`
                    <div class="model-item">
                        <div class="model-header">
                            <div class="model-name">
                                <span>\${m.displayName}</span>
                                <span class="model-badge badge-\${provClass}">\${m.provider}</span>
                            </div>
                            <div><strong>\${m.percentageOfCost}%</strong> (\${costDisplay})</div>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill fill-\${provClass}" style="width: \${m.percentageOfCost}%"></div>
                        </div>
                    </div>
                    \`;
                }).join('');
            }

            // Render Sessions
            const sessionListEl = document.getElementById('sessionList');
            document.getElementById('sessionCount').innerText = report.sessions ? report.sessions.length : 0;
            if (!report.sessions || report.sessions.length === 0) {
                sessionListEl.innerHTML = '<div class="empty-state">Ch\u01B0a c\xF3 session n\xE0o.</div>';
            } else {
                sessionListEl.innerHTML = report.sessions.slice(0, 15).map(s => {
                    const costDisplay = isVnd ? formatNumber(s.costVND) + ' \u20AB' : '$' + s.costUSD.toFixed(3);
                    return \`
                    <div class="list-item">
                        <div class="list-title" title="\${s.title}">\${s.title}</div>
                        <div class="list-meta">
                            <span>\${s.modelsUsed.join(', ')} \u2022 \${formatDuration(s.activeTimeSeconds)}</span>
                            <strong>\${costDisplay}</strong>
                        </div>
                    </div>
                    \`;
                }).join('');
            }

            // Render Top Files
            const fileListEl = document.getElementById('fileList');
            document.getElementById('fileCount').innerText = report.topFiles ? report.topFiles.length : 0;
            if (!report.topFiles || report.topFiles.length === 0) {
                fileListEl.innerHTML = '<div class="empty-state">Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u file.</div>';
            } else {
                fileListEl.innerHTML = report.topFiles.slice(0, 15).map(f => {
                    const costDisplay = isVnd ? formatNumber(Math.round(f.estimatedCostUSD * config.vndExchangeRate)) + ' \u20AB' : '$' + f.estimatedCostUSD.toFixed(3);
                    return \`
                    <div class="list-item">
                        <div class="list-title" title="\${f.filePath}">\${f.fileName}</div>
                        <div class="list-meta">
                            <span>\${f.touchesCount} l\u1EA7n s\u1EEDa \u2022 ~\${formatNumber(f.estimatedTokens)} tok</span>
                            <strong>\${costDisplay}</strong>
                        </div>
                    </div>
                    \`;
                }).join('');
            }
        }

        // Tabs switcher
        document.getElementById('tabSessionsBtn').addEventListener('click', () => {
            document.getElementById('tabSessionsBtn').classList.add('active');
            document.getElementById('tabFilesBtn').classList.remove('active');
            document.getElementById('tabSessionsContent').style.display = 'block';
            document.getElementById('tabFilesContent').style.display = 'none';
        });

        document.getElementById('tabFilesBtn').addEventListener('click', () => {
            document.getElementById('tabFilesBtn').classList.add('active');
            document.getElementById('tabSessionsBtn').classList.remove('active');
            document.getElementById('tabFilesContent').style.display = 'block';
            document.getElementById('tabSessionsContent').style.display = 'none';
        });

        // Filter Pills Click
        document.querySelectorAll('.pill').forEach(pill => {
            pill.addEventListener('click', () => {
                currentFilter = pill.getAttribute('data-filter');
                document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                vscode.postMessage({
                    type: 'refresh',
                    workspacePath: currentSelectedWs,
                    dateFilter: currentFilter
                });
            });
        });

        // Project Dropdown Change
        document.getElementById('selectProject').addEventListener('change', (e) => {
            currentSelectedWs = e.target.value;
            vscode.postMessage({
                type: 'refresh',
                workspacePath: currentSelectedWs,
                dateFilter: currentFilter
            });
        });

        // Copy Summary
        document.getElementById('btnCopySummary').addEventListener('click', () => {
            vscode.postMessage({ type: 'copySummary' });
        });

        // Refresh & Settings
        document.getElementById('btnRefresh').addEventListener('click', () => {
            vscode.postMessage({
                type: 'refresh',
                workspacePath: currentSelectedWs,
                dateFilter: currentFilter
            });
        });

        document.getElementById('btnSettings').addEventListener('click', () => {
            vscode.postMessage({ type: 'openSettings' });
        });

        document.getElementById('btnExportMd').addEventListener('click', () => {
            vscode.postMessage({ type: 'exportReport', format: 'markdown' });
        });

        document.getElementById('btnExportHtml').addEventListener('click', () => {
            vscode.postMessage({ type: 'exportReport', format: 'html' });
        });

        document.getElementById('selectCurrency').addEventListener('change', (e) => {
            vscode.postMessage({
                type: 'updateConfig',
                config: { currency: e.target.value }
            });
        });

        document.getElementById('inputMarkup').addEventListener('change', (e) => {
            const val = parseFloat(e.target.value);
            if (!isNaN(val) && val > 0) {
                vscode.postMessage({
                    type: 'updateConfig',
                    config: { markupMultiplier: val }
                });
            }
        });

        document.getElementById('inputHourlyRate').addEventListener('change', (e) => {
            const val = parseFloat(e.target.value);
            if (!isNaN(val) && val > 0) {
                vscode.postMessage({
                    type: 'updateConfig',
                    config: { humanHourlyRate: val }
                });
            }
        });
    </script>
</body>
</html>`}};var J,st,rt,P=null,y,et=null,it=null,X,pt="all";function mt(){let l=g.workspace.getConfiguration("antigravityCost");return{currency:l.get("currency","USD"),vndExchangeRate:l.get("vndExchangeRate",25500),markupMultiplier:l.get("markupMultiplier",2.5),humanHourlyRate:l.get("humanHourlyRate",25),customPricing:l.get("customPricing",{})}}function ht(){if(X&&X!=="CURRENT")return X==="ALL"?void 0:X;let l=g.workspace.workspaceFolders;if(l&&l.length>0)return l[0].uri.fsPath}async function E(l=!1,t,e){t!==void 0&&(X=t),e!==void 0&&(pt=e);let r=ht();P=await J.scanWorkspace(r,pt),st.update(P,y),rt.updateReport(P,y),l&&P&&g.window.showInformationMessage(`Antigravity Cost [${P.projectName}]: \u0110\xE3 qu\xE9t ${P.totalSessions} sessions (${v.formatNumber(P.totalTokens)} tokens, ~$${P.totalCostUSD.toFixed(3)})`)}async function q(l="markdown"){if(!P||P.totalSessions===0){g.window.showWarningMessage("Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u chi ph\xED \u0111\u1EC3 xu\u1EA5t b\xE1o c\xE1o.");return}let e=ht()||g.Uri.file(process.cwd()).fsPath,r="PROJECT_VALUATION_REPORT.md",s="";l==="html"?(r="PROJECT_VALUATION_REPORT.html",s=v.generateHtml(P,y)):l==="json"?(r="project_cost_data.json",s=v.generateJson(P)):s=v.generateMarkdown(P,y);let p=at.join(e,r);try{O.writeFileSync(p,s,"utf8");let d="M\u1EDF File";if(await g.window.showInformationMessage(`\u0110\xE3 xu\u1EA5t b\xE1o c\xE1o \u0111\u1ECBnh gi\xE1 th\xE0nh c\xF4ng: ${r}`,d)===d){let a=await g.workspace.openTextDocument(g.Uri.file(p));await g.window.showTextDocument(a)}}catch(d){g.window.showErrorMessage(`L\u1ED7i khi xu\u1EA5t file b\xE1o c\xE1o: ${d?.message||d}`)}}function St(){try{let l=at.join(gt.homedir(),".gemini","antigravity-ide","brain");if(O.existsSync(l)){let t=null;it=O.watch(l,{recursive:!0},(e,r)=>{r&&r.endsWith("transcript.jsonl")&&(t&&clearTimeout(t),t=setTimeout(()=>{E()},1500))})}}catch{}}function Ct(l){y=mt(),J=new Q(y),st=new Z,rt=new tt(l.extensionUri,y,async(t,e)=>{await E(!0,t,e)},async t=>{await q(t)},async t=>{y={...y,...t},J.updateConfig(y),P&&await E()}),l.subscriptions.push(g.window.registerWebviewViewProvider("antigravity-cost.sidebar",rt)),l.subscriptions.push(st),l.subscriptions.push(g.commands.registerCommand("antigravity-cost.refresh",async()=>{await E(!0)})),l.subscriptions.push(g.commands.registerCommand("antigravity-cost.exportReport",async()=>{await q("markdown")})),l.subscriptions.push(g.commands.registerCommand("antigravity-cost.exportHtmlReport",async()=>{await q("html")})),l.subscriptions.push(g.commands.registerCommand("antigravity-cost.openDashboard",()=>{g.commands.executeCommand("antigravity-cost.sidebar.focus")})),l.subscriptions.push(g.commands.registerCommand("antigravity-cost.menu",async()=>{let t=[{id:"dashboard",label:"$(dashboard) M\u1EDF Dashboard \u0110\u1ECBnh Gi\xE1",description:"Xem chi ti\u1EBFt token, model & files"},{id:"refresh",label:"$(refresh) Qu\xE9t l\u1EA1i d\u1EEF li\u1EC7u chi ph\xED",description:"C\u1EADp nh\u1EADt l\u1EA1i to\xE0n b\u1ED9 sessions trong workspace"},{id:"export_md",label:"$(file-text) Xu\u1EA5t B\xE1o C\xE1o Markdown",description:"T\u1EA1o file PROJECT_VALUATION_REPORT.md"},{id:"export_html",label:"$(file-code) Xu\u1EA5t B\xE1o C\xE1o HTML / PDF",description:"T\u1EA1o file PROJECT_VALUATION_REPORT.html \u0111\u1EC3 in"},{id:"toggle_currency",label:"$(symbol-unit) \u0110\u1ED5i Ti\u1EC1n T\u1EC7 (USD / VND)",description:`Hi\u1EC7n t\u1EA1i: ${y.currency}`},{id:"settings",label:"$(gear) C\xE0i \u0111\u1EB7t \u0110\u1ECBnh Gi\xE1 & T\u1EF7 Gi\xE1",description:"Ch\u1EC9nh Markup, T\u1EF7 gi\xE1 VND, Dev rate"}],e=await g.window.showQuickPick(t,{placeHolder:"Antigravity AI Cost & Project Valuation"});if(e)switch(e.id){case"dashboard":g.commands.executeCommand("antigravity-cost.sidebar.focus");break;case"refresh":await E(!0);break;case"export_md":await q("markdown");break;case"export_html":await q("html");break;case"toggle_currency":{let r=y.currency==="USD"?"VND":"USD";y.currency=r,J.updateConfig(y),await E(),g.window.showInformationMessage(`\u0110\xE3 \u0111\u1ED5i \u0111\u01A1n v\u1ECB ti\u1EC1n t\u1EC7 sang: ${r}`);break}case"settings":g.commands.executeCommand("workbench.action.openSettings","antigravityCost");break}})),l.subscriptions.push(g.workspace.onDidChangeConfiguration(async t=>{t.affectsConfiguration("antigravityCost")&&(y=mt(),J.updateConfig(y),await E())})),l.subscriptions.push(g.workspace.onDidChangeWorkspaceFolders(async()=>{await E()})),St(),setTimeout(()=>{E()},1e3),et=setInterval(()=>{E()},6e4)}function Mt(){et&&(clearInterval(et),et=null),it&&(it.close(),it=null)}0&&(module.exports={activate,deactivate});
