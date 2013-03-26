var DE=DE||{};DE.Math=DE.Math||{};DE.Math.PI=void 0!==Math?Math.PI:3.141592653;DE.Math.Clamp=function(a,b,c){a=Math.min(a,c);return Math.max(b,a)};DE.Math.Rand=function(a,b){return void 0!==a?DE.clamp(Math.random(),a,b):Math.random()};DE.Math.RadToDeg=function(a){return DE.Math.CleanFloat(180*a/DE.Math.PI)};DE.Math.DegToRad=function(a){return DE.Math.CleanFloat(a*DE.Math.PI/180)};DE.Math.CleanFloat=function(a){return parseFloat(a.toFixed(7))};DE=DE||{};
DE.Vector=function(){function a(b,a){"object"===typeof DE.Util.Unwrap(b)?(this.x=DE.Util.Unwrap(b.x)||0,this.y=DE.Util.Unwrap(b.y)||0):(this.x=DE.Util.Unwrap(b)||0,this.y=DE.Util.Unwrap(a)||0);return this}a.prototype.Scale=function(b){b=DE.Util.Unwrap(b)||1;this.x*=b;this.y*=b;return this};a.prototype.Add=function(b){b=DE.Util.Unwrap(b);this.x+=b.x;this.y+=b.y;return this};a.prototype.Sub=function(b){b=DE.Util.Unwrap(b);this.x-=b.x;this.y-=b.y;return this};a.prototype.Dot=function(b){b=DE.Util.Unwrap(b);
return this.x*b.x+this.y*b.y};a.prototype.Length=function(){return Math.sqrt(this.x*this.x+this.y*this.y)};a.prototype.LengthSQ=function(){return this.x*this.x+this.y*this.y};a.prototype.GetDistanceFrom=function(b){b=DE.Util.Unwrap(b);return(new a(this.x-b.x,this.y-b.y)).Length()};a.prototype.Normalize=function(b){b=DE.Util.Unwrap(b);var a=1/this.Length();this.x*=a;this.y*=a;this.Scale(b||1);return this};a.prototype.Perp=function(){return DE.Vec2d(-this.y,this.x)};return a}();
DE.Vec2d=function(a,b){return new DE.Vector(a,b)};DE.HeadingVec=function(a){var b=DE.Math.DegToRad(a);a=DE.Math.CleanFloat(Math.cos(b));b=DE.Math.CleanFloat(Math.sin(b));return DE.Vec2d(a,b)};DE.Vector.Add=function(a,b){a=DE.Util.Unwrap(a);b=DE.Util.Unwrap(b);return DE.Vec2d(a.x+b.x,a.y+b.y)};DE.Vector.Sub=function(a,b){a=DE.Util.Unwrap(a);b=DE.Util.Unwrap(b);return DE.Vec2d(a.x-b.x,a.y-b.y)};
DE.Vector.WorldToLocal=function(a,b){var c=b.Perp(),c=[[b.x,c.x],[b.y,c.y]];return DE.Vec2d(a.x*c[0][0]+a.y*c[0][1],a.x*c[1][0]+a.y*c[1][1])};DE.Vector.HeadingToDeg=function(a){var b=DE.Vec2d(1,0),c=DE.Vec2d(a.x,a.y),b=DE.Math.RadToDeg(Math.acos(b.Dot(c.Normalize())));0>a.y&&(b=360-b);return b};
DE.Vector.LocalToWorld=function(a,b){var c=DE.Vector.HeadingToDeg(b),c=DE.Vector.WorldToLocal(DE.HeadingVec(-c),world),d=c.Perp(),d=[[c.x,d.x],[c.y,d.y]],c=DE.Math.CleanFloat(a.x*d[0][0]+a.y*d[0][1]),d=DE.Math.CleanFloat(a.x*d[1][0]+a.y*d[1][1]);return DE.Vec2d(c,d)};
DE.HeadingToDegTest=function(){for(var a=0;360>a;a++){var b=DE.Math.CleanFloat(Math.cos(DE.Math.DegToRad(a))),c=DE.Math.CleanFloat(Math.sin(DE.Math.DegToRad(a))),b=DE.Vec2d(b,c),c=DE.Vector.HeadingToDeg(b);(c<a-1E-4||c>a+1E-4)&&console.log("heading:",b,"got:",c," Expected:",a)}};
DE.VecTest=function(){for(var a=DE.Vec2d(1,0),b=0;360>=b;b+=5){var c=DE.Vector.WorldToLocal(a,DE.HeadingVec(b)),c=DE.Vector.LocalToWorld(c,DE.HeadingVec(b));(c.x<a.x-1E-4||c.x>a.x+1E-4)&&console.log("AT: ",b," Expected x to be:",a.x,"  Got:",c.x);(c.y<a.y-1E-4||c.y>a.y+1E-4)&&console.log("AT: ",b," Expected x to be:",a.y,"  Got:",c.y)}};DE=DE||{};
DE.Steer=function(){function a(){}a.prototype.align=function(){};a.prototype.arrive=function(b,a,d,e){e=e||5;var f=b.GetDistanceFrom(a);return 0<f?(d=DE.Math.Clamp(f/e,0,d),a.Sub(b).Normalize(d)):DE.Vec2d(0,0)};a.prototype.cohese=function(){};a.prototype.evade=function(b,a,d,e,f){var g=DE.Vector.Sub(a,b);e=DE.HeadingVec(e);f=f||60;d=g.Length()/(d+f);a=DE.Vector.Add(a,e.Normalize(d));return this.flee(b,a)};a.prototype.flee=function(a,c,d,e){e=void 0===e||-1===e||c.GetDistanceFrom(a)<=e;a=a.Sub(c).Normalize(d);
return e?a:DE.Vec2d(0,0)};a.prototype.hide=function(){};a.prototype.interpose=function(){};a.prototype.obstacleAvoid=function(){};a.prototype.pursuit=function(a,c,d,e,f){var g=DE.Vector.Sub(c,a);e=DE.HeadingVec(e);f=f||60;d=g.Length()/(d+f);c=DE.Vector.Add(c,e.Normalize(d));return this.seek(a,c)};a.prototype.seek=function(a,c,d){return DE.Vector.Sub(c,a).Normalize(d)};a.prototype.seperation=function(){};a.prototype.wander=function(a,c,d){var e=10*DE.Math.Clamp(DE.Math.Rand(),-1,1),f=10*DE.Math.Clamp(DE.Math.Rand(),
-1,1);c.Add(DE.Vec2d(e,f)).Normalize(10);c.Add(DE.Vec2d(10,0));c=DE.Vector.LocalToWorld(c,d);return DE.Vector.Sub(c,a)};return new a}();DE=DE||{};DE.Util=DE.Util||{};DE.Util.Unwrap=function(a){return"function"===typeof a?a():a};
