"use strict";var bt=Object.create;var Z=Object.defineProperty;var Tt=Object.getOwnPropertyDescriptor;var xt=Object.getOwnPropertyNames;var yt=Object.getPrototypeOf,St=Object.prototype.hasOwnProperty;var Ct=(r,t)=>{for(var e in t)Z(r,e,{get:t[e],enumerable:!0})},ut=(r,t,e,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let c of xt(t))!St.call(r,c)&&c!==e&&Z(r,c,{get:()=>t[c],enumerable:!(i=Tt(t,c))||i.enumerable});return r};var M=(r,t,e)=>(e=r!=null?bt(yt(r)):{},ut(t||!r||!r.__esModule?Z(e,"default",{value:r,enumerable:!0}):e,r)),kt=r=>ut(Z({},"__esModule",{value:!0}),r);var $t={};Ct($t,{activate:()=>Mt,deactivate:()=>wt});module.exports=kt($t);var v=M(require("vscode")),G=M(require("fs")),ct=M(require("path")),ft=M(require("os"));var j=M(require("fs")),R=M(require("path")),pt=M(require("os"));var Pt={"gemini-3.7-flash":{displayName:"Gemini 3.7 Flash",provider:"Google",inputPricePerMillion:.15,outputPricePerMillion:.6,cacheReadPricePerMillion:.0375},"gemini-3.6-flash":{displayName:"Gemini 3.6 Flash",provider:"Google",inputPricePerMillion:.15,outputPricePerMillion:.6,cacheReadPricePerMillion:.0375},"gemini-3.5-flash":{displayName:"Gemini 3.5 Flash",provider:"Google",inputPricePerMillion:.1,outputPricePerMillion:.4,cacheReadPricePerMillion:.025},"gemini-3.1-pro":{displayName:"Gemini 3.1 Pro",provider:"Google",inputPricePerMillion:1.25,outputPricePerMillion:5,cacheReadPricePerMillion:.3125},"gemini-2.5-pro":{displayName:"Gemini 2.5 Pro",provider:"Google",inputPricePerMillion:1.25,outputPricePerMillion:5,cacheReadPricePerMillion:.3125},"gemini-2.5-flash":{displayName:"Gemini 2.5 Flash",provider:"Google",inputPricePerMillion:.075,outputPricePerMillion:.3,cacheReadPricePerMillion:.01875},"gemini-1.5-pro":{displayName:"Gemini 1.5 Pro",provider:"Google",inputPricePerMillion:1.25,outputPricePerMillion:5,cacheReadPricePerMillion:.3125},"gemini-1.5-flash":{displayName:"Gemini 1.5 Flash",provider:"Google",inputPricePerMillion:.075,outputPricePerMillion:.3,cacheReadPricePerMillion:.01875},"claude-sonnet-4.6":{displayName:"Claude Sonnet 4.6 (Thinking)",provider:"Anthropic",inputPricePerMillion:3,outputPricePerMillion:15,cacheReadPricePerMillion:.3},"claude-opus-4.6":{displayName:"Claude Opus 4.6 (Thinking)",provider:"Anthropic",inputPricePerMillion:15,outputPricePerMillion:75,cacheReadPricePerMillion:1.5},"claude-3.7-sonnet":{displayName:"Claude 3.7 Sonnet",provider:"Anthropic",inputPricePerMillion:3,outputPricePerMillion:15,cacheReadPricePerMillion:.3},"claude-3.5-sonnet":{displayName:"Claude 3.5 Sonnet",provider:"Anthropic",inputPricePerMillion:3,outputPricePerMillion:15,cacheReadPricePerMillion:.3},"claude-3.5-haiku":{displayName:"Claude 3.5 Haiku",provider:"Anthropic",inputPricePerMillion:.8,outputPricePerMillion:4,cacheReadPricePerMillion:.08},"claude-3-opus":{displayName:"Claude 3 Opus",provider:"Anthropic",inputPricePerMillion:15,outputPricePerMillion:75,cacheReadPricePerMillion:1.5},"gpt-4o":{displayName:"GPT-4o",provider:"OpenAI",inputPricePerMillion:2.5,outputPricePerMillion:10,cacheReadPricePerMillion:1.25},"gpt-4o-mini":{displayName:"GPT-4o mini",provider:"OpenAI",inputPricePerMillion:.15,outputPricePerMillion:.6,cacheReadPricePerMillion:.075},"o3-mini":{displayName:"o3-mini",provider:"OpenAI",inputPricePerMillion:1.1,outputPricePerMillion:4.4,cacheReadPricePerMillion:.55},o1:{displayName:"o1",provider:"OpenAI",inputPricePerMillion:15,outputPricePerMillion:60,cacheReadPricePerMillion:7.5},default:{displayName:"Standard AI Model",provider:"Other",inputPricePerMillion:.5,outputPricePerMillion:1.5,cacheReadPricePerMillion:.1}},J=class{pricingTable;config;constructor(t){if(this.config=t,this.pricingTable={...Pt},t.customPricing)for(let[e,i]of Object.entries(t.customPricing))this.pricingTable[e]?this.pricingTable[e]={...this.pricingTable[e],...i}:i.inputPricePerMillion!==void 0&&i.outputPricePerMillion!==void 0&&(this.pricingTable[e]={displayName:i.displayName||e,provider:i.provider||"Other",inputPricePerMillion:i.inputPricePerMillion,outputPricePerMillion:i.outputPricePerMillion,cacheReadPricePerMillion:i.cacheReadPricePerMillion||0})}normalizeModelKey(t){if(!t)return"gemini-3.7-flash";let e=t.toLowerCase();return e.includes("3.7")&&e.includes("flash")?"gemini-3.7-flash":e.includes("3.6")&&e.includes("flash")?"gemini-3.6-flash":e.includes("3.5")&&e.includes("flash")?"gemini-3.5-flash":e.includes("3.1")&&e.includes("pro")?"gemini-3.1-pro":e.includes("2.5")&&e.includes("pro")?"gemini-2.5-pro":e.includes("2.5")&&e.includes("flash")?"gemini-2.5-flash":e.includes("1.5")&&e.includes("pro")?"gemini-1.5-pro":e.includes("1.5")&&e.includes("flash")?"gemini-1.5-flash":e.includes("claude")&&e.includes("sonnet")&&e.includes("4.6")?"claude-sonnet-4.6":e.includes("claude")&&e.includes("opus")&&e.includes("4.6")?"claude-opus-4.6":e.includes("claude")&&e.includes("3.7")&&e.includes("sonnet")?"claude-3.7-sonnet":e.includes("claude")&&e.includes("3.5")&&e.includes("sonnet")?"claude-3.5-sonnet":e.includes("claude")&&e.includes("haiku")?"claude-3.5-haiku":e.includes("claude")&&e.includes("opus")?"claude-3-opus":e.includes("gpt-4o-mini")||e.includes("4o-mini")?"gpt-4o-mini":e.includes("gpt-4o")||e.includes("4o")?"gpt-4o":e.includes("o3-mini")?"o3-mini":e.includes("o1")?"o1":e.includes("gemini")?"gemini-3.7-flash":e.includes("claude")?"claude-sonnet-4.6":e.includes("gpt")?"gpt-4o":"default"}getModelPricing(t){let e=this.normalizeModelKey(t);return this.pricingTable[e]||this.pricingTable.default}calculateCostUSD(t,e,i,c=0){let u=this.getModelPricing(t),d=i+c,p=e/1e6*u.inputPricePerMillion,o=d/1e6*u.outputPricePerMillion;return p+o}usdToVnd(t){return Math.round(t*this.config.vndExchangeRate)}calculateValuation(t,e,i,c){let u=this.usdToVnd(t),d=e/3600,p=Math.max(1,Math.round((d*4.5+i/5e4*1.5)*10)/10),o=this.config.humanHourlyRate,n=Math.round(p*o),l=this.usdToVnd(n),h=o*.6,S=d*h,y=Math.round((t*this.config.markupMultiplier+S+c*.5)*100)/100,$=this.usdToVnd(y),k=Math.max(0,n-y),P=this.usdToVnd(k);return{apiCostUSD:Math.round(t*1e4)/1e4,apiCostVND:u,humanHoursEquivalent:p,humanHourlyRate:o,humanCostEquivalentUSD:n,humanCostEquivalentVND:l,markupMultiplier:this.config.markupMultiplier,recommendedValuationUSD:y,recommendedValuationVND:$,savingsUSD:k,savingsVND:P}}};var tt=M(require("fs")),V=M(require("path")),mt=M(require("readline"));var I=class{static estimateTokens(t){if(!t||t.length===0)return 0;let e=t.length;if(e<4)return 1;let i=0,c=0,u=0;for(let l=0;l<Math.min(e,2e3);l++){let h=t.charCodeAt(l);h>255?i++:h===32||h===10||h===9||h===13?u++:(h>=33&&h<=47||h>=58&&h<=64||h>=91&&h<=96||h>=123&&h<=126)&&c++}let d=Math.min(e,2e3),p=i/d,o=c/d,n=3.8;return p>.15?n=2.6:o>.25&&(n=3.3),Math.ceil(e/n)}static estimateObjectTokens(t){if(!t)return 0;try{let e=typeof t=="string"?t:JSON.stringify(t);return this.estimateTokens(e)}catch{return 0}}};var X=class{pricingEngine;constructor(t){this.pricingEngine=t}async parseFile(t,e){if(!tt.existsSync(t))return null;let i=V.basename(V.dirname(V.dirname(t))),c=tt.createReadStream(t,{encoding:"utf8"}),u=mt.createInterface({input:c,crlfDelay:1/0}),d="",p="",o="gemini-3.7-flash",n=new Set,l=new Set,h=0,S=0,y=0,$=0,k=null,P=null,E=0,A=null;for await(let s of u)if(s.trim())try{let a=JSON.parse(s),m=a.type||"",f=a.source||"",g=a.content||"",q=a.created_at,F=null;if(q){let x=new Date(q).getTime();if(!isNaN(x)){if(F=x,(k===null||x<k)&&(k=x),(P===null||x>P)&&(P=x),A!==null){let D=(x-A)/1e3;D>0&&D<300&&(E+=D)}A=x}}if(g.includes("Model Selection")||g.includes("USER_SETTINGS_CHANGE")){let x=g.match(/Model Selection` from [^\n]+? to (.+?)\.\s*No need/i)||g.match(/Model Selection` from [^\n]+? to ([^\.\n<]+)/i)||g.match(/setting `Model Selection` from [^\n]+? to ([^\n<]+)/i);if(x&&x[1]){let D=x[1].trim();o=this.pricingEngine.normalizeModelKey(D),n.add(o)}}if(!d){let x=g.match(/\[URI\] -> \[CorpusName\]:\s*([^\s\n]+)/);if(x&&x[1])d=x[1].trim();else{let D=g.match(/Active Document:\s*([^\n\r]+)/);if(D&&D[1]){let N=D[1].trim();d=V.dirname(N)}else{let N=g.match(/@\[([^\]]+)\]/);if(N&&N[1]){let dt=N[1].trim();dt.startsWith("/")&&(d=dt)}}}}if(m==="USER_INPUT"&&!p){let x=g.match(/<USER_REQUEST>([\s\S]*?)<\/USER_REQUEST>/);x&&x[1]?p=x[1].trim().replace(/\n+/g," ").slice(0,80):p=g.replace(/<[^>]+>/g,"").trim().slice(0,80)}if(m==="USER_INPUT")$++,h+=I.estimateTokens(g);else if(m==="KNOWLEDGE_ARTIFACTS"||m==="CONVERSATION_HISTORY"||m==="SYSTEM_MESSAGE"||m==="VIEW_FILE"||m==="GREP_SEARCH"||m==="LIST_DIRECTORY"||m==="RUN_COMMAND"||m==="READ_URL_CONTENT"||m==="MCP_TOOL")h+=I.estimateTokens(g);else if(m==="PLANNER_RESPONSE"){if(a.thinking&&(y+=I.estimateTokens(a.thinking)),g&&(S+=I.estimateTokens(g)),a.tool_calls&&Array.isArray(a.tool_calls))for(let x of a.tool_calls){S+=I.estimateObjectTokens(x);let D=x.args||{},N=D.AbsolutePath||D.TargetFile||D.DirectoryPath;N&&typeof N=="string"&&N.startsWith("/")&&l.add(N.replace(/^"|"$/g,""))}}else f==="MODEL"?S+=I.estimateTokens(g):h+=I.estimateTokens(g)}catch{}if(n.size===0&&n.add(o),e&&d){let s=V.normalize(e).toLowerCase(),a=V.normalize(d).toLowerCase();if(!(a.startsWith(s)||s.startsWith(a)))return null}let L=k&&P?Math.max(1,Math.round((P-k)/1e3)):Math.max(1,Math.round(E)),z=Math.min(L,Math.max(15,Math.round(E))),B=Array.from(n)[0]||"gemini-3.7-flash",U=this.pricingEngine.calculateCostUSD(B,h,S,y),W=this.pricingEngine.usdToVnd(U);return{sessionId:i,workspacePath:d||e||"Unknown Workspace",title:p||`Session ${i.slice(0,8)}`,startTime:k?new Date(k).toISOString():new Date().toISOString(),endTime:P?new Date(P).toISOString():new Date().toISOString(),durationSeconds:L,activeTimeSeconds:z,modelsUsed:Array.from(n),turnsCount:Math.max(1,$),inputTokens:h,outputTokens:S,thinkingTokens:y,totalTokens:h+S+y,costUSD:Math.round(U*1e4)/1e4,costVND:W,filesTouched:Array.from(l),filePath:t}}};var et=class{pricingEngine;parser;brainDir;cache=new Map;constructor(t,e){this.pricingEngine=new J(t),this.parser=new X(this.pricingEngine),this.brainDir=e||R.join(pt.homedir(),".gemini","antigravity-ide","brain")}updateConfig(t){this.pricingEngine=new J(t),this.parser=new X(this.pricingEngine),this.cache.clear()}async scanWorkspace(t,e="all"){let i=t?R.basename(t):"All Projects",c=[],u=new Map;if(!j.existsSync(this.brainDir))return this.buildEmptyReport(t||"",i,e);let d=[];try{d=j.readdirSync(this.brainDir)}catch{return this.buildEmptyReport(t||"",i,e)}for(let s of d){let a=R.join(this.brainDir,s,".system_generated","logs","transcript.jsonl");if(j.existsSync(a))try{let m=j.statSync(a),f=this.cache.get(a),g=null;if(f&&f.mtime===m.mtimeMs?g=f.data:(g=await this.parser.parseFile(a),this.cache.set(a,{mtime:m.mtimeMs,data:g})),g){c.push(g);let q=g.workspacePath||"Unknown",F=u.get(q)||{sessions:0,tokens:0,costUSD:0,lastActive:g.startTime};F.sessions++,F.tokens+=g.totalTokens,F.costUSD+=g.costUSD,new Date(g.startTime).getTime()>new Date(F.lastActive).getTime()&&(F.lastActive=g.startTime),u.set(q,F)}}catch{}}let p=[];for(let[s,a]of u.entries())p.push({workspacePath:s,projectName:s==="Unknown"?"Unknown Project":R.basename(s),totalSessions:a.sessions,totalTokens:a.tokens,totalCostUSD:Math.round(a.costUSD*1e4)/1e4,totalCostVND:this.pricingEngine.usdToVnd(a.costUSD),lastActive:a.lastActive});p.sort((s,a)=>a.totalCostUSD-s.totalCostUSD);let o=c;if(t&&t!=="ALL"&&t!=="All Projects"){let s=R.normalize(t).toLowerCase();o=c.filter(a=>{let m=R.normalize(a.workspacePath).toLowerCase();return m.startsWith(s)||s.startsWith(m)})}let n=Date.now();if(e==="today"){let s=new Date;s.setHours(0,0,0,0);let a=s.getTime();o=o.filter(m=>new Date(m.startTime).getTime()>=a)}else if(e==="7d"){let s=n-6048e5;o=o.filter(a=>new Date(a.startTime).getTime()>=s)}else if(e==="30d"){let s=n-2592e6;o=o.filter(a=>new Date(a.startTime).getTime()>=s)}o.sort((s,a)=>new Date(a.startTime).getTime()-new Date(s.startTime).getTime());let l=0,h=0,S=0,y=0,$=0,k=0,P=0,E=new Map,A=new Map;for(let s of o){l+=s.inputTokens,h+=s.outputTokens,S+=s.thinkingTokens,y+=s.costUSD,$+=s.activeTimeSeconds,k+=s.durationSeconds,P+=s.turnsCount;for(let a of s.modelsUsed){let m=E.get(a)||{input:0,output:0,thinking:0,costUSD:0},f=1/s.modelsUsed.length;m.input+=Math.round(s.inputTokens*f),m.output+=Math.round(s.outputTokens*f),m.thinking+=Math.round(s.thinkingTokens*f),m.costUSD+=s.costUSD*f,E.set(a,m)}if(s.filesTouched&&s.filesTouched.length>0){let a=Math.round(s.totalTokens/s.filesTouched.length),m=s.costUSD/s.filesTouched.length;for(let f of s.filesTouched){let g=A.get(f)||{count:0,estimatedTokens:0,costUSD:0};g.count++,g.estimatedTokens+=a,g.costUSD+=m,A.set(f,g)}}}let L=l+h+S,z=this.pricingEngine.usdToVnd(y),B=[];for(let[s,a]of E.entries()){let m=this.pricingEngine.getModelPricing(s),f=a.input+a.output+a.thinking;B.push({modelName:s,displayName:m.displayName||s,provider:m.provider||"Other",inputTokens:a.input,outputTokens:a.output,thinkingTokens:a.thinking,totalTokens:f,costUSD:Math.round(a.costUSD*1e4)/1e4,costVND:this.pricingEngine.usdToVnd(a.costUSD),percentageOfCost:y>0?Math.round(a.costUSD/y*1e3)/10:0,percentageOfTokens:L>0?Math.round(f/L*1e3)/10:0})}B.sort((s,a)=>a.costUSD-s.costUSD);let U=[];for(let[s,a]of A.entries())U.push({fileName:R.basename(s),filePath:s,touchesCount:a.count,estimatedTokens:a.estimatedTokens,estimatedCostUSD:Math.round(a.costUSD*1e4)/1e4});U.sort((s,a)=>a.estimatedCostUSD-s.estimatedCostUSD);let W=this.pricingEngine.calculateValuation(y,$,L,P);return{workspacePath:t||"All Workspaces",projectName:t&&t!=="ALL"?i:"T\u1EA5t C\u1EA3 D\u1EF1 \xC1n",generatedAt:new Date().toISOString(),dateFilter:e,totalSessions:o.length,totalTurns:P,totalInputTokens:l,totalOutputTokens:h,totalThinkingTokens:S,totalTokens:L,totalCostUSD:Math.round(y*1e4)/1e4,totalCostVND:z,activeDurationSeconds:$,totalDurationSeconds:k,models:B,topFiles:U.slice(0,20),sessions:o,allProjects:p,valuation:W}}buildEmptyReport(t,e,i){let c=this.pricingEngine.calculateValuation(0,0,0,0);return{workspacePath:t,projectName:e,generatedAt:new Date().toISOString(),dateFilter:i,totalSessions:0,totalTurns:0,totalInputTokens:0,totalOutputTokens:0,totalThinkingTokens:0,totalTokens:0,totalCostUSD:0,totalCostVND:0,activeDurationSeconds:0,totalDurationSeconds:0,models:[],topFiles:[],sessions:[],allProjects:[],valuation:c}}};var T=class{static formatNumber(t){return new Intl.NumberFormat("en-US").format(Math.round(t))}static formatDuration(t){if(t<=0)return"0s";let e=Math.floor(t/3600),i=Math.floor(t%3600/60),c=Math.floor(t%60),u=[];return e>0&&u.push(`${e}h`),i>0&&u.push(`${i}m`),(c>0||u.length===0)&&u.push(`${c}s`),u.join(" ")}static generateMarkdown(t,e){let i=e.language==="en",c=e.currency==="VND",u=(n,l)=>c?`${this.formatNumber(l)} \u20AB (${n.toFixed(4)} USD)`:`$${n.toFixed(4)} (${this.formatNumber(l)} \u20AB)`,d=(n,l)=>c?`${this.formatNumber(l)} \u20AB ($${n.toFixed(2)} USD)`:`$${n.toFixed(2)} (${this.formatNumber(l)} \u20AB)`,p=i?"en-US":"vi-VN";if(i){let n=`# \u{1F4CA} AI PROJECT VALUATION & COST REPORT

`;n+=`> **Project:** \`${t.projectName}\`  
`,n+=`> **Workspace:** \`${t.workspacePath}\`  
`,n+=`> **Generated Date:** \`${new Date(t.generatedAt).toLocaleString(p)}\`  
`,n+=`> **Measurement Tool:** Antigravity AI Cost & Valuation Extension v1.2.0

`,n+=`---

`,n+=`## 1. \u{1F4B0} Executive Valuation & Cost Summary

`,n+=`| Metric | Measured Value | Notes |
`,n+=`| :--- | :--- | :--- |
`,n+=`| **Total Actual AI API Cost** | **${u(t.totalCostUSD,t.totalCostVND)}** | Raw token cost paid to AI model providers |
`,n+=`| **Recommended Project Valuation** | **${d(t.valuation.recommendedValuationUSD,t.valuation.recommendedValuationVND)}** | Applied **x${t.valuation.markupMultiplier}** Markup + AI Prompt Engineering Operator Cost |
`,n+=`| **Equivalent Traditional Dev Cost** | **${d(t.valuation.humanCostEquivalentUSD,t.valuation.humanCostEquivalentVND)}** | Estimated ${t.valuation.humanHoursEquivalent} hrs @ $${t.valuation.humanHourlyRate}/hr |
`,n+=`| **Budget Savings vs Traditional Dev** | **${d(t.valuation.savingsUSD,t.valuation.savingsVND)}** | Saved ~${t.valuation.humanCostEquivalentUSD>0?Math.round(t.valuation.savingsUSD/t.valuation.humanCostEquivalentUSD*100):0}% engineering budget |
`,n+=`| **Total Tokens Consumed** | **${this.formatNumber(t.totalTokens)} tokens** | In: ${this.formatNumber(t.totalInputTokens)} | Out: ${this.formatNumber(t.totalOutputTokens)} | Thinking: ${this.formatNumber(t.totalThinkingTokens)} |
`,n+=`| **Active Coding Duration** | **${this.formatDuration(t.activeDurationSeconds)}** | Total active AI generation & thinking duration |
`,n+=`| **Total Coding Sessions** | **${t.totalSessions} sessions** | ${t.totalTurns} prompts & turn interactions |

`,n+=`## 2. \u{1F916} AI Models Breakdown

`,n+=`| AI Model | Provider | Input Tokens | Output Tokens | Thinking Tokens | Cost (USD) | Cost Share |
`,n+=`| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
`;for(let l of t.models)n+=`| **${l.displayName}** | ${l.provider} | ${this.formatNumber(l.inputTokens)} | ${this.formatNumber(l.outputTokens)} | ${this.formatNumber(l.thinkingTokens)} | $${l.costUSD.toFixed(4)} | **${l.percentageOfCost}%** |
`;if(n+=`
`,t.topFiles&&t.topFiles.length>0){n+=`## 3. \u{1F4C2} Top Cost Impact Files

`,n+=`| File Name | Touches/Edits | Est. Tokens | Est. Cost (USD) |
`,n+=`| :--- | :--- | :--- | :--- |
`;for(let l of t.topFiles.slice(0,10))n+=`| \`${l.fileName}\` | ${l.touchesCount} edits | ~${this.formatNumber(l.estimatedTokens)} | $${l.estimatedCostUSD.toFixed(4)} |
`;n+=`
`}n+=`## 4. \u{1F4DD} Detailed Coding Sessions Breakdown

`,n+=`| Timestamp | User Request / Task | Models | Tokens | Active Time | Cost (USD) |
`,n+=`| :--- | :--- | :--- | :--- | :--- | :--- |
`;for(let l of t.sessions.slice(0,50)){let h=new Date(l.startTime).toLocaleString(p),S=l.title.replace(/\|/g,"\\|"),y=l.modelsUsed.join(", ");n+=`| ${h} | ${S} | ${y} | ${this.formatNumber(l.totalTokens)} | ${this.formatDuration(l.activeTimeSeconds)} | $${l.costUSD.toFixed(4)} |
`}return t.sessions.length>50&&(n+=`
*...and ${t.sessions.length-50} other sessions aggregated into total cost metrics.*
`),n+=`
---
`,n+=`*Report automatically generated by [Antigravity AI Cost & Valuation Extension](file://${t.workspacePath}).*
`,n}let o=`# \u{1F4CA} B\xC1O C\xC1O \u0110\u1ECANH GI\xC1 & CHI PH\xCD L\u1EACP TR\xCCNH AI (AI PROJECT VALUATION REPORT)

`;o+=`> **D\u1EF1 \xE1n:** \`${t.projectName}\`  
`,o+=`> **\u0110\u01B0\u1EDDng d\u1EABn:** \`${t.workspacePath}\`  
`,o+=`> **Th\u1EDDi gian xu\u1EA5t b\xE1o c\xE1o:** \`${new Date(t.generatedAt).toLocaleString(p)}\`  
`,o+=`> **C\xF4ng c\u1EE5 \u0111o l\u01B0\u1EDDng:** Antigravity Cost & Valuation Extension v1.2.0

`,o+=`---

`,o+=`## 1. \u{1F4B0} T\u1ED5ng Quan \u0110\u1ECBnh Gi\xE1 & Chi Ph\xED (Executive Summary)

`,o+=`| Ch\u1EC9 S\u1ED1 | Gi\xE1 Tr\u1ECB \u0110o L\u01B0\u1EDDng | Ghi Ch\xFA |
`,o+=`| :--- | :--- | :--- |
`,o+=`| **T\u1ED5ng Chi Ph\xED AI API Th\u1EF1c T\u1EBF** | **${u(t.totalCostUSD,t.totalCostVND)}** | Chi ph\xED token tr\u1EA3 cho nh\xE0 cung c\u1EA5p AI |
`,o+=`| **\u0110\u1ECBnh Gi\xE1 Ho\xE0n Th\xE0nh \u0110\u1EC1 Xu\u1EA5t** | **${d(t.valuation.recommendedValuationUSD,t.valuation.recommendedValuationVND)}** | \xC1p d\u1EE5ng h\u1EC7 s\u1ED1 Markup **x${t.valuation.markupMultiplier}** + C\xF4ng v\u1EADn h\xE0nh AI |
`,o+=`| **Chi Ph\xED Dev Truy\u1EC1n Th\u1ED1ng T\u01B0\u01A1ng \u0110\u01B0\u01A1ng** | **${d(t.valuation.humanCostEquivalentUSD,t.valuation.humanCostEquivalentVND)}** | \u01AF\u1EDBc t\xEDnh ${t.valuation.humanHoursEquivalent}h @ $${t.valuation.humanHourlyRate}/h |
`,o+=`| **Ti\u1EBFt Ki\u1EC7m So V\u1EDBi Dev Truy\u1EC1n Th\u1ED1ng** | **${d(t.valuation.savingsUSD,t.valuation.savingsVND)}** | Ti\u1EBFt ki\u1EC7m ~${t.valuation.humanCostEquivalentUSD>0?Math.round(t.valuation.savingsUSD/t.valuation.humanCostEquivalentUSD*100):0}% ng\xE2n s\xE1ch |
`,o+=`| **T\u1ED5ng Token Ti\xEAu Th\u1EE5** | **${this.formatNumber(t.totalTokens)} tokens** | In: ${this.formatNumber(t.totalInputTokens)} | Out: ${this.formatNumber(t.totalOutputTokens)} | Thinking: ${this.formatNumber(t.totalThinkingTokens)} |
`,o+=`| **Th\u1EDDi Gian Active Coding** | **${this.formatDuration(t.activeDurationSeconds)}** | T\u1ED5ng th\u1EDDi gian AI tr\u1EF1c ti\u1EBFp t\u1EA1o code & suy ngh\u0129 |
`,o+=`| **T\u1ED5ng S\u1ED1 Phi\xEAn L\xE0m Vi\u1EC7c (Sessions)** | **${t.totalSessions} sessions** | ${t.totalTurns} l\u01B0\u1EE3t prompt/t\u01B0\u01A1ng t\xE1c |

`,o+=`## 2. \u{1F916} Ph\xE2n B\u1ED5 Theo AI Models

`,o+=`| AI Model | Nh\xE0 Cung C\u1EA5p | Input Tokens | Output Tokens | Thinking Tokens | Chi Ph\xED (USD) | T\u1EF7 L\u1EC7 Chi Ph\xED |
`,o+=`| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
`;for(let n of t.models)o+=`| **${n.displayName}** | ${n.provider} | ${this.formatNumber(n.inputTokens)} | ${this.formatNumber(n.outputTokens)} | ${this.formatNumber(n.thinkingTokens)} | $${n.costUSD.toFixed(4)} | **${n.percentageOfCost}%** |
`;if(o+=`
`,t.topFiles&&t.topFiles.length>0){o+=`## 3. \u{1F4C2} Top File Ti\xEAu T\u1ED1n Chi Ph\xED L\u1EDBn Nh\u1EA5t

`,o+=`| T\xEAn File | L\u01B0\u1EE3t Ch\u1EC9nh S\u1EEDa | \u01AF\u1EDBc T\xEDnh Tokens | \u01AF\u1EDBc T\xEDnh Chi Ph\xED (USD) |
`,o+=`| :--- | :--- | :--- | :--- |
`;for(let n of t.topFiles.slice(0,10))o+=`| \`${n.fileName}\` | ${n.touchesCount} l\u1EA7n s\u1EEDa | ~${this.formatNumber(n.estimatedTokens)} | $${n.estimatedCostUSD.toFixed(4)} |
`;o+=`
`}o+=`## 4. \u{1F4DD} L\u1ECBch S\u1EED Chi Ti\u1EBFt C\xE1c Phi\xEAn Coding (Session Breakdown)

`,o+=`| Th\u1EDDi Gian | Y\xEAu C\u1EA7u / N\u1ED9i Dung | Model | Tokens | Th\u1EDDi L\u01B0\u1EE3ng | Chi Ph\xED (USD) |
`,o+=`| :--- | :--- | :--- | :--- | :--- | :--- |
`;for(let n of t.sessions.slice(0,50)){let l=new Date(n.startTime).toLocaleString(p),h=n.title.replace(/\|/g,"\\|"),S=n.modelsUsed.join(", ");o+=`| ${l} | ${h} | ${S} | ${this.formatNumber(n.totalTokens)} | ${this.formatDuration(n.activeTimeSeconds)} | $${n.costUSD.toFixed(4)} |
`}return t.sessions.length>50&&(o+=`
*...v\xE0 ${t.sessions.length-50} phi\xEAn l\xE0m vi\u1EC7c kh\xE1c \u0111\xE3 \u0111\u01B0\u1EE3c t\u1ED5ng h\u1EE3p v\xE0o chi ph\xED chung.*
`),o+=`
---
`,o+=`*B\xE1o c\xE1o \u0111\u01B0\u1EE3c sinh t\u1EF1 \u0111\u1ED9ng b\u1EDFi [Antigravity Cost & Valuation Extension](file://${t.workspacePath}).*
`,o}static generateHtml(t,e){let i=e.language==="en",c=e.currency==="VND",u=i?"en-US":"vi-VN",d=i?`Project AI Cost & Valuation Report - ${t.projectName}`:`B\xE1o C\xE1o \u0110\u1ECBnh Gi\xE1 D\u1EF1 \xC1n - ${t.projectName}`,p=i?"\u{1F4CA} AI Project Valuation & Cost Report":"\u{1F4CA} B\xE1o C\xE1o \u0110\u1ECBnh Gi\xE1 & Chi Ph\xED L\u1EADp Tr\xECnh AI",o=i?"Project":"D\u1EF1 \xE1n",n=i?"Generated Date":"Ng\xE0y t\u1EA1o",l=i?"\u{1F5A8}\uFE0F Print / Save as PDF":"\u{1F5A8}\uFE0F In / Xu\u1EA5t PDF",h=i?"Actual AI Token Cost":"Chi Ph\xED AI Token Th\u1EF1c T\u1EBF",S=i?"Recommended Valuation":"\u0110\u1ECBnh Gi\xE1 \u0110\u1EC1 Xu\u1EA5t (Valuation)",y=i?"Equivalent Traditional Dev":"Dev Truy\u1EC1n Th\u1ED1ng T\u01B0\u01A1ng \u0110\u01B0\u01A1ng",$=i?"Total Tokens Consumed":"T\u1ED5ng Tokens Ti\xEAu Th\u1EE5",k=i?"\u{1F916} AI Models Breakdown":"\u{1F916} Ph\xE2n B\u1ED5 Theo AI Models",P=i?"\u{1F4DD} Detailed Sessions Breakdown":"\u{1F4DD} Chi Ti\u1EBFt C\xE1c Phi\xEAn L\xE0m Vi\u1EC7c (Sessions)",E="AI Model",A=i?"Provider":"Nh\xE0 Cung C\u1EA5p",L="Input Tokens",z="Output Tokens",B="Thinking Tokens",U=i?"Cost (USD)":"Chi Ph\xED (USD)",W=i?"Cost Share":"T\u1EF7 L\u1EC7",s=i?"Timestamp":"Th\u1EDDi Gian",a=i?"Request / Task":"Y\xEAu C\u1EA7u / Prompt",m=i?"Duration":"Th\u1EDDi L\u01B0\u1EE3ng";return`<!DOCTYPE html>
<html lang="${i?"en":"vi"}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${d}</title>
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
            <button class="btn-print" onclick="window.print()">${l}</button>
            <h1>${p}</h1>
            <div class="meta">
                ${o}: <strong>${t.projectName}</strong> | Workspace: <code>${t.workspacePath}</code><br>
                ${n}: ${new Date(t.generatedAt).toLocaleString(u)}
            </div>
        </div>

        <div class="grid">
            <div class="card">
                <div class="card-label">${h}</div>
                <div class="card-value">$${t.totalCostUSD.toFixed(2)}</div>
                <div class="card-sub">${this.formatNumber(t.totalCostVND)} \u20AB</div>
            </div>
            <div class="card highlight">
                <div class="card-label">${S}</div>
                <div class="card-value">$${t.valuation.recommendedValuationUSD.toFixed(2)}</div>
                <div class="card-sub">${this.formatNumber(t.valuation.recommendedValuationVND)} \u20AB (x${t.valuation.markupMultiplier} Markup)</div>
            </div>
            <div class="card">
                <div class="card-label">${y}</div>
                <div class="card-value">$${t.valuation.humanCostEquivalentUSD}</div>
                <div class="card-sub">${t.valuation.humanHoursEquivalent}h @ $${t.valuation.humanHourlyRate}/h</div>
            </div>
            <div class="card">
                <div class="card-label">${$}</div>
                <div class="card-value">${this.formatNumber(t.totalTokens)}</div>
                <div class="card-sub">Active Time: ${this.formatDuration(t.activeDurationSeconds)}</div>
            </div>
        </div>

        <h2>${k}</h2>
        <table>
            <thead>
                <tr>
                    <th>${E}</th>
                    <th>${A}</th>
                    <th>${L}</th>
                    <th>${z}</th>
                    <th>${B}</th>
                    <th>${U}</th>
                    <th>${W}</th>
                </tr>
            </thead>
            <tbody>
                ${t.models.map(f=>`
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

        <h2>${P}</h2>
        <table>
            <thead>
                <tr>
                    <th>${s}</th>
                    <th>${a}</th>
                    <th>${E}</th>
                    <th>Tokens</th>
                    <th>${m}</th>
                    <th>${U}</th>
                </tr>
            </thead>
            <tbody>
                ${t.sessions.slice(0,100).map(f=>`
                <tr>
                    <td>${new Date(f.startTime).toLocaleString(u)}</td>
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
</html>`}static generateJson(t){return JSON.stringify(t,null,2)}};var H=M(require("vscode"));var nt={vi:{extensionTitle:"Project AI Cost",dashboardTitle:"\u2728 AI Project Cost",refreshTooltip:"L\xE0m m\u1EDBi d\u1EEF li\u1EC7u",settingsTooltip:"C\xE0i \u0111\u1EB7t",currentProjectPrefix:"\u{1F4CD} D\u1EF1 \xE1n hi\u1EC7n t\u1EA1i",allProjectsOption:"\u{1F310} T\u1EA5t C\u1EA3 D\u1EF1 \xC1n Trong M\xE1y",allTime:"T\u1EA5t c\u1EA3",today:"H\xF4m nay",last7Days:"7 ng\xE0y",last30Days:"30 ng\xE0y",copySummaryBtn:"\u{1F4CB} Copy",copiedNotification:"\u0110\xE3 sao ch\xE9p t\xF3m t\u1EAFt \u0111\u1ECBnh gi\xE1 v\xE0o Clipboard!",valuationHeroLabel:"\u0110\u1ECBnh Gi\xE1 Ho\xE0n Th\xE0nh \u0110\u1EC1 Xu\u1EA5t",valuationHeroSub:"Markup x{markup} + C\xF4ng v\u1EADn h\xE0nh AI",statApiCost:"Chi Ph\xED AI Token",statHumanCost:"Dev Truy\u1EC1n Th\u1ED1ng",statActiveTime:"Active Coding Time",statSavings:"Ti\u1EBFt Ki\u1EC7m Ng\xE2n S\xE1ch",statSavingsPct:"{pct}% ti\u1EBFt ki\u1EC7m",valuationParamsTitle:"\u2699\uFE0F Tham S\u1ED1 \u0110\u1ECBnh Gi\xE1",currencyLabel:"Ti\u1EC1n t\u1EC7",languageLabel:"Ng\xF4n ng\u1EEF",markupLabel:"Markup Multiplier",hourlyRateLabel:"Dev Hourly Rate ($)",modelsBreakdownTitle:"\u{1F916} T\u1EF7 L\u1EC7 AI Models",exportMarkdownBtn:"\u{1F4C4} Xu\u1EA5t Markdown",exportHtmlBtn:"\u{1F310} Xu\u1EA5t HTML / In",tabSessionsTitle:"\u{1F4DD} Phi\xEAn G\u1EA7n \u0110\xE2y",tabFilesTitle:"\u{1F4C2} File Chi Ph\xED Cao",loadingData:"\u0110ang t\u1EA3i d\u1EEF li\u1EC7u...",noModelData:"Ch\u01B0a ph\xE1t hi\u1EC7n d\u1EEF li\u1EC7u model trong b\u1ED9 l\u1ECDc n\xE0y.",noSessionData:"Ch\u01B0a c\xF3 session n\xE0o.",noFileData:"Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u file.",touchesSuffix:"l\u1EA7n s\u1EEDa",sessionsCountSuffix:"sessions",turnsCountSuffix:"turns",unknownProject:"D\u1EF1 \xE1n kh\xF4ng x\xE1c \u0111\u1ECBnh",allWorkspaces:"T\u1EA5t C\u1EA3 D\u1EF1 \xC1n",scanning:"\u0110ang qu\xE9t...",noSessionsFound:"Ch\u01B0a ph\xE1t hi\u1EC7n phi\xEAn l\xE0m vi\u1EC7c AI n\xE0o trong workspace n\xE0y.",reportExportSuccess:"\u0110\xE3 xu\u1EA5t b\xE1o c\xE1o \u0111\u1ECBnh gi\xE1 th\xE0nh c\xF4ng: {filename}",openFile:"M\u1EDF File",exportError:"L\u1ED7i khi xu\u1EA5t file b\xE1o c\xE1o: {err}",menuOpenDashboard:"$(dashboard) M\u1EDF Dashboard \u0110\u1ECBnh Gi\xE1",menuOpenDashboardDesc:"Xem chi ti\u1EBFt token, model & files",menuRefresh:"$(refresh) Qu\xE9t l\u1EA1i d\u1EEF li\u1EC7u chi ph\xED",menuRefreshDesc:"C\u1EADp nh\u1EADt l\u1EA1i to\xE0n b\u1ED9 sessions trong workspace",menuExportMd:"$(file-text) Xu\u1EA5t B\xE1o C\xE1o Markdown",menuExportMdDesc:"T\u1EA1o file PROJECT_VALUATION_REPORT.md",menuExportHtml:"$(file-code) Xu\u1EA5t B\xE1o C\xE1o HTML / PDF",menuExportHtmlDesc:"T\u1EA1o file PROJECT_VALUATION_REPORT.html \u0111\u1EC3 in",menuToggleCurrency:"$(symbol-unit) \u0110\u1ED5i Ti\u1EC1n T\u1EC7 (USD / VND)",menuToggleLanguage:"$(globe) \u0110\u1ED5i Ng\xF4n Ng\u1EEF / Switch Language",menuSettings:"$(gear) C\xE0i \u0111\u1EB7t \u0110\u1ECBnh Gi\xE1 & T\u1EF7 Gi\xE1",menuSettingsDesc:"Ch\u1EC9nh Markup, T\u1EF7 gi\xE1 VND, Dev rate, Ng\xF4n ng\u1EEF"},en:{extensionTitle:"Project AI Cost",dashboardTitle:"\u2728 AI Project Cost",refreshTooltip:"Refresh Data",settingsTooltip:"Settings",currentProjectPrefix:"\u{1F4CD} Current Project",allProjectsOption:"\u{1F310} All Projects on Machine",allTime:"All",today:"Today",last7Days:"7 Days",last30Days:"30 Days",copySummaryBtn:"\u{1F4CB} Copy",copiedNotification:"Valuation summary copied to clipboard!",valuationHeroLabel:"Recommended Project Valuation",valuationHeroSub:"Markup x{markup} + AI Operator Cost",statApiCost:"AI Token Cost",statHumanCost:"Traditional Dev Cost",statActiveTime:"Active Coding Time",statSavings:"Budget Savings",statSavingsPct:"{pct}% savings",valuationParamsTitle:"\u2699\uFE0F Pricing & Valuation Parameters",currencyLabel:"Currency",languageLabel:"Language",markupLabel:"Markup Multiplier",hourlyRateLabel:"Dev Hourly Rate ($)",modelsBreakdownTitle:"\u{1F916} AI Models Breakdown",exportMarkdownBtn:"\u{1F4C4} Export Markdown",exportHtmlBtn:"\u{1F310} Export HTML / Print",tabSessionsTitle:"\u{1F4DD} Recent Sessions",tabFilesTitle:"\u{1F4C2} Top Cost Files",loadingData:"Loading data...",noModelData:"No model data found for this filter.",noSessionData:"No sessions found.",noFileData:"No file data available.",touchesSuffix:"edits",sessionsCountSuffix:"sessions",turnsCountSuffix:"turns",unknownProject:"Unknown Project",allWorkspaces:"All Projects",scanning:"Scanning...",noSessionsFound:"No AI sessions detected in this workspace yet.",reportExportSuccess:"Successfully exported project valuation report: {filename}",openFile:"Open File",exportError:"Error exporting report: {err}",menuOpenDashboard:"$(dashboard) Open Valuation Dashboard",menuOpenDashboardDesc:"View detailed tokens, models & file breakdown",menuRefresh:"$(refresh) Refresh Cost Data",menuRefreshDesc:"Rescan all sessions in current workspace",menuExportMd:"$(file-text) Export Markdown Report",menuExportMdDesc:"Generate PROJECT_VALUATION_REPORT.md file",menuExportHtml:"$(file-code) Export HTML / PDF Report",menuExportHtmlDesc:"Generate PROJECT_VALUATION_REPORT.html for printing",menuToggleCurrency:"$(symbol-unit) Switch Currency (USD / VND)",menuToggleLanguage:"$(globe) Switch Language / \u0110\u1ED5i Ng\xF4n Ng\u1EEF",menuSettings:"$(gear) Extension Settings",menuSettingsDesc:"Configure Markup, Exchange Rate, Hourly Rate, Language"}};function K(r="vi"){return nt[r]||nt.vi}var it=class{statusBarItem;constructor(){this.statusBarItem=H.window.createStatusBarItem(H.StatusBarAlignment.Right,95),this.statusBarItem.command="antigravity-cost.menu",this.statusBarItem.text="$(sparkle) AI Cost: Scanning...",this.statusBarItem.tooltip="\u0110ang qu\xE9t d\u1EEF li\u1EC7u chi ph\xED d\u1EF1 \xE1n...",this.statusBarItem.show()}update(t,e){let i=K(e.language),c=e.language==="en";if(!t||t.totalSessions===0){this.statusBarItem.text="$(sparkle) AI Cost: $0.00",this.statusBarItem.tooltip=new H.MarkdownString(i.noSessionsFound);return}let d=e.currency==="VND"?`${T.formatNumber(t.totalCostVND)} \u20AB`:`$${t.totalCostUSD.toFixed(2)}`,p=t.totalTokens>1e6?`${(t.totalTokens/1e6).toFixed(1)}M`:`${Math.round(t.totalTokens/1e3)}k`,o=T.formatDuration(t.activeDurationSeconds);this.statusBarItem.text=`$(sparkle) ${d} (${p} tok)`;let n=new H.MarkdownString;if(n.isTrusted=!0,c){if(n.appendMarkdown(`### \u{1F4CA} **Antigravity AI Cost & Valuation**

`),n.appendMarkdown(`- **AI Token Cost:** \`$${t.totalCostUSD.toFixed(4)}\` (~${T.formatNumber(t.totalCostVND)} \u20AB)
`),n.appendMarkdown(`- **Recommended Valuation:** \`$${t.valuation.recommendedValuationUSD.toFixed(2)}\` (~${T.formatNumber(t.valuation.recommendedValuationVND)} \u20AB)
`),n.appendMarkdown(`- **Total Tokens:** \`${T.formatNumber(t.totalTokens)}\` tokens
`),n.appendMarkdown(`- **Active Coding Time:** \`${o}\` (${t.totalSessions} sessions)

`),t.models.length>0){n.appendMarkdown(`**Models Used:**
`);for(let l of t.models)n.appendMarkdown(`- **${l.displayName}:** ${l.percentageOfCost}% ($${l.costUSD.toFixed(3)})
`)}n.appendMarkdown(`
*Click to open menu & export report.*`)}else{if(n.appendMarkdown(`### \u{1F4CA} **Antigravity AI Cost & Valuation**

`),n.appendMarkdown(`- **Chi ph\xED AI Token:** \`$${t.totalCostUSD.toFixed(4)}\` (~${T.formatNumber(t.totalCostVND)} \u20AB)
`),n.appendMarkdown(`- **\u0110\u1ECBnh gi\xE1 \u0111\u1EC1 xu\u1EA5t:** \`$${t.valuation.recommendedValuationUSD.toFixed(2)}\` (~${T.formatNumber(t.valuation.recommendedValuationVND)} \u20AB)
`),n.appendMarkdown(`- **T\u1ED5ng Tokens:** \`${T.formatNumber(t.totalTokens)}\` tokens
`),n.appendMarkdown(`- **Active Coding Time:** \`${o}\` (${t.totalSessions} sessions)

`),t.models.length>0){n.appendMarkdown(`**Models S\u1EED D\u1EE5ng:**
`);for(let l of t.models)n.appendMarkdown(`- **${l.displayName}:** ${l.percentageOfCost}% ($${l.costUSD.toFixed(3)})
`)}n.appendMarkdown(`
*Nh\u1EA5p \u0111\u1EC3 m\u1EDF menu qu\u1EA3n l\xFD & xu\u1EA5t b\xE1o c\xE1o.*`)}this.statusBarItem.tooltip=n}dispose(){this.statusBarItem.dispose()}};var O=M(require("vscode"));var ot=class{constructor(t,e,i,c,u){this._extensionUri=t;this._currentConfig=e,this._onRefreshCallback=i,this._onExportCallback=c,this._onUpdateConfigCallback=u}_view;_currentReport=null;_currentConfig;_onRefreshCallback;_onExportCallback;_onUpdateConfigCallback;resolveWebviewView(t,e,i){this._view=t,t.webview.options={enableScripts:!0,localResourceRoots:[this._extensionUri]},t.webview.html=this._getHtmlForWebview(t.webview),t.webview.onDidReceiveMessage(async c=>{switch(c.type){case"refresh":await this._onRefreshCallback(c.workspacePath,c.dateFilter);break;case"exportReport":await this._onExportCallback(c.format||"markdown");break;case"updateConfig":await this._onUpdateConfigCallback(c.config);break;case"copySummary":{if(this._currentReport){let u=this._currentConfig.language==="en",d=this._currentConfig.currency==="VND",p=d?`${T.formatNumber(this._currentReport.totalCostVND)} \u20AB`:`$${this._currentReport.totalCostUSD.toFixed(3)}`,o=d?`${T.formatNumber(this._currentReport.valuation.recommendedValuationVND)} \u20AB`:`$${this._currentReport.valuation.recommendedValuationUSD.toFixed(2)}`,n="";u?(n=`\u{1F4CA} [Antigravity AI Cost] Project: ${this._currentReport.projectName}
- AI Token Cost: ${p}
- Recommended Valuation: ${o}
- Total Tokens: ${T.formatNumber(this._currentReport.totalTokens)}
- Active Time: ${T.formatDuration(this._currentReport.activeDurationSeconds)} (${this._currentReport.totalSessions} sessions)`,O.window.showInformationMessage("Valuation summary copied to clipboard!")):(n=`\u{1F4CA} [Antigravity AI Cost] D\u1EF1 \xE1n: ${this._currentReport.projectName}
- Chi ph\xED Token AI: ${p}
- \u0110\u1ECBnh gi\xE1 \u0111\u1EC1 xu\u1EA5t: ${o}
- T\u1ED5ng Tokens: ${T.formatNumber(this._currentReport.totalTokens)}
- Active Time: ${T.formatDuration(this._currentReport.activeDurationSeconds)} (${this._currentReport.totalSessions} sessions)`,O.window.showInformationMessage("\u0110\xE3 sao ch\xE9p t\xF3m t\u1EAFt \u0111\u1ECBnh gi\xE1 v\xE0o Clipboard!")),await O.env.clipboard.writeText(n)}break}case"openSettings":O.commands.executeCommand("workbench.action.openSettings","antigravityCost");break}}),this._currentReport&&this.updateReport(this._currentReport,this._currentConfig)}updateReport(t,e){this._currentReport=t,this._currentConfig=e,this._view&&this._view.webview.postMessage({type:"update",report:t,config:e,translations:nt})}_getHtmlForWebview(t){return`<!DOCTYPE html>
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
</html>`}};var _,rt,lt,C=null,b,at=null,st=null,Q,gt="all";function ht(){let r=v.workspace.getConfiguration("antigravityCost"),t=(v.env.language.startsWith("vi"),"vi");return{language:r.get("language",t),currency:r.get("currency","USD"),vndExchangeRate:r.get("vndExchangeRate",25500),markupMultiplier:r.get("markupMultiplier",2.5),humanHourlyRate:r.get("humanHourlyRate",25),customPricing:r.get("customPricing",{})}}function vt(){if(Q&&Q!=="CURRENT")return Q==="ALL"?void 0:Q;let r=v.workspace.workspaceFolders;if(r&&r.length>0)return r[0].uri.fsPath}async function w(r=!1,t,e){t!==void 0&&(Q=t),e!==void 0&&(gt=e);let i=vt();C=await _.scanWorkspace(i,gt),rt.update(C,b),lt.updateReport(C,b),r&&C&&(b.language==="en"?v.window.showInformationMessage(`Antigravity Cost [${C.projectName}]: Scanned ${C.totalSessions} sessions (${T.formatNumber(C.totalTokens)} tokens, ~$${C.totalCostUSD.toFixed(3)})`):v.window.showInformationMessage(`Antigravity Cost [${C.projectName}]: \u0110\xE3 qu\xE9t ${C.totalSessions} sessions (${T.formatNumber(C.totalTokens)} tokens, ~$${C.totalCostUSD.toFixed(3)})`))}async function Y(r="markdown"){let t=K(b.language);if(!C||C.totalSessions===0){v.window.showWarningMessage(b.language==="en"?"No cost data available to export.":"Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u chi ph\xED \u0111\u1EC3 xu\u1EA5t b\xE1o c\xE1o.");return}let i=vt()||v.Uri.file(process.cwd()).fsPath,c="PROJECT_VALUATION_REPORT.md",u="";r==="html"?(c="PROJECT_VALUATION_REPORT.html",u=T.generateHtml(C,b)):r==="json"?(c="project_cost_data.json",u=T.generateJson(C)):u=T.generateMarkdown(C,b);let d=ct.join(i,c);try{G.writeFileSync(d,u,"utf8");let p=t.openFile,o=t.reportExportSuccess.replace("{filename}",c);if(await v.window.showInformationMessage(o,p)===p){let l=await v.workspace.openTextDocument(v.Uri.file(d));await v.window.showTextDocument(l)}}catch(p){v.window.showErrorMessage(t.exportError.replace("{err}",p?.message||p))}}function Dt(){try{let r=ct.join(ft.homedir(),".gemini","antigravity-ide","brain");if(G.existsSync(r)){let t=null;st=G.watch(r,{recursive:!0},(e,i)=>{i&&i.endsWith("transcript.jsonl")&&(t&&clearTimeout(t),t=setTimeout(()=>{w()},1500))})}}catch{}}function Mt(r){b=ht(),_=new et(b),rt=new it,lt=new ot(r.extensionUri,b,async(t,e)=>{await w(!0,t,e)},async t=>{await Y(t)},async t=>{b={...b,...t},_.updateConfig(b),C&&await w()}),r.subscriptions.push(v.window.registerWebviewViewProvider("antigravity-cost.sidebar",lt)),r.subscriptions.push(rt),r.subscriptions.push(v.commands.registerCommand("antigravity-cost.refresh",async()=>{await w(!0)})),r.subscriptions.push(v.commands.registerCommand("antigravity-cost.exportReport",async()=>{await Y("markdown")})),r.subscriptions.push(v.commands.registerCommand("antigravity-cost.exportHtmlReport",async()=>{await Y("html")})),r.subscriptions.push(v.commands.registerCommand("antigravity-cost.openDashboard",()=>{v.commands.executeCommand("antigravity-cost.sidebar.focus")})),r.subscriptions.push(v.commands.registerCommand("antigravity-cost.menu",async()=>{let t=K(b.language),e=[{id:"dashboard",label:t.menuOpenDashboard,description:t.menuOpenDashboardDesc},{id:"refresh",label:t.menuRefresh,description:t.menuRefreshDesc},{id:"export_md",label:t.menuExportMd,description:t.menuExportMdDesc},{id:"export_html",label:t.menuExportHtml,description:t.menuExportHtmlDesc},{id:"toggle_currency",label:t.menuToggleCurrency,description:`Current: ${b.currency}`},{id:"toggle_language",label:t.menuToggleLanguage,description:`Current: ${b.language==="en"?"\u{1F1EC}\u{1F1E7} English":"\u{1F1FB}\u{1F1F3} Ti\u1EBFng Vi\u1EC7t"}`},{id:"settings",label:t.menuSettings,description:t.menuSettingsDesc}],i=await v.window.showQuickPick(e,{placeHolder:`Antigravity AI Cost & Valuation (${b.language.toUpperCase()})`});if(i)switch(i.id){case"dashboard":v.commands.executeCommand("antigravity-cost.sidebar.focus");break;case"refresh":await w(!0);break;case"export_md":await Y("markdown");break;case"export_html":await Y("html");break;case"toggle_currency":{let c=b.currency==="USD"?"VND":"USD";b.currency=c,_.updateConfig(b),await w(),v.window.showInformationMessage(b.language==="en"?`Switched currency to: ${c}`:`\u0110\xE3 \u0111\u1ED5i \u0111\u01A1n v\u1ECB ti\u1EC1n t\u1EC7 sang: ${c}`);break}case"toggle_language":{let c=b.language==="vi"?"en":"vi";b.language=c,_.updateConfig(b),await w(),v.window.showInformationMessage(c==="en"?"Switched language to English \u{1F1EC}\u{1F1E7}":"\u0110\xE3 \u0111\u1ED5i ng\xF4n ng\u1EEF sang Ti\u1EBFng Vi\u1EC7t \u{1F1FB}\u{1F1F3}");break}case"settings":v.commands.executeCommand("workbench.action.openSettings","antigravityCost");break}})),r.subscriptions.push(v.workspace.onDidChangeConfiguration(async t=>{t.affectsConfiguration("antigravityCost")&&(b=ht(),_.updateConfig(b),await w())})),r.subscriptions.push(v.workspace.onDidChangeWorkspaceFolders(async()=>{await w()})),Dt(),setTimeout(()=>{w()},1e3),at=setInterval(()=>{w()},6e4)}function wt(){at&&(clearInterval(at),at=null),st&&(st.close(),st=null)}0&&(module.exports={activate,deactivate});
