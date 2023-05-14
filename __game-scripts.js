var PlayerMovement=pc.createScript("playerMovement");PlayerMovement.attributes.add("speed",{type:"number",default:.09}),PlayerMovement.prototype.initialize=function(){var e=this.app;this.stop=!1;var t=e.root.findByName("Camera");this.cameraScript=t.script.cameraMovement,e.root.findByName("enemy").script.trigger.on("move",(function(){console.log(333),e.root.findByName("Player").script.playerMovement.stop=!0}))},PlayerMovement.worldDirection=new pc.Vec3,PlayerMovement.tempDirection=new pc.Vec3,PlayerMovement.prototype.update=function(e){var t=this.app;if(this.stop,this.stop||t.keyboard.isPressed(pc.KEY_Q)){var i=t.root.findByName("Player");this.stop=!1;var r=t.root.findByName("enemy").getPosition(),o=i.getPosition();r.y=o.y;var a=(new pc.Vec3).copy(o).sub(r).normalize(),n=(new pc.Vec3).copy(a).scale(2e4);this.entity.rigidbody.applyForce(n)}else{var s=PlayerMovement.worldDirection;s.set(0,0,0);var c=PlayerMovement.tempDirection,p=this.entity.forward,y=this.entity.right,d=0,l=0;if(t.keyboard.isPressed(pc.KEY_A)&&(d-=1),t.keyboard.isPressed(pc.KEY_D)&&(d+=1),t.keyboard.isPressed(pc.KEY_W)&&(l+=1),t.keyboard.isPressed(pc.KEY_S)&&(l-=1),0!==d||0!==l){s.add(c.copy(p).mulScalar(l)),s.add(c.copy(y).mulScalar(d)),s.normalize();var m=new pc.Vec3(s.x*e,0,s.z*e);m.normalize().scale(this.speed),m.add(this.entity.getPosition());var v=this.cameraScript.eulers.x+180,P=new pc.Vec3(0,v,0);this.entity.rigidbody.teleport(m,P)}this.entity.anim.setFloat("xDirection",d),this.entity.anim.setFloat("zDirection",l)}};var CameraMovement=pc.createScript("cameraMovement");CameraMovement.attributes.add("mouseSpeed",{type:"number",default:1.4,description:"Mouse Sensitivity"}),CameraMovement.prototype.initialize=function(){this.eulers=new pc.Vec3,this.touchCoords=new pc.Vec2;var e=this.app;e.mouse.on("mousemove",this.onMouseMove,this),e.mouse.on("mousedown",this.onMouseDown,this),this.rayEnd=e.root.findByName("RaycastEndPoint"),this.on("destroy",(function(){e.mouse.off("mousemove",this.onMouseMove,this),e.mouse.off("mousedown",this.onMouseDown,this)}),this)},CameraMovement.prototype.postUpdate=function(e){var t=this.entity.parent,o=this.eulers.x+180,s=this.eulers.y,i=new pc.Vec3(-s,o,0);t.setEulerAngles(i),this.entity.setPosition(this.getWorldPoint()),this.entity.lookAt(t.getPosition())},CameraMovement.prototype.onMouseMove=function(e){pc.Mouse.isPointerLocked()&&(this.eulers.x-=this.mouseSpeed*e.dx/60%360,this.eulers.y+=this.mouseSpeed*e.dy/60%360,this.eulers.x<0&&(this.eulers.x+=360),this.eulers.y<0&&(this.eulers.y+=360))},CameraMovement.prototype.onMouseDown=function(e){this.app.mouse.enablePointerLock()},CameraMovement.prototype.getWorldPoint=function(){var e=this.entity.parent.getPosition(),t=this.rayEnd.getPosition(),o=this.app.systems.rigidbody.raycastFirst(e,t);return o?o.point:t};var Trigger=pc.createScript("trigger");Trigger.prototype.update=function(r){},Trigger.prototype.initialize=function(){this.entity.collision.on("collisionstart",this.onTriggerEnter,this)},Trigger.worldDirection=new pc.Vec3,Trigger.tempDirection=new pc.Vec3,Trigger.prototype.onTriggerEnter=function(r){this.app;var i=Trigger.worldDirection,e=Trigger.tempDirection;if(i.set(0,0,0),r.other.rigidbody){console.log(111),this.fire("move");var t=r.other.forward;i.add(e.copy(t).mulScalar(-1)),i.normalize();var o=new pc.Vec3(10*i.x,0,10*i.z);o.normalize().scale(10),o.add(r.other.getPosition())}};