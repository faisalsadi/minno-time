define(["jquery","underscore"],function(e,t){var n={MessageDef:[],manyErrors:"There were too many errors made to determine a result.",tooFast:"There were too many fast trials to determine a result.",notEnough:"There were not enough trials to determine a result."},r={setMsgObject:function(t){e.extend(n,t)},getScoreMsg:function(e){var r=n.MessageDef;if(!r||!r.length)throw new Error('You must define a "MessageDef" array.');var i=parseFloat(e),s=null,o=null,u="error: msg was not set",a=!1;t.each(r,function(e){s=parseFloat(e.cut),o=e.message,i<=s&&!a&&(u=o,a=!0)});if(!a){var f=r.length,l=r[f-1];u=l.message}return u},getMessage:function(t){return n[t]}};return r});