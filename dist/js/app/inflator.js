define(["jquery","./trial/trial_sets","./stimulus/stimulus_sets","./media/media_sets","app/task/script"],function(e,t,n,r,i){var s=function(t){return typeof t.customize=="function"&&t.customize.apply(t,[t,i.global]),t},o=function(i,u,a){var f,l,c,h;switch(u){case"trial":f=t();break;case"stimulus":f=n();break;case"media":f=r();break;default:throw new Error("Unknown set type "+u)}if(!i.inherit)return!a&&s(i),i;l=e.isPlainObject(i.inherit)?i.inherit:{set:i.inherit};if(!f[l.set])throw new Error("Unknown "+u+"Set: "+l.set);return c=o(f[l.set].inherit(l),u,!0),h=e.extend(!0,{},i),e.each(c,function(t,n){h[t]||(e.isArray(c[t])?h[t]=e.extend(!0,[],n):typeof c[t]=="object"?h[t]=e.extend(!0,{},n):h[t]=n)}),c.data&&(h.data=e.extend(!0,{},c.data,h.data)),!a&&s(h),h};return o});