import React, { Component } from 'react'
import THREE from 'three'

const provide = (settings) => {
  console.log(settings)
  return class Three extends Component {
    static defaultProps = {
      data: []
    }
    render(){
      return (
        <div ref="root" style={{display: 'flex', flexFlow: 'column nowrap', height: '100%'}}>
        <h3>{settings.title}</h3>
          <div ref="renderTo" id ="renderTo" style={{flex: '1 0 auto'}}>
            <canvas id="aaa"></canvas>
          </div>
        </div>
      )
    }
    componentDidMount(){
      const { renderTo } = this.refs
      const { data } = this.props
      console.log(data,1)
      var scene, camera, renderer, ballMesh, light, controls
      var ballRadius = 5
      var width = window.innerWidth - 50
      var height = window.innerHeight - 100
      var color = 0x00ff00

      renderer = new THREE.WebGLRenderer({
        antialias : true,
        canvas: document.getElementById('aaa')
      })
      renderer.setSize(width,height)
      renderer.setClearColor(0x000000)
      scene = new THREE.Scene()

      camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000)
      camera.position.set(-120, 110, 100)
      console.log(camera.position)
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      controls = new THREE.TrackballControls( camera );
      controls.rotateSpeed = 1.0;
      controls.zoomSpeed = 1.2;
      controls.panSpeed = 0.8;
      controls.noZoom = false;
      controls.noPan = false;
      controls.staticMoving = true;
      controls.dynamicDampingFactor = 0.3;
      controls.keys = [ 65, 83, 68 ];
      controls.addEventListener( 'change', render );
      window.addEventListener( 'resize', onWindowResize, false );
      scene.add(camera)

      light = new THREE.DirectionalLight(0xffffff)
      light.position.set(-120, 110, 100)
      scene.add(light)

      var cube = new THREE.Mesh(new THREE.SphereGeometry(ballRadius, 16, 8),
        new THREE.MeshLambertMaterial({
          color: 0x0000ff
        })
      )
      cube.position.set(15,5,50)
      scene.add(cube)




      // var geometry2 = new THREE.Geometry()
      // for(var i = 0; i <= 2; i++){
      //   geometry2.vertices.push(new THREE.Vector3(-30,5,0))
      //   geometry2.vertices.push(new THREE.Vector3(0,5,0))
      //   var line = new THREE.Line(geometry2, new THREE.LineBasicMaterial({color: 0x00ff00}))
      //   line.position.z = -30*i
      //   scene.add(line)
      //
      //   var line2 = new THREE.Line(geometry2, new THREE.LineBasicMaterial({color: 0x00ff00}))
      //   line2.position.z = -30*i
      //   line2.position.x = 60
      //   scene.add(line2)
      // }

      var Vloader = new THREE.OBJLoader();
      Vloader.load('widgets/three/data/host.obj', function(obj) {
        var newMesh = obj.clone()
        for(var j = -2; j <= -1; j++){
          for(var i = 0; i <= 2; i++){
          var drawMesh = newMesh.clone()
            drawMesh.position.set(j*30,0,-30*i)
            scene.add(drawMesh)
          }
        }
        for(var i = 0; i <= 2; i++){
        var drawMesh2 = newMesh.clone()
          drawMesh2.position.set(60,0,-30*i)
          scene.add(drawMesh2)
          var geometry = new THREE.Geometry()
          geometry.vertices.push(new THREE.Vector3(15, 5, 50));
          geometry.vertices.push(new THREE.Vector3(15,5,-30));
          var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({color: color}))
          scene.add(line)
          var geometry1 = new THREE.Geometry()
          geometry1.vertices.push(new THREE.Vector3(16,5,-30),
           new THREE.Vector3(16, 5, -5),
           new THREE.Vector3(60,5,-5),
           new THREE.Vector3(60,5,0)
          );
          var line = new THREE.Line(geometry1, new THREE.LineBasicMaterial({color: color}))
          scene.add(line)
          var geometry1 = new THREE.Geometry()
          geometry1.vertices.push(new THREE.Vector3(16,5,-30),
            new THREE.Vector3(16, 5, -35),
            new THREE.Vector3(60,5,-35),
            new THREE.Vector3(60,5,-30)
          );
          var line = new THREE.Line(geometry1, new THREE.LineBasicMaterial({color: color}))
          scene.add(line)
          var geometry1 = new THREE.Geometry()
          geometry1.vertices.push(new THREE.Vector3(15,5,-30),
            new THREE.Vector3(15, 5, -65),
            new THREE.Vector3(60,5,-65),
            new THREE.Vector3(60,5,-60)
          );
          var line = new THREE.Line(geometry1, new THREE.LineBasicMaterial({color: color}))
          scene.add(line)
          console.log(drawMesh2.position)
        }

        var drawMesh3 = newMesh.clone()
          drawMesh3.position.set(15,0,-30)
          scene.add(drawMesh3)
       })

      var geometry = new THREE.Geometry();
      geometry.vertices.push(new THREE.Vector3(-200, 0, 0));
      geometry.vertices.push(new THREE.Vector3(200, 0, 0));
      for(var i = 0; i <= 40; i++){
        var line = new THREE.Line(geometry,new THREE.LineBasicMaterial({
          color: 0xB8B8B8,
          transparent:true,
          opacity:0.6
        }))
          line.position.z = (i * 10) - 200;
          scene.add(line);
        var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
          color: 0xB8B8B8,
          transparent:true,
          opacity:0.6
        }))
          line.position.x = (i * 10) - 200;
          line.rotation.y =  Math.PI / 2;
          scene.add(line)
        }

      render()
      function render(){
        // renderer.clear();
        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }
      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
        controls.handleResize();
        render();
      }
      animate()

      function animate() {
        requestAnimationFrame( animate );
        controls.update();
      }
    }
  }
}
Medivh.registerVisualization({
  label: 'three',
  identifer: 'three',
  provide,
  settingFields: []
})
