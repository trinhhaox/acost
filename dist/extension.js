"use strict";var Re=Object.create;var ie=Object.defineProperty;var Ue=Object.getOwnPropertyDescriptor;var Le=Object.getOwnPropertyNames;var je=Object.getPrototypeOf,Ve=Object.prototype.hasOwnProperty;var Fe=(a,e)=>{for(var t in e)ie(a,t,{get:e[t],enumerable:!0})},ke=(a,e,t,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Le(e))!Ve.call(a,s)&&s!==t&&ie(a,s,{get:()=>e[s],enumerable:!(o=Ue(e,s))||o.enumerable});return a};var E=(a,e,t)=>(t=a!=null?Re(je(a)):{},ke(e||!a||!a.__esModule?ie(t,"default",{value:a,enumerable:!0}):t,a)),Be=a=>ke(ie({},"__esModule",{value:!0}),a);var Ke={};Fe(Ke,{activate:()=>ze,deactivate:()=>Je});module.exports=Be(Ke);var b=E(require("vscode")),z=E(require("fs")),ve=E(require("path")),ye=E(require("os"));var j=E(require("fs")),N=E(require("path")),be=E(require("os"));var _e={"gemini-3.7-flash":{displayName:"Gemini 3.7 Flash",provider:"Google",inputPricePerMillion:.15,outputPricePerMillion:.6,cacheReadPricePerMillion:.0375},"gemini-3.6-flash":{displayName:"Gemini 3.6 Flash",provider:"Google",inputPricePerMillion:.15,outputPricePerMillion:.6,cacheReadPricePerMillion:.0375},"gemini-3.5-flash":{displayName:"Gemini 3.5 Flash",provider:"Google",inputPricePerMillion:.1,outputPricePerMillion:.4,cacheReadPricePerMillion:.025},"gemini-3.1-pro":{displayName:"Gemini 3.1 Pro",provider:"Google",inputPricePerMillion:1.25,outputPricePerMillion:5,cacheReadPricePerMillion:.3125},"gemini-2.5-pro":{displayName:"Gemini 2.5 Pro",provider:"Google",inputPricePerMillion:1.25,outputPricePerMillion:5,cacheReadPricePerMillion:.3125},"gemini-2.5-flash":{displayName:"Gemini 2.5 Flash",provider:"Google",inputPricePerMillion:.075,outputPricePerMillion:.3,cacheReadPricePerMillion:.01875},"gemini-1.5-pro":{displayName:"Gemini 1.5 Pro",provider:"Google",inputPricePerMillion:1.25,outputPricePerMillion:5,cacheReadPricePerMillion:.3125},"gemini-1.5-flash":{displayName:"Gemini 1.5 Flash",provider:"Google",inputPricePerMillion:.075,outputPricePerMillion:.3,cacheReadPricePerMillion:.01875},"claude-opus-5":{displayName:"Claude Opus 5",provider:"Anthropic",inputPricePerMillion:15,outputPricePerMillion:75,cacheReadPricePerMillion:1.5},"claude-opus-4.8":{displayName:"Claude Opus 4.8",provider:"Anthropic",inputPricePerMillion:15,outputPricePerMillion:75,cacheReadPricePerMillion:1.5},"claude-opus-4.7":{displayName:"Claude Opus 4.7",provider:"Anthropic",inputPricePerMillion:15,outputPricePerMillion:75,cacheReadPricePerMillion:1.5},"claude-opus-4.6":{displayName:"Claude Opus 4.6 (Thinking)",provider:"Anthropic",inputPricePerMillion:15,outputPricePerMillion:75,cacheReadPricePerMillion:1.5},"claude-3-opus":{displayName:"Claude 3 Opus",provider:"Anthropic",inputPricePerMillion:15,outputPricePerMillion:75,cacheReadPricePerMillion:1.5},"claude-sonnet-4.6":{displayName:"Claude Sonnet 4.6 (Thinking)",provider:"Anthropic",inputPricePerMillion:3,outputPricePerMillion:15,cacheReadPricePerMillion:.3},"claude-sonnet-4.5":{displayName:"Claude Sonnet 4.5",provider:"Anthropic",inputPricePerMillion:3,outputPricePerMillion:15,cacheReadPricePerMillion:.3},"claude-3.7-sonnet":{displayName:"Claude 3.7 Sonnet",provider:"Anthropic",inputPricePerMillion:3,outputPricePerMillion:15,cacheReadPricePerMillion:.3},"claude-3.5-sonnet":{displayName:"Claude 3.5 Sonnet",provider:"Anthropic",inputPricePerMillion:3,outputPricePerMillion:15,cacheReadPricePerMillion:.3},"claude-haiku-4.5":{displayName:"Claude Haiku 4.5",provider:"Anthropic",inputPricePerMillion:.8,outputPricePerMillion:4,cacheReadPricePerMillion:.08},"claude-3.5-haiku":{displayName:"Claude 3.5 Haiku",provider:"Anthropic",inputPricePerMillion:.8,outputPricePerMillion:4,cacheReadPricePerMillion:.08},"claude-fable-5":{displayName:"Claude Fable 5",provider:"Anthropic",inputPricePerMillion:3,outputPricePerMillion:15,cacheReadPricePerMillion:.3},"gpt-4o":{displayName:"GPT-4o",provider:"OpenAI",inputPricePerMillion:2.5,outputPricePerMillion:10,cacheReadPricePerMillion:1.25},"gpt-4o-mini":{displayName:"GPT-4o mini",provider:"OpenAI",inputPricePerMillion:.15,outputPricePerMillion:.6,cacheReadPricePerMillion:.075},"o3-mini":{displayName:"o3-mini",provider:"OpenAI",inputPricePerMillion:1.1,outputPricePerMillion:4.4,cacheReadPricePerMillion:.55},o1:{displayName:"o1",provider:"OpenAI",inputPricePerMillion:15,outputPricePerMillion:60,cacheReadPricePerMillion:7.5},default:{displayName:"Standard AI Model",provider:"Other",inputPricePerMillion:.5,outputPricePerMillion:1.5,cacheReadPricePerMillion:.1}},Y=class{pricingTable;config;constructor(e){if(this.config=e,this.pricingTable={..._e},e.customPricing)for(let[t,o]of Object.entries(e.customPricing))this.pricingTable[t]?this.pricingTable[t]={...this.pricingTable[t],...o}:o.inputPricePerMillion!==void 0&&o.outputPricePerMillion!==void 0&&(this.pricingTable[t]={displayName:o.displayName||t,provider:o.provider||"Other",inputPricePerMillion:o.inputPricePerMillion,outputPricePerMillion:o.outputPricePerMillion,cacheReadPricePerMillion:o.cacheReadPricePerMillion||0})}normalizeModelKey(e){if(!e)return"gemini-3.7-flash";let t=e.toLowerCase();return t.includes("3.7")&&t.includes("flash")?"gemini-3.7-flash":t.includes("3.6")&&t.includes("flash")?"gemini-3.6-flash":t.includes("3.5")&&t.includes("flash")?"gemini-3.5-flash":t.includes("3.1")&&t.includes("pro")?"gemini-3.1-pro":t.includes("2.5")&&t.includes("pro")?"gemini-2.5-pro":t.includes("2.5")&&t.includes("flash")?"gemini-2.5-flash":t.includes("1.5")&&t.includes("pro")?"gemini-1.5-pro":t.includes("1.5")&&t.includes("flash")?"gemini-1.5-flash":t.includes("claude-opus-5")||t.includes("opus-5")?"claude-opus-5":t.includes("claude-opus-4-8")||t.includes("claude-opus-4.8")?"claude-opus-4.8":t.includes("claude-opus-4-7")||t.includes("claude-opus-4.7")?"claude-opus-4.7":t.includes("claude-opus-4-6")||t.includes("claude-opus-4.6")||t.includes("opus")&&t.includes("4.6")?"claude-opus-4.6":t.includes("claude-3-opus")||t.includes("claude-3.0-opus")?"claude-3-opus":t.includes("claude-sonnet-4-6")||t.includes("claude-sonnet-4.6")||t.includes("sonnet")&&t.includes("4.6")?"claude-sonnet-4.6":t.includes("claude-sonnet-4-5")||t.includes("claude-sonnet-4.5")||t.includes("sonnet")&&t.includes("4.5")?"claude-sonnet-4.5":t.includes("claude-3-7-sonnet")||t.includes("claude-3.7-sonnet")||t.includes("sonnet")&&t.includes("3.7")?"claude-3.7-sonnet":t.includes("claude-3-5-sonnet")||t.includes("claude-3.5-sonnet")||t.includes("sonnet")&&t.includes("3.5")?"claude-3.5-sonnet":t.includes("claude-haiku-4-5")||t.includes("claude-haiku-4.5")||t.includes("haiku")&&t.includes("4.5")?"claude-haiku-4.5":t.includes("claude-3-5-haiku")||t.includes("claude-3.5-haiku")||t.includes("claude-haiku")?"claude-3.5-haiku":t.includes("claude-fable-5")||t.includes("fable")?"claude-fable-5":t.includes("claude")&&t.includes("opus")?"claude-3-opus":t.includes("claude")&&t.includes("sonnet")?"claude-3.7-sonnet":t.includes("claude")&&t.includes("haiku")?"claude-3.5-haiku":t.includes("gpt-4o-mini")||t.includes("4o-mini")?"gpt-4o-mini":t.includes("gpt-4o")||t.includes("4o")?"gpt-4o":t.includes("o3-mini")?"o3-mini":t.includes("o1")?"o1":t.includes("gemini")?"gemini-3.7-flash":t.includes("claude")?"claude-3.7-sonnet":t.includes("gpt")?"gpt-4o":"default"}getModelPricing(e){let t=this.normalizeModelKey(e);return this.pricingTable[t]||this.pricingTable.default}calculateCostUSD(e,t,o,s=0,r=0,c=0){let l=this.getModelPricing(e),i=o+s,n=t/1e6*l.inputPricePerMillion,d=i/1e6*l.outputPricePerMillion,g=l.cacheReadPricePerMillion!==void 0?l.cacheReadPricePerMillion:l.inputPricePerMillion*.1,v=c/1e6*g,P=r/1e6*(l.inputPricePerMillion*1.25);return n+d+v+P}usdToVnd(e){return Math.round(e*this.config.vndExchangeRate)}calculateValuation(e,t,o,s){let r=this.usdToVnd(e),c=t/3600,l=Math.max(1,Math.round((c*4.5+o/5e4*1.5)*10)/10),i=this.config.humanHourlyRate,n=Math.round(l*i),d=this.usdToVnd(n),g=i*.6,v=c*g,P=Math.round((e*this.config.markupMultiplier+v+s*.5)*100)/100,R=this.usdToVnd(P),$=Math.max(0,n-P),w=this.usdToVnd($);return{apiCostUSD:Math.round(e*1e4)/1e4,apiCostVND:r,humanHoursEquivalent:l,humanHourlyRate:i,humanCostEquivalentUSD:n,humanCostEquivalentVND:d,markupMultiplier:this.config.markupMultiplier,recommendedValuationUSD:P,recommendedValuationVND:R,savingsUSD:$,savingsVND:w}}};var se=E(require("fs")),G=E(require("path")),Ce=E(require("readline"));var H=class{static estimateTokens(e){if(!e||e.length===0)return 0;let t=e.length;if(t<4)return 1;let o=0,s=0,r=0;for(let d=0;d<Math.min(t,2e3);d++){let g=e.charCodeAt(d);g>255?o++:g===32||g===10||g===9||g===13?r++:(g>=33&&g<=47||g>=58&&g<=64||g>=91&&g<=96||g>=123&&g<=126)&&s++}let c=Math.min(t,2e3),l=o/c,i=s/c,n=3.8;return l>.15?n=2.6:i>.25&&(n=3.3),Math.ceil(t/n)}static estimateObjectTokens(e){if(!e)return 0;try{let t=typeof e=="string"?e:JSON.stringify(e);return this.estimateTokens(t)}catch{return 0}}};var Q=class{pricingEngine;constructor(e){this.pricingEngine=e}async parseFile(e,t){if(!se.existsSync(e))return null;let o=G.basename(G.dirname(G.dirname(e))),s=se.createReadStream(e,{encoding:"utf8"}),r=Ce.createInterface({input:s,crlfDelay:1/0}),c="",l="",i="gemini-3.7-flash",n=new Set,d=new Set,g=0,v=0,P=0,R=0,$=null,w=null,A=0,U=null;for await(let p of r)if(p.trim())try{let h=JSON.parse(p),x=h.type||"",f=h.source||"",m=h.content||"",T=h.created_at,k=null;if(T){let y=new Date(T).getTime();if(!isNaN(y)){if(k=y,($===null||y<$)&&($=y),(w===null||y>w)&&(w=y),U!==null){let D=(y-U)/1e3;D>0&&D<300&&(A+=D)}U=y}}if(m.includes("Model Selection")||m.includes("USER_SETTINGS_CHANGE")){let y=m.match(/Model Selection` from [^\n]+? to (.+?)\.\s*No need/i)||m.match(/Model Selection` from [^\n]+? to ([^\.\n<]+)/i)||m.match(/setting `Model Selection` from [^\n]+? to ([^\n<]+)/i);if(y&&y[1]){let D=y[1].trim();i=this.pricingEngine.normalizeModelKey(D),n.add(i)}}if(!c){let y=m.match(/\[URI\] -> \[CorpusName\]:\s*([^\s\n]+)/);if(y&&y[1])c=y[1].trim();else{let D=m.match(/Active Document:\s*([^\n\r]+)/);if(D&&D[1]){let L=D[1].trim();c=G.dirname(L)}else{let L=m.match(/@\[([^\]]+)\]/);if(L&&L[1]){let Pe=L[1].trim();Pe.startsWith("/")&&(c=Pe)}}}}if(x==="USER_INPUT"&&!l){let y=m.match(/<USER_REQUEST>([\s\S]*?)<\/USER_REQUEST>/);y&&y[1]?l=y[1].trim().replace(/\n+/g," ").slice(0,80):l=m.replace(/<[^>]+>/g,"").trim().slice(0,80)}if(x==="USER_INPUT")R++,g+=H.estimateTokens(m);else if(x==="KNOWLEDGE_ARTIFACTS"||x==="CONVERSATION_HISTORY"||x==="SYSTEM_MESSAGE"||x==="VIEW_FILE"||x==="GREP_SEARCH"||x==="LIST_DIRECTORY"||x==="RUN_COMMAND"||x==="READ_URL_CONTENT"||x==="MCP_TOOL")g+=H.estimateTokens(m);else if(x==="PLANNER_RESPONSE"){if(h.thinking&&(P+=H.estimateTokens(h.thinking)),m&&(v+=H.estimateTokens(m)),h.tool_calls&&Array.isArray(h.tool_calls))for(let y of h.tool_calls){v+=H.estimateObjectTokens(y);let D=y.args||{},L=D.AbsolutePath||D.TargetFile||D.DirectoryPath;L&&typeof L=="string"&&L.startsWith("/")&&d.add(L.replace(/^"|"$/g,""))}}else f==="MODEL"?v+=H.estimateTokens(m):g+=H.estimateTokens(m)}catch{}if(n.size===0&&n.add(i),t&&c){let p=G.normalize(t).toLowerCase(),h=G.normalize(c).toLowerCase();if(!(h.startsWith(p)||p.startsWith(h)))return null}let B=$&&w?Math.max(1,Math.round((w-$)/1e3)):Math.max(1,Math.round(A)),_=Math.min(B,Math.max(15,Math.round(A))),O=Array.from(n)[0]||"gemini-3.7-flash",W=this.pricingEngine.calculateCostUSD(O,g,v,P),u=this.pricingEngine.usdToVnd(W);return{sessionId:o,workspacePath:c||t||"Unknown Workspace",title:l||`Session ${o.slice(0,8)}`,startTime:$?new Date($).toISOString():new Date().toISOString(),endTime:w?new Date(w).toISOString():new Date().toISOString(),durationSeconds:B,activeTimeSeconds:_,modelsUsed:Array.from(n),turnsCount:Math.max(1,R),inputTokens:g,outputTokens:v,thinkingTokens:P,totalTokens:g+v+P,costUSD:Math.round(W*1e4)/1e4,costVND:u,filesTouched:Array.from(d),filePath:e}}};var ae=E(require("fs")),V=E(require("path")),we=E(require("readline")),Z=class{pricingEngine;constructor(e){this.pricingEngine=e}async parseFile(e,t){if(!ae.existsSync(e))return null;let o=V.basename(e,".jsonl"),s=ae.createReadStream(e,{encoding:"utf8"}),r=we.createInterface({input:s,crlfDelay:1/0}),c="",l="",i="claude-3.7-sonnet",n=new Set,d=new Set,g=0,v=0,P=0,R=0,$=0,w=null,A=null,U=0,B=null;for await(let f of r)if(f.trim())try{let m=JSON.parse(f);if(m.timestamp){let T=new Date(m.timestamp).getTime();if(!isNaN(T)){if((w===null||T<w)&&(w=T),(A===null||T>A)&&(A=T),B!==null){let k=(T-B)/1e3;k>0&&k<300&&(U+=k)}B=T}}if(m.cwd&&!c&&(c=m.cwd),m.type==="user"&&m.message){$++;let T=m.message.content,k="";typeof T=="string"?k=T:Array.isArray(T)&&(k=T.map(y=>typeof y=="string"?y:y?.text||"").filter(Boolean).join(" ")),k&&!l&&!k.startsWith("Context: This summary will")&&!k.startsWith("Warmup")&&(l=k.replace(/<[^>]+>/g,"").trim().replace(/\n+/g," ").slice(0,80))}if(m.message){let T=i;if(m.message.model&&m.message.model!=="<synthetic>"){let k=this.pricingEngine.normalizeModelKey(m.message.model);T=k,i=k}if(m.message.usage){let k=m.message.usage.input_tokens||0,y=m.message.usage.output_tokens||0,D=m.message.usage.cache_creation_input_tokens||0,L=m.message.usage.cache_read_input_tokens||0;g+=k,v+=y,P+=D,R+=L,n.add(T)}}if(m.type==="assistant"&&m.message&&Array.isArray(m.message.content)){for(let T of m.message.content)if(T.type==="tool_use"&&T.input){let k=T.input.file_path||T.input.path||T.input.filePath||T.input.targetFile||T.input.TargetFile||T.input.AbsolutePath;k&&typeof k=="string"&&k.startsWith("/")&&d.add(k)}}}catch{}n.size===0&&n.add(i);let _=g+v+P+R;if(_===0&&$===0)return null;if(t&&c){let f=V.normalize(t).toLowerCase(),m=V.normalize(c).toLowerCase();if(!(m===f||m.startsWith(f+V.sep)||f.startsWith(m+V.sep)||V.basename(m)&&V.basename(m)===V.basename(f)))return null}let O=w&&A?Math.max(1,Math.round((A-w)/1e3)):Math.max(1,Math.round(U)),W=Math.min(O,Math.max(10,Math.round(U))),u=Array.from(n),p=u[0]||"claude-sonnet-4.5";for(let f of u){if(f.includes("opus")){p=f;break}f.includes("sonnet")&&(p=f)}let h=this.pricingEngine.calculateCostUSD(p,g,v,0,P,R),x=this.pricingEngine.usdToVnd(h);return{sessionId:o,workspacePath:c||t||"Unknown Workspace",title:l||`Claude Code Session ${o.slice(0,8)}`,startTime:w?new Date(w).toISOString():new Date().toISOString(),endTime:A?new Date(A).toISOString():new Date().toISOString(),durationSeconds:O,activeTimeSeconds:W,modelsUsed:u,turnsCount:Math.max(1,$),inputTokens:g,outputTokens:v,thinkingTokens:0,totalTokens:_,costUSD:Math.round(h*1e4)/1e4,costVND:x,filesTouched:Array.from(d),filePath:e}}};var re=class{pricingEngine;parser;claudeParser;brainDir;claudeProjectsDir;cache=new Map;constructor(e,t,o){this.pricingEngine=new Y(e),this.parser=new Q(this.pricingEngine),this.claudeParser=new Z(this.pricingEngine),this.brainDir=t||N.join(be.homedir(),".gemini","antigravity-ide","brain"),this.claudeProjectsDir=o||N.join(be.homedir(),".claude","projects")}updateConfig(e){this.pricingEngine=new Y(e),this.parser=new Q(this.pricingEngine),this.claudeParser=new Z(this.pricingEngine),this.cache.clear()}async scanWorkspace(e,t="all"){let o=e?N.basename(e):"All Projects",s=[],r=new Map;if(j.existsSync(this.brainDir))try{let u=j.readdirSync(this.brainDir);for(let p of u){let h=N.join(this.brainDir,p,".system_generated","logs","transcript.jsonl");if(j.existsSync(h))try{let x=j.statSync(h),f=this.cache.get(h),m=null;f&&f.mtime===x.mtimeMs?m=f.data:(m=await this.parser.parseFile(h),this.cache.set(h,{mtime:x.mtimeMs,data:m})),m&&(s.push(m),this.recordProjectSummary(r,m))}catch{}}}catch{}if(j.existsSync(this.claudeProjectsDir))try{let u=j.readdirSync(this.claudeProjectsDir);for(let p of u){let h=N.join(this.claudeProjectsDir,p);try{if(!j.statSync(h).isDirectory())continue;let f=j.readdirSync(h).filter(m=>m.endsWith(".jsonl"));for(let m of f){let T=N.join(h,m);try{let k=j.statSync(T),y=this.cache.get(T),D=null;y&&y.mtime===k.mtimeMs?D=y.data:(D=await this.claudeParser.parseFile(T),this.cache.set(T,{mtime:k.mtimeMs,data:D})),D&&(s.push(D),this.recordProjectSummary(r,D))}catch{}}}catch{}}}catch{}let c=[];for(let[u,p]of r.entries())c.push({workspacePath:u,projectName:u==="Unknown"?"Unknown Project":N.basename(u),totalSessions:p.sessions,totalTokens:p.tokens,totalCostUSD:Math.round(p.costUSD*1e4)/1e4,totalCostVND:this.pricingEngine.usdToVnd(p.costUSD),lastActive:p.lastActive});c.sort((u,p)=>p.totalCostUSD-u.totalCostUSD);let l=s;e&&e!=="ALL"&&e!=="All Projects"&&(l=s.filter(u=>this.isWorkspaceMatch(u.workspacePath,e)));let i=Date.now();if(t==="today"){let u=new Date;u.setHours(0,0,0,0);let p=u.getTime();l=l.filter(h=>new Date(h.startTime).getTime()>=p)}else if(t==="7d"){let u=i-6048e5;l=l.filter(p=>new Date(p.startTime).getTime()>=u)}else if(t==="30d"){let u=i-2592e6;l=l.filter(p=>new Date(p.startTime).getTime()>=u)}l.sort((u,p)=>new Date(p.startTime).getTime()-new Date(u.startTime).getTime());let n=0,d=0,g=0,v=0,P=0,R=0,$=0,w=new Map,A=new Map;for(let u of l){n+=u.inputTokens,d+=u.outputTokens,g+=u.thinkingTokens,v+=u.costUSD,P+=u.activeTimeSeconds,R+=u.durationSeconds,$+=u.turnsCount;for(let p of u.modelsUsed){let h=w.get(p)||{input:0,output:0,thinking:0,costUSD:0},x=1/u.modelsUsed.length;h.input+=Math.round(u.inputTokens*x),h.output+=Math.round(u.outputTokens*x),h.thinking+=Math.round(u.thinkingTokens*x),h.costUSD+=u.costUSD*x,w.set(p,h)}if(u.filesTouched&&u.filesTouched.length>0){let p=Math.round(u.totalTokens/u.filesTouched.length),h=u.costUSD/u.filesTouched.length;for(let x of u.filesTouched){let f=A.get(x)||{count:0,estimatedTokens:0,costUSD:0};f.count++,f.estimatedTokens+=p,f.costUSD+=h,A.set(x,f)}}}let U=n+d+g,B=this.pricingEngine.usdToVnd(v),_=[];for(let[u,p]of w.entries()){let h=this.pricingEngine.getModelPricing(u),x=p.input+p.output+p.thinking;_.push({modelName:u,displayName:h.displayName||u,provider:h.provider||"Other",inputTokens:p.input,outputTokens:p.output,thinkingTokens:p.thinking,totalTokens:x,costUSD:Math.round(p.costUSD*1e4)/1e4,costVND:this.pricingEngine.usdToVnd(p.costUSD),percentageOfCost:v>0?Math.round(p.costUSD/v*1e3)/10:0,percentageOfTokens:U>0?Math.round(x/U*1e3)/10:0})}_.sort((u,p)=>p.costUSD-u.costUSD);let O=[];for(let[u,p]of A.entries())O.push({fileName:N.basename(u),filePath:u,touchesCount:p.count,estimatedTokens:p.estimatedTokens,estimatedCostUSD:Math.round(p.costUSD*1e4)/1e4});O.sort((u,p)=>p.estimatedCostUSD-u.estimatedCostUSD);let W=this.pricingEngine.calculateValuation(v,P,U,$);return{workspacePath:e||"All Workspaces",projectName:e&&e!=="ALL"?o:"T\u1EA5t C\u1EA3 D\u1EF1 \xC1n",generatedAt:new Date().toISOString(),dateFilter:t,totalSessions:l.length,totalTurns:$,totalInputTokens:n,totalOutputTokens:d,totalThinkingTokens:g,totalTokens:U,totalCostUSD:Math.round(v*1e4)/1e4,totalCostVND:B,activeDurationSeconds:P,totalDurationSeconds:R,models:_,topFiles:O.slice(0,20),sessions:l,allProjects:c,valuation:W}}recordProjectSummary(e,t){let o=t.workspacePath||"Unknown",s=e.get(o)||{sessions:0,tokens:0,costUSD:0,lastActive:t.startTime};s.sessions++,s.tokens+=t.totalTokens,s.costUSD+=t.costUSD,new Date(t.startTime).getTime()>new Date(s.lastActive).getTime()&&(s.lastActive=t.startTime),e.set(o,s)}isWorkspaceMatch(e,t){if(!e||!t)return!1;let o=N.normalize(e).toLowerCase(),s=N.normalize(t).toLowerCase(),r=d=>d.replace(/^\/volumes\/[^\/]+\/antigravity/,"/antigravity").replace(/^\/users\/[^\/]+\/antigravity/,"/antigravity"),c=r(o),l=r(s);if(o===s||c===l||c.startsWith(l+N.sep)||l.startsWith(c+N.sep)||o.startsWith(s+N.sep)||s.startsWith(o+N.sep))return!0;let i=N.basename(o),n=N.basename(s);return!!(i&&n&&i===n)}buildEmptyReport(e,t,o){let s=this.pricingEngine.calculateValuation(0,0,0,0);return{workspacePath:e,projectName:t,generatedAt:new Date().toISOString(),dateFilter:o,totalSessions:0,totalTurns:0,totalInputTokens:0,totalOutputTokens:0,totalThinkingTokens:0,totalTokens:0,totalCostUSD:0,totalCostVND:0,activeDurationSeconds:0,totalDurationSeconds:0,models:[],topFiles:[],sessions:[],allProjects:[],valuation:s}}};var C=class{static formatNumber(e){return new Intl.NumberFormat("en-US").format(Math.round(e))}static formatDuration(e){if(e<=0)return"0s";let t=Math.floor(e/3600),o=Math.floor(e%3600/60),s=Math.floor(e%60),r=[];return t>0&&r.push(`${t}h`),o>0&&r.push(`${o}m`),(s>0||r.length===0)&&r.push(`${s}s`),r.join(" ")}static generateMarkdown(e,t){let o=t.language==="en",s=t.currency==="VND",r=(n,d)=>s?`${this.formatNumber(d)} \u20AB (${n.toFixed(4)} USD)`:`$${n.toFixed(4)} (${this.formatNumber(d)} \u20AB)`,c=(n,d)=>s?`${this.formatNumber(d)} \u20AB ($${n.toFixed(2)} USD)`:`$${n.toFixed(2)} (${this.formatNumber(d)} \u20AB)`,l=o?"en-US":"vi-VN";if(o){let n=`# \u{1F4CA} AI PROJECT VALUATION & COST REPORT

`;n+=`> **Project:** \`${e.projectName}\`  
`,n+=`> **Workspace:** \`${e.workspacePath}\`  
`,n+=`> **Generated Date:** \`${new Date(e.generatedAt).toLocaleString(l)}\`  
`,n+=`> **Measurement Tool:** Acost - AI Project Cost & Valuation Extension v1.3.0

`,n+=`---

`,n+=`## 1. \u{1F4B0} Executive Valuation & Cost Summary

`,n+=`| Metric | Measured Value | Notes |
`,n+=`| :--- | :--- | :--- |
`,n+=`| **Total Actual AI API Cost** | **${r(e.totalCostUSD,e.totalCostVND)}** | Raw token cost paid to AI model providers |
`,n+=`| **Recommended Project Valuation** | **${c(e.valuation.recommendedValuationUSD,e.valuation.recommendedValuationVND)}** | Applied **x${e.valuation.markupMultiplier}** Markup + AI Prompt Engineering Operator Cost |
`,n+=`| **Equivalent Traditional Dev Cost** | **${c(e.valuation.humanCostEquivalentUSD,e.valuation.humanCostEquivalentVND)}** | Estimated ${e.valuation.humanHoursEquivalent} hrs @ $${e.valuation.humanHourlyRate}/hr |
`,n+=`| **Budget Savings vs Traditional Dev** | **${c(e.valuation.savingsUSD,e.valuation.savingsVND)}** | Saved ~${e.valuation.humanCostEquivalentUSD>0?Math.round(e.valuation.savingsUSD/e.valuation.humanCostEquivalentUSD*100):0}% engineering budget |
`,n+=`| **Total Tokens Consumed** | **${this.formatNumber(e.totalTokens)} tokens** | In: ${this.formatNumber(e.totalInputTokens)} | Out: ${this.formatNumber(e.totalOutputTokens)} | Thinking: ${this.formatNumber(e.totalThinkingTokens)} |
`,n+=`| **Active Coding Duration** | **${this.formatDuration(e.activeDurationSeconds)}** | Total active AI generation & thinking duration |
`,n+=`| **Total Coding Sessions** | **${e.totalSessions} sessions** | ${e.totalTurns} prompts & turn interactions |

`,n+=`## 2. \u{1F916} AI Models Breakdown

`,n+=`| AI Model | Provider | Input Tokens | Output Tokens | Thinking Tokens | Cost (USD) | Cost Share |
`,n+=`| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
`;for(let d of e.models)n+=`| **${d.displayName}** | ${d.provider} | ${this.formatNumber(d.inputTokens)} | ${this.formatNumber(d.outputTokens)} | ${this.formatNumber(d.thinkingTokens)} | $${d.costUSD.toFixed(4)} | **${d.percentageOfCost}%** |
`;if(n+=`
`,e.topFiles&&e.topFiles.length>0){n+=`## 3. \u{1F4C2} Top Cost Impact Files

`,n+=`| File Name | Touches/Edits | Est. Tokens | Est. Cost (USD) |
`,n+=`| :--- | :--- | :--- | :--- |
`;for(let d of e.topFiles.slice(0,10))n+=`| \`${d.fileName}\` | ${d.touchesCount} edits | ~${this.formatNumber(d.estimatedTokens)} | $${d.estimatedCostUSD.toFixed(4)} |
`;n+=`
`}n+=`## 4. \u{1F4DD} Detailed Coding Sessions Breakdown

`,n+=`| Timestamp | User Request / Task | Models | Tokens | Active Time | Cost (USD) |
`,n+=`| :--- | :--- | :--- | :--- | :--- | :--- |
`;for(let d of e.sessions.slice(0,50)){let g=new Date(d.startTime).toLocaleString(l),v=d.title.replace(/\|/g,"\\|"),P=d.modelsUsed.join(", ");n+=`| ${g} | ${v} | ${P} | ${this.formatNumber(d.totalTokens)} | ${this.formatDuration(d.activeTimeSeconds)} | $${d.costUSD.toFixed(4)} |
`}return e.sessions.length>50&&(n+=`
*...and ${e.sessions.length-50} other sessions aggregated into total cost metrics.*
`),n+=`
---
`,n+=`*Report automatically generated by [Acost - AI Project Cost & Valuation Extension](file://${e.workspacePath}).*
`,n}let i=`# \u{1F4CA} B\xC1O C\xC1O \u0110\u1ECANH GI\xC1 & CHI PH\xCD L\u1EACP TR\xCCNH AI (AI PROJECT VALUATION REPORT)

`;i+=`> **D\u1EF1 \xE1n:** \`${e.projectName}\`  
`,i+=`> **\u0110\u01B0\u1EDDng d\u1EABn:** \`${e.workspacePath}\`  
`,i+=`> **Th\u1EDDi gian xu\u1EA5t b\xE1o c\xE1o:** \`${new Date(e.generatedAt).toLocaleString(l)}\`  
`,i+=`> **C\xF4ng c\u1EE5 \u0111o l\u01B0\u1EDDng:** Acost - AI Project Cost & Valuation Extension v1.3.0

`,i+=`---

`,i+=`## 1. \u{1F4B0} T\u1ED5ng Quan \u0110\u1ECBnh Gi\xE1 & Chi Ph\xED (Executive Summary)

`,i+=`| Ch\u1EC9 S\u1ED1 | Gi\xE1 Tr\u1ECB \u0110o L\u01B0\u1EDDng | Ghi Ch\xFA |
`,i+=`| :--- | :--- | :--- |
`,i+=`| **T\u1ED5ng Chi Ph\xED AI API Th\u1EF1c T\u1EBF** | **${r(e.totalCostUSD,e.totalCostVND)}** | Chi ph\xED token tr\u1EA3 cho nh\xE0 cung c\u1EA5p AI |
`,i+=`| **\u0110\u1ECBnh Gi\xE1 Ho\xE0n Th\xE0nh \u0110\u1EC1 Xu\u1EA5t** | **${c(e.valuation.recommendedValuationUSD,e.valuation.recommendedValuationVND)}** | \xC1p d\u1EE5ng h\u1EC7 s\u1ED1 Markup **x${e.valuation.markupMultiplier}** + C\xF4ng v\u1EADn h\xE0nh AI |
`,i+=`| **Chi Ph\xED Dev Truy\u1EC1n Th\u1ED1ng T\u01B0\u01A1ng \u0110\u01B0\u01A1ng** | **${c(e.valuation.humanCostEquivalentUSD,e.valuation.humanCostEquivalentVND)}** | \u01AF\u1EDBc t\xEDnh ${e.valuation.humanHoursEquivalent}h @ $${e.valuation.humanHourlyRate}/h |
`,i+=`| **Ti\u1EBFt Ki\u1EC7m So V\u1EDBi Dev Truy\u1EC1n Th\u1ED1ng** | **${c(e.valuation.savingsUSD,e.valuation.savingsVND)}** | Ti\u1EBFt ki\u1EC7m ~${e.valuation.humanCostEquivalentUSD>0?Math.round(e.valuation.savingsUSD/e.valuation.humanCostEquivalentUSD*100):0}% ng\xE2n s\xE1ch |
`,i+=`| **T\u1ED5ng Token Ti\xEAu Th\u1EE5** | **${this.formatNumber(e.totalTokens)} tokens** | In: ${this.formatNumber(e.totalInputTokens)} | Out: ${this.formatNumber(e.totalOutputTokens)} | Thinking: ${this.formatNumber(e.totalThinkingTokens)} |
`,i+=`| **Th\u1EDDi Gian Active Coding** | **${this.formatDuration(e.activeDurationSeconds)}** | T\u1ED5ng th\u1EDDi gian AI tr\u1EF1c ti\u1EBFp t\u1EA1o code & suy ngh\u0129 |
`,i+=`| **T\u1ED5ng S\u1ED1 Phi\xEAn L\xE0m Vi\u1EC7c (Sessions)** | **${e.totalSessions} sessions** | ${e.totalTurns} l\u01B0\u1EE3t prompt/t\u01B0\u01A1ng t\xE1c |

`,i+=`## 2. \u{1F916} Ph\xE2n B\u1ED5 Theo AI Models

`,i+=`| AI Model | Nh\xE0 Cung C\u1EA5p | Input Tokens | Output Tokens | Thinking Tokens | Chi Ph\xED (USD) | T\u1EF7 L\u1EC7 Chi Ph\xED |
`,i+=`| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
`;for(let n of e.models)i+=`| **${n.displayName}** | ${n.provider} | ${this.formatNumber(n.inputTokens)} | ${this.formatNumber(n.outputTokens)} | ${this.formatNumber(n.thinkingTokens)} | $${n.costUSD.toFixed(4)} | **${n.percentageOfCost}%** |
`;if(i+=`
`,e.topFiles&&e.topFiles.length>0){i+=`## 3. \u{1F4C2} Top File Ti\xEAu T\u1ED1n Chi Ph\xED L\u1EDBn Nh\u1EA5t

`,i+=`| T\xEAn File | L\u01B0\u1EE3t Ch\u1EC9nh S\u1EEDa | \u01AF\u1EDBc T\xEDnh Tokens | \u01AF\u1EDBc T\xEDnh Chi Ph\xED (USD) |
`,i+=`| :--- | :--- | :--- | :--- |
`;for(let n of e.topFiles.slice(0,10))i+=`| \`${n.fileName}\` | ${n.touchesCount} l\u1EA7n s\u1EEDa | ~${this.formatNumber(n.estimatedTokens)} | $${n.estimatedCostUSD.toFixed(4)} |
`;i+=`
`}i+=`## 4. \u{1F4DD} L\u1ECBch S\u1EED Chi Ti\u1EBFt C\xE1c Phi\xEAn Coding (Session Breakdown)

`,i+=`| Th\u1EDDi Gian | Y\xEAu C\u1EA7u / N\u1ED9i Dung | Model | Tokens | Th\u1EDDi L\u01B0\u1EE3ng | Chi Ph\xED (USD) |
`,i+=`| :--- | :--- | :--- | :--- | :--- | :--- |
`;for(let n of e.sessions.slice(0,50)){let d=new Date(n.startTime).toLocaleString(l),g=n.title.replace(/\|/g,"\\|"),v=n.modelsUsed.join(", ");i+=`| ${d} | ${g} | ${v} | ${this.formatNumber(n.totalTokens)} | ${this.formatDuration(n.activeTimeSeconds)} | $${n.costUSD.toFixed(4)} |
`}return e.sessions.length>50&&(i+=`
*...v\xE0 ${e.sessions.length-50} phi\xEAn l\xE0m vi\u1EC7c kh\xE1c \u0111\xE3 \u0111\u01B0\u1EE3c t\u1ED5ng h\u1EE3p v\xE0o chi ph\xED chung.*
`),i+=`
---
`,i+=`*B\xE1o c\xE1o \u0111\u01B0\u1EE3c sinh t\u1EF1 \u0111\u1ED9ng b\u1EDFi [Acost - AI Project Cost & Valuation Extension](file://${e.workspacePath}).*
`,i}static generateHtml(e,t){let o=t.language==="en",s=t.currency==="VND",r=o?"en-US":"vi-VN",c=o?`Project AI Cost & Valuation Report - ${e.projectName}`:`B\xE1o C\xE1o \u0110\u1ECBnh Gi\xE1 D\u1EF1 \xC1n - ${e.projectName}`,l=o?"\u{1F4CA} AI Project Valuation & Cost Report":"\u{1F4CA} B\xE1o C\xE1o \u0110\u1ECBnh Gi\xE1 & Chi Ph\xED L\u1EADp Tr\xECnh AI",i=o?"Project":"D\u1EF1 \xE1n",n=o?"Generated Date":"Ng\xE0y t\u1EA1o",d=o?"\u{1F5A8}\uFE0F Print / Save as PDF":"\u{1F5A8}\uFE0F In / Xu\u1EA5t PDF",g=o?"Actual AI Token Cost":"Chi Ph\xED AI Token Th\u1EF1c T\u1EBF",v=o?"Recommended Valuation":"\u0110\u1ECBnh Gi\xE1 \u0110\u1EC1 Xu\u1EA5t (Valuation)",P=o?"Equivalent Traditional Dev":"Dev Truy\u1EC1n Th\u1ED1ng T\u01B0\u01A1ng \u0110\u01B0\u01A1ng",R=o?"Total Tokens Consumed":"T\u1ED5ng Tokens Ti\xEAu Th\u1EE5",$=o?"\u{1F916} AI Models Breakdown":"\u{1F916} Ph\xE2n B\u1ED5 Theo AI Models",w=o?"\u{1F4DD} Detailed Sessions Breakdown":"\u{1F4DD} Chi Ti\u1EBFt C\xE1c Phi\xEAn L\xE0m Vi\u1EC7c (Sessions)",A="AI Model",U=o?"Provider":"Nh\xE0 Cung C\u1EA5p",B="Input Tokens",_="Output Tokens",O="Thinking Tokens",W=o?"Cost (USD)":"Chi Ph\xED (USD)",u=o?"Cost Share":"T\u1EF7 L\u1EC7",p=o?"Timestamp":"Th\u1EDDi Gian",h=o?"Request / Task":"Y\xEAu C\u1EA7u / Prompt",x=o?"Duration":"Th\u1EDDi L\u01B0\u1EE3ng";return`<!DOCTYPE html>
<html lang="${o?"en":"vi"}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${c}</title>
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
            <button class="btn-print" onclick="window.print()">${d}</button>
            <h1>${l}</h1>
            <div class="meta">
                ${i}: <strong>${e.projectName}</strong> | Workspace: <code>${e.workspacePath}</code><br>
                ${n}: ${new Date(e.generatedAt).toLocaleString(r)}
            </div>
        </div>

        <div class="grid">
            <div class="card">
                <div class="card-label">${g}</div>
                <div class="card-value">$${e.totalCostUSD.toFixed(2)}</div>
                <div class="card-sub">${this.formatNumber(e.totalCostVND)} \u20AB</div>
            </div>
            <div class="card highlight">
                <div class="card-label">${v}</div>
                <div class="card-value">$${e.valuation.recommendedValuationUSD.toFixed(2)}</div>
                <div class="card-sub">${this.formatNumber(e.valuation.recommendedValuationVND)} \u20AB (x${e.valuation.markupMultiplier} Markup)</div>
            </div>
            <div class="card">
                <div class="card-label">${P}</div>
                <div class="card-value">$${e.valuation.humanCostEquivalentUSD}</div>
                <div class="card-sub">${e.valuation.humanHoursEquivalent}h @ $${e.valuation.humanHourlyRate}/h</div>
            </div>
            <div class="card">
                <div class="card-label">${R}</div>
                <div class="card-value">${this.formatNumber(e.totalTokens)}</div>
                <div class="card-sub">Active Time: ${this.formatDuration(e.activeDurationSeconds)}</div>
            </div>
        </div>

        <h2>${$}</h2>
        <table>
            <thead>
                <tr>
                    <th>${A}</th>
                    <th>${U}</th>
                    <th>${B}</th>
                    <th>${_}</th>
                    <th>${O}</th>
                    <th>${W}</th>
                    <th>${u}</th>
                </tr>
            </thead>
            <tbody>
                ${e.models.map(f=>`
                <tr>
                    <td><strong>${f.displayName}</strong></td>
                    <td><span class="badge ${f.provider.toLowerCase()}">${f.provider}</span></td>
                    <td>${this.formatNumber(f.inputTokens)}</td>
                    <td>${this.formatNumber(f.outputTokens)}</td>
                    <td>${this.formatNumber(f.thinkingTokens)}</td>
                    <td>$${f.costUSD.toFixed(4)}</td>
                    <td><strong>${f.percentageOfCost}%</strong></td>
                </tr>
                `).join("")}
            </tbody>
        </table>

        <h2>${w}</h2>
        <table>
            <thead>
                <tr>
                    <th>${p}</th>
                    <th>${h}</th>
                    <th>${A}</th>
                    <th>Tokens</th>
                    <th>${x}</th>
                    <th>${W}</th>
                </tr>
            </thead>
            <tbody>
                ${e.sessions.slice(0,100).map(f=>`
                <tr>
                    <td>${new Date(f.startTime).toLocaleString(r)}</td>
                    <td>${f.title}</td>
                    <td>${f.modelsUsed.join(", ")}</td>
                    <td>${this.formatNumber(f.totalTokens)}</td>
                    <td>${this.formatDuration(f.activeTimeSeconds)}</td>
                    <td>$${f.costUSD.toFixed(4)}</td>
                </tr>
                `).join("")}
            </tbody>
        </table>
    </div>
</body>
</html>`}static generateJson(e){return JSON.stringify(e,null,2)}};var J=E(require("vscode"));var le={vi:{extensionTitle:"Acost",dashboardTitle:"\u2728 Acost Dashboard",refreshTooltip:"L\xE0m m\u1EDBi d\u1EEF li\u1EC7u",settingsTooltip:"C\xE0i \u0111\u1EB7t",currentProjectPrefix:"\u{1F4CD} D\u1EF1 \xE1n hi\u1EC7n t\u1EA1i",allProjectsOption:"\u{1F310} T\u1EA5t C\u1EA3 D\u1EF1 \xC1n Trong M\xE1y",allTime:"T\u1EA5t c\u1EA3",today:"H\xF4m nay",last7Days:"7 ng\xE0y",last30Days:"30 ng\xE0y",copySummaryBtn:"\u{1F4CB} Copy",copiedNotification:"\u0110\xE3 sao ch\xE9p t\xF3m t\u1EAFt \u0111\u1ECBnh gi\xE1 v\xE0o Clipboard!",valuationHeroLabel:"\u0110\u1ECBnh Gi\xE1 Ho\xE0n Th\xE0nh \u0110\u1EC1 Xu\u1EA5t",valuationHeroSub:"Markup x{markup} + C\xF4ng v\u1EADn h\xE0nh AI",statApiCost:"Chi Ph\xED AI Token",statHumanCost:"Dev Truy\u1EC1n Th\u1ED1ng",statActiveTime:"Active Coding Time",statSavings:"Ti\u1EBFt Ki\u1EC7m Ng\xE2n S\xE1ch",statSavingsPct:"{pct}% ti\u1EBFt ki\u1EC7m",valuationParamsTitle:"\u2699\uFE0F Tham S\u1ED1 \u0110\u1ECBnh Gi\xE1",currencyLabel:"Ti\u1EC1n t\u1EC7",languageLabel:"Ng\xF4n ng\u1EEF",markupLabel:"Markup Multiplier",hourlyRateLabel:"Dev Hourly Rate ($)",modelsBreakdownTitle:"\u{1F916} T\u1EF7 L\u1EC7 AI Models",exportMarkdownBtn:"\u{1F4C4} Xu\u1EA5t Markdown",exportHtmlBtn:"\u{1F310} Xu\u1EA5t HTML / In",tabSessionsTitle:"\u{1F4DD} Phi\xEAn G\u1EA7n \u0110\xE2y",tabFilesTitle:"\u{1F4C2} File Chi Ph\xED Cao",loadingData:"\u0110ang t\u1EA3i d\u1EEF li\u1EC7u...",noModelData:"Ch\u01B0a ph\xE1t hi\u1EC7n d\u1EEF li\u1EC7u model trong b\u1ED9 l\u1ECDc n\xE0y.",noSessionData:"Ch\u01B0a c\xF3 session n\xE0o.",noFileData:"Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u file.",touchesSuffix:"l\u1EA7n s\u1EEDa",sessionsCountSuffix:"sessions",turnsCountSuffix:"turns",unknownProject:"D\u1EF1 \xE1n kh\xF4ng x\xE1c \u0111\u1ECBnh",allWorkspaces:"T\u1EA5t C\u1EA3 D\u1EF1 \xC1n",scanning:"\u0110ang qu\xE9t...",noSessionsFound:"Ch\u01B0a ph\xE1t hi\u1EC7n phi\xEAn l\xE0m vi\u1EC7c AI n\xE0o trong workspace n\xE0y.",reportExportSuccess:"\u0110\xE3 xu\u1EA5t b\xE1o c\xE1o \u0111\u1ECBnh gi\xE1 th\xE0nh c\xF4ng: {filename}",openFile:"M\u1EDF File",exportError:"L\u1ED7i khi xu\u1EA5t file b\xE1o c\xE1o: {err}",menuOpenDashboard:"$(dashboard) M\u1EDF Dashboard \u0110\u1ECBnh Gi\xE1",menuOpenDashboardDesc:"Xem chi ti\u1EBFt token, model & files",menuRefresh:"$(refresh) Qu\xE9t l\u1EA1i d\u1EEF li\u1EC7u chi ph\xED",menuRefreshDesc:"C\u1EADp nh\u1EADt l\u1EA1i to\xE0n b\u1ED9 sessions trong workspace",menuExportMd:"$(file-text) Xu\u1EA5t B\xE1o C\xE1o Markdown",menuExportMdDesc:"T\u1EA1o file PROJECT_VALUATION_REPORT.md",menuExportHtml:"$(file-code) Xu\u1EA5t B\xE1o C\xE1o HTML / PDF",menuExportHtmlDesc:"T\u1EA1o file PROJECT_VALUATION_REPORT.html \u0111\u1EC3 in",menuToggleCurrency:"$(symbol-unit) \u0110\u1ED5i Ti\u1EC1n T\u1EC7 (USD / VND)",menuToggleLanguage:"$(globe) \u0110\u1ED5i Ng\xF4n Ng\u1EEF / Switch Language",menuCheckUpdate:"$(cloud-download) Ki\u1EC3m tra phi\xEAn b\u1EA3n m\u1EDBi",menuCheckUpdateDesc:"Ki\u1EC3m tra b\u1EA3n c\u1EADp nh\u1EADt m\u1EDBi nh\u1EA5t t\u1EEB GitHub Releases",menuSettings:"$(gear) C\xE0i \u0111\u1EB7t \u0110\u1ECBnh Gi\xE1 & T\u1EF7 Gi\xE1",menuSettingsDesc:"Ch\u1EC9nh Markup, T\u1EF7 gi\xE1 VND, Dev rate, Ng\xF4n ng\u1EEF",searchProjectsPlaceholder:"\u{1F50D} T\xECm ki\u1EBFm d\u1EF1 \xE1n...",noProjectsFound:"Kh\xF4ng t\xECm th\u1EA5y d\u1EF1 \xE1n n\xE0o kh\u1EDBp t\u1EEB kh\xF3a.",clearSearch:"X\xF3a t\xECm ki\u1EBFm"},en:{extensionTitle:"Acost",dashboardTitle:"\u2728 Acost Dashboard",refreshTooltip:"Refresh Data",settingsTooltip:"Settings",currentProjectPrefix:"\u{1F4CD} Current Project",allProjectsOption:"\u{1F310} All Projects on Machine",allTime:"All",today:"Today",last7Days:"7 Days",last30Days:"30 Days",copySummaryBtn:"\u{1F4CB} Copy",copiedNotification:"Valuation summary copied to clipboard!",valuationHeroLabel:"Recommended Project Valuation",valuationHeroSub:"Markup x{markup} + AI Operator Cost",statApiCost:"AI Token Cost",statHumanCost:"Traditional Dev Cost",statActiveTime:"Active Coding Time",statSavings:"Budget Savings",statSavingsPct:"{pct}% savings",valuationParamsTitle:"\u2699\uFE0F Pricing & Valuation Parameters",currencyLabel:"Currency",languageLabel:"Language",markupLabel:"Markup Multiplier",hourlyRateLabel:"Dev Hourly Rate ($)",modelsBreakdownTitle:"\u{1F916} AI Models Breakdown",exportMarkdownBtn:"\u{1F4C4} Export Markdown",exportHtmlBtn:"\u{1F310} Export HTML / Print",tabSessionsTitle:"\u{1F4DD} Recent Sessions",tabFilesTitle:"\u{1F4C2} Top Cost Files",loadingData:"Loading data...",noModelData:"No model data found for this filter.",noSessionData:"No sessions found.",noFileData:"No file data available.",touchesSuffix:"edits",sessionsCountSuffix:"sessions",turnsCountSuffix:"turns",unknownProject:"Unknown Project",allWorkspaces:"All Projects",scanning:"Scanning...",noSessionsFound:"No AI sessions detected in this workspace yet.",reportExportSuccess:"Successfully exported project valuation report: {filename}",openFile:"Open File",exportError:"Error exporting report: {err}",menuOpenDashboard:"$(dashboard) Open Valuation Dashboard",menuOpenDashboardDesc:"View detailed tokens, models & file breakdown",menuRefresh:"$(refresh) Refresh Cost Data",menuRefreshDesc:"Rescan all sessions in current workspace",menuExportMd:"$(file-text) Export Markdown Report",menuExportMdDesc:"Generate PROJECT_VALUATION_REPORT.md file",menuExportHtml:"$(file-code) Export HTML / PDF Report",menuExportHtmlDesc:"Generate PROJECT_VALUATION_REPORT.html for printing",menuToggleCurrency:"$(symbol-unit) Switch Currency (USD / VND)",menuToggleLanguage:"$(globe) Switch Language / \u0110\u1ED5i Ng\xF4n Ng\u1EEF",menuCheckUpdate:"$(cloud-download) Check for Updates",menuCheckUpdateDesc:"Check for the latest release on GitHub",menuSettings:"$(gear) Valuation & Exchange Settings",menuSettingsDesc:"Adjust Markup, VND rate, Dev hourly rate, Language",searchProjectsPlaceholder:"\u{1F50D} Search projects...",noProjectsFound:"No matching projects found.",clearSearch:"Clear search"}};function ee(a="vi"){return le[a]||le.vi}var ce=class{statusBarItem;constructor(){this.statusBarItem=J.window.createStatusBarItem(J.StatusBarAlignment.Right,95),this.statusBarItem.command="acost.menu",this.statusBarItem.text="$(sparkle) Acost: Scanning...",this.statusBarItem.tooltip="\u0110ang qu\xE9t d\u1EEF li\u1EC7u chi ph\xED d\u1EF1 \xE1n...",this.statusBarItem.show()}update(e,t){let o=ee(t.language),s=t.language==="en";if(!e||e.totalSessions===0){this.statusBarItem.text="$(sparkle) Acost: $0.00",this.statusBarItem.tooltip=new J.MarkdownString(o.noSessionsFound);return}let c=t.currency==="VND"?`${C.formatNumber(e.totalCostVND)} \u20AB`:`$${e.totalCostUSD.toFixed(2)}`,l=e.totalTokens>1e6?`${(e.totalTokens/1e6).toFixed(1)}M`:`${Math.round(e.totalTokens/1e3)}k`,i=C.formatDuration(e.activeDurationSeconds);this.statusBarItem.text=`$(sparkle) Acost: ${c} (${l} tok)`;let n=new J.MarkdownString;if(n.isTrusted=!0,s){if(n.appendMarkdown(`### \u{1F4CA} **Acost - AI Cost & Valuation**

`),n.appendMarkdown(`- **AI Token Cost:** \`$${e.totalCostUSD.toFixed(4)}\` (~${C.formatNumber(e.totalCostVND)} \u20AB)
`),n.appendMarkdown(`- **Recommended Valuation:** \`$${e.valuation.recommendedValuationUSD.toFixed(2)}\` (~${C.formatNumber(e.valuation.recommendedValuationVND)} \u20AB)
`),n.appendMarkdown(`- **Total Tokens:** \`${C.formatNumber(e.totalTokens)}\` tokens
`),n.appendMarkdown(`- **Active Coding Time:** \`${i}\` (${e.totalSessions} sessions)

`),e.models.length>0){n.appendMarkdown(`**Models Used:**
`);for(let d of e.models)n.appendMarkdown(`- **${d.displayName}:** ${d.percentageOfCost}% ($${d.costUSD.toFixed(3)})
`)}n.appendMarkdown(`
*Click to open menu & export report.*`)}else{if(n.appendMarkdown(`### \u{1F4CA} **Acost - AI Cost & Valuation**

`),n.appendMarkdown(`- **Chi ph\xED AI Token:** \`$${e.totalCostUSD.toFixed(4)}\` (~${C.formatNumber(e.totalCostVND)} \u20AB)
`),n.appendMarkdown(`- **\u0110\u1ECBnh gi\xE1 \u0111\u1EC1 xu\u1EA5t:** \`$${e.valuation.recommendedValuationUSD.toFixed(2)}\` (~${C.formatNumber(e.valuation.recommendedValuationVND)} \u20AB)
`),n.appendMarkdown(`- **T\u1ED5ng Tokens:** \`${C.formatNumber(e.totalTokens)}\` tokens
`),n.appendMarkdown(`- **Active Coding Time:** \`${i}\` (${e.totalSessions} sessions)

`),e.models.length>0){n.appendMarkdown(`**Models S\u1EED D\u1EE5ng:**
`);for(let d of e.models)n.appendMarkdown(`- **${d.displayName}:** ${d.percentageOfCost}% ($${d.costUSD.toFixed(3)})
`)}n.appendMarkdown(`
*Nh\u1EA5p \u0111\u1EC3 m\u1EDF menu qu\u1EA3n l\xFD & xu\u1EA5t b\xE1o c\xE1o.*`)}this.statusBarItem.tooltip=n}dispose(){this.statusBarItem.dispose()}};var K=E(require("vscode"));var de=class{constructor(e,t,o,s,r){this._extensionUri=e;this._currentConfig=t,this._onRefreshCallback=o,this._onExportCallback=s,this._onUpdateConfigCallback=r}_view;_currentReport=null;_currentConfig;_onRefreshCallback;_onExportCallback;_onUpdateConfigCallback;resolveWebviewView(e,t,o){this._view=e,e.webview.options={enableScripts:!0,localResourceRoots:[this._extensionUri]},e.webview.html=this._getHtmlForWebview(e.webview),e.webview.onDidReceiveMessage(async s=>{switch(s.type){case"refresh":await this._onRefreshCallback(s.workspacePath,s.dateFilter);break;case"exportReport":await this._onExportCallback(s.format||"markdown");break;case"updateConfig":await this._onUpdateConfigCallback(s.config);break;case"copySummary":{if(this._currentReport){let r=this._currentConfig.language==="en",c=this._currentConfig.currency==="VND",l=c?`${C.formatNumber(this._currentReport.totalCostVND)} \u20AB`:`$${this._currentReport.totalCostUSD.toFixed(3)}`,i=c?`${C.formatNumber(this._currentReport.valuation.recommendedValuationVND)} \u20AB`:`$${this._currentReport.valuation.recommendedValuationUSD.toFixed(2)}`,n="";r?(n=`\u{1F4CA} [Acost] Project: ${this._currentReport.projectName}
- AI Token Cost: ${l}
- Recommended Valuation: ${i}
- Total Tokens: ${C.formatNumber(this._currentReport.totalTokens)}
- Active Time: ${C.formatDuration(this._currentReport.activeDurationSeconds)} (${this._currentReport.totalSessions} sessions)`,K.window.showInformationMessage("Valuation summary copied to clipboard!")):(n=`\u{1F4CA} [Acost] D\u1EF1 \xE1n: ${this._currentReport.projectName}
- Chi ph\xED Token AI: ${l}
- \u0110\u1ECBnh gi\xE1 \u0111\u1EC1 xu\u1EA5t: ${i}
- T\u1ED5ng Tokens: ${C.formatNumber(this._currentReport.totalTokens)}
- Active Time: ${C.formatDuration(this._currentReport.activeDurationSeconds)} (${this._currentReport.totalSessions} sessions)`,K.window.showInformationMessage("\u0110\xE3 sao ch\xE9p t\xF3m t\u1EAFt \u0111\u1ECBnh gi\xE1 v\xE0o Clipboard!")),await K.env.clipboard.writeText(n)}break}case"openSettings":K.commands.executeCommand("workbench.action.openSettings","acost");break}}),this._currentReport&&this.updateReport(this._currentReport,this._currentConfig)}updateReport(e,t){this._currentReport=e,this._currentConfig=t,this._view&&this._view.webview.postMessage({type:"update",report:e,config:t,translations:le})}_getHtmlForWebview(e){return`<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Acost - AI Project Cost & Valuation</title>
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

        /* Project Switcher & Search Bar */
        .project-select-box {
            margin-bottom: 10px;
            display: flex;
            flex-direction: column;
            gap: 6px;
            position: relative;
        }
        .search-input-wrapper {
            position: relative;
            display: flex;
            align-items: center;
        }
        .search-icon {
            position: absolute;
            left: 8px;
            font-size: 12px;
            color: var(--text-muted);
            pointer-events: none;
        }
        .project-search-input {
            width: 100%;
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            color: var(--text-color);
            padding: 6px 26px 6px 26px;
            border-radius: 6px;
            font-size: 12px;
            outline: none;
            transition: all 0.2s ease;
        }
        .project-search-input:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.3);
        }
        .btn-clear-search {
            position: absolute;
            right: 6px;
            background: transparent;
            border: none;
            color: var(--text-muted);
            font-size: 14px;
            cursor: pointer;
            padding: 0 4px;
            display: none;
            line-height: 1;
        }
        .btn-clear-search:hover {
            color: var(--text-color);
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
            outline: none;
        }
        .select-full:focus {
            border-color: var(--primary);
        }
        .search-results-popup {
            position: absolute;
            top: 68px;
            left: 0;
            right: 0;
            background: #1e1e24;
            border: 1px solid var(--card-border);
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.5);
            max-height: 220px;
            overflow-y: auto;
            z-index: 100;
            display: none;
        }
        .search-result-item {
            padding: 8px 10px;
            border-bottom: 1px solid rgba(255,255,255,0.05);
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 11px;
        }
        .search-result-item:hover {
            background: rgba(56, 189, 248, 0.15);
        }
        .search-result-item.active-item {
            background: rgba(56, 189, 248, 0.25);
            border-left: 3px solid var(--primary);
        }
        .search-result-name {
            font-weight: 600;
            color: #fff;
            max-width: 180px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .search-result-path {
            font-size: 10px;
            color: var(--text-muted);
            max-width: 180px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .search-result-cost {
            font-weight: 700;
            color: var(--primary);
            text-align: right;
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
            width: 110px;
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
            <span id="txtHeaderTitle">\u2728 AI Project Cost</span>
        </div>
        <div class="header-actions">
            <button class="btn-icon" id="btnRefresh" title="L\xE0m m\u1EDBi d\u1EEF li\u1EC7u">\u{1F504}</button>
            <button class="btn-icon" id="btnSettings" title="C\xE0i \u0111\u1EB7t">\u2699\uFE0F</button>
        </div>
    </div>

    <!-- Project Switcher & Search Bar -->
    <div class="project-select-box">
        <div class="search-input-wrapper">
            <span class="search-icon">\u{1F50D}</span>
            <input type="text" class="project-search-input" id="inputSearchProject" placeholder="\u{1F50D} T\xECm ki\u1EBFm d\u1EF1 \xE1n..." autocomplete="off" />
            <button class="btn-clear-search" id="btnClearSearch" title="X\xF3a t\xECm ki\u1EBFm">\u2715</button>
        </div>
        <select class="select-full" id="selectProject">
            <option value="CURRENT">Loading projects...</option>
        </select>
        <div class="search-results-popup" id="searchResultsPopup"></div>
    </div>

    <!-- Filter Pills -->
    <div class="filter-pills">
        <div class="pill active" id="pillAll" data-filter="all">T\u1EA5t c\u1EA3</div>
        <div class="pill" id="pillToday" data-filter="today">H\xF4m nay</div>
        <div class="pill" id="pill7d" data-filter="7d">7 ng\xE0y</div>
        <div class="pill" id="pill30d" data-filter="30d">30 ng\xE0y</div>
    </div>

    <!-- Hero Card: Valuation -->
    <div class="hero-card">
        <button class="btn-copy-float" id="btnCopySummary" title="Sao ch\xE9p t\xF3m t\u1EAFt">\u{1F4CB} Copy</button>
        <div class="hero-label" id="txtValHeroLabel">\u0110\u1ECBnh Gi\xE1 Ho\xE0n Th\xE0nh \u0110\u1EC1 Xu\u1EA5t</div>
        <div class="hero-value" id="valRecommended">$0.00</div>
        <div class="hero-sub" id="valSub">Markup x2.5 + C\xF4ng v\u1EADn h\xE0nh AI</div>
    </div>

    <!-- Stats Grid -->
    <div class="grid-2">
        <div class="stat-card">
            <div class="stat-label" id="txtStatApiCost">Chi Ph\xED AI Token</div>
            <div class="stat-val" id="statApiCost">$0.00</div>
            <div class="stat-sub" id="statApiTokens">0 tokens</div>
        </div>
        <div class="stat-card">
            <div class="stat-label" id="txtStatHumanCost">Dev Truy\u1EC1n Th\u1ED1ng</div>
            <div class="stat-val" id="statHumanCost">$0</div>
            <div class="stat-sub" id="statHumanHours">0h @ $25/h</div>
        </div>
        <div class="stat-card">
            <div class="stat-label" id="txtStatActiveTime">Active Coding Time</div>
            <div class="stat-val" id="statActiveTime">0s</div>
            <div class="stat-sub" id="statSessions">0 sessions</div>
        </div>
        <div class="stat-card">
            <div class="stat-label" id="txtStatSavings">Ti\u1EBFt Ki\u1EC7m Ng\xE2n S\xE1ch</div>
            <div class="stat-val" style="color: var(--success);" id="statSavings">$0</div>
            <div class="stat-sub" id="statSavingsPct">0% ti\u1EBFt ki\u1EC7m</div>
        </div>
    </div>

    <!-- Pricing / Valuation Settings -->
    <div class="section-title">
        <span id="txtValParamsTitle">\u2699\uFE0F Tham S\u1ED1 \u0110\u1ECBnh Gi\xE1</span>
    </div>
    <div class="controls-card">
        <div class="form-group">
            <span class="form-label" id="txtLangLabel">Ng\xF4n ng\u1EEF</span>
            <select class="form-select" id="selectLanguage">
                <option value="vi">\u{1F1FB}\u{1F1F3} Ti\u1EBFng Vi\u1EC7t</option>
                <option value="en">\u{1F1EC}\u{1F1E7} English</option>
            </select>
        </div>
        <div class="form-group">
            <span class="form-label" id="txtCurrLabel">Ti\u1EC1n t\u1EC7</span>
            <select class="form-select" id="selectCurrency">
                <option value="USD">USD ($)</option>
                <option value="VND">VND (\u20AB)</option>
            </select>
        </div>
        <div class="form-group">
            <span class="form-label" id="txtMarkupLabel">Markup Multiplier</span>
            <input class="form-input" type="number" step="0.1" min="1" max="10" id="inputMarkup" value="2.5" />
        </div>
        <div class="form-group">
            <span class="form-label" id="txtHourlyRateLabel">Dev Hourly Rate ($)</span>
            <input class="form-input" type="number" step="1" min="5" max="200" id="inputHourlyRate" value="25" />
        </div>
    </div>

    <!-- Models Breakdown -->
    <div class="section-title">
        <span id="txtModelsTitle">\u{1F916} T\u1EF7 L\u1EC7 AI Models</span>
    </div>
    <div class="model-list" id="modelList">
        <div class="empty-state" id="txtModelEmpty">\u0110ang t\u1EA3i d\u1EEF li\u1EC7u...</div>
    </div>

    <!-- Actions -->
    <div class="action-grid">
        <button class="btn-primary" id="btnExportMd">\u{1F4C4} Xu\u1EA5t Markdown</button>
        <button class="btn-secondary" id="btnExportHtml">\u{1F310} Xu\u1EA5t HTML / In</button>
    </div>

    <!-- Tabs for Sessions vs Top Files -->
    <div style="margin-top: 18px;">
        <div class="tab-bar">
            <div class="tab-item active" id="tabSessionsBtn">\u{1F4DD} <span id="txtTabSessions">Phi\xEAn G\u1EA7n \u0110\xE2y</span> (<span id="sessionCount">0</span>)</div>
            <div class="tab-item" id="tabFilesBtn">\u{1F4C2} <span id="txtTabFiles">File Chi Ph\xED Cao</span> (<span id="fileCount">0</span>)</div>
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
        let i18nDict = {};
        let allProjectsCache = [];
        let currentReportCache = null;
        let currentConfigCache = null;

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

        function removeVietnameseTones(str) {
            if (!str) return '';
            return str
                .normalize('NFD')
                .replace(/[\u0300-\u036F]/g, '')
                .replace(/\u0111/g, 'd')
                .replace(/\u0110/g, 'D')
                .toLowerCase();
        }

        window.addEventListener('message', event => {
            const message = event.data;
            if (message.type === 'update') {
                i18nDict = message.translations || {};
                currentReportCache = message.report;
                currentConfigCache = message.config;
                allProjectsCache = message.report.allProjects || [];
                render(message.report, message.config);
            }
        });

        function populateProjectOptions(filterText = '') {
            const selectProject = document.getElementById('selectProject');
            if (!currentReportCache || !currentConfigCache) return;

            const lang = currentConfigCache.language || 'vi';
            const t = (i18nDict[lang]) || (i18nDict.vi) || {};
            const isVnd = currentConfigCache.currency === 'VND';
            const curPrefix = t.currentProjectPrefix || '\u{1F4CD} D\u1EF1 \xE1n hi\u1EC7n t\u1EA1i';
            const allOpt = t.allProjectsOption || '\u{1F310} T\u1EA5t C\u1EA3 D\u1EF1 \xC1n Trong M\xE1y';

            const query = removeVietnameseTones(filterText.trim());

            let optionsHtml = '';
            // Always allow Current Workspace and All Projects
            if (!query || 'du an hien tai current project'.includes(query) || removeVietnameseTones(currentReportCache.projectName).includes(query)) {
                optionsHtml += '<option value="CURRENT">' + curPrefix + ' (' + currentReportCache.projectName + ')</option>';
            }
            if (!query || 'tat ca du an all projects'.includes(query)) {
                optionsHtml += '<option value="ALL">' + allOpt + '</option>';
            }

            const matchedProjects = allProjectsCache.filter(p => {
                if (!query) return true;
                const pName = removeVietnameseTones(p.projectName);
                const pPath = removeVietnameseTones(p.workspacePath);
                return pName.includes(query) || pPath.includes(query);
            });

            for (const p of matchedProjects) {
                const pCost = isVnd ? formatNumber(p.totalCostVND) + ' \u20AB' : '$' + p.totalCostUSD.toFixed(2);
                optionsHtml += '<option value="' + p.workspacePath + '">' + p.projectName + ' (' + pCost + ')</option>';
            }

            if (matchedProjects.length === 0 && optionsHtml === '') {
                optionsHtml = '<option value="" disabled>' + (t.noProjectsFound || 'Kh\xF4ng t\xECm th\u1EA5y d\u1EF1 \xE1n...') + '</option>';
            }

            selectProject.innerHTML = optionsHtml;
            if (currentSelectedWs && selectProject.querySelector('option[value="' + currentSelectedWs + '"]')) {
                selectProject.value = currentSelectedWs;
            }
        }

        function renderSearchResultsPopup(filterText) {
            const popup = document.getElementById('searchResultsPopup');
            const clearBtn = document.getElementById('btnClearSearch');
            const query = removeVietnameseTones(filterText.trim());

            if (!query) {
                popup.style.display = 'none';
                clearBtn.style.display = 'none';
                return;
            }

            clearBtn.style.display = 'block';
            if (!currentReportCache || !currentConfigCache) return;

            const lang = currentConfigCache.language || 'vi';
            const t = (i18nDict[lang]) || (i18nDict.vi) || {};
            const isVnd = currentConfigCache.currency === 'VND';

            const matched = allProjectsCache.filter(p => {
                const pName = removeVietnameseTones(p.projectName);
                const pPath = removeVietnameseTones(p.workspacePath);
                return pName.includes(query) || pPath.includes(query);
            });

            let popupHtml = '';

            // Th\xEAm option "T\u1EA5t C\u1EA3 D\u1EF1 \xC1n" n\u1EBFu query kh\u1EDBp
            if ('tat ca all'.includes(query)) {
                popupHtml += \`
                <div class="search-result-item" data-value="ALL">
                    <div>
                        <div class="search-result-name">\u{1F310} \${t.allProjectsOption || 'T\u1EA5t C\u1EA3 D\u1EF1 \xC1n'}</div>
                        <div class="search-result-path">To\xE0n b\u1ED9 workspace tr\xEAn m\xE1y</div>
                    </div>
                </div>\`;
            }

            if (matched.length === 0 && !popupHtml) {
                popupHtml = '<div style="padding: 10px; text-align: center; color: var(--text-muted); font-size: 11px;">' + (t.noProjectsFound || 'Kh\xF4ng t\xECm th\u1EA5y d\u1EF1 \xE1n.') + '</div>';
            } else {
                for (const p of matched.slice(0, 30)) {
                    const pCost = isVnd ? formatNumber(p.totalCostVND) + ' \u20AB' : '$' + p.totalCostUSD.toFixed(2);
                    const isActive = currentSelectedWs === p.workspacePath ? 'active-item' : '';
                    popupHtml += \`
                    <div class="search-result-item \${isActive}" data-value="\${p.workspacePath}">
                        <div>
                            <div class="search-result-name" title="\${p.projectName}">\u{1F4C1} \${p.projectName}</div>
                            <div class="search-result-path" title="\${p.workspacePath}">\${p.workspacePath}</div>
                        </div>
                        <div class="search-result-cost">
                            <div>\${pCost}</div>
                            <div style="font-size: 9px; color: var(--text-muted); font-weight: normal;">\${p.totalSessions} sess</div>
                        </div>
                    </div>\`;
                }
            }

            popup.innerHTML = popupHtml;
            popup.style.display = 'block';

            // Bind click cho c\xE1c items trong popup
            popup.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', () => {
                    const val = item.getAttribute('data-value');
                    currentSelectedWs = val;
                    popup.style.display = 'none';
                    document.getElementById('inputSearchProject').value = '';
                    clearBtn.style.display = 'none';
                    populateProjectOptions('');
                    const selectProject = document.getElementById('selectProject');
                    selectProject.value = val;
                    vscode.postMessage({
                        type: 'refresh',
                        workspacePath: currentSelectedWs,
                        dateFilter: currentFilter
                    });
                });
            });
        }

        function render(report, config) {
            if (!report) return;

            const lang = config.language || 'vi';
            const t = (i18nDict[lang]) || (i18nDict.vi) || {};
            const isEn = lang === 'en';
            const isVnd = config.currency === 'VND';

            // C\u1EADp nh\u1EADt text \u0111a ng\xF4n ng\u1EEF
            document.getElementById('txtHeaderTitle').innerText = t.dashboardTitle || '\u2728 AI Project Cost';
            document.getElementById('btnRefresh').title = t.refreshTooltip || 'L\xE0m m\u1EDBi';
            document.getElementById('btnSettings').title = t.settingsTooltip || 'C\xE0i \u0111\u1EB7t';
            document.getElementById('inputSearchProject').placeholder = t.searchProjectsPlaceholder || '\u{1F50D} T\xECm ki\u1EBFm d\u1EF1 \xE1n...';

            document.getElementById('pillAll').innerText = t.allTime || 'T\u1EA5t c\u1EA3';
            document.getElementById('pillToday').innerText = t.today || 'H\xF4m nay';
            document.getElementById('pill7d').innerText = t.last7Days || '7 ng\xE0y';
            document.getElementById('pill30d').innerText = t.last30Days || '30 ng\xE0y';

            document.getElementById('txtValHeroLabel').innerText = t.valuationHeroLabel || '\u0110\u1ECBnh Gi\xE1 Ho\xE0n Th\xE0nh \u0110\u1EC1 Xu\u1EA5t';
            document.getElementById('txtStatApiCost').innerText = t.statApiCost || 'Chi Ph\xED AI Token';
            document.getElementById('txtStatHumanCost').innerText = t.statHumanCost || 'Dev Truy\u1EC1n Th\u1ED1ng';
            document.getElementById('txtStatActiveTime').innerText = t.statActiveTime || 'Active Coding Time';
            document.getElementById('txtStatSavings').innerText = t.statSavings || 'Ti\u1EBFt Ki\u1EC7m Ng\xE2n S\xE1ch';

            document.getElementById('txtValParamsTitle').innerText = t.valuationParamsTitle || '\u2699\uFE0F Tham S\u1ED1 \u0110\u1ECBnh Gi\xE1';
            document.getElementById('txtLangLabel').innerText = t.languageLabel || 'Ng\xF4n ng\u1EEF';
            document.getElementById('txtCurrLabel').innerText = t.currencyLabel || 'Ti\u1EC1n t\u1EC7';
            document.getElementById('txtMarkupLabel').innerText = t.markupLabel || 'Markup Multiplier';
            document.getElementById('txtHourlyRateLabel').innerText = t.hourlyRateLabel || 'Dev Hourly Rate ($)';

            document.getElementById('txtModelsTitle').innerText = t.modelsBreakdownTitle || '\u{1F916} T\u1EF7 L\u1EC7 AI Models';
            document.getElementById('btnExportMd').innerText = t.exportMarkdownBtn || '\u{1F4C4} Xu\u1EA5t Markdown';
            document.getElementById('btnExportHtml').innerText = t.exportHtmlBtn || '\u{1F310} Xu\u1EA5t HTML / In';
            document.getElementById('txtTabSessions').innerText = t.tabSessionsTitle || 'Phi\xEAn G\u1EA7n \u0110\xE2y';
            document.getElementById('txtTabFiles').innerText = t.tabFilesTitle || 'File Chi Ph\xED Cao';

            // Select inputs value update
            document.getElementById('selectLanguage').value = lang;
            document.getElementById('selectCurrency').value = config.currency;
            document.getElementById('inputMarkup').value = config.markupMultiplier;
            document.getElementById('inputHourlyRate').value = config.humanHourlyRate;

            // Populate Project Switcher
            const searchVal = document.getElementById('inputSearchProject').value;
            populateProjectOptions(searchVal);

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
            const subTemplate = t.valuationHeroSub || 'Markup x{markup} + C\xF4ng v\u1EADn h\xE0nh AI';
            document.getElementById('valSub').innerText = subTemplate.replace('{markup}', report.valuation.markupMultiplier);

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
            const sessSuffix = t.sessionsCountSuffix || 'sessions';
            const turnsSuffix = t.turnsCountSuffix || 'turns';
            document.getElementById('statSessions').innerText = report.totalSessions + ' ' + sessSuffix + ' (' + report.totalTurns + ' ' + turnsSuffix + ')';

            const savingsVal = isVnd
                ? formatNumber(report.valuation.savingsVND) + ' \u20AB'
                : '$' + report.valuation.savingsUSD;
            const savingsPct = report.valuation.humanCostEquivalentUSD > 0
                ? Math.round((report.valuation.savingsUSD / report.valuation.humanCostEquivalentUSD) * 100)
                : 0;
            document.getElementById('statSavings').innerText = savingsVal;
            const savTemplate = t.statSavingsPct || '{pct}% ti\u1EBFt ki\u1EC7m';
            document.getElementById('statSavingsPct').innerText = savTemplate.replace('{pct}', savingsPct);

            // Render Models
            const modelListEl = document.getElementById('modelList');
            if (!report.models || report.models.length === 0) {
                modelListEl.innerHTML = '<div class="empty-state">' + (t.noModelData || 'Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u.') + '</div>';
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
                sessionListEl.innerHTML = '<div class="empty-state">' + (t.noSessionData || 'Ch\u01B0a c\xF3 session.') + '</div>';
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
                fileListEl.innerHTML = '<div class="empty-state">' + (t.noFileData || 'Ch\u01B0a c\xF3 file.') + '</div>';
            } else {
                const touchesSuffix = t.touchesSuffix || 'l\u1EA7n s\u1EEDa';
                fileListEl.innerHTML = report.topFiles.slice(0, 15).map(f => {
                    const costDisplay = isVnd ? formatNumber(Math.round(f.estimatedCostUSD * config.vndExchangeRate)) + ' \u20AB' : '$' + f.estimatedCostUSD.toFixed(3);
                    return \`
                    <div class="list-item">
                        <div class="list-title" title="\${f.filePath}">\${f.fileName}</div>
                        <div class="list-meta">
                            <span>\${f.touchesCount} \${touchesSuffix} \u2022 ~\${formatNumber(f.estimatedTokens)} tok</span>
                            <strong>\${costDisplay}</strong>
                        </div>
                    </div>
                    \`;
                }).join('');
            }
        }

        // Live Search Projects Input
        const searchInput = document.getElementById('inputSearchProject');
        const clearSearchBtn = document.getElementById('btnClearSearch');

        searchInput.addEventListener('input', (e) => {
            const val = e.target.value;
            populateProjectOptions(val);
            renderSearchResultsPopup(val);
        });

        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            populateProjectOptions('');
            renderSearchResultsPopup('');
            searchInput.focus();
        });

        // \u0110\xF3ng popup khi click ra ngo\xE0i
        document.addEventListener('click', (e) => {
            const popup = document.getElementById('searchResultsPopup');
            const box = document.querySelector('.project-select-box');
            if (box && !box.contains(e.target)) {
                popup.style.display = 'none';
            }
        });

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

        document.getElementById('selectLanguage').addEventListener('change', (e) => {
            vscode.postMessage({
                type: 'updateConfig',
                config: { language: e.target.value }
            });
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
</html>`}};var M=E(require("vscode")),ue=E(require("https")),q=E(require("fs")),Me=E(require("path")),$e=E(require("os"));function Te(a,e){let t=a.replace(/^v/,"").split(".").map(Number),o=e.replace(/^v/,"").split(".").map(Number);for(let s=0;s<Math.max(t.length,o.length);s++){let r=t[s]||0,c=o[s]||0;if(c>r)return!0;if(c<r)return!1}return!1}var pe="trinhhaox",me="acost",Oe=`https://api.github.com/repos/${pe}/${me}/releases/latest`,He=`https://api.github.com/repos/${pe}/${me}/tags`;async function te(a,e,t=!1){try{let o=a.extension.packageJSON.version||"1.0.0",r=(e.language||"vi")==="en";ue.get(Oe,{headers:{"User-Agent":"Acost-Extension",Accept:"application/vnd.github.v3+json"}},l=>{let i="";l.on("data",n=>{i+=n}),l.on("end",async()=>{if(l.statusCode===200)try{let n=JSON.parse(i),g=(n.tag_name||"").replace(/^v/,"");if(g&&Te(o,g)){let v="";if(Array.isArray(n.assets)){let P=n.assets.find(R=>R.name&&R.name.endsWith(".vsix"));P&&P.browser_download_url&&(v=P.browser_download_url)}await Ee(g,n.html_url,v,r)}else if(t){let v=r?`Acost is up to date (v${o}).`:`Acost \u0111\xE3 l\xE0 phi\xEAn b\u1EA3n m\u1EDBi nh\u1EA5t (v${o}).`;M.window.showInformationMessage(v)}}catch{De(o,r,t)}else De(o,r,t)})}).on("error",l=>{t&&M.window.showErrorMessage(r?`Failed to check for updates: ${l.message}`:`L\u1ED7i khi ki\u1EC3m tra c\u1EADp nh\u1EADt: ${l.message}`)})}catch(o){t&&M.window.showErrorMessage(`Update check error: ${o?.message||o}`)}}function De(a,e,t){ue.get(He,{headers:{"User-Agent":"Acost-Extension",Accept:"application/vnd.github.v3+json"}},s=>{let r="";s.on("data",c=>{r+=c}),s.on("end",async()=>{if(s.statusCode===200)try{let c=JSON.parse(r);if(Array.isArray(c)&&c.length>0){let i=(c[0].name||"").replace(/^v/,"");if(i&&Te(a,i)){let n=`https://github.com/${pe}/${me}/releases`;await Ee(i,n,"",e);return}}}catch{}if(t){let c=e?`Acost is up to date (v${a}).`:`Acost \u0111\xE3 l\xE0 phi\xEAn b\u1EA3n m\u1EDBi nh\u1EA5t (v${a}).`;M.window.showInformationMessage(c)}})}).on("error",()=>{})}async function Ee(a,e,t,o){let s=o?"\u26A1 1-Click Update":"\u26A1 C\u1EADp Nh\u1EADt T\u1EF1 \u0110\u1ED9ng",r=o?"\u{1F310} Open GitHub":"\u{1F310} Xem B\u1EA3n Ph\xE1t H\xE0nh",c=o?"Later":"\u0110\u1EC3 Sau",l=o?`\u{1F680} Acost v${a} is now available! Would you like to update?`:`\u{1F680} \u0110\xE3 c\xF3 phi\xEAn b\u1EA3n m\u1EDBi Acost v${a}! B\u1EA1n c\xF3 mu\u1ED1n c\u1EADp nh\u1EADt ngay kh\xF4ng?`,i=t?[s,r,c]:[r,c],n=await M.window.showInformationMessage(l,...i);n===s&&t?await We(t,a,o):n===r&&M.env.openExternal(M.Uri.parse(e))}async function We(a,e,t){let o=t?`Downloading Acost v${e}...`:`\u0110ang t\u1EA3i b\u1EA3n c\u1EADp nh\u1EADt Acost v${e}...`;await M.window.withProgress({location:M.ProgressLocation.Notification,title:o,cancellable:!1},async s=>{let r=Me.join($e.tmpdir(),`acost-${e}-${Date.now()}.vsix`);try{await Ge(a,r,g=>{s.report({message:`${g}%`})});let c=t?"Installing update...":"\u0110ang c\xE0i \u0111\u1EB7t c\u1EADp nh\u1EADt...";s.report({message:c});let l=M.Uri.file(r);await M.commands.executeCommand("workbench.extensions.installExtension",l);let i=t?"\u{1F504} Reload Window":"\u{1F504} Kh\u1EDFi \u0110\u1ED9ng L\u1EA1i",n=t?`\u{1F389} Acost has been updated to v${e}! Please reload to apply changes.`:`\u{1F389} \u0110\xE3 c\u1EADp nh\u1EADt Acost l\xEAn v${e} th\xE0nh c\xF4ng! Vui l\xF2ng kh\u1EDFi \u0111\u1ED9ng l\u1EA1i \u0111\u1EC3 \xE1p d\u1EE5ng.`;await M.window.showInformationMessage(n,i)===i&&await M.commands.executeCommand("workbench.action.reloadWindow")}catch(c){let l=t?`Failed to automatically update: ${c.message}. Please download manually.`:`Kh\xF4ng th\u1EC3 t\u1EF1 \u0111\u1ED9ng c\u1EADp nh\u1EADt: ${c.message}. Vui l\xF2ng t\u1EA3i th\u1EE7 c\xF4ng t\u1EEB GitHub.`,i=t?"Download Manually":"T\u1EA3i Th\u1EE7 C\xF4ng";await M.window.showErrorMessage(l,i)===i&&M.env.openExternal(M.Uri.parse(`https://github.com/${pe}/${me}/releases`))}finally{try{q.existsSync(r)&&q.unlinkSync(r)}catch{}}})}function Ge(a,e,t){return new Promise((o,s)=>{let r=c=>{ue.get(c,{headers:{"User-Agent":"Acost-Extension"}},i=>{if((i.statusCode===301||i.statusCode===302||i.statusCode===307)&&i.headers.location){r(i.headers.location);return}if(i.statusCode!==200){s(new Error(`Server returned HTTP ${i.statusCode}`));return}let n=parseInt(i.headers["content-length"]||"0",10),d=0,g=q.createWriteStream(e);i.pipe(g),i.on("data",v=>{if(d+=v.length,n>0&&t){let P=Math.round(d/n*100);t(P)}}),g.on("finish",()=>{g.close(),o()}),g.on("error",v=>{q.unlink(e,()=>{}),s(v)})}).on("error",i=>{q.unlink(e,()=>{}),s(i)})};r(a)})}var X,xe,Se,I=null,S,ge=null,he=null,fe=null,oe,Ne="all";function Ae(){let a=b.workspace.getConfiguration("acost"),e=b.workspace.getConfiguration("antigravityCost"),t=(b.env.language.startsWith("vi"),"vi");return{language:a.get("language",e.get("language",t)),currency:a.get("currency",e.get("currency","USD")),vndExchangeRate:a.get("vndExchangeRate",e.get("vndExchangeRate",25500)),markupMultiplier:a.get("markupMultiplier",e.get("markupMultiplier",2.5)),humanHourlyRate:a.get("humanHourlyRate",e.get("humanHourlyRate",25)),customPricing:a.get("customPricing",e.get("customPricing",{}))}}function Ie(){if(oe&&oe!=="CURRENT")return oe==="ALL"?void 0:oe;let a=b.workspace.workspaceFolders;if(a&&a.length>0)return a[0].uri.fsPath}async function F(a=!1,e,t){e!==void 0&&(oe=e),t!==void 0&&(Ne=t);let o=Ie();I=await X.scanWorkspace(o,Ne),xe.update(I,S),Se.updateReport(I,S),a&&I&&(S.language==="en"?b.window.showInformationMessage(`Acost [${I.projectName}]: Scanned ${I.totalSessions} sessions (${C.formatNumber(I.totalTokens)} tokens, ~$${I.totalCostUSD.toFixed(3)})`):b.window.showInformationMessage(`Acost [${I.projectName}]: \u0110\xE3 qu\xE9t ${I.totalSessions} sessions (${C.formatNumber(I.totalTokens)} tokens, ~$${I.totalCostUSD.toFixed(3)})`))}async function ne(a="markdown"){let e=ee(S.language);if(!I||I.totalSessions===0){b.window.showWarningMessage(S.language==="en"?"No cost data available to export.":"Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u chi ph\xED \u0111\u1EC3 xu\u1EA5t b\xE1o c\xE1o.");return}let o=Ie()||b.Uri.file(process.cwd()).fsPath,s="PROJECT_VALUATION_REPORT.md",r="";a==="html"?(s="PROJECT_VALUATION_REPORT.html",r=C.generateHtml(I,S)):a==="json"?(s="project_cost_data.json",r=C.generateJson(I)):r=C.generateMarkdown(I,S);let c=ve.join(o,s);try{z.writeFileSync(c,r,"utf8");let l=e.openFile,i=e.reportExportSuccess.replace("{filename}",s);if(await b.window.showInformationMessage(i,l)===l){let d=await b.workspace.openTextDocument(b.Uri.file(c));await b.window.showTextDocument(d)}}catch(l){b.window.showErrorMessage(e.exportError.replace("{err}",l?.message||l))}}function qe(){let a=null,e=()=>{a&&clearTimeout(a),a=setTimeout(()=>{F()},1500)};try{let t=ve.join(ye.homedir(),".gemini","antigravity-ide","brain");z.existsSync(t)&&(he=z.watch(t,{recursive:!0},(o,s)=>{s&&s.endsWith("transcript.jsonl")&&e()}))}catch{}try{let t=ve.join(ye.homedir(),".claude","projects");z.existsSync(t)&&(fe=z.watch(t,{recursive:!0},(o,s)=>{s&&s.endsWith(".jsonl")&&e()}))}catch{}}function ze(a){if(S=Ae(),X=new re(S),xe=new ce,Se=new de(a.extensionUri,S,async(t,o)=>{await F(!0,t,o)},async t=>{await ne(t)},async t=>{S={...S,...t},X.updateConfig(S),I&&await F()}),a.subscriptions.push(b.window.registerWebviewViewProvider("acost.sidebar",Se)),a.subscriptions.push(xe),a.subscriptions.push(b.commands.registerCommand("acost.refresh",async()=>{await F(!0)})),a.subscriptions.push(b.commands.registerCommand("acost.exportReport",async()=>{await ne("markdown")})),a.subscriptions.push(b.commands.registerCommand("acost.exportHtmlReport",async()=>{await ne("html")})),a.subscriptions.push(b.commands.registerCommand("acost.openDashboard",()=>{b.commands.executeCommand("acost.sidebar.focus")})),a.subscriptions.push(b.commands.registerCommand("acost.checkUpdate",async()=>{await te(a,S,!0)})),a.subscriptions.push(b.commands.registerCommand("acost.menu",async()=>{let t=ee(S.language),o=[{id:"dashboard",label:t.menuOpenDashboard,description:t.menuOpenDashboardDesc},{id:"refresh",label:t.menuRefresh,description:t.menuRefreshDesc},{id:"export_md",label:t.menuExportMd,description:t.menuExportMdDesc},{id:"export_html",label:t.menuExportHtml,description:t.menuExportHtmlDesc},{id:"check_update",label:t.menuCheckUpdate,description:t.menuCheckUpdateDesc},{id:"toggle_currency",label:t.menuToggleCurrency,description:`Current: ${S.currency}`},{id:"toggle_language",label:t.menuToggleLanguage,description:`Current: ${S.language==="en"?"\u{1F1EC}\u{1F1E7} English":"\u{1F1FB}\u{1F1F3} Ti\u1EBFng Vi\u1EC7t"}`},{id:"settings",label:t.menuSettings,description:t.menuSettingsDesc}],s=await b.window.showQuickPick(o,{placeHolder:`Acost - AI Cost & Valuation (${S.language.toUpperCase()})`});if(s)switch(s.id){case"dashboard":b.commands.executeCommand("acost.sidebar.focus");break;case"refresh":await F(!0);break;case"export_md":await ne("markdown");break;case"export_html":await ne("html");break;case"check_update":await te(a,S,!0);break;case"toggle_currency":{let r=S.currency==="USD"?"VND":"USD";S.currency=r,X.updateConfig(S),await F(),b.window.showInformationMessage(S.language==="en"?`Switched currency to: ${r}`:`\u0110\xE3 \u0111\u1ED5i \u0111\u01A1n v\u1ECB ti\u1EC1n t\u1EC7 sang: ${r}`);break}case"toggle_language":{let r=S.language==="vi"?"en":"vi";S.language=r,X.updateConfig(S),await F(),b.window.showInformationMessage(r==="en"?"Switched language to English \u{1F1EC}\u{1F1E7}":"\u0110\xE3 \u0111\u1ED5i ng\xF4n ng\u1EEF sang Ti\u1EBFng Vi\u1EC7t \u{1F1FB}\u{1F1F3}");break}case"settings":b.commands.executeCommand("workbench.action.openSettings","acost");break}})),a.subscriptions.push(b.workspace.onDidChangeConfiguration(async t=>{(t.affectsConfiguration("acost")||t.affectsConfiguration("antigravityCost"))&&(S=Ae(),X.updateConfig(S),await F())})),a.subscriptions.push(b.workspace.onDidChangeWorkspaceFolders(async()=>{await F()})),qe(),setTimeout(()=>{F()},1e3),b.workspace.getConfiguration("acost").get("autoCheckUpdates",b.workspace.getConfiguration("antigravityCost").get("autoCheckUpdates",!0))){setTimeout(()=>{te(a,S,!1)},3e3);let t=2*60*60*1e3,o=setInterval(()=>{te(a,S,!1)},t);a.subscriptions.push({dispose:()=>clearInterval(o)})}ge=setInterval(()=>{F()},6e4)}function Je(){ge&&(clearInterval(ge),ge=null),he&&(he.close(),he=null),fe&&(fe.close(),fe=null)}0&&(module.exports={activate,deactivate});
