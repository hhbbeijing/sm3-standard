(function(i,a){typeof exports=="object"&&typeof module<"u"?module.exports=a():typeof define=="function"&&define.amd?define(a):(i=typeof globalThis<"u"?globalThis:i||self,i.sm3=a())})(this,function(){"use strict";const i=new Uint32Array(68),a=new Uint32Array(64);function u(e,t){const o=t&31;return e<<o|e>>>32-o}function b(e,t){const o=[];for(let s=e.length-1;s>=0;s--)o[s]=(e[s]^t[s])&255;return o}function B(e){return e^u(e,9)^u(e,17)}function C(e){return e^u(e,15)^u(e,23)}function T(e){let t=e.length*8,o=t%512;o=o>=448?512-o%448-1:448-o-1;const s=new Array((o-7)/8),r=new Array(8);for(let l=0,c=s.length;l<c;l++)s[l]=0;for(let l=0,c=r.length;l<c;l++)r[l]=0;t=t.toString(2);for(let l=7;l>=0;l--)if(t.length>8){const c=t.length-8;r[l]=parseInt(t.substr(c),2),t=t.substr(0,c)}else t.length>0&&(r[l]=parseInt(t,2),t="");const S=new Uint8Array([...e,128,...s,...r]),q=new DataView(S.buffer,0),x=S.length/64,f=new Uint32Array([1937774191,1226093241,388252375,3666478592,2842636476,372324522,3817729613,2969243214]);for(let l=0;l<x;l++){i.fill(0),a.fill(0);const c=16*l;for(let n=0;n<16;n++)i[n]=q.getUint32((c+n)*4,!1);for(let n=16;n<68;n++)i[n]=C(i[n-16]^i[n-9]^u(i[n-3],15))^u(i[n-13],7)^i[n-6];for(let n=0;n<64;n++)a[n]=i[n]^i[n+4];const g=2043430169,z=2055708042;let h=f[0],w=f[1],p=f[2],P=f[3],d=f[4],y=f[5],m=f[6],j=f[7],U,v,D,K,L;for(let n=0;n<64;n++)L=n>=0&&n<=15?g:z,U=u(u(h,12)+d+u(L,n),7),v=U^u(h,12),D=(n>=0&&n<=15?h^w^p:h&w|h&p|w&p)+P+v+a[n],K=(n>=0&&n<=15?d^y^m:d&y|~d&m)+j+U+i[n],P=p,p=u(w,9),w=h,h=D,j=m,m=u(y,19),y=d,d=B(K);f[0]^=h,f[1]^=w,f[2]^=p,f[3]^=P,f[4]^=d,f[5]^=y,f[6]^=m,f[7]^=j}const V=[];for(let l=0,c=f.length;l<c;l++){const g=f[l];V.push((g&4278190080)>>>24,(g&16711680)>>>16,(g&65280)>>>8,g&255)}return V}const A=64,E=new Uint8Array(A),H=new Uint8Array(A);for(let e=0;e<A;e++)E[e]=54,H[e]=92;function F(e,t){for(t.length>A&&(t=T(t));t.length<A;)t.push(0);const o=b(t,E),s=b(t,H),r=T([...o,...e]);return T([...s,...r])}function G(e,t){return e.length>=t?e:new Array(t-e.length+1).join("0")+e}function I(e){return e.map(t=>(t=t.toString(16),t.length===1?"0"+t:t)).join("")}function M(e){const t=[];let o=e.length;o%2!==0&&(e=G(e,o+1)),o=e.length;for(let s=0;s<o;s+=2)t.push(parseInt(e.substr(s,2),16));return t}function W(e){const t=[];for(let o=0,s=e.length;o<s;o++){const r=e.codePointAt(o);if(r<=127)t.push(r);else if(r<=2047)t.push(192|r>>>6),t.push(128|r&63);else if(r<=55295||r>=57344&&r<=65535)t.push(224|r>>>12),t.push(128|r>>>6&63),t.push(128|r&63);else if(r>=65536&&r<=1114111)o++,t.push(240|r>>>18&28),t.push(128|r>>>12&63),t.push(128|r>>>6&63),t.push(128|r&63);else throw t.push(r),new Error("input is not supported")}return t}function k(e,t){if(e=typeof e=="string"?W(e):Array.from(e),t){if((t.mode||"hmac")!=="hmac")throw new Error("invalid mode");let s=t.key;if(!s)throw new Error("invalid key");return s=typeof s=="string"?M(s):Array.from(s),I(F(e,s))}return I(T(e))}return k});
