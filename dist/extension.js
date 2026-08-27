"use strict";var Nt=Object.create;var nt=Object.defineProperty;var At=Object.getOwnPropertyDescriptor;var It=Object.getOwnPropertyNames;var Rt=Object.getPrototypeOf,Ut=Object.prototype.hasOwnProperty;var Lt=(s,t)=>{for(var e in t)nt(s,e,{get:t[e],enumerable:!0})},kt=(s,t,e,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of It(t))!Ut.call(s,o)&&o!==e&&nt(s,o,{get:()=>t[o],enumerable:!(i=At(t,o))||i.enumerable});return s};var N=(s,t,e)=>(e=s!=null?Nt(Rt(s)):{},kt(t||!s||!s.__esModule?nt(e,"default",{value:s,enumerable:!0}):e,s)),Vt=s=>kt(nt({},"__esModule",{value:!0}),s);var Gt={};Lt(Gt,{activate:()=>Ot,deactivate:()=>Ht});module.exports=Vt(Gt);var b=N(require("vscode")),z=N(require("fs")),pt=N(require("path")),Tt=N(require("os"));var R=N(require("fs")),$=N(require("path")),gt=N(require("os"));var Ft={"gemini-3.7-flash":{displayName:"Gemini 3.7 Flash",provider:"Google",inputPricePerMillion:.15,outputPricePerMillion:.6,cacheReadPricePerMillion:.0375},"gemini-3.6-flash":{displayName:"Gemini 3.6 Flash",provider:"Google",inputPricePerMillion:.15,outputPricePerMillion:.6,cacheReadPricePerMillion:.0375},"gemini-3.5-flash":{displayName:"Gemini 3.5 Flash",provider:"Google",inputPricePerMillion:.1,outputPricePerMillion:.4,cacheReadPricePerMillion:.025},"gemini-3.1-pro":{displayName:"Gemini 3.1 Pro",provider:"Google",inputPricePerMillion:1.25,outputPricePerMillion:5,cacheReadPricePerMillion:.3125},"gemini-2.5-pro":{displayName:"Gemini 2.5 Pro",provider:"Google",inputPricePerMillion:1.25,outputPricePerMillion:5,cacheReadPricePerMillion:.3125},"gemini-2.5-flash":{displayName:"Gemini 2.5 Flash",provider:"Google",inputPricePerMillion:.075,outputPricePerMillion:.3,cacheReadPricePerMillion:.01875},"gemini-1.5-pro":{displayName:"Gemini 1.5 Pro",provider:"Google",inputPricePerMillion:1.25,outputPricePerMillion:5,cacheReadPricePerMillion:.3125},"gemini-1.5-flash":{displayName:"Gemini 1.5 Flash",provider:"Google",inputPricePerMillion:.075,outputPricePerMillion:.3,cacheReadPricePerMillion:.01875},"claude-sonnet-4.6":{displayName:"Claude Sonnet 4.6 (Thinking)",provider:"Anthropic",inputPricePerMillion:3,outputPricePerMillion:15,cacheReadPricePerMillion:.3},"claude-opus-4.6":{displayName:"Claude Opus 4.6 (Thinking)",provider:"Anthropic",inputPricePerMillion:15,outputPricePerMillion:75,cacheReadPricePerMillion:1.5},"claude-3.7-sonnet":{displayName:"Claude 3.7 Sonnet",provider:"Anthropic",inputPricePerMillion:3,outputPricePerMillion:15,cacheReadPricePerMillion:.3},"claude-3.5-sonnet":{displayName:"Claude 3.5 Sonnet",provider:"Anthropic",inputPricePerMillion:3,outputPricePerMillion:15,cacheReadPricePerMillion:.3},"claude-3.5-haiku":{displayName:"Claude 3.5 Haiku",provider:"Anthropic",inputPricePerMillion:.8,outputPricePerMillion:4,cacheReadPricePerMillion:.08},"claude-3-opus":{displayName:"Claude 3 Opus",provider:"Anthropic",inputPricePerMillion:15,outputPricePerMillion:75,cacheReadPricePerMillion:1.5},"gpt-4o":{displayName:"GPT-4o",provider:"OpenAI",inputPricePerMillion:2.5,outputPricePerMillion:10,cacheReadPricePerMillion:1.25},"gpt-4o-mini":{displayName:"GPT-4o mini",provider:"OpenAI",inputPricePerMillion:.15,outputPricePerMillion:.6,cacheReadPricePerMillion:.075},"o3-mini":{displayName:"o3-mini",provider:"OpenAI",inputPricePerMillion:1.1,outputPricePerMillion:4.4,cacheReadPricePerMillion:.55},o1:{displayName:"o1",provider:"OpenAI",inputPricePerMillion:15,outputPricePerMillion:60,cacheReadPricePerMillion:7.5},default:{displayName:"Standard AI Model",provider:"Other",inputPricePerMillion:.5,outputPricePerMillion:1.5,cacheReadPricePerMillion:.1}},K=class{pricingTable;config;constructor(t){if(this.config=t,this.pricingTable={...Ft},t.customPricing)for(let[e,i]of Object.entries(t.customPricing))this.pricingTable[e]?this.pricingTable[e]={...this.pricingTable[e],...i}:i.inputPricePerMillion!==void 0&&i.outputPricePerMillion!==void 0&&(this.pricingTable[e]={displayName:i.displayName||e,provider:i.provider||"Other",inputPricePerMillion:i.inputPricePerMillion,outputPricePerMillion:i.outputPricePerMillion,cacheReadPricePerMillion:i.cacheReadPricePerMillion||0})}normalizeModelKey(t){if(!t)return"gemini-3.7-flash";let e=t.toLowerCase();return e.includes("3.7")&&e.includes("flash")?"gemini-3.7-flash":e.includes("3.6")&&e.includes("flash")?"gemini-3.6-flash":e.includes("3.5")&&e.includes("flash")?"gemini-3.5-flash":e.includes("3.1")&&e.includes("pro")?"gemini-3.1-pro":e.includes("2.5")&&e.includes("pro")?"gemini-2.5-pro":e.includes("2.5")&&e.includes("flash")?"gemini-2.5-flash":e.includes("1.5")&&e.includes("pro")?"gemini-1.5-pro":e.includes("1.5")&&e.includes("flash")?"gemini-1.5-flash":e.includes("claude")&&e.includes("sonnet")&&e.includes("4.6")?"claude-sonnet-4.6":e.includes("claude")&&e.includes("opus")&&e.includes("4.6")?"claude-opus-4.6":e.includes("claude")&&e.includes("3.7")&&e.includes("sonnet")||e.includes("claude-3-7-sonnet")?"claude-3.7-sonnet":e.includes("claude")&&e.includes("3.5")&&e.includes("sonnet")||e.includes("claude-3-5-sonnet")?"claude-3.5-sonnet":e.includes("claude")&&e.includes("haiku")||e.includes("claude-haiku")?"claude-3.5-haiku":e.includes("claude")&&e.includes("opus")||e.includes("claude-3-opus")?"claude-3-opus":e.includes("gpt-4o-mini")||e.includes("4o-mini")?"gpt-4o-mini":e.includes("gpt-4o")||e.includes("4o")?"gpt-4o":e.includes("o3-mini")?"o3-mini":e.includes("o1")?"o1":e.includes("gemini")?"gemini-3.7-flash":e.includes("claude")?"claude-3.7-sonnet":e.includes("gpt")?"gpt-4o":"default"}getModelPricing(t){let e=this.normalizeModelKey(t);return this.pricingTable[e]||this.pricingTable.default}calculateCostUSD(t,e,i,o=0,l=0,r=0){let c=this.getModelPricing(t),a=i+o,n=e/1e6*c.inputPricePerMillion,d=a/1e6*c.outputPricePerMillion,h=c.cacheReadPricePerMillion!==void 0?c.cacheReadPricePerMillion:c.inputPricePerMillion*.1,T=r/1e6*h,P=l/1e6*(c.inputPricePerMillion*1.25);return n+d+T+P}usdToVnd(t){return Math.round(t*this.config.vndExchangeRate)}calculateValuation(t,e,i,o){let l=this.usdToVnd(t),r=e/3600,c=Math.max(1,Math.round((r*4.5+i/5e4*1.5)*10)/10),a=this.config.humanHourlyRate,n=Math.round(c*a),d=this.usdToVnd(n),h=a*.6,T=r*h,P=Math.round((t*this.config.markupMultiplier+T+o*.5)*100)/100,I=this.usdToVnd(P),D=Math.max(0,n-P),k=this.usdToVnd(D);return{apiCostUSD:Math.round(t*1e4)/1e4,apiCostVND:l,humanHoursEquivalent:c,humanHourlyRate:a,humanCostEquivalentUSD:n,humanCostEquivalentVND:d,markupMultiplier:this.config.markupMultiplier,recommendedValuationUSD:P,recommendedValuationVND:I,savingsUSD:D,savingsVND:k}}};var it=N(require("fs")),G=N(require("path")),Ct=N(require("readline"));var _=class{static estimateTokens(t){if(!t||t.length===0)return 0;let e=t.length;if(e<4)return 1;let i=0,o=0,l=0;for(let d=0;d<Math.min(e,2e3);d++){let h=t.charCodeAt(d);h>255?i++:h===32||h===10||h===9||h===13?l++:(h>=33&&h<=47||h>=58&&h<=64||h>=91&&h<=96||h>=123&&h<=126)&&o++}let r=Math.min(e,2e3),c=i/r,a=o/r,n=3.8;return c>.15?n=2.6:a>.25&&(n=3.3),Math.ceil(e/n)}static estimateObjectTokens(t){if(!t)return 0;try{let e=typeof t=="string"?t:JSON.stringify(t);return this.estimateTokens(e)}catch{return 0}}};var Y=class{pricingEngine;constructor(t){this.pricingEngine=t}async parseFile(t,e){if(!it.existsSync(t))return null;let i=G.basename(G.dirname(G.dirname(t))),o=it.createReadStream(t,{encoding:"utf8"}),l=Ct.createInterface({input:o,crlfDelay:1/0}),r="",c="",a="gemini-3.7-flash",n=new Set,d=new Set,h=0,T=0,P=0,I=0,D=null,k=null,M=0,A=null;for await(let p of l)if(p.trim())try{let f=JSON.parse(p),v=f.type||"",m=f.source||"",g=f.content||"",C=f.created_at,W=null;if(C){let S=new Date(C).getTime();if(!isNaN(S)){if(W=S,(D===null||S<D)&&(D=S),(k===null||S>k)&&(k=S),A!==null){let w=(S-A)/1e3;w>0&&w<300&&(M+=w)}A=S}}if(g.includes("Model Selection")||g.includes("USER_SETTINGS_CHANGE")){let S=g.match(/Model Selection` from [^\n]+? to (.+?)\.\s*No need/i)||g.match(/Model Selection` from [^\n]+? to ([^\.\n<]+)/i)||g.match(/setting `Model Selection` from [^\n]+? to ([^\n<]+)/i);if(S&&S[1]){let w=S[1].trim();a=this.pricingEngine.normalizeModelKey(w),n.add(a)}}if(!r){let S=g.match(/\[URI\] -> \[CorpusName\]:\s*([^\s\n]+)/);if(S&&S[1])r=S[1].trim();else{let w=g.match(/Active Document:\s*([^\n\r]+)/);if(w&&w[1]){let B=w[1].trim();r=G.dirname(B)}else{let B=g.match(/@\[([^\]]+)\]/);if(B&&B[1]){let yt=B[1].trim();yt.startsWith("/")&&(r=yt)}}}}if(v==="USER_INPUT"&&!c){let S=g.match(/<USER_REQUEST>([\s\S]*?)<\/USER_REQUEST>/);S&&S[1]?c=S[1].trim().replace(/\n+/g," ").slice(0,80):c=g.replace(/<[^>]+>/g,"").trim().slice(0,80)}if(v==="USER_INPUT")I++,h+=_.estimateTokens(g);else if(v==="KNOWLEDGE_ARTIFACTS"||v==="CONVERSATION_HISTORY"||v==="SYSTEM_MESSAGE"||v==="VIEW_FILE"||v==="GREP_SEARCH"||v==="LIST_DIRECTORY"||v==="RUN_COMMAND"||v==="READ_URL_CONTENT"||v==="MCP_TOOL")h+=_.estimateTokens(g);else if(v==="PLANNER_RESPONSE"){if(f.thinking&&(P+=_.estimateTokens(f.thinking)),g&&(T+=_.estimateTokens(g)),f.tool_calls&&Array.isArray(f.tool_calls))for(let S of f.tool_calls){T+=_.estimateObjectTokens(S);let w=S.args||{},B=w.AbsolutePath||w.TargetFile||w.DirectoryPath;B&&typeof B=="string"&&B.startsWith("/")&&d.add(B.replace(/^"|"$/g,""))}}else m==="MODEL"?T+=_.estimateTokens(g):h+=_.estimateTokens(g)}catch{}if(n.size===0&&n.add(a),e&&r){let p=G.normalize(e).toLowerCase(),f=G.normalize(r).toLowerCase();if(!(f.startsWith(p)||p.startsWith(f)))return null}let V=D&&k?Math.max(1,Math.round((k-D)/1e3)):Math.max(1,Math.round(M)),F=Math.min(V,Math.max(15,Math.round(M))),j=Array.from(n)[0]||"gemini-3.7-flash",H=this.pricingEngine.calculateCostUSD(j,h,T,P),u=this.pricingEngine.usdToVnd(H);return{sessionId:i,workspacePath:r||e||"Unknown Workspace",title:c||`Session ${i.slice(0,8)}`,startTime:D?new Date(D).toISOString():new Date().toISOString(),endTime:k?new Date(k).toISOString():new Date().toISOString(),durationSeconds:V,activeTimeSeconds:F,modelsUsed:Array.from(n),turnsCount:Math.max(1,I),inputTokens:h,outputTokens:T,thinkingTokens:P,totalTokens:h+T+P,costUSD:Math.round(H*1e4)/1e4,costVND:u,filesTouched:Array.from(d),filePath:t}}};var ot=N(require("fs")),U=N(require("path")),Pt=N(require("readline")),Q=class{pricingEngine;constructor(t){this.pricingEngine=t}async parseFile(t,e){if(!ot.existsSync(t))return null;let i=U.basename(t,".jsonl"),o=ot.createReadStream(t,{encoding:"utf8"}),l=Pt.createInterface({input:o,crlfDelay:1/0}),r="",c="",a="claude-3.7-sonnet",n=new Set,d=new Set,h=0,T=0,P=0,I=0,D=0,k=null,M=null,A=0,V=null;for await(let v of l)if(v.trim())try{let m=JSON.parse(v);if(m.timestamp){let g=new Date(m.timestamp).getTime();if(!isNaN(g)){if((k===null||g<k)&&(k=g),(M===null||g>M)&&(M=g),V!==null){let C=(g-V)/1e3;C>0&&C<300&&(A+=C)}V=g}}if(m.cwd&&!r&&(r=m.cwd),m.type==="user"&&m.message){D++;let g=m.message.content,C="";typeof g=="string"?C=g:Array.isArray(g)&&(C=g.map(W=>typeof W=="string"?W:W?.text||"").filter(Boolean).join(" ")),C&&!c&&!C.startsWith("Context: This summary will")&&!C.startsWith("Warmup")&&(c=C.replace(/<[^>]+>/g,"").trim().replace(/\n+/g," ").slice(0,80))}if(m.message){if(m.message.model&&m.message.model!=="<synthetic>"){let g=this.pricingEngine.normalizeModelKey(m.message.model);a=g,n.add(g)}m.message.usage&&(h+=m.message.usage.input_tokens||0,T+=m.message.usage.output_tokens||0,P+=m.message.usage.cache_creation_input_tokens||0,I+=m.message.usage.cache_read_input_tokens||0)}if(m.type==="assistant"&&m.message&&Array.isArray(m.message.content)){for(let g of m.message.content)if(g.type==="tool_use"&&g.input){let C=g.input.file_path||g.input.path||g.input.filePath||g.input.targetFile||g.input.TargetFile||g.input.AbsolutePath;C&&typeof C=="string"&&C.startsWith("/")&&d.add(C)}}}catch{}n.size===0&&n.add(a);let F=h+T+P+I;if(F===0&&D===0)return null;if(e&&r){let v=U.normalize(e).toLowerCase(),m=U.normalize(r).toLowerCase();if(!(m===v||m.startsWith(v+U.sep)||v.startsWith(m+U.sep)||U.basename(m)&&U.basename(m)===U.basename(v)))return null}let j=k&&M?Math.max(1,Math.round((M-k)/1e3)):Math.max(1,Math.round(A)),H=Math.min(j,Math.max(10,Math.round(A))),u=Array.from(n)[0]||"claude-3.7-sonnet",p=this.pricingEngine.calculateCostUSD(u,h,T,0,P,I),f=this.pricingEngine.usdToVnd(p);return{sessionId:i,workspacePath:r||e||"Unknown Workspace",title:c||`Claude Code Session ${i.slice(0,8)}`,startTime:k?new Date(k).toISOString():new Date().toISOString(),endTime:M?new Date(M).toISOString():new Date().toISOString(),durationSeconds:j,activeTimeSeconds:H,modelsUsed:Array.from(n),turnsCount:Math.max(1,D),inputTokens:h,outputTokens:T,thinkingTokens:0,totalTokens:F,costUSD:Math.round(p*1e4)/1e4,costVND:f,filesTouched:Array.from(d),filePath:t}}};var st=class{pricingEngine;parser;claudeParser;brainDir;claudeProjectsDir;cache=new Map;constructor(t,e,i){this.pricingEngine=new K(t),this.parser=new Y(this.pricingEngine),this.claudeParser=new Q(this.pricingEngine),this.brainDir=e||$.join(gt.homedir(),".gemini","antigravity-ide","brain"),this.claudeProjectsDir=i||$.join(gt.homedir(),".claude","projects")}updateConfig(t){this.pricingEngine=new K(t),this.parser=new Y(this.pricingEngine),this.claudeParser=new Q(this.pricingEngine),this.cache.clear()}async scanWorkspace(t,e="all"){let i=t?$.basename(t):"All Projects",o=[],l=new Map;if(R.existsSync(this.brainDir))try{let u=R.readdirSync(this.brainDir);for(let p of u){let f=$.join(this.brainDir,p,".system_generated","logs","transcript.jsonl");if(R.existsSync(f))try{let v=R.statSync(f),m=this.cache.get(f),g=null;m&&m.mtime===v.mtimeMs?g=m.data:(g=await this.parser.parseFile(f),this.cache.set(f,{mtime:v.mtimeMs,data:g})),g&&(o.push(g),this.recordProjectSummary(l,g))}catch{}}}catch{}if(R.existsSync(this.claudeProjectsDir))try{let u=R.readdirSync(this.claudeProjectsDir);for(let p of u){let f=$.join(this.claudeProjectsDir,p);try{if(!R.statSync(f).isDirectory())continue;let m=R.readdirSync(f).filter(g=>g.endsWith(".jsonl"));for(let g of m){let C=$.join(f,g);try{let W=R.statSync(C),S=this.cache.get(C),w=null;S&&S.mtime===W.mtimeMs?w=S.data:(w=await this.claudeParser.parseFile(C),this.cache.set(C,{mtime:W.mtimeMs,data:w})),w&&(o.push(w),this.recordProjectSummary(l,w))}catch{}}}catch{}}}catch{}let r=[];for(let[u,p]of l.entries())r.push({workspacePath:u,projectName:u==="Unknown"?"Unknown Project":$.basename(u),totalSessions:p.sessions,totalTokens:p.tokens,totalCostUSD:Math.round(p.costUSD*1e4)/1e4,totalCostVND:this.pricingEngine.usdToVnd(p.costUSD),lastActive:p.lastActive});r.sort((u,p)=>p.totalCostUSD-u.totalCostUSD);let c=o;t&&t!=="ALL"&&t!=="All Projects"&&(c=o.filter(u=>this.isWorkspaceMatch(u.workspacePath,t)));let a=Date.now();if(e==="today"){let u=new Date;u.setHours(0,0,0,0);let p=u.getTime();c=c.filter(f=>new Date(f.startTime).getTime()>=p)}else if(e==="7d"){let u=a-6048e5;c=c.filter(p=>new Date(p.startTime).getTime()>=u)}else if(e==="30d"){let u=a-2592e6;c=c.filter(p=>new Date(p.startTime).getTime()>=u)}c.sort((u,p)=>new Date(p.startTime).getTime()-new Date(u.startTime).getTime());let n=0,d=0,h=0,T=0,P=0,I=0,D=0,k=new Map,M=new Map;for(let u of c){n+=u.inputTokens,d+=u.outputTokens,h+=u.thinkingTokens,T+=u.costUSD,P+=u.activeTimeSeconds,I+=u.durationSeconds,D+=u.turnsCount;for(let p of u.modelsUsed){let f=k.get(p)||{input:0,output:0,thinking:0,costUSD:0},v=1/u.modelsUsed.length;f.input+=Math.round(u.inputTokens*v),f.output+=Math.round(u.outputTokens*v),f.thinking+=Math.round(u.thinkingTokens*v),f.costUSD+=u.costUSD*v,k.set(p,f)}if(u.filesTouched&&u.filesTouched.length>0){let p=Math.round(u.totalTokens/u.filesTouched.length),f=u.costUSD/u.filesTouched.length;for(let v of u.filesTouched){let m=M.get(v)||{count:0,estimatedTokens:0,costUSD:0};m.count++,m.estimatedTokens+=p,m.costUSD+=f,M.set(v,m)}}}let A=n+d+h,V=this.pricingEngine.usdToVnd(T),F=[];for(let[u,p]of k.entries()){let f=this.pricingEngine.getModelPricing(u),v=p.input+p.output+p.thinking;F.push({modelName:u,displayName:f.displayName||u,provider:f.provider||"Other",inputTokens:p.input,outputTokens:p.output,thinkingTokens:p.thinking,totalTokens:v,costUSD:Math.round(p.costUSD*1e4)/1e4,costVND:this.pricingEngine.usdToVnd(p.costUSD),percentageOfCost:T>0?Math.round(p.costUSD/T*1e3)/10:0,percentageOfTokens:A>0?Math.round(v/A*1e3)/10:0})}F.sort((u,p)=>p.costUSD-u.costUSD);let j=[];for(let[u,p]of M.entries())j.push({fileName:$.basename(u),filePath:u,touchesCount:p.count,estimatedTokens:p.estimatedTokens,estimatedCostUSD:Math.round(p.costUSD*1e4)/1e4});j.sort((u,p)=>p.estimatedCostUSD-u.estimatedCostUSD);let H=this.pricingEngine.calculateValuation(T,P,A,D);return{workspacePath:t||"All Workspaces",projectName:t&&t!=="ALL"?i:"T\u1EA5t C\u1EA3 D\u1EF1 \xC1n",generatedAt:new Date().toISOString(),dateFilter:e,totalSessions:c.length,totalTurns:D,totalInputTokens:n,totalOutputTokens:d,totalThinkingTokens:h,totalTokens:A,totalCostUSD:Math.round(T*1e4)/1e4,totalCostVND:V,activeDurationSeconds:P,totalDurationSeconds:I,models:F,topFiles:j.slice(0,20),sessions:c,allProjects:r,valuation:H}}recordProjectSummary(t,e){let i=e.workspacePath||"Unknown",o=t.get(i)||{sessions:0,tokens:0,costUSD:0,lastActive:e.startTime};o.sessions++,o.tokens+=e.totalTokens,o.costUSD+=e.costUSD,new Date(e.startTime).getTime()>new Date(o.lastActive).getTime()&&(o.lastActive=e.startTime),t.set(i,o)}isWorkspaceMatch(t,e){if(!t||!e)return!1;let i=$.normalize(t).toLowerCase(),o=$.normalize(e).toLowerCase();if(i===o||i.startsWith(o+$.sep)||o.startsWith(i+$.sep))return!0;let l=$.basename(i),r=$.basename(o);return!!(l&&r&&l===r)}buildEmptyReport(t,e,i){let o=this.pricingEngine.calculateValuation(0,0,0,0);return{workspacePath:t,projectName:e,generatedAt:new Date().toISOString(),dateFilter:i,totalSessions:0,totalTurns:0,totalInputTokens:0,totalOutputTokens:0,totalThinkingTokens:0,totalTokens:0,totalCostUSD:0,totalCostVND:0,activeDurationSeconds:0,totalDurationSeconds:0,models:[],topFiles:[],sessions:[],allProjects:[],valuation:o}}};var y=class{static formatNumber(t){return new Intl.NumberFormat("en-US").format(Math.round(t))}static formatDuration(t){if(t<=0)return"0s";let e=Math.floor(t/3600),i=Math.floor(t%3600/60),o=Math.floor(t%60),l=[];return e>0&&l.push(`${e}h`),i>0&&l.push(`${i}m`),(o>0||l.length===0)&&l.push(`${o}s`),l.join(" ")}static generateMarkdown(t,e){let i=e.language==="en",o=e.currency==="VND",l=(n,d)=>o?`${this.formatNumber(d)} \u20AB (${n.toFixed(4)} USD)`:`$${n.toFixed(4)} (${this.formatNumber(d)} \u20AB)`,r=(n,d)=>o?`${this.formatNumber(d)} \u20AB ($${n.toFixed(2)} USD)`:`$${n.toFixed(2)} (${this.formatNumber(d)} \u20AB)`,c=i?"en-US":"vi-VN";if(i){let n=`# \u{1F4CA} AI PROJECT VALUATION & COST REPORT

`;n+=`> **Project:** \`${t.projectName}\`  
`,n+=`> **Workspace:** \`${t.workspacePath}\`  
`,n+=`> **Generated Date:** \`${new Date(t.generatedAt).toLocaleString(c)}\`  
`,n+=`> **Measurement Tool:** Acost - AI Project Cost & Valuation Extension v1.3.0

`,n+=`---

`,n+=`## 1. \u{1F4B0} Executive Valuation & Cost Summary

`,n+=`| Metric | Measured Value | Notes |
`,n+=`| :--- | :--- | :--- |
`,n+=`| **Total Actual AI API Cost** | **${l(t.totalCostUSD,t.totalCostVND)}** | Raw token cost paid to AI model providers |
`,n+=`| **Recommended Project Valuation** | **${r(t.valuation.recommendedValuationUSD,t.valuation.recommendedValuationVND)}** | Applied **x${t.valuation.markupMultiplier}** Markup + AI Prompt Engineering Operator Cost |
`,n+=`| **Equivalent Traditional Dev Cost** | **${r(t.valuation.humanCostEquivalentUSD,t.valuation.humanCostEquivalentVND)}** | Estimated ${t.valuation.humanHoursEquivalent} hrs @ $${t.valuation.humanHourlyRate}/hr |
`,n+=`| **Budget Savings vs Traditional Dev** | **${r(t.valuation.savingsUSD,t.valuation.savingsVND)}** | Saved ~${t.valuation.humanCostEquivalentUSD>0?Math.round(t.valuation.savingsUSD/t.valuation.humanCostEquivalentUSD*100):0}% engineering budget |
`,n+=`| **Total Tokens Consumed** | **${this.formatNumber(t.totalTokens)} tokens** | In: ${this.formatNumber(t.totalInputTokens)} | Out: ${this.formatNumber(t.totalOutputTokens)} | Thinking: ${this.formatNumber(t.totalThinkingTokens)} |
`,n+=`| **Active Coding Duration** | **${this.formatDuration(t.activeDurationSeconds)}** | Total active AI generation & thinking duration |
`,n+=`| **Total Coding Sessions** | **${t.totalSessions} sessions** | ${t.totalTurns} prompts & turn interactions |

`,n+=`## 2. \u{1F916} AI Models Breakdown

`,n+=`| AI Model | Provider | Input Tokens | Output Tokens | Thinking Tokens | Cost (USD) | Cost Share |
`,n+=`| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
`;for(let d of t.models)n+=`| **${d.displayName}** | ${d.provider} | ${this.formatNumber(d.inputTokens)} | ${this.formatNumber(d.outputTokens)} | ${this.formatNumber(d.thinkingTokens)} | $${d.costUSD.toFixed(4)} | **${d.percentageOfCost}%** |
`;if(n+=`
`,t.topFiles&&t.topFiles.length>0){n+=`## 3. \u{1F4C2} Top Cost Impact Files

`,n+=`| File Name | Touches/Edits | Est. Tokens | Est. Cost (USD) |
`,n+=`| :--- | :--- | :--- | :--- |
`;for(let d of t.topFiles.slice(0,10))n+=`| \`${d.fileName}\` | ${d.touchesCount} edits | ~${this.formatNumber(d.estimatedTokens)} | $${d.estimatedCostUSD.toFixed(4)} |
`;n+=`
`}n+=`## 4. \u{1F4DD} Detailed Coding Sessions Breakdown

`,n+=`| Timestamp | User Request / Task | Models | Tokens | Active Time | Cost (USD) |
`,n+=`| :--- | :--- | :--- | :--- | :--- | :--- |
`;for(let d of t.sessions.slice(0,50)){let h=new Date(d.startTime).toLocaleString(c),T=d.title.replace(/\|/g,"\\|"),P=d.modelsUsed.join(", ");n+=`| ${h} | ${T} | ${P} | ${this.formatNumber(d.totalTokens)} | ${this.formatDuration(d.activeTimeSeconds)} | $${d.costUSD.toFixed(4)} |
`}return t.sessions.length>50&&(n+=`
*...and ${t.sessions.length-50} other sessions aggregated into total cost metrics.*
`),n+=`
---
`,n+=`*Report automatically generated by [Acost - AI Project Cost & Valuation Extension](file://${t.workspacePath}).*
`,n}let a=`# \u{1F4CA} B\xC1O C\xC1O \u0110\u1ECANH GI\xC1 & CHI PH\xCD L\u1EACP TR\xCCNH AI (AI PROJECT VALUATION REPORT)

`;a+=`> **D\u1EF1 \xE1n:** \`${t.projectName}\`  
`,a+=`> **\u0110\u01B0\u1EDDng d\u1EABn:** \`${t.workspacePath}\`  
`,a+=`> **Th\u1EDDi gian xu\u1EA5t b\xE1o c\xE1o:** \`${new Date(t.generatedAt).toLocaleString(c)}\`  
`,a+=`> **C\xF4ng c\u1EE5 \u0111o l\u01B0\u1EDDng:** Acost - AI Project Cost & Valuation Extension v1.3.0

`,a+=`---

`,a+=`## 1. \u{1F4B0} T\u1ED5ng Quan \u0110\u1ECBnh Gi\xE1 & Chi Ph\xED (Executive Summary)

`,a+=`| Ch\u1EC9 S\u1ED1 | Gi\xE1 Tr\u1ECB \u0110o L\u01B0\u1EDDng | Ghi Ch\xFA |
`,a+=`| :--- | :--- | :--- |
`,a+=`| **T\u1ED5ng Chi Ph\xED AI API Th\u1EF1c T\u1EBF** | **${l(t.totalCostUSD,t.totalCostVND)}** | Chi ph\xED token tr\u1EA3 cho nh\xE0 cung c\u1EA5p AI |
`,a+=`| **\u0110\u1ECBnh Gi\xE1 Ho\xE0n Th\xE0nh \u0110\u1EC1 Xu\u1EA5t** | **${r(t.valuation.recommendedValuationUSD,t.valuation.recommendedValuationVND)}** | \xC1p d\u1EE5ng h\u1EC7 s\u1ED1 Markup **x${t.valuation.markupMultiplier}** + C\xF4ng v\u1EADn h\xE0nh AI |
`,a+=`| **Chi Ph\xED Dev Truy\u1EC1n Th\u1ED1ng T\u01B0\u01A1ng \u0110\u01B0\u01A1ng** | **${r(t.valuation.humanCostEquivalentUSD,t.valuation.humanCostEquivalentVND)}** | \u01AF\u1EDBc t\xEDnh ${t.valuation.humanHoursEquivalent}h @ $${t.valuation.humanHourlyRate}/h |
`,a+=`| **Ti\u1EBFt Ki\u1EC7m So V\u1EDBi Dev Truy\u1EC1n Th\u1ED1ng** | **${r(t.valuation.savingsUSD,t.valuation.savingsVND)}** | Ti\u1EBFt ki\u1EC7m ~${t.valuation.humanCostEquivalentUSD>0?Math.round(t.valuation.savingsUSD/t.valuation.humanCostEquivalentUSD*100):0}% ng\xE2n s\xE1ch |
`,a+=`| **T\u1ED5ng Token Ti\xEAu Th\u1EE5** | **${this.formatNumber(t.totalTokens)} tokens** | In: ${this.formatNumber(t.totalInputTokens)} | Out: ${this.formatNumber(t.totalOutputTokens)} | Thinking: ${this.formatNumber(t.totalThinkingTokens)} |
`,a+=`| **Th\u1EDDi Gian Active Coding** | **${this.formatDuration(t.activeDurationSeconds)}** | T\u1ED5ng th\u1EDDi gian AI tr\u1EF1c ti\u1EBFp t\u1EA1o code & suy ngh\u0129 |
`,a+=`| **T\u1ED5ng S\u1ED1 Phi\xEAn L\xE0m Vi\u1EC7c (Sessions)** | **${t.totalSessions} sessions** | ${t.totalTurns} l\u01B0\u1EE3t prompt/t\u01B0\u01A1ng t\xE1c |

`,a+=`## 2. \u{1F916} Ph\xE2n B\u1ED5 Theo AI Models

`,a+=`| AI Model | Nh\xE0 Cung C\u1EA5p | Input Tokens | Output Tokens | Thinking Tokens | Chi Ph\xED (USD) | T\u1EF7 L\u1EC7 Chi Ph\xED |
`,a+=`| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
`;for(let n of t.models)a+=`| **${n.displayName}** | ${n.provider} | ${this.formatNumber(n.inputTokens)} | ${this.formatNumber(n.outputTokens)} | ${this.formatNumber(n.thinkingTokens)} | $${n.costUSD.toFixed(4)} | **${n.percentageOfCost}%** |
`;if(a+=`
`,t.topFiles&&t.topFiles.length>0){a+=`## 3. \u{1F4C2} Top File Ti\xEAu T\u1ED1n Chi Ph\xED L\u1EDBn Nh\u1EA5t

`,a+=`| T\xEAn File | L\u01B0\u1EE3t Ch\u1EC9nh S\u1EEDa | \u01AF\u1EDBc T\xEDnh Tokens | \u01AF\u1EDBc T\xEDnh Chi Ph\xED (USD) |
`,a+=`| :--- | :--- | :--- | :--- |
`;for(let n of t.topFiles.slice(0,10))a+=`| \`${n.fileName}\` | ${n.touchesCount} l\u1EA7n s\u1EEDa | ~${this.formatNumber(n.estimatedTokens)} | $${n.estimatedCostUSD.toFixed(4)} |
`;a+=`
`}a+=`## 4. \u{1F4DD} L\u1ECBch S\u1EED Chi Ti\u1EBFt C\xE1c Phi\xEAn Coding (Session Breakdown)

`,a+=`| Th\u1EDDi Gian | Y\xEAu C\u1EA7u / N\u1ED9i Dung | Model | Tokens | Th\u1EDDi L\u01B0\u1EE3ng | Chi Ph\xED (USD) |
`,a+=`| :--- | :--- | :--- | :--- | :--- | :--- |
`;for(let n of t.sessions.slice(0,50)){let d=new Date(n.startTime).toLocaleString(c),h=n.title.replace(/\|/g,"\\|"),T=n.modelsUsed.join(", ");a+=`| ${d} | ${h} | ${T} | ${this.formatNumber(n.totalTokens)} | ${this.formatDuration(n.activeTimeSeconds)} | $${n.costUSD.toFixed(4)} |
`}return t.sessions.length>50&&(a+=`
*...v\xE0 ${t.sessions.length-50} phi\xEAn l\xE0m vi\u1EC7c kh\xE1c \u0111\xE3 \u0111\u01B0\u1EE3c t\u1ED5ng h\u1EE3p v\xE0o chi ph\xED chung.*
`),a+=`
---
`,a+=`*B\xE1o c\xE1o \u0111\u01B0\u1EE3c sinh t\u1EF1 \u0111\u1ED9ng b\u1EDFi [Acost - AI Project Cost & Valuation Extension](file://${t.workspacePath}).*
`,a}static generateHtml(t,e){let i=e.language==="en",o=e.currency==="VND",l=i?"en-US":"vi-VN",r=i?`Project AI Cost & Valuation Report - ${t.projectName}`:`B\xE1o C\xE1o \u0110\u1ECBnh Gi\xE1 D\u1EF1 \xC1n - ${t.projectName}`,c=i?"\u{1F4CA} AI Project Valuation & Cost Report":"\u{1F4CA} B\xE1o C\xE1o \u0110\u1ECBnh Gi\xE1 & Chi Ph\xED L\u1EADp Tr\xECnh AI",a=i?"Project":"D\u1EF1 \xE1n",n=i?"Generated Date":"Ng\xE0y t\u1EA1o",d=i?"\u{1F5A8}\uFE0F Print / Save as PDF":"\u{1F5A8}\uFE0F In / Xu\u1EA5t PDF",h=i?"Actual AI Token Cost":"Chi Ph\xED AI Token Th\u1EF1c T\u1EBF",T=i?"Recommended Valuation":"\u0110\u1ECBnh Gi\xE1 \u0110\u1EC1 Xu\u1EA5t (Valuation)",P=i?"Equivalent Traditional Dev":"Dev Truy\u1EC1n Th\u1ED1ng T\u01B0\u01A1ng \u0110\u01B0\u01A1ng",I=i?"Total Tokens Consumed":"T\u1ED5ng Tokens Ti\xEAu Th\u1EE5",D=i?"\u{1F916} AI Models Breakdown":"\u{1F916} Ph\xE2n B\u1ED5 Theo AI Models",k=i?"\u{1F4DD} Detailed Sessions Breakdown":"\u{1F4DD} Chi Ti\u1EBFt C\xE1c Phi\xEAn L\xE0m Vi\u1EC7c (Sessions)",M="AI Model",A=i?"Provider":"Nh\xE0 Cung C\u1EA5p",V="Input Tokens",F="Output Tokens",j="Thinking Tokens",H=i?"Cost (USD)":"Chi Ph\xED (USD)",u=i?"Cost Share":"T\u1EF7 L\u1EC7",p=i?"Timestamp":"Th\u1EDDi Gian",f=i?"Request / Task":"Y\xEAu C\u1EA7u / Prompt",v=i?"Duration":"Th\u1EDDi L\u01B0\u1EE3ng";return`<!DOCTYPE html>
<html lang="${i?"en":"vi"}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${r}</title>
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
            <h1>${c}</h1>
            <div class="meta">
                ${a}: <strong>${t.projectName}</strong> | Workspace: <code>${t.workspacePath}</code><br>
                ${n}: ${new Date(t.generatedAt).toLocaleString(l)}
            </div>
        </div>

        <div class="grid">
            <div class="card">
                <div class="card-label">${h}</div>
                <div class="card-value">$${t.totalCostUSD.toFixed(2)}</div>
                <div class="card-sub">${this.formatNumber(t.totalCostVND)} \u20AB</div>
            </div>
            <div class="card highlight">
                <div class="card-label">${T}</div>
                <div class="card-value">$${t.valuation.recommendedValuationUSD.toFixed(2)}</div>
                <div class="card-sub">${this.formatNumber(t.valuation.recommendedValuationVND)} \u20AB (x${t.valuation.markupMultiplier} Markup)</div>
            </div>
            <div class="card">
                <div class="card-label">${P}</div>
                <div class="card-value">$${t.valuation.humanCostEquivalentUSD}</div>
                <div class="card-sub">${t.valuation.humanHoursEquivalent}h @ $${t.valuation.humanHourlyRate}/h</div>
            </div>
            <div class="card">
                <div class="card-label">${I}</div>
                <div class="card-value">${this.formatNumber(t.totalTokens)}</div>
                <div class="card-sub">Active Time: ${this.formatDuration(t.activeDurationSeconds)}</div>
            </div>
        </div>

        <h2>${D}</h2>
        <table>
            <thead>
                <tr>
                    <th>${M}</th>
                    <th>${A}</th>
                    <th>${V}</th>
                    <th>${F}</th>
                    <th>${j}</th>
                    <th>${H}</th>
                    <th>${u}</th>
                </tr>
            </thead>
            <tbody>
                ${t.models.map(m=>`
                <tr>
                    <td><strong>${m.displayName}</strong></td>
                    <td><span class="badge ${m.provider.toLowerCase()}">${m.provider}</span></td>
                    <td>${this.formatNumber(m.inputTokens)}</td>
                    <td>${this.formatNumber(m.outputTokens)}</td>
                    <td>${this.formatNumber(m.thinkingTokens)}</td>
                    <td>$${m.costUSD.toFixed(4)}</td>
                    <td><strong>${m.percentageOfCost}%</strong></td>
                </tr>
                `).join("")}
            </tbody>
        </table>

        <h2>${k}</h2>
        <table>
            <thead>
                <tr>
                    <th>${p}</th>
                    <th>${f}</th>
                    <th>${M}</th>
                    <th>Tokens</th>
                    <th>${v}</th>
                    <th>${H}</th>
                </tr>
            </thead>
            <tbody>
                ${t.sessions.slice(0,100).map(m=>`
                <tr>
                    <td>${new Date(m.startTime).toLocaleString(l)}</td>
                    <td>${m.title}</td>
                    <td>${m.modelsUsed.join(", ")}</td>
                    <td>${this.formatNumber(m.totalTokens)}</td>
                    <td>${this.formatDuration(m.activeTimeSeconds)}</td>
                    <td>$${m.costUSD.toFixed(4)}</td>
                </tr>
                `).join("")}
            </tbody>
        </table>
    </div>
</body>
</html>`}static generateJson(t){return JSON.stringify(t,null,2)}};var q=N(require("vscode"));var at={vi:{extensionTitle:"Acost",dashboardTitle:"\u2728 Acost Dashboard",refreshTooltip:"L\xE0m m\u1EDBi d\u1EEF li\u1EC7u",settingsTooltip:"C\xE0i \u0111\u1EB7t",currentProjectPrefix:"\u{1F4CD} D\u1EF1 \xE1n hi\u1EC7n t\u1EA1i",allProjectsOption:"\u{1F310} T\u1EA5t C\u1EA3 D\u1EF1 \xC1n Trong M\xE1y",allTime:"T\u1EA5t c\u1EA3",today:"H\xF4m nay",last7Days:"7 ng\xE0y",last30Days:"30 ng\xE0y",copySummaryBtn:"\u{1F4CB} Copy",copiedNotification:"\u0110\xE3 sao ch\xE9p t\xF3m t\u1EAFt \u0111\u1ECBnh gi\xE1 v\xE0o Clipboard!",valuationHeroLabel:"\u0110\u1ECBnh Gi\xE1 Ho\xE0n Th\xE0nh \u0110\u1EC1 Xu\u1EA5t",valuationHeroSub:"Markup x{markup} + C\xF4ng v\u1EADn h\xE0nh AI",statApiCost:"Chi Ph\xED AI Token",statHumanCost:"Dev Truy\u1EC1n Th\u1ED1ng",statActiveTime:"Active Coding Time",statSavings:"Ti\u1EBFt Ki\u1EC7m Ng\xE2n S\xE1ch",statSavingsPct:"{pct}% ti\u1EBFt ki\u1EC7m",valuationParamsTitle:"\u2699\uFE0F Tham S\u1ED1 \u0110\u1ECBnh Gi\xE1",currencyLabel:"Ti\u1EC1n t\u1EC7",languageLabel:"Ng\xF4n ng\u1EEF",markupLabel:"Markup Multiplier",hourlyRateLabel:"Dev Hourly Rate ($)",modelsBreakdownTitle:"\u{1F916} T\u1EF7 L\u1EC7 AI Models",exportMarkdownBtn:"\u{1F4C4} Xu\u1EA5t Markdown",exportHtmlBtn:"\u{1F310} Xu\u1EA5t HTML / In",tabSessionsTitle:"\u{1F4DD} Phi\xEAn G\u1EA7n \u0110\xE2y",tabFilesTitle:"\u{1F4C2} File Chi Ph\xED Cao",loadingData:"\u0110ang t\u1EA3i d\u1EEF li\u1EC7u...",noModelData:"Ch\u01B0a ph\xE1t hi\u1EC7n d\u1EEF li\u1EC7u model trong b\u1ED9 l\u1ECDc n\xE0y.",noSessionData:"Ch\u01B0a c\xF3 session n\xE0o.",noFileData:"Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u file.",touchesSuffix:"l\u1EA7n s\u1EEDa",sessionsCountSuffix:"sessions",turnsCountSuffix:"turns",unknownProject:"D\u1EF1 \xE1n kh\xF4ng x\xE1c \u0111\u1ECBnh",allWorkspaces:"T\u1EA5t C\u1EA3 D\u1EF1 \xC1n",scanning:"\u0110ang qu\xE9t...",noSessionsFound:"Ch\u01B0a ph\xE1t hi\u1EC7n phi\xEAn l\xE0m vi\u1EC7c AI n\xE0o trong workspace n\xE0y.",reportExportSuccess:"\u0110\xE3 xu\u1EA5t b\xE1o c\xE1o \u0111\u1ECBnh gi\xE1 th\xE0nh c\xF4ng: {filename}",openFile:"M\u1EDF File",exportError:"L\u1ED7i khi xu\u1EA5t file b\xE1o c\xE1o: {err}",menuOpenDashboard:"$(dashboard) M\u1EDF Dashboard \u0110\u1ECBnh Gi\xE1",menuOpenDashboardDesc:"Xem chi ti\u1EBFt token, model & files",menuRefresh:"$(refresh) Qu\xE9t l\u1EA1i d\u1EEF li\u1EC7u chi ph\xED",menuRefreshDesc:"C\u1EADp nh\u1EADt l\u1EA1i to\xE0n b\u1ED9 sessions trong workspace",menuExportMd:"$(file-text) Xu\u1EA5t B\xE1o C\xE1o Markdown",menuExportMdDesc:"T\u1EA1o file PROJECT_VALUATION_REPORT.md",menuExportHtml:"$(file-code) Xu\u1EA5t B\xE1o C\xE1o HTML / PDF",menuExportHtmlDesc:"T\u1EA1o file PROJECT_VALUATION_REPORT.html \u0111\u1EC3 in",menuToggleCurrency:"$(symbol-unit) \u0110\u1ED5i Ti\u1EC1n T\u1EC7 (USD / VND)",menuToggleLanguage:"$(globe) \u0110\u1ED5i Ng\xF4n Ng\u1EEF / Switch Language",menuCheckUpdate:"$(cloud-download) Ki\u1EC3m tra phi\xEAn b\u1EA3n m\u1EDBi",menuCheckUpdateDesc:"Ki\u1EC3m tra b\u1EA3n c\u1EADp nh\u1EADt m\u1EDBi nh\u1EA5t t\u1EEB GitHub Releases",menuSettings:"$(gear) C\xE0i \u0111\u1EB7t \u0110\u1ECBnh Gi\xE1 & T\u1EF7 Gi\xE1",menuSettingsDesc:"Ch\u1EC9nh Markup, T\u1EF7 gi\xE1 VND, Dev rate, Ng\xF4n ng\u1EEF"},en:{extensionTitle:"Acost",dashboardTitle:"\u2728 Acost Dashboard",refreshTooltip:"Refresh Data",settingsTooltip:"Settings",currentProjectPrefix:"\u{1F4CD} Current Project",allProjectsOption:"\u{1F310} All Projects on Machine",allTime:"All",today:"Today",last7Days:"7 Days",last30Days:"30 Days",copySummaryBtn:"\u{1F4CB} Copy",copiedNotification:"Valuation summary copied to clipboard!",valuationHeroLabel:"Recommended Project Valuation",valuationHeroSub:"Markup x{markup} + AI Operator Cost",statApiCost:"AI Token Cost",statHumanCost:"Traditional Dev Cost",statActiveTime:"Active Coding Time",statSavings:"Budget Savings",statSavingsPct:"{pct}% savings",valuationParamsTitle:"\u2699\uFE0F Pricing & Valuation Parameters",currencyLabel:"Currency",languageLabel:"Language",markupLabel:"Markup Multiplier",hourlyRateLabel:"Dev Hourly Rate ($)",modelsBreakdownTitle:"\u{1F916} AI Models Breakdown",exportMarkdownBtn:"\u{1F4C4} Export Markdown",exportHtmlBtn:"\u{1F310} Export HTML / Print",tabSessionsTitle:"\u{1F4DD} Recent Sessions",tabFilesTitle:"\u{1F4C2} Top Cost Files",loadingData:"Loading data...",noModelData:"No model data found for this filter.",noSessionData:"No sessions found.",noFileData:"No file data available.",touchesSuffix:"edits",sessionsCountSuffix:"sessions",turnsCountSuffix:"turns",unknownProject:"Unknown Project",allWorkspaces:"All Projects",scanning:"Scanning...",noSessionsFound:"No AI sessions detected in this workspace yet.",reportExportSuccess:"Successfully exported project valuation report: {filename}",openFile:"Open File",exportError:"Error exporting report: {err}",menuOpenDashboard:"$(dashboard) Open Valuation Dashboard",menuOpenDashboardDesc:"View detailed tokens, models & file breakdown",menuRefresh:"$(refresh) Refresh Cost Data",menuRefreshDesc:"Rescan all sessions in current workspace",menuExportMd:"$(file-text) Export Markdown Report",menuExportMdDesc:"Generate PROJECT_VALUATION_REPORT.md file",menuExportHtml:"$(file-code) Export HTML / PDF Report",menuExportHtmlDesc:"Generate PROJECT_VALUATION_REPORT.html for printing",menuToggleCurrency:"$(symbol-unit) Switch Currency (USD / VND)",menuToggleLanguage:"$(globe) Switch Language / \u0110\u1ED5i Ng\xF4n Ng\u1EEF",menuCheckUpdate:"$(cloud-download) Check for Updates",menuCheckUpdateDesc:"Check for the latest release on GitHub",menuSettings:"$(gear) Extension Settings",menuSettingsDesc:"Configure Markup, Exchange Rate, Hourly Rate, Language"}};function Z(s="vi"){return at[s]||at.vi}var rt=class{statusBarItem;constructor(){this.statusBarItem=q.window.createStatusBarItem(q.StatusBarAlignment.Right,95),this.statusBarItem.command="acost.menu",this.statusBarItem.text="$(sparkle) Acost: Scanning...",this.statusBarItem.tooltip="\u0110ang qu\xE9t d\u1EEF li\u1EC7u chi ph\xED d\u1EF1 \xE1n...",this.statusBarItem.show()}update(t,e){let i=Z(e.language),o=e.language==="en";if(!t||t.totalSessions===0){this.statusBarItem.text="$(sparkle) Acost: $0.00",this.statusBarItem.tooltip=new q.MarkdownString(i.noSessionsFound);return}let r=e.currency==="VND"?`${y.formatNumber(t.totalCostVND)} \u20AB`:`$${t.totalCostUSD.toFixed(2)}`,c=t.totalTokens>1e6?`${(t.totalTokens/1e6).toFixed(1)}M`:`${Math.round(t.totalTokens/1e3)}k`,a=y.formatDuration(t.activeDurationSeconds);this.statusBarItem.text=`$(sparkle) Acost: ${r} (${c} tok)`;let n=new q.MarkdownString;if(n.isTrusted=!0,o){if(n.appendMarkdown(`### \u{1F4CA} **Acost - AI Cost & Valuation**

`),n.appendMarkdown(`- **AI Token Cost:** \`$${t.totalCostUSD.toFixed(4)}\` (~${y.formatNumber(t.totalCostVND)} \u20AB)
`),n.appendMarkdown(`- **Recommended Valuation:** \`$${t.valuation.recommendedValuationUSD.toFixed(2)}\` (~${y.formatNumber(t.valuation.recommendedValuationVND)} \u20AB)
`),n.appendMarkdown(`- **Total Tokens:** \`${y.formatNumber(t.totalTokens)}\` tokens
`),n.appendMarkdown(`- **Active Coding Time:** \`${a}\` (${t.totalSessions} sessions)

`),t.models.length>0){n.appendMarkdown(`**Models Used:**
`);for(let d of t.models)n.appendMarkdown(`- **${d.displayName}:** ${d.percentageOfCost}% ($${d.costUSD.toFixed(3)})
`)}n.appendMarkdown(`
*Click to open menu & export report.*`)}else{if(n.appendMarkdown(`### \u{1F4CA} **Acost - AI Cost & Valuation**

`),n.appendMarkdown(`- **Chi ph\xED AI Token:** \`$${t.totalCostUSD.toFixed(4)}\` (~${y.formatNumber(t.totalCostVND)} \u20AB)
`),n.appendMarkdown(`- **\u0110\u1ECBnh gi\xE1 \u0111\u1EC1 xu\u1EA5t:** \`$${t.valuation.recommendedValuationUSD.toFixed(2)}\` (~${y.formatNumber(t.valuation.recommendedValuationVND)} \u20AB)
`),n.appendMarkdown(`- **T\u1ED5ng Tokens:** \`${y.formatNumber(t.totalTokens)}\` tokens
`),n.appendMarkdown(`- **Active Coding Time:** \`${a}\` (${t.totalSessions} sessions)

`),t.models.length>0){n.appendMarkdown(`**Models S\u1EED D\u1EE5ng:**
`);for(let d of t.models)n.appendMarkdown(`- **${d.displayName}:** ${d.percentageOfCost}% ($${d.costUSD.toFixed(3)})
`)}n.appendMarkdown(`
*Nh\u1EA5p \u0111\u1EC3 m\u1EDF menu qu\u1EA3n l\xFD & xu\u1EA5t b\xE1o c\xE1o.*`)}this.statusBarItem.tooltip=n}dispose(){this.statusBarItem.dispose()}};var J=N(require("vscode"));var lt=class{constructor(t,e,i,o,l){this._extensionUri=t;this._currentConfig=e,this._onRefreshCallback=i,this._onExportCallback=o,this._onUpdateConfigCallback=l}_view;_currentReport=null;_currentConfig;_onRefreshCallback;_onExportCallback;_onUpdateConfigCallback;resolveWebviewView(t,e,i){this._view=t,t.webview.options={enableScripts:!0,localResourceRoots:[this._extensionUri]},t.webview.html=this._getHtmlForWebview(t.webview),t.webview.onDidReceiveMessage(async o=>{switch(o.type){case"refresh":await this._onRefreshCallback(o.workspacePath,o.dateFilter);break;case"exportReport":await this._onExportCallback(o.format||"markdown");break;case"updateConfig":await this._onUpdateConfigCallback(o.config);break;case"copySummary":{if(this._currentReport){let l=this._currentConfig.language==="en",r=this._currentConfig.currency==="VND",c=r?`${y.formatNumber(this._currentReport.totalCostVND)} \u20AB`:`$${this._currentReport.totalCostUSD.toFixed(3)}`,a=r?`${y.formatNumber(this._currentReport.valuation.recommendedValuationVND)} \u20AB`:`$${this._currentReport.valuation.recommendedValuationUSD.toFixed(2)}`,n="";l?(n=`\u{1F4CA} [Acost] Project: ${this._currentReport.projectName}
- AI Token Cost: ${c}
- Recommended Valuation: ${a}
- Total Tokens: ${y.formatNumber(this._currentReport.totalTokens)}
- Active Time: ${y.formatDuration(this._currentReport.activeDurationSeconds)} (${this._currentReport.totalSessions} sessions)`,J.window.showInformationMessage("Valuation summary copied to clipboard!")):(n=`\u{1F4CA} [Acost] D\u1EF1 \xE1n: ${this._currentReport.projectName}
- Chi ph\xED Token AI: ${c}
- \u0110\u1ECBnh gi\xE1 \u0111\u1EC1 xu\u1EA5t: ${a}
- T\u1ED5ng Tokens: ${y.formatNumber(this._currentReport.totalTokens)}
- Active Time: ${y.formatDuration(this._currentReport.activeDurationSeconds)} (${this._currentReport.totalSessions} sessions)`,J.window.showInformationMessage("\u0110\xE3 sao ch\xE9p t\xF3m t\u1EAFt \u0111\u1ECBnh gi\xE1 v\xE0o Clipboard!")),await J.env.clipboard.writeText(n)}break}case"openSettings":J.commands.executeCommand("workbench.action.openSettings","acost");break}}),this._currentReport&&this.updateReport(this._currentReport,this._currentConfig)}updateReport(t,e){this._currentReport=t,this._currentConfig=e,this._view&&this._view.webview.postMessage({type:"update",report:t,config:e,translations:at})}_getHtmlForWebview(t){return`<!DOCTYPE html>
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

    <!-- Project Switcher -->
    <div class="project-select-box">
        <select class="select-full" id="selectProject">
            <option value="CURRENT">Loading projects...</option>
        </select>
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
                i18nDict = message.translations || {};
                render(message.report, message.config);
            }
        });

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

            // Project Switcher populate
            const selectProject = document.getElementById('selectProject');
            if (report.allProjects && report.allProjects.length > 0) {
                const curPrefix = t.currentProjectPrefix || '\u{1F4CD} D\u1EF1 \xE1n hi\u1EC7n t\u1EA1i';
                const allOpt = t.allProjectsOption || '\u{1F310} T\u1EA5t C\u1EA3 D\u1EF1 \xC1n Trong M\xE1y';
                let optionsHtml = '<option value="CURRENT">' + curPrefix + ' (' + report.projectName + ')</option>';
                optionsHtml += '<option value="ALL">' + allOpt + '</option>';
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
</html>`}};var O=N(require("vscode")),ft=N(require("https"));function ht(s,t){let e=s.replace(/^v/,"").split(".").map(Number),i=t.replace(/^v/,"").split(".").map(Number);for(let o=0;o<Math.max(e.length,i.length);o++){let l=e[o]||0,r=i[o]||0;if(r>l)return!0;if(r<l)return!1}return!1}var vt="trinhhaox",bt="acost",jt=`https://api.github.com/repos/${vt}/${bt}/releases/latest`,Bt=`https://api.github.com/repos/${vt}/${bt}/tags`;async function ct(s,t,e=!1){try{let i=s.extension.packageJSON.version||"1.0.0",l=(t.language||"vi")==="en";ft.get(jt,{headers:{"User-Agent":"Acost-Extension",Accept:"application/vnd.github.v3+json"}},c=>{let a="";c.on("data",n=>{a+=n}),c.on("end",()=>{if(c.statusCode===200)try{let n=JSON.parse(a),h=(n.tag_name||"").replace(/^v/,"");if(h&&ht(i,h))wt(h,n.html_url,l);else if(e){let T=l?`Acost is up to date (v${i}).`:`Acost \u0111\xE3 l\xE0 phi\xEAn b\u1EA3n m\u1EDBi nh\u1EA5t (v${i}).`;O.window.showInformationMessage(T)}}catch{Dt(i,l,e)}else Dt(i,l,e)})}).on("error",c=>{e&&O.window.showErrorMessage(l?`Failed to check for updates: ${c.message}`:`L\u1ED7i khi ki\u1EC3m tra c\u1EADp nh\u1EADt: ${c.message}`)})}catch(i){e&&O.window.showErrorMessage(`Update check error: ${i?.message||i}`)}}function Dt(s,t,e){ft.get(Bt,{headers:{"User-Agent":"Acost-Extension",Accept:"application/vnd.github.v3+json"}},o=>{let l="";o.on("data",r=>{l+=r}),o.on("end",()=>{if(o.statusCode===200)try{let r=JSON.parse(l);if(Array.isArray(r)&&r.length>0){let a=(r[0].name||"").replace(/^v/,"");if(a&&ht(s,a)){let n=`https://github.com/${vt}/${bt}/releases`;wt(a,n,t);return}}}catch{}if(e){let r=t?`Acost is up to date (v${s}).`:`Acost \u0111\xE3 l\xE0 phi\xEAn b\u1EA3n m\u1EDBi nh\u1EA5t (v${s}).`;O.window.showInformationMessage(r)}})}).on("error",()=>{})}async function wt(s,t,e){let i=e?"Download Update":"T\u1EA3i V\u1EC1 Ngay",o=e?"View Changelog":"Xem Chi Ti\u1EBFt",l=e?`\u{1F680} A new version of Acost (v${s}) is available on GitHub!`:`\u{1F680} \u0110\xE3 c\xF3 phi\xEAn b\u1EA3n m\u1EDBi c\u1EE7a Acost (v${s}) tr\xEAn GitHub!`,r=await O.window.showInformationMessage(l,i,o);(r===i||r===o)&&O.env.openExternal(O.Uri.parse(t))}var X,xt,St,E=null,x,dt=null,ut=null,mt=null,et,Mt="all";function $t(){let s=b.workspace.getConfiguration("acost"),t=b.workspace.getConfiguration("antigravityCost"),e=(b.env.language.startsWith("vi"),"vi");return{language:s.get("language",t.get("language",e)),currency:s.get("currency",t.get("currency","USD")),vndExchangeRate:s.get("vndExchangeRate",t.get("vndExchangeRate",25500)),markupMultiplier:s.get("markupMultiplier",t.get("markupMultiplier",2.5)),humanHourlyRate:s.get("humanHourlyRate",t.get("humanHourlyRate",25)),customPricing:s.get("customPricing",t.get("customPricing",{}))}}function Et(){if(et&&et!=="CURRENT")return et==="ALL"?void 0:et;let s=b.workspace.workspaceFolders;if(s&&s.length>0)return s[0].uri.fsPath}async function L(s=!1,t,e){t!==void 0&&(et=t),e!==void 0&&(Mt=e);let i=Et();E=await X.scanWorkspace(i,Mt),xt.update(E,x),St.updateReport(E,x),s&&E&&(x.language==="en"?b.window.showInformationMessage(`Acost [${E.projectName}]: Scanned ${E.totalSessions} sessions (${y.formatNumber(E.totalTokens)} tokens, ~$${E.totalCostUSD.toFixed(3)})`):b.window.showInformationMessage(`Acost [${E.projectName}]: \u0110\xE3 qu\xE9t ${E.totalSessions} sessions (${y.formatNumber(E.totalTokens)} tokens, ~$${E.totalCostUSD.toFixed(3)})`))}async function tt(s="markdown"){let t=Z(x.language);if(!E||E.totalSessions===0){b.window.showWarningMessage(x.language==="en"?"No cost data available to export.":"Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u chi ph\xED \u0111\u1EC3 xu\u1EA5t b\xE1o c\xE1o.");return}let i=Et()||b.Uri.file(process.cwd()).fsPath,o="PROJECT_VALUATION_REPORT.md",l="";s==="html"?(o="PROJECT_VALUATION_REPORT.html",l=y.generateHtml(E,x)):s==="json"?(o="project_cost_data.json",l=y.generateJson(E)):l=y.generateMarkdown(E,x);let r=pt.join(i,o);try{z.writeFileSync(r,l,"utf8");let c=t.openFile,a=t.reportExportSuccess.replace("{filename}",o);if(await b.window.showInformationMessage(a,c)===c){let d=await b.workspace.openTextDocument(b.Uri.file(r));await b.window.showTextDocument(d)}}catch(c){b.window.showErrorMessage(t.exportError.replace("{err}",c?.message||c))}}function _t(){let s=null,t=()=>{s&&clearTimeout(s),s=setTimeout(()=>{L()},1500)};try{let e=pt.join(Tt.homedir(),".gemini","antigravity-ide","brain");z.existsSync(e)&&(ut=z.watch(e,{recursive:!0},(i,o)=>{o&&o.endsWith("transcript.jsonl")&&t()}))}catch{}try{let e=pt.join(Tt.homedir(),".claude","projects");z.existsSync(e)&&(mt=z.watch(e,{recursive:!0},(i,o)=>{o&&o.endsWith(".jsonl")&&t()}))}catch{}}function Ot(s){x=$t(),X=new st(x),xt=new rt,St=new lt(s.extensionUri,x,async(e,i)=>{await L(!0,e,i)},async e=>{await tt(e)},async e=>{x={...x,...e},X.updateConfig(x),E&&await L()}),s.subscriptions.push(b.window.registerWebviewViewProvider("acost.sidebar",St)),s.subscriptions.push(xt),s.subscriptions.push(b.commands.registerCommand("acost.refresh",async()=>{await L(!0)})),s.subscriptions.push(b.commands.registerCommand("acost.exportReport",async()=>{await tt("markdown")})),s.subscriptions.push(b.commands.registerCommand("acost.exportHtmlReport",async()=>{await tt("html")})),s.subscriptions.push(b.commands.registerCommand("acost.openDashboard",()=>{b.commands.executeCommand("acost.sidebar.focus")})),s.subscriptions.push(b.commands.registerCommand("acost.checkUpdate",async()=>{await ct(s,x,!0)})),s.subscriptions.push(b.commands.registerCommand("acost.menu",async()=>{let e=Z(x.language),i=[{id:"dashboard",label:e.menuOpenDashboard,description:e.menuOpenDashboardDesc},{id:"refresh",label:e.menuRefresh,description:e.menuRefreshDesc},{id:"export_md",label:e.menuExportMd,description:e.menuExportMdDesc},{id:"export_html",label:e.menuExportHtml,description:e.menuExportHtmlDesc},{id:"check_update",label:e.menuCheckUpdate,description:e.menuCheckUpdateDesc},{id:"toggle_currency",label:e.menuToggleCurrency,description:`Current: ${x.currency}`},{id:"toggle_language",label:e.menuToggleLanguage,description:`Current: ${x.language==="en"?"\u{1F1EC}\u{1F1E7} English":"\u{1F1FB}\u{1F1F3} Ti\u1EBFng Vi\u1EC7t"}`},{id:"settings",label:e.menuSettings,description:e.menuSettingsDesc}],o=await b.window.showQuickPick(i,{placeHolder:`Acost - AI Cost & Valuation (${x.language.toUpperCase()})`});if(o)switch(o.id){case"dashboard":b.commands.executeCommand("acost.sidebar.focus");break;case"refresh":await L(!0);break;case"export_md":await tt("markdown");break;case"export_html":await tt("html");break;case"check_update":await ct(s,x,!0);break;case"toggle_currency":{let l=x.currency==="USD"?"VND":"USD";x.currency=l,X.updateConfig(x),await L(),b.window.showInformationMessage(x.language==="en"?`Switched currency to: ${l}`:`\u0110\xE3 \u0111\u1ED5i \u0111\u01A1n v\u1ECB ti\u1EC1n t\u1EC7 sang: ${l}`);break}case"toggle_language":{let l=x.language==="vi"?"en":"vi";x.language=l,X.updateConfig(x),await L(),b.window.showInformationMessage(l==="en"?"Switched language to English \u{1F1EC}\u{1F1E7}":"\u0110\xE3 \u0111\u1ED5i ng\xF4n ng\u1EEF sang Ti\u1EBFng Vi\u1EC7t \u{1F1FB}\u{1F1F3}");break}case"settings":b.commands.executeCommand("workbench.action.openSettings","acost");break}})),s.subscriptions.push(b.workspace.onDidChangeConfiguration(async e=>{(e.affectsConfiguration("acost")||e.affectsConfiguration("antigravityCost"))&&(x=$t(),X.updateConfig(x),await L())})),s.subscriptions.push(b.workspace.onDidChangeWorkspaceFolders(async()=>{await L()})),_t(),setTimeout(()=>{L()},1e3),b.workspace.getConfiguration("acost").get("autoCheckUpdates",b.workspace.getConfiguration("antigravityCost").get("autoCheckUpdates",!0))&&setTimeout(()=>{ct(s,x,!1)},3e3),dt=setInterval(()=>{L()},6e4)}function Ht(){dt&&(clearInterval(dt),dt=null),ut&&(ut.close(),ut=null),mt&&(mt.close(),mt=null)}0&&(module.exports={activate,deactivate});
