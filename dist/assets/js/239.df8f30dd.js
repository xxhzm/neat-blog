"use strict";(self["webpackChunkneat"]=self["webpackChunkneat"]||[]).push([[239],{5239:function(a,e,n){n.r(e),n.d(e,{default:function(){return h}});var t=n(4021),s=(n(9776),n(3396)),l=n(2268),i=n(4870),c=n(678),u=n(6038);const r=a=>u.Z.get("api/page",{params:{alias:a}}),o={class:"Page__container shadow"},p={class:"Page__title"},v={class:"Page__info"},_=(0,s.Uk)("发布于"),d={class:"ps-2"},g=["innerHTML"];var w={name:"Page",props:["alias"],setup(a){const e=a,n=(0,i.iH)(!0),u=(0,i.iH)({}),w=async a=>{const{data:{data:e}}=await r(a);u.value=e,n.value=!1};return(0,c.ao)(((a,e,t)=>{n.value=!0,w(a.params.alias),t()})),w(e.alias),(a,e)=>{const i=t.t;return(0,s.wy)(((0,s.wg)(),(0,s.iD)("div",o,[(0,s._)("h2",p,(0,l.zw)(u.value.title),1),(0,s._)("div",v,[(0,s._)("p",null,[_,(0,s._)("span",d,(0,l.zw)(u.value.create_time),1)])]),(0,s._)("div",{class:"Page-content",innerHTML:u.value.content},null,8,g)])),[[i,n.value]])}}};const f=w;var h=f},9776:function(a,e,n){n(2181)}}]);