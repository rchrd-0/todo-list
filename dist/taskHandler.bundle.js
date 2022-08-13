"use strict";(self.webpackChunktodo_list=self.webpackChunktodo_list||[]).push([[645],{460:(e,t,r)=>{r.d(t,{mc:()=>C});Math.pow(10,8);var n=36e5,a=r(882),i=r(946);function u(e,t){(0,a.Z)(1,arguments);var r=t||{},n=null==r.additionalDigits?2:(0,i.Z)(r.additionalDigits);if(2!==n&&1!==n&&0!==n)throw new RangeError("additionalDigits must be 0, 1 or 2");if("string"!=typeof e&&"[object String]"!==Object.prototype.toString.call(e))return new Date(NaN);var u,d=s(e);if(d.date){var o=m(d.date,n);u=f(o.restDateString,o.year)}if(!u||isNaN(u.getTime()))return new Date(NaN);var c,l=u.getTime(),v=0;if(d.time&&(v=N(d.time),isNaN(v)))return new Date(NaN);if(!d.timezone){var p=new Date(l+v),g=new Date(0);return g.setFullYear(p.getUTCFullYear(),p.getUTCMonth(),p.getUTCDate()),g.setHours(p.getUTCHours(),p.getUTCMinutes(),p.getUTCSeconds(),p.getUTCMilliseconds()),g}return c=D(d.timezone),isNaN(c)?new Date(NaN):new Date(l+v+c)}var d={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/},o=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,c=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,l=/^([+-])(\d{2})(?::?(\d{2}))?$/;function s(e){var t,r={},n=e.split(d.dateTimeDelimiter);if(n.length>2)return r;if(/:/.test(n[0])?t=n[0]:(r.date=n[0],t=n[1],d.timeZoneDelimiter.test(r.date)&&(r.date=e.split(d.timeZoneDelimiter)[0],t=e.substr(r.date.length,e.length))),t){var a=d.timezone.exec(t);a?(r.time=t.replace(a[1],""),r.timezone=a[1]):r.time=t}return r}function m(e,t){var r=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+t)+"})|(\\d{2}|[+-]\\d{"+(2+t)+"})$)"),n=e.match(r);if(!n)return{year:NaN,restDateString:""};var a=n[1]?parseInt(n[1]):null,i=n[2]?parseInt(n[2]):null;return{year:null===i?a:100*i,restDateString:e.slice((n[1]||n[2]).length)}}function f(e,t){if(null===t)return new Date(NaN);var r=e.match(o);if(!r)return new Date(NaN);var n=!!r[4],a=v(r[1]),i=v(r[2])-1,u=v(r[3]),d=v(r[4]),c=v(r[5])-1;if(n)return function(e,t,r){return t>=1&&t<=53&&r>=0&&r<=6}(0,d,c)?function(e,t,r){var n=new Date(0);n.setUTCFullYear(e,0,4);var a=n.getUTCDay()||7,i=7*(t-1)+r+1-a;return n.setUTCDate(n.getUTCDate()+i),n}(t,d,c):new Date(NaN);var l=new Date(0);return function(e,t,r){return t>=0&&t<=11&&r>=1&&r<=(g[t]||(y(e)?29:28))}(t,i,u)&&function(e,t){return t>=1&&t<=(y(e)?366:365)}(t,a)?(l.setUTCFullYear(t,i,Math.max(a,u)),l):new Date(NaN)}function v(e){return e?parseInt(e):1}function N(e){var t=e.match(c);if(!t)return NaN;var r=p(t[1]),a=p(t[2]),i=p(t[3]);return function(e,t,r){if(24===e)return 0===t&&0===r;return r>=0&&r<60&&t>=0&&t<60&&e>=0&&e<25}(r,a,i)?r*n+6e4*a+1e3*i:NaN}function p(e){return e&&parseFloat(e.replace(",","."))||0}function D(e){if("Z"===e)return 0;var t=e.match(l);if(!t)return 0;var r="+"===t[1]?-1:1,a=parseInt(t[2]),i=t[3]&&parseInt(t[3])||0;return function(e,t){return t>=0&&t<=59}(0,i)?r*(a*n+6e4*i):NaN}var g=[31,null,31,30,31,30,31,31,30,31,30,31];function y(e){return e%400==0||e%4==0&&e%100!=0}var S=r(96),k=r(332),w=r(374);const h=()=>{const e=S.B5.read().length,t=document.querySelector("#task-name-add").value,r=document.querySelector("#task-description-add").value,n=document.querySelector("#task-date-add").value,a=Number(document.querySelector("#project-add").value),i=document.querySelector("input[name=priority-add]:checked").value,d=n?u(n):null,o=new S.iQ(e,t,r,d,a,i);S.B5.push(o),(0,k.SC)("add-task-menu"),(0,w.Yf)()},T=()=>{const e=document.querySelector("#edit-task-form"),{taskId:t}=e.dataset,r=S.B5.findTask(t),n=document.querySelector("#task-name-edit").value,a=document.querySelector("#task-description-edit").value,i=document.querySelector("#task-date-edit").value,d=Number(document.querySelector("#project-edit").value),o=[...document.querySelectorAll("input[name=priority-edit]")].find((e=>e.checked)).value;r.name=n,r.description=a,r.date=i?u(i):null,r.projectId=d,r.priority=o,(0,k.SC)("edit-task-menu"),(0,w.Yf)()},C=()=>{const e=document.querySelector("#submit-add"),t=document.querySelector("#show-add-task"),r=document.querySelector("#submit-edit");t.addEventListener("click",k.nF),e.addEventListener("click",h),r.addEventListener("click",T)}}},e=>{e.O(0,[95],(()=>{return t=460,e(e.s=t);var t}));e.O()}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFDaEJOLFNBQVNZLGlCQUFpQiw4QkFDN0JDLE1BQU1DLEdBQWFBLEVBQVNDLFVBQVM3QixNQUV2Q3lCLEVBQVNLLEtBQU9qQixFQUNoQlksRUFBU00sWUFBY2YsRUFDdkJTLEVBQVNoRyxLQUFRd0YsRUFBa0J2RyxFQUFTdUcsR0FBaEIsS0FDNUJRLEVBQVNPLFVBQVlkLEVBQ3JCTyxFQUFTRyxTQUFXUixHQUVwQixRQUFTLG1CQUNULFdBR0lhLEVBQXlCLEtBQzdCLE1BQU1DLEVBQWdCcEIsU0FBU0MsY0FBYyxlQUN2Q29CLEVBQWNyQixTQUFTQyxjQUFjLGtCQUNyQ3FCLEVBQWlCdEIsU0FBU0MsY0FBYyxnQkFFOUNvQixFQUFZRSxpQkFBaUIsUUFBUyxNQUN0Q0gsRUFBY0csaUJBQWlCLFFBQVMxQixHQUN4Q3lCLEVBQWVDLGlCQUFpQixRQUFTZixNIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9jb25zdGFudHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9wYXJzZUlTTy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy90YXNrLWhhbmRsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBEYXlzIGluIDEgd2Vlay5cbiAqXG4gKiBAbmFtZSBkYXlzSW5XZWVrXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKiBAZGVmYXVsdFxuICovXG5leHBvcnQgdmFyIGRheXNJbldlZWsgPSA3O1xuLyoqXG4gKiBNYXhpbXVtIGFsbG93ZWQgdGltZS5cbiAqXG4gKiBAbmFtZSBtYXhUaW1lXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKiBAZGVmYXVsdFxuICovXG5cbmV4cG9ydCB2YXIgbWF4VGltZSA9IE1hdGgucG93KDEwLCA4KSAqIDI0ICogNjAgKiA2MCAqIDEwMDA7XG4vKipcbiAqIE1pbGxpc2Vjb25kcyBpbiAxIG1pbnV0ZVxuICpcbiAqIEBuYW1lIG1pbGxpc2Vjb25kc0luTWludXRlXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKiBAZGVmYXVsdFxuICovXG5cbmV4cG9ydCB2YXIgbWlsbGlzZWNvbmRzSW5NaW51dGUgPSA2MDAwMDtcbi8qKlxuICogTWlsbGlzZWNvbmRzIGluIDEgaG91clxuICpcbiAqIEBuYW1lIG1pbGxpc2Vjb25kc0luSG91clxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7bnVtYmVyfVxuICogQGRlZmF1bHRcbiAqL1xuXG5leHBvcnQgdmFyIG1pbGxpc2Vjb25kc0luSG91ciA9IDM2MDAwMDA7XG4vKipcbiAqIE1pbGxpc2Vjb25kcyBpbiAxIHNlY29uZFxuICpcbiAqIEBuYW1lIG1pbGxpc2Vjb25kc0luU2Vjb25kXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKiBAZGVmYXVsdFxuICovXG5cbmV4cG9ydCB2YXIgbWlsbGlzZWNvbmRzSW5TZWNvbmQgPSAxMDAwO1xuLyoqXG4gKiBNaW5pbXVtIGFsbG93ZWQgdGltZS5cbiAqXG4gKiBAbmFtZSBtaW5UaW1lXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKiBAZGVmYXVsdFxuICovXG5cbmV4cG9ydCB2YXIgbWluVGltZSA9IC1tYXhUaW1lO1xuLyoqXG4gKiBNaW51dGVzIGluIDEgaG91clxuICpcbiAqIEBuYW1lIG1pbnV0ZXNJbkhvdXJcbiAqIEBjb25zdGFudFxuICogQHR5cGUge251bWJlcn1cbiAqIEBkZWZhdWx0XG4gKi9cblxuZXhwb3J0IHZhciBtaW51dGVzSW5Ib3VyID0gNjA7XG4vKipcbiAqIE1vbnRocyBpbiAxIHF1YXJ0ZXJcbiAqXG4gKiBAbmFtZSBtb250aHNJblF1YXJ0ZXJcbiAqIEBjb25zdGFudFxuICogQHR5cGUge251bWJlcn1cbiAqIEBkZWZhdWx0XG4gKi9cblxuZXhwb3J0IHZhciBtb250aHNJblF1YXJ0ZXIgPSAzO1xuLyoqXG4gKiBNb250aHMgaW4gMSB5ZWFyXG4gKlxuICogQG5hbWUgbW9udGhzSW5ZZWFyXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKiBAZGVmYXVsdFxuICovXG5cbmV4cG9ydCB2YXIgbW9udGhzSW5ZZWFyID0gMTI7XG4vKipcbiAqIFF1YXJ0ZXJzIGluIDEgeWVhclxuICpcbiAqIEBuYW1lIHF1YXJ0ZXJzSW5ZZWFyXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKiBAZGVmYXVsdFxuICovXG5cbmV4cG9ydCB2YXIgcXVhcnRlcnNJblllYXIgPSA0O1xuLyoqXG4gKiBTZWNvbmRzIGluIDEgaG91clxuICpcbiAqIEBuYW1lIHNlY29uZHNJbkhvdXJcbiAqIEBjb25zdGFudFxuICogQHR5cGUge251bWJlcn1cbiAqIEBkZWZhdWx0XG4gKi9cblxuZXhwb3J0IHZhciBzZWNvbmRzSW5Ib3VyID0gMzYwMDtcbi8qKlxuICogU2Vjb25kcyBpbiAxIG1pbnV0ZVxuICpcbiAqIEBuYW1lIHNlY29uZHNJbk1pbnV0ZVxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7bnVtYmVyfVxuICogQGRlZmF1bHRcbiAqL1xuXG5leHBvcnQgdmFyIHNlY29uZHNJbk1pbnV0ZSA9IDYwOyIsImltcG9ydCB7IG1pbGxpc2Vjb25kc0luSG91ciwgbWlsbGlzZWNvbmRzSW5NaW51dGUgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuaW1wb3J0IHRvSW50ZWdlciBmcm9tIFwiLi4vX2xpYi90b0ludGVnZXIvaW5kZXguanNcIjtcbi8qKlxuICogQG5hbWUgcGFyc2VJU09cbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgUGFyc2UgSVNPIHN0cmluZ1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUGFyc2UgdGhlIGdpdmVuIHN0cmluZyBpbiBJU08gODYwMSBmb3JtYXQgYW5kIHJldHVybiBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIEZ1bmN0aW9uIGFjY2VwdHMgY29tcGxldGUgSVNPIDg2MDEgZm9ybWF0cyBhcyB3ZWxsIGFzIHBhcnRpYWwgaW1wbGVtZW50YXRpb25zLlxuICogSVNPIDg2MDE6IGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvSVNPXzg2MDFcbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXNuJ3QgYSBzdHJpbmcsIHRoZSBmdW5jdGlvbiBjYW5ub3QgcGFyc2UgdGhlIHN0cmluZyBvclxuICogdGhlIHZhbHVlcyBhcmUgaW52YWxpZCwgaXQgcmV0dXJucyBJbnZhbGlkIERhdGUuXG4gKlxuICogIyMjIHYyLjAuMCBicmVha2luZyBjaGFuZ2VzOlxuICpcbiAqIC0gW0NoYW5nZXMgdGhhdCBhcmUgY29tbW9uIGZvciB0aGUgd2hvbGUgbGlicmFyeV0oaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdXBncmFkZUd1aWRlLm1kI0NvbW1vbi1DaGFuZ2VzKS5cbiAqXG4gKiAtIFRoZSBwcmV2aW91cyBgcGFyc2VgIGltcGxlbWVudGF0aW9uIHdhcyByZW5hbWVkIHRvIGBwYXJzZUlTT2AuXG4gKlxuICogICBgYGBqYXZhc2NyaXB0XG4gKiAgIC8vIEJlZm9yZSB2Mi4wLjBcbiAqICAgcGFyc2UoJzIwMTYtMDEtMDEnKVxuICpcbiAqICAgLy8gdjIuMC4wIG9ud2FyZFxuICogICBwYXJzZUlTTygnMjAxNi0wMS0wMScpXG4gKiAgIGBgYFxuICpcbiAqIC0gYHBhcnNlSVNPYCBub3cgdmFsaWRhdGVzIHNlcGFyYXRlIGRhdGUgYW5kIHRpbWUgdmFsdWVzIGluIElTTy04NjAxIHN0cmluZ3NcbiAqICAgYW5kIHJldHVybnMgYEludmFsaWQgRGF0ZWAgaWYgdGhlIGRhdGUgaXMgaW52YWxpZC5cbiAqXG4gKiAgIGBgYGphdmFzY3JpcHRcbiAqICAgcGFyc2VJU08oJzIwMTgtMTMtMzInKVxuICogICAvLz0+IEludmFsaWQgRGF0ZVxuICogICBgYGBcbiAqXG4gKiAtIGBwYXJzZUlTT2Agbm93IGRvZXNuJ3QgZmFsbCBiYWNrIHRvIGBuZXcgRGF0ZWAgY29uc3RydWN0b3JcbiAqICAgaWYgaXQgZmFpbHMgdG8gcGFyc2UgYSBzdHJpbmcgYXJndW1lbnQuIEluc3RlYWQsIGl0IHJldHVybnMgYEludmFsaWQgRGF0ZWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGFyZ3VtZW50IC0gdGhlIHZhbHVlIHRvIGNvbnZlcnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBhbiBvYmplY3Qgd2l0aCBvcHRpb25zLlxuICogQHBhcmFtIHswfDF8Mn0gW29wdGlvbnMuYWRkaXRpb25hbERpZ2l0cz0yXSAtIHRoZSBhZGRpdGlvbmFsIG51bWJlciBvZiBkaWdpdHMgaW4gdGhlIGV4dGVuZGVkIHllYXIgZm9ybWF0XG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIHBhcnNlZCBkYXRlIGluIHRoZSBsb2NhbCB0aW1lIHpvbmVcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMSBhcmd1bWVudCByZXF1aXJlZFxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gYG9wdGlvbnMuYWRkaXRpb25hbERpZ2l0c2AgbXVzdCBiZSAwLCAxIG9yIDJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ29udmVydCBzdHJpbmcgJzIwMTQtMDItMTFUMTE6MzA6MzAnIHRvIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSBwYXJzZUlTTygnMjAxNC0wMi0xMVQxMTozMDozMCcpXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDb252ZXJ0IHN0cmluZyAnKzAyMDE0MTAxJyB0byBkYXRlLFxuICogLy8gaWYgdGhlIGFkZGl0aW9uYWwgbnVtYmVyIG9mIGRpZ2l0cyBpbiB0aGUgZXh0ZW5kZWQgeWVhciBmb3JtYXQgaXMgMTpcbiAqIGNvbnN0IHJlc3VsdCA9IHBhcnNlSVNPKCcrMDIwMTQxMDEnLCB7IGFkZGl0aW9uYWxEaWdpdHM6IDEgfSlcbiAqIC8vPT4gRnJpIEFwciAxMSAyMDE0IDAwOjAwOjAwXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2VJU08oYXJndW1lbnQsIGRpcnR5T3B0aW9ucykge1xuICByZXF1aXJlZEFyZ3MoMSwgYXJndW1lbnRzKTtcbiAgdmFyIG9wdGlvbnMgPSBkaXJ0eU9wdGlvbnMgfHwge307XG4gIHZhciBhZGRpdGlvbmFsRGlnaXRzID0gb3B0aW9ucy5hZGRpdGlvbmFsRGlnaXRzID09IG51bGwgPyAyIDogdG9JbnRlZ2VyKG9wdGlvbnMuYWRkaXRpb25hbERpZ2l0cyk7XG5cbiAgaWYgKGFkZGl0aW9uYWxEaWdpdHMgIT09IDIgJiYgYWRkaXRpb25hbERpZ2l0cyAhPT0gMSAmJiBhZGRpdGlvbmFsRGlnaXRzICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ2FkZGl0aW9uYWxEaWdpdHMgbXVzdCBiZSAwLCAxIG9yIDInKTtcbiAgfVxuXG4gIGlmICghKHR5cGVvZiBhcmd1bWVudCA9PT0gJ3N0cmluZycgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZ3VtZW50KSA9PT0gJ1tvYmplY3QgU3RyaW5nXScpKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gIH1cblxuICB2YXIgZGF0ZVN0cmluZ3MgPSBzcGxpdERhdGVTdHJpbmcoYXJndW1lbnQpO1xuICB2YXIgZGF0ZTtcblxuICBpZiAoZGF0ZVN0cmluZ3MuZGF0ZSkge1xuICAgIHZhciBwYXJzZVllYXJSZXN1bHQgPSBwYXJzZVllYXIoZGF0ZVN0cmluZ3MuZGF0ZSwgYWRkaXRpb25hbERpZ2l0cyk7XG4gICAgZGF0ZSA9IHBhcnNlRGF0ZShwYXJzZVllYXJSZXN1bHQucmVzdERhdGVTdHJpbmcsIHBhcnNlWWVhclJlc3VsdC55ZWFyKTtcbiAgfVxuXG4gIGlmICghZGF0ZSB8fCBpc05hTihkYXRlLmdldFRpbWUoKSkpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgfVxuXG4gIHZhciB0aW1lc3RhbXAgPSBkYXRlLmdldFRpbWUoKTtcbiAgdmFyIHRpbWUgPSAwO1xuICB2YXIgb2Zmc2V0O1xuXG4gIGlmIChkYXRlU3RyaW5ncy50aW1lKSB7XG4gICAgdGltZSA9IHBhcnNlVGltZShkYXRlU3RyaW5ncy50aW1lKTtcblxuICAgIGlmIChpc05hTih0aW1lKSkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gICAgfVxuICB9XG5cbiAgaWYgKGRhdGVTdHJpbmdzLnRpbWV6b25lKSB7XG4gICAgb2Zmc2V0ID0gcGFyc2VUaW1lem9uZShkYXRlU3RyaW5ncy50aW1lem9uZSk7XG5cbiAgICBpZiAoaXNOYU4ob2Zmc2V0KSkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBkaXJ0eURhdGUgPSBuZXcgRGF0ZSh0aW1lc3RhbXAgKyB0aW1lKTsgLy8ganMgcGFyc2VkIHN0cmluZyBhc3N1bWluZyBpdCdzIGluIFVUQyB0aW1lem9uZVxuICAgIC8vIGJ1dCB3ZSBuZWVkIGl0IHRvIGJlIHBhcnNlZCBpbiBvdXIgdGltZXpvbmVcbiAgICAvLyBzbyB3ZSB1c2UgdXRjIHZhbHVlcyB0byBidWlsZCBkYXRlIGluIG91ciB0aW1lem9uZS5cbiAgICAvLyBZZWFyIHZhbHVlcyBmcm9tIDAgdG8gOTkgbWFwIHRvIHRoZSB5ZWFycyAxOTAwIHRvIDE5OTlcbiAgICAvLyBzbyBzZXQgeWVhciBleHBsaWNpdGx5IHdpdGggc2V0RnVsbFllYXIuXG5cbiAgICB2YXIgcmVzdWx0ID0gbmV3IERhdGUoMCk7XG4gICAgcmVzdWx0LnNldEZ1bGxZZWFyKGRpcnR5RGF0ZS5nZXRVVENGdWxsWWVhcigpLCBkaXJ0eURhdGUuZ2V0VVRDTW9udGgoKSwgZGlydHlEYXRlLmdldFVUQ0RhdGUoKSk7XG4gICAgcmVzdWx0LnNldEhvdXJzKGRpcnR5RGF0ZS5nZXRVVENIb3VycygpLCBkaXJ0eURhdGUuZ2V0VVRDTWludXRlcygpLCBkaXJ0eURhdGUuZ2V0VVRDU2Vjb25kcygpLCBkaXJ0eURhdGUuZ2V0VVRDTWlsbGlzZWNvbmRzKCkpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICByZXR1cm4gbmV3IERhdGUodGltZXN0YW1wICsgdGltZSArIG9mZnNldCk7XG59XG52YXIgcGF0dGVybnMgPSB7XG4gIGRhdGVUaW1lRGVsaW1pdGVyOiAvW1QgXS8sXG4gIHRpbWVab25lRGVsaW1pdGVyOiAvW1ogXS9pLFxuICB0aW1lem9uZTogLyhbWistXS4qKSQvXG59O1xudmFyIGRhdGVSZWdleCA9IC9eLT8oPzooXFxkezN9KXwoXFxkezJ9KSg/Oi0/KFxcZHsyfSkpP3xXKFxcZHsyfSkoPzotPyhcXGR7MX0pKT98KSQvO1xudmFyIHRpbWVSZWdleCA9IC9eKFxcZHsyfSg/OlsuLF1cXGQqKT8pKD86Oj8oXFxkezJ9KD86Wy4sXVxcZCopPykpPyg/Ojo/KFxcZHsyfSg/OlsuLF1cXGQqKT8pKT8kLztcbnZhciB0aW1lem9uZVJlZ2V4ID0gL14oWystXSkoXFxkezJ9KSg/Ojo/KFxcZHsyfSkpPyQvO1xuXG5mdW5jdGlvbiBzcGxpdERhdGVTdHJpbmcoZGF0ZVN0cmluZykge1xuICB2YXIgZGF0ZVN0cmluZ3MgPSB7fTtcbiAgdmFyIGFycmF5ID0gZGF0ZVN0cmluZy5zcGxpdChwYXR0ZXJucy5kYXRlVGltZURlbGltaXRlcik7XG4gIHZhciB0aW1lU3RyaW5nOyAvLyBUaGUgcmVnZXggbWF0Y2ggc2hvdWxkIG9ubHkgcmV0dXJuIGF0IG1heGltdW0gdHdvIGFycmF5IGVsZW1lbnRzLlxuICAvLyBbZGF0ZV0sIFt0aW1lXSwgb3IgW2RhdGUsIHRpbWVdLlxuXG4gIGlmIChhcnJheS5sZW5ndGggPiAyKSB7XG4gICAgcmV0dXJuIGRhdGVTdHJpbmdzO1xuICB9XG5cbiAgaWYgKC86Ly50ZXN0KGFycmF5WzBdKSkge1xuICAgIHRpbWVTdHJpbmcgPSBhcnJheVswXTtcbiAgfSBlbHNlIHtcbiAgICBkYXRlU3RyaW5ncy5kYXRlID0gYXJyYXlbMF07XG4gICAgdGltZVN0cmluZyA9IGFycmF5WzFdO1xuXG4gICAgaWYgKHBhdHRlcm5zLnRpbWVab25lRGVsaW1pdGVyLnRlc3QoZGF0ZVN0cmluZ3MuZGF0ZSkpIHtcbiAgICAgIGRhdGVTdHJpbmdzLmRhdGUgPSBkYXRlU3RyaW5nLnNwbGl0KHBhdHRlcm5zLnRpbWVab25lRGVsaW1pdGVyKVswXTtcbiAgICAgIHRpbWVTdHJpbmcgPSBkYXRlU3RyaW5nLnN1YnN0cihkYXRlU3RyaW5ncy5kYXRlLmxlbmd0aCwgZGF0ZVN0cmluZy5sZW5ndGgpO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0aW1lU3RyaW5nKSB7XG4gICAgdmFyIHRva2VuID0gcGF0dGVybnMudGltZXpvbmUuZXhlYyh0aW1lU3RyaW5nKTtcblxuICAgIGlmICh0b2tlbikge1xuICAgICAgZGF0ZVN0cmluZ3MudGltZSA9IHRpbWVTdHJpbmcucmVwbGFjZSh0b2tlblsxXSwgJycpO1xuICAgICAgZGF0ZVN0cmluZ3MudGltZXpvbmUgPSB0b2tlblsxXTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0ZVN0cmluZ3MudGltZSA9IHRpbWVTdHJpbmc7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRhdGVTdHJpbmdzO1xufVxuXG5mdW5jdGlvbiBwYXJzZVllYXIoZGF0ZVN0cmluZywgYWRkaXRpb25hbERpZ2l0cykge1xuICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKCdeKD86KFxcXFxkezR9fFsrLV1cXFxcZHsnICsgKDQgKyBhZGRpdGlvbmFsRGlnaXRzKSArICd9KXwoXFxcXGR7Mn18WystXVxcXFxkeycgKyAoMiArIGFkZGl0aW9uYWxEaWdpdHMpICsgJ30pJCknKTtcbiAgdmFyIGNhcHR1cmVzID0gZGF0ZVN0cmluZy5tYXRjaChyZWdleCk7IC8vIEludmFsaWQgSVNPLWZvcm1hdHRlZCB5ZWFyXG5cbiAgaWYgKCFjYXB0dXJlcykgcmV0dXJuIHtcbiAgICB5ZWFyOiBOYU4sXG4gICAgcmVzdERhdGVTdHJpbmc6ICcnXG4gIH07XG4gIHZhciB5ZWFyID0gY2FwdHVyZXNbMV0gPyBwYXJzZUludChjYXB0dXJlc1sxXSkgOiBudWxsO1xuICB2YXIgY2VudHVyeSA9IGNhcHR1cmVzWzJdID8gcGFyc2VJbnQoY2FwdHVyZXNbMl0pIDogbnVsbDsgLy8gZWl0aGVyIHllYXIgb3IgY2VudHVyeSBpcyBudWxsLCBub3QgYm90aFxuXG4gIHJldHVybiB7XG4gICAgeWVhcjogY2VudHVyeSA9PT0gbnVsbCA/IHllYXIgOiBjZW50dXJ5ICogMTAwLFxuICAgIHJlc3REYXRlU3RyaW5nOiBkYXRlU3RyaW5nLnNsaWNlKChjYXB0dXJlc1sxXSB8fCBjYXB0dXJlc1syXSkubGVuZ3RoKVxuICB9O1xufVxuXG5mdW5jdGlvbiBwYXJzZURhdGUoZGF0ZVN0cmluZywgeWVhcikge1xuICAvLyBJbnZhbGlkIElTTy1mb3JtYXR0ZWQgeWVhclxuICBpZiAoeWVhciA9PT0gbnVsbCkgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gIHZhciBjYXB0dXJlcyA9IGRhdGVTdHJpbmcubWF0Y2goZGF0ZVJlZ2V4KTsgLy8gSW52YWxpZCBJU08tZm9ybWF0dGVkIHN0cmluZ1xuXG4gIGlmICghY2FwdHVyZXMpIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICB2YXIgaXNXZWVrRGF0ZSA9ICEhY2FwdHVyZXNbNF07XG4gIHZhciBkYXlPZlllYXIgPSBwYXJzZURhdGVVbml0KGNhcHR1cmVzWzFdKTtcbiAgdmFyIG1vbnRoID0gcGFyc2VEYXRlVW5pdChjYXB0dXJlc1syXSkgLSAxO1xuICB2YXIgZGF5ID0gcGFyc2VEYXRlVW5pdChjYXB0dXJlc1szXSk7XG4gIHZhciB3ZWVrID0gcGFyc2VEYXRlVW5pdChjYXB0dXJlc1s0XSk7XG4gIHZhciBkYXlPZldlZWsgPSBwYXJzZURhdGVVbml0KGNhcHR1cmVzWzVdKSAtIDE7XG5cbiAgaWYgKGlzV2Vla0RhdGUpIHtcbiAgICBpZiAoIXZhbGlkYXRlV2Vla0RhdGUoeWVhciwgd2VlaywgZGF5T2ZXZWVrKSkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRheU9mSVNPV2Vla1llYXIoeWVhciwgd2VlaywgZGF5T2ZXZWVrKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKDApO1xuXG4gICAgaWYgKCF2YWxpZGF0ZURhdGUoeWVhciwgbW9udGgsIGRheSkgfHwgIXZhbGlkYXRlRGF5T2ZZZWFyRGF0ZSh5ZWFyLCBkYXlPZlllYXIpKSB7XG4gICAgICByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgICB9XG5cbiAgICBkYXRlLnNldFVUQ0Z1bGxZZWFyKHllYXIsIG1vbnRoLCBNYXRoLm1heChkYXlPZlllYXIsIGRheSkpO1xuICAgIHJldHVybiBkYXRlO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlRGF0ZVVuaXQodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID8gcGFyc2VJbnQodmFsdWUpIDogMTtcbn1cblxuZnVuY3Rpb24gcGFyc2VUaW1lKHRpbWVTdHJpbmcpIHtcbiAgdmFyIGNhcHR1cmVzID0gdGltZVN0cmluZy5tYXRjaCh0aW1lUmVnZXgpO1xuICBpZiAoIWNhcHR1cmVzKSByZXR1cm4gTmFOOyAvLyBJbnZhbGlkIElTTy1mb3JtYXR0ZWQgdGltZVxuXG4gIHZhciBob3VycyA9IHBhcnNlVGltZVVuaXQoY2FwdHVyZXNbMV0pO1xuICB2YXIgbWludXRlcyA9IHBhcnNlVGltZVVuaXQoY2FwdHVyZXNbMl0pO1xuICB2YXIgc2Vjb25kcyA9IHBhcnNlVGltZVVuaXQoY2FwdHVyZXNbM10pO1xuXG4gIGlmICghdmFsaWRhdGVUaW1lKGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzKSkge1xuICAgIHJldHVybiBOYU47XG4gIH1cblxuICByZXR1cm4gaG91cnMgKiBtaWxsaXNlY29uZHNJbkhvdXIgKyBtaW51dGVzICogbWlsbGlzZWNvbmRzSW5NaW51dGUgKyBzZWNvbmRzICogMTAwMDtcbn1cblxuZnVuY3Rpb24gcGFyc2VUaW1lVW5pdCh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgJiYgcGFyc2VGbG9hdCh2YWx1ZS5yZXBsYWNlKCcsJywgJy4nKSkgfHwgMDtcbn1cblxuZnVuY3Rpb24gcGFyc2VUaW1lem9uZSh0aW1lem9uZVN0cmluZykge1xuICBpZiAodGltZXpvbmVTdHJpbmcgPT09ICdaJykgcmV0dXJuIDA7XG4gIHZhciBjYXB0dXJlcyA9IHRpbWV6b25lU3RyaW5nLm1hdGNoKHRpbWV6b25lUmVnZXgpO1xuICBpZiAoIWNhcHR1cmVzKSByZXR1cm4gMDtcbiAgdmFyIHNpZ24gPSBjYXB0dXJlc1sxXSA9PT0gJysnID8gLTEgOiAxO1xuICB2YXIgaG91cnMgPSBwYXJzZUludChjYXB0dXJlc1syXSk7XG4gIHZhciBtaW51dGVzID0gY2FwdHVyZXNbM10gJiYgcGFyc2VJbnQoY2FwdHVyZXNbM10pIHx8IDA7XG5cbiAgaWYgKCF2YWxpZGF0ZVRpbWV6b25lKGhvdXJzLCBtaW51dGVzKSkge1xuICAgIHJldHVybiBOYU47XG4gIH1cblxuICByZXR1cm4gc2lnbiAqIChob3VycyAqIG1pbGxpc2Vjb25kc0luSG91ciArIG1pbnV0ZXMgKiBtaWxsaXNlY29uZHNJbk1pbnV0ZSk7XG59XG5cbmZ1bmN0aW9uIGRheU9mSVNPV2Vla1llYXIoaXNvV2Vla1llYXIsIHdlZWssIGRheSkge1xuICB2YXIgZGF0ZSA9IG5ldyBEYXRlKDApO1xuICBkYXRlLnNldFVUQ0Z1bGxZZWFyKGlzb1dlZWtZZWFyLCAwLCA0KTtcbiAgdmFyIGZvdXJ0aE9mSmFudWFyeURheSA9IGRhdGUuZ2V0VVRDRGF5KCkgfHwgNztcbiAgdmFyIGRpZmYgPSAod2VlayAtIDEpICogNyArIGRheSArIDEgLSBmb3VydGhPZkphbnVhcnlEYXk7XG4gIGRhdGUuc2V0VVRDRGF0ZShkYXRlLmdldFVUQ0RhdGUoKSArIGRpZmYpO1xuICByZXR1cm4gZGF0ZTtcbn0gLy8gVmFsaWRhdGlvbiBmdW5jdGlvbnNcbi8vIEZlYnJ1YXJ5IGlzIG51bGwgdG8gaGFuZGxlIHRoZSBsZWFwIHllYXIgKHVzaW5nIHx8KVxuXG5cbnZhciBkYXlzSW5Nb250aHMgPSBbMzEsIG51bGwsIDMxLCAzMCwgMzEsIDMwLCAzMSwgMzEsIDMwLCAzMSwgMzAsIDMxXTtcblxuZnVuY3Rpb24gaXNMZWFwWWVhckluZGV4KHllYXIpIHtcbiAgcmV0dXJuIHllYXIgJSA0MDAgPT09IDAgfHwgeWVhciAlIDQgPT09IDAgJiYgeWVhciAlIDEwMCAhPT0gMDtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVEYXRlKHllYXIsIG1vbnRoLCBkYXRlKSB7XG4gIHJldHVybiBtb250aCA+PSAwICYmIG1vbnRoIDw9IDExICYmIGRhdGUgPj0gMSAmJiBkYXRlIDw9IChkYXlzSW5Nb250aHNbbW9udGhdIHx8IChpc0xlYXBZZWFySW5kZXgoeWVhcikgPyAyOSA6IDI4KSk7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlRGF5T2ZZZWFyRGF0ZSh5ZWFyLCBkYXlPZlllYXIpIHtcbiAgcmV0dXJuIGRheU9mWWVhciA+PSAxICYmIGRheU9mWWVhciA8PSAoaXNMZWFwWWVhckluZGV4KHllYXIpID8gMzY2IDogMzY1KTtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVXZWVrRGF0ZShfeWVhciwgd2VlaywgZGF5KSB7XG4gIHJldHVybiB3ZWVrID49IDEgJiYgd2VlayA8PSA1MyAmJiBkYXkgPj0gMCAmJiBkYXkgPD0gNjtcbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVUaW1lKGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzKSB7XG4gIGlmIChob3VycyA9PT0gMjQpIHtcbiAgICByZXR1cm4gbWludXRlcyA9PT0gMCAmJiBzZWNvbmRzID09PSAwO1xuICB9XG5cbiAgcmV0dXJuIHNlY29uZHMgPj0gMCAmJiBzZWNvbmRzIDwgNjAgJiYgbWludXRlcyA+PSAwICYmIG1pbnV0ZXMgPCA2MCAmJiBob3VycyA+PSAwICYmIGhvdXJzIDwgMjU7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlVGltZXpvbmUoX2hvdXJzLCBtaW51dGVzKSB7XG4gIHJldHVybiBtaW51dGVzID49IDAgJiYgbWludXRlcyA8PSA1OTtcbn0iLCJpbXBvcnQgeyBwYXJzZUlTTyB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7IFRhc2ssIHRhc2tNYXN0ZXIgfSBmcm9tICcuL3Rhc2tzJztcbmltcG9ydCB7IHNob3dBZGQsIGhpZGVNZW51IH0gZnJvbSAnLi9mb3JtLWNvbnRyb2xsZXInO1xuaW1wb3J0IHsgcmVsb2FkTGlzdCB9IGZyb20gJy4vZGlzcGxheSc7XG5cbmNvbnN0IGNyZWF0ZVRhc2sgPSAoKSA9PiB7XG4gIGNvbnN0IHRhc2tJZCA9IHRhc2tNYXN0ZXIucmVhZCgpLmxlbmd0aDtcbiAgY29uc3QgdGFza05hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1uYW1lLWFkZCcpLnZhbHVlO1xuICBjb25zdCB0YXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1kZXNjcmlwdGlvbi1hZGQnKS52YWx1ZTtcbiAgY29uc3QgdGFza0RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1kYXRlLWFkZCcpLnZhbHVlO1xuICBjb25zdCB0YXNrUHJvamVjdCA9IE51bWJlcihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1hZGQnKS52YWx1ZSk7XG4gIGNvbnN0IHRhc2tQcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgJ2lucHV0W25hbWU9cHJpb3JpdHktYWRkXTpjaGVja2VkJ1xuICApLnZhbHVlO1xuICBjb25zdCBkYXRlID0gIXRhc2tEYXRlID8gbnVsbCA6IHBhcnNlSVNPKHRhc2tEYXRlKTtcbiAgY29uc3QgbmV3VGFzayA9IG5ldyBUYXNrKFxuICAgIHRhc2tJZCxcbiAgICB0YXNrTmFtZSxcbiAgICB0YXNrRGVzY3JpcHRpb24sXG4gICAgZGF0ZSxcbiAgICB0YXNrUHJvamVjdCxcbiAgICB0YXNrUHJpb3JpdHlcbiAgKTtcbiAgdGFza01hc3Rlci5wdXNoKG5ld1Rhc2spO1xuXG4gIGhpZGVNZW51KCdhZGQtdGFzay1tZW51Jyk7XG4gIHJlbG9hZExpc3QoKTtcbn07XG5cbmNvbnN0IGVkaXRUYXNrID0gKCkgPT4ge1xuICBjb25zdCBlZGl0VGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC10YXNrLWZvcm0nKTtcbiAgY29uc3QgeyB0YXNrSWQgfSA9IGVkaXRUYXNrRm9ybS5kYXRhc2V0O1xuICBjb25zdCB0aGlzVGFzayA9IHRhc2tNYXN0ZXIuZmluZFRhc2sodGFza0lkKTtcbiAgY29uc3QgdGFza05hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1uYW1lLWVkaXQnKS52YWx1ZTtcbiAgY29uc3QgdGFza0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAnI3Rhc2stZGVzY3JpcHRpb24tZWRpdCdcbiAgKS52YWx1ZTtcbiAgY29uc3QgdGFza0RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1kYXRlLWVkaXQnKS52YWx1ZTtcbiAgY29uc3QgdGFza1Byb2plY3QgPSBOdW1iZXIoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtZWRpdCcpLnZhbHVlKTtcbiAgY29uc3QgdGFza1ByaW9yaXR5ID0gW1xuICAgIC4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W25hbWU9cHJpb3JpdHktZWRpdF0nKSxcbiAgXS5maW5kKChwcmlvcml0eSkgPT4gcHJpb3JpdHkuY2hlY2tlZCkudmFsdWU7XG5cbiAgdGhpc1Rhc2submFtZSA9IHRhc2tOYW1lO1xuICB0aGlzVGFzay5kZXNjcmlwdGlvbiA9IHRhc2tEZXNjcmlwdGlvbjtcbiAgdGhpc1Rhc2suZGF0ZSA9ICF0YXNrRGF0ZSA/IG51bGwgOiBwYXJzZUlTTyh0YXNrRGF0ZSk7XG4gIHRoaXNUYXNrLnByb2plY3RJZCA9IHRhc2tQcm9qZWN0O1xuICB0aGlzVGFzay5wcmlvcml0eSA9IHRhc2tQcmlvcml0eTtcblxuICBoaWRlTWVudSgnZWRpdC10YXNrLW1lbnUnKTtcbiAgcmVsb2FkTGlzdCgpO1xufTtcblxuY29uc3QgaW5pdGlhbGl6ZUJ1dHRvbkV2ZW50cyA9ICgpID0+IHtcbiAgY29uc3Qgc3VibWl0QWRkVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdWJtaXQtYWRkJyk7XG4gIGNvbnN0IHNob3dBZGRUYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Nob3ctYWRkLXRhc2snKTtcbiAgY29uc3Qgc3VibWl0RWRpdFRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3VibWl0LWVkaXQnKTtcblxuICBzaG93QWRkVGFzay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNob3dBZGQpO1xuICBzdWJtaXRBZGRUYXNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY3JlYXRlVGFzayk7XG4gIHN1Ym1pdEVkaXRUYXNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZWRpdFRhc2spO1xufTtcblxuZXhwb3J0IHsgaW5pdGlhbGl6ZUJ1dHRvbkV2ZW50cyBhcyBpbnRpYWxpemVUYXNrSGFuZGxlciwgY3JlYXRlVGFzaywgZWRpdFRhc2sgfTtcbiJdLCJuYW1lcyI6WyJNYXRoIiwicG93IiwibWlsbGlzZWNvbmRzSW5Ib3VyIiwicGFyc2VJU08iLCJhcmd1bWVudCIsImRpcnR5T3B0aW9ucyIsInJlcXVpcmVkQXJncyIsImFyZ3VtZW50cyIsIm9wdGlvbnMiLCJhZGRpdGlvbmFsRGlnaXRzIiwidG9JbnRlZ2VyIiwiUmFuZ2VFcnJvciIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwiY2FsbCIsIkRhdGUiLCJOYU4iLCJkYXRlIiwiZGF0ZVN0cmluZ3MiLCJzcGxpdERhdGVTdHJpbmciLCJwYXJzZVllYXJSZXN1bHQiLCJwYXJzZVllYXIiLCJwYXJzZURhdGUiLCJyZXN0RGF0ZVN0cmluZyIsInllYXIiLCJpc05hTiIsImdldFRpbWUiLCJvZmZzZXQiLCJ0aW1lc3RhbXAiLCJ0aW1lIiwicGFyc2VUaW1lIiwidGltZXpvbmUiLCJkaXJ0eURhdGUiLCJyZXN1bHQiLCJzZXRGdWxsWWVhciIsImdldFVUQ0Z1bGxZZWFyIiwiZ2V0VVRDTW9udGgiLCJnZXRVVENEYXRlIiwic2V0SG91cnMiLCJnZXRVVENIb3VycyIsImdldFVUQ01pbnV0ZXMiLCJnZXRVVENTZWNvbmRzIiwiZ2V0VVRDTWlsbGlzZWNvbmRzIiwicGFyc2VUaW1lem9uZSIsInBhdHRlcm5zIiwiZGF0ZVRpbWVEZWxpbWl0ZXIiLCJ0aW1lWm9uZURlbGltaXRlciIsImRhdGVSZWdleCIsInRpbWVSZWdleCIsInRpbWV6b25lUmVnZXgiLCJkYXRlU3RyaW5nIiwidGltZVN0cmluZyIsImFycmF5Iiwic3BsaXQiLCJsZW5ndGgiLCJ0ZXN0Iiwic3Vic3RyIiwidG9rZW4iLCJleGVjIiwicmVwbGFjZSIsInJlZ2V4IiwiUmVnRXhwIiwiY2FwdHVyZXMiLCJtYXRjaCIsInBhcnNlSW50IiwiY2VudHVyeSIsInNsaWNlIiwiaXNXZWVrRGF0ZSIsImRheU9mWWVhciIsInBhcnNlRGF0ZVVuaXQiLCJtb250aCIsImRheSIsIndlZWsiLCJkYXlPZldlZWsiLCJfeWVhciIsInZhbGlkYXRlV2Vla0RhdGUiLCJpc29XZWVrWWVhciIsInNldFVUQ0Z1bGxZZWFyIiwiZm91cnRoT2ZKYW51YXJ5RGF5IiwiZ2V0VVRDRGF5IiwiZGlmZiIsInNldFVUQ0RhdGUiLCJkYXlPZklTT1dlZWtZZWFyIiwiZGF5c0luTW9udGhzIiwiaXNMZWFwWWVhckluZGV4IiwidmFsaWRhdGVEYXRlIiwidmFsaWRhdGVEYXlPZlllYXJEYXRlIiwibWF4IiwidmFsdWUiLCJob3VycyIsInBhcnNlVGltZVVuaXQiLCJtaW51dGVzIiwic2Vjb25kcyIsInZhbGlkYXRlVGltZSIsInBhcnNlRmxvYXQiLCJ0aW1lem9uZVN0cmluZyIsInNpZ24iLCJfaG91cnMiLCJ2YWxpZGF0ZVRpbWV6b25lIiwiY3JlYXRlVGFzayIsInRhc2tJZCIsInRhc2tOYW1lIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidGFza0Rlc2NyaXB0aW9uIiwidGFza0RhdGUiLCJ0YXNrUHJvamVjdCIsIk51bWJlciIsInRhc2tQcmlvcml0eSIsIm5ld1Rhc2siLCJlZGl0VGFzayIsImVkaXRUYXNrRm9ybSIsImRhdGFzZXQiLCJ0aGlzVGFzayIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmaW5kIiwicHJpb3JpdHkiLCJjaGVja2VkIiwibmFtZSIsImRlc2NyaXB0aW9uIiwicHJvamVjdElkIiwiaW5pdGlhbGl6ZUJ1dHRvbkV2ZW50cyIsInN1Ym1pdEFkZFRhc2siLCJzaG93QWRkVGFzayIsInN1Ym1pdEVkaXRUYXNrIiwiYWRkRXZlbnRMaXN0ZW5lciJdLCJzb3VyY2VSb290IjoiIn0=