import * as THREE from 'three';
import gsap from 'gsap'
import SimplexNoise from 'simplex-noise'
import { update } from 'lodash';

export default class Canvas {
	constructor ({ template }) {
			this.template = template
			this.y = {
			start: 0,
			distance: 0,
			end: 0
			}
			this.colorSlider = document.querySelector('input[name="blobColor"]')
			this.processingSlider = document.querySelector('input[name="blobProcess"]')


			this.clock = new THREE.Clock()

			this.settings = {
				speed: 0.2,
				density: 1,
				strength: 0.2,
				color: 0.1,
				alpha: 1.0,
				alphaB: 1.0
			}
			this.mouse = new THREE.Vector2(0.8, 0.5)

			this.simplex = new SimplexNoise()
			this.createRenderer()
			this.createScene()
			this.createCamera()
			this.createGeometry()
			this.createLights()

			this.onResize()
			this.onChange(template)
	}

	createRenderer () {
		this.renderer = new THREE.WebGLRenderer({
		alpha: true,
		antialias: true
		})
		this.renderer.setSize(window.innerWidth, window.innerHeight)
		this.renderer.setPixelRatio(window.devicePixelRatio || 1)

		document.body.appendChild(this.renderer.domElement)
	}

	createCamera () {
		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
		this.camera.position.z = 5
	}

	createScene() {
		this.scene = new THREE.Scene()
	}

	createGeometry() {

		let blobGeometry = new THREE.SphereGeometry(1.2, 80, 80)
		blobGeometry.setAttribute("basePosition", new THREE.BufferAttribute().copy(blobGeometry.attributes.position))

		const blobMaterial = new THREE.MeshPhongMaterial( {
			color: 0xEBAD3C,
			shininess: 100,
			transparent: true,
			opacity: 1
		})
		this.mesh = new THREE.Mesh(blobGeometry, blobMaterial)
		this.mesh.position.set(-1, -0.4, 0)
		this.scene.add(this.mesh)

		const blobMaterial2 = new THREE.MeshPhongMaterial( {
			color: 0xD19FAF,
			shininess: 100,
			transparent: true,
			opacity: 1
		})

		this.mesh2 = new THREE.Mesh(blobGeometry, blobMaterial2);
		this.mesh2.position.set(1, -50, 0)
		this.scene.add(this.mesh2);


		if(window.innerWidth < 750) {
			this.mesh.position.set(0, -0.4, -0.5)
			this.mesh2.position.set(0.4, -90, -0.5)
		}

	}

	createLights() {
		this.lightTop = new THREE.DirectionalLight(0xFFFFFF, .7)
		this.lightTop.position.set(0, 500, 200)
		this.lightTop.castShadow = true
		this.scene.add(this.lightTop)
	  
		this.lightBottom = new THREE.DirectionalLight(0xFFFFFF, .25)
		this.lightBottom.position.set(0, -500, 400)
		this.lightBottom.castShadow = true
		this.scene.add(this.lightBottom)
	  
		this.ambientLight = new THREE.AmbientLight(0x798296)
		this.scene.add(this.ambientLight)
	}

	setNewPoints( a, time ) {
		
		const basePositionAttribute = this.mesh.geometry.getAttribute("basePosition")
		const positionAttribute = this.mesh.geometry.getAttribute( 'position' )

		// const basePositionAttribute2 = this.mesh.geometry.getAttribute("basePosition")
		// const positionAttribute2 = this.mesh.geometry.getAttribute( 'position' )

		
		const vertex = new THREE.Vector3()
		let perlin
		const spikes = 0.6
		for ( let vertexIndex = 0; vertexIndex < positionAttribute.count; vertexIndex++ ) {

			vertex.fromBufferAttribute( basePositionAttribute, vertexIndex )

			perlin = this.simplex.noise3D(
				vertex.x * spikes,
				vertex.y * spikes,
				vertex.z * spikes + time)
			if(perlin){
				
				let ratio = perlin * 0.4 * ( this.mouse.y + (this.mouse.x * 0.3) + 0.1 ) + 0.8
				vertex.multiplyScalar( ratio )
				positionAttribute.setXYZ(vertexIndex, vertex.x, vertex.y, vertex.z)
			}

		}

		this.mesh.geometry.attributes.position.needsUpdate = true // required after the first render
		this.mesh.geometry.computeBoundingSphere()
		this.mesh.geometry.computeVertexNormals()

		this.mesh2.geometry.attributes.position.needsUpdate = true // required after the first render
		this.mesh2.geometry.computeBoundingSphere()
		this.mesh2.geometry.computeVertexNormals()
		
	}

  /**
   * Events
   */

	onPreloaded(template) {
		this.template = template
		this.onChange(this.template)
	}


	onChange(template) {
		this.template = template

		if( template === 'home') {
			gsap.fromTo(this.mesh.material, {
				opacity: 0,
				duration: 0.2,
				ease: 'Power2.easeIn'
			}, {
				opacity: 1,
				duration: 0.2,
				ease: 'Power2.easeOut'
			})

			gsap.fromTo(this.mesh2.material, {
				opacity: 0,
				duration: 0.2,
				ease: 'Power2.easeIn'
			}, {
				opacity: 1,
				duration: 0.2,
				ease: 'Power2.easeOut'
			})
		}

		if( template === 'about') {
			gsap.to(this.mesh.material, {
				opacity: 0,
				duration: 0.2,
				ease: 'Power2.easeIn'
			})

			gsap.fromTo(this.mesh2.material, {
				opacity: 0,
				duration: 0.2,
				ease: 'Power2.easeIn'
			}, {
				opacity: 1,
				duration: 0.2,
				ease: 'Power2.easeOut'
			})
		}

		if( template === 'work') {
			gsap.set(this.mesh.material, {
				opacity: 1,
			})
			gsap.to(this.mesh.material, {
				opacity: 1,
				duration: 0.2,
				ease: 'Power2.easeOut'
			})
			gsap.to(this.mesh2.material, {
				opacity: 0,
				duration: 0.2,
				ease: 'Power2.easeIn'
			})
		}

		if( template === 'services') {
			gsap.to(this.mesh.material, {
				opacity: 0,
				duration: 0.2,
				ease: 'Power2.easeIn'
			})

			gsap.to(this.mesh2.material, {
				opacity: 0,
				duration: 0.2,
				ease: 'Power2.easeIn'
			})
		}else{
			gsap.set(this.mesh.material, {
				opacity: 0,
			})
			gsap.set(this.mesh2.material, {
				opacity: 0,
			})
		}

	}

	onResize() {
		const windowWidth = window.innerWidth
		const windowHeight = window.innerHeight

		this.camera.aspect = windowWidth/windowHeight
		this.camera.updateProjectionMatrix()

		this.renderer.setSize(windowWidth, windowHeight)

		//Making measurement units in webgl work like css
		const fov = this.camera.fov * (Math.PI / 180)
		const height = 2 * Math.tan(fov / 2) * this.camera.position.z
		const width = height * this.camera.aspect

		this.sizes = {
			height,
			width
		}

		const values = {
			sizes: this.sizes
		}
	}
	onMouseMove( e ) {
		gsap.to( this.mouse, {
			y: e.clientY / window.innerHeight,
			x: e.clientX /window.innerWidth,
			duration: 0.8,
			ease: 'Power1.easeOut',
		} );

	}
	/**
	 * Loop
	 */

	update(scroll, a) {
		let time = performance.now() * 0.00001 * 15
		if(window.innerWidth < 750){
			if(scroll != 0 && scroll<0 ) {
				this.mesh.position.y = -0.4
				this.mesh2.position.y = -90
			} else if(scroll > 0){
				this.mesh.position.y = gsap.utils.interpolate(this.mesh.position.y,scroll*0.003, 0.1 )
				this.mesh2.position.y = gsap.utils.interpolate(this.mesh.position.y,scroll*0.005-90, 0.1 )
			}
			else if(scroll = 0){
				this.mesh.position.y = -0.4
				this.mesh2.position.y = -90
			}
		} else {

			if(scroll != 0 && scroll<0 ) {
				this.mesh.position.y = -0.4
				this.mesh2.position.y = -150
			} else if(scroll > 0){
				this.mesh.position.y = gsap.utils.interpolate(this.mesh.position.y,scroll*0.003, 0.1 )
				this.mesh2.position.y = gsap.utils.interpolate(this.mesh.position.y,scroll*0.003-window.innerWidth*0.1+30, 0.1 )
			}
			else if(scroll = 0){
				this.mesh.position.y = -0.4
				this.mesh2.position.y = -150
			}
		}

		if(this.processingSlider) {
			time = time * Math.pow(this.processingSlider.value, 3)
		}
		if(this.colorSlider){
			this.mesh.material.color = gsap.utils.interpolate(new THREE.Color(0xEBAD3C), new THREE.Color(0xD19FAF), this.colorSlider.value)
		}
		this.setNewPoints(a, time)
		this.renderer.render(this.scene, this.camera)
	}
}


