import * as THREE from 'three';
import gsap from 'gsap'
// import Home from './Home'
// import About from './About'
// import Work from './Work'
const noise = `
		// GLSL textureless classic 3D noise "cnoise",
		// with an RSL-style periodic variant "pnoise".
		// Author:  Stefan Gustavson (stefan.gustavson@liu.se)
		// Version: 2011-10-11
		//
		// Many thanks to Ian McEwan of Ashima Arts for the
		// ideas for permutation and gradient selection.
		//
		// Copyright (c) 2011 Stefan Gustavson. All rights reserved.
		// Distributed under the MIT license. See LICENSE file.
		// https://github.com/ashima/webgl-noise
		//
	  
		vec3 mod289(vec3 x)
		{
		  return x - floor(x * (1.0 / 289.0)) * 289.0;
		}
	  
		vec4 mod289(vec4 x)
		{
		  return x - floor(x * (1.0 / 289.0)) * 289.0;
		}
	  
		vec4 permute(vec4 x)
		{
		  return mod289(((x*34.0)+1.0)*x);
		}
	  
		vec4 taylorInvSqrt(vec4 r)
		{
		  return 1.79284291400159 - 0.85373472095314 * r;
		}
	  
		vec3 fade(vec3 t) {
		  return t*t*t*(t*(t*6.0-15.0)+10.0);
		}
	  
		// Classic Perlin noise, periodic variant
		float pnoise(vec3 P, vec3 rep)
		{
		  vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period
		  vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period
		  Pi0 = mod289(Pi0);
		  Pi1 = mod289(Pi1);
		  vec3 Pf0 = fract(P); // Fractional part for interpolation
		  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
		  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
		  vec4 iy = vec4(Pi0.yy, Pi1.yy);
		  vec4 iz0 = Pi0.zzzz;
		  vec4 iz1 = Pi1.zzzz;
	  
		  vec4 ixy = permute(permute(ix) + iy);
		  vec4 ixy0 = permute(ixy + iz0);
		  vec4 ixy1 = permute(ixy + iz1);
	  
		  vec4 gx0 = ixy0 * (1.0 / 7.0);
		  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
		  gx0 = fract(gx0);
		  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
		  vec4 sz0 = step(gz0, vec4(0.0));
		  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
		  gy0 -= sz0 * (step(0.0, gy0) - 0.5);
	  
		  vec4 gx1 = ixy1 * (1.0 / 7.0);
		  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
		  gx1 = fract(gx1);
		  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
		  vec4 sz1 = step(gz1, vec4(0.0));
		  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
		  gy1 -= sz1 * (step(0.0, gy1) - 0.5);
	  
		  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
		  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
		  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
		  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
		  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
		  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
		  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
		  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
	  
		  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
		  g000 *= norm0.x;
		  g010 *= norm0.y;
		  g100 *= norm0.z;
		  g110 *= norm0.w;
		  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
		  g001 *= norm1.x;
		  g011 *= norm1.y;
		  g101 *= norm1.z;
		  g111 *= norm1.w;
	  
		  float n000 = dot(g000, Pf0);
		  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
		  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
		  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
		  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
		  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
		  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
		  float n111 = dot(g111, Pf1);
	  
		  vec3 fade_xyz = fade(Pf0);
		  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
		  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
		  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
		  return 2.2 * n_xyz;
		}
	  `;
	  
	  const vertexShader = `  
		varying vec3 vNormal;
		
		uniform float uTime;
		uniform float uSpeed;
		uniform float uNoiseDensity;
		uniform float uNoiseStrength;
		
		${noise}
		
		void main() {
		  float t = uTime * uSpeed;
		  float distortion = pnoise((normal + t) * uNoiseDensity, vec3(10.0)) * uNoiseStrength;
	  
		  vec3 pos = position + (normal * distortion);
		  
		  vNormal = normal;
	  
		  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
		}  
	  `;
	  
	  const fragmentShader = `
		varying vec3 vNormal;
		
		uniform float uTime;
		uniform float uColor;
		uniform float uAlpha;
		
		void main() {
		  vec3 colorA = vec3(1.0);
		  vec3 yellow = vec3(0.922,0.678,0.235);
		  vec3 pink = vec3(0.82,0.624,0.686);

		  vec3 colorYellow = mix(colorA, yellow, vNormal);
		  vec3 colorPink = mix(colorA, pink, vNormal);

		  vec3 color = mix(colorYellow, colorPink, uColor);

		  gl_FragColor = vec4(color, uAlpha);
		}  
	  `;

	  const fragmentShader2 = `
	  varying vec3 vNormal;
	  
	  uniform float uTime;
	  uniform float uColor;
	  uniform float uAlphaB;

	  
	  void main() {
		vec3 colorA = vec3(1.0);
		vec3 yellow = vec3(0.922,0.678,0.235);
		vec3 pink = vec3(0.82,0.624,0.686);

		vec3 colorYellow = mix(colorA, yellow, vNormal);
		vec3 colorPink = mix(colorA, pink, vNormal);

		vec3 color = mix(colorYellow, colorPink, uColor);

		gl_FragColor = vec4(color, uAlphaB);
	  }  
	`;

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
		const geometry = new THREE.IcosahedronBufferGeometry(1.2, 64);
		const material = new THREE.ShaderMaterial({
		  vertexShader,
		  fragmentShader,
		  uniforms: {
			uTime: { value: 0 },
			uSpeed: { value: this.settings.speed },
			uNoiseDensity: { value: this.settings.density },
			uNoiseStrength: { value: this.settings.strength },
			uColor: {value: this.settings.color},
			uAlpha: {value: this.settings.alpha}
		  },
		});

		this.mesh = new THREE.Mesh(geometry, material);
		this.mesh.position.set(-1, -0.4, 0)
		this.scene.add(this.mesh);

		const material2 = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader: fragmentShader2,
			uniforms: {
			  uTime: { value: 0 },
			  uSpeed: { value: this.settings.speed },
			  uNoiseDensity: { value: this.settings.density },
			  uNoiseStrength: { value: this.settings.strength },
			  uColor: {value: this.settings.color},
			  uAlphaB: {value: this.settings.alphaB}
			},
		});

		this.mesh2 = new THREE.Mesh(geometry, material2);
		this.mesh2.position.set(1, -50, 0)
		this.scene.add(this.mesh2);

		if(window.innerWidth < 750) {
			this.mesh.position.set(0, -0.4, -0.5)
			this.mesh2.position.set(0.4, -90, -0.5)
		}

	}

	createLights() {
		this.lightTop = new THREE.DirectionalLight(0xFFFFFF, .7);
		this.lightTop.position.set(0, 500, 200);
		this.lightTop.castShadow = true;
		this.scene.add(this.lightTop);
	  
		this.lightBottom = new THREE.DirectionalLight(0xFFFFFF, .25);
		this.lightBottom.position.set(0, -500, 400);
		this.lightBottom.castShadow = true;
		this.scene.add(this.lightBottom);
	  
		this.ambientLight = new THREE.AmbientLight(0x798296);
		this.scene.add(this.ambientLight);
	}
  // createHome () {
  //   this.home = new Home({
  //     renderer: this.renderer,
  //     scene: this.scene,
  //     sizes: this.sizes //For measurement units in webgl
  //   })
  // }

//   createAbout () {
//     this.about = new About({
//       gl: this.gl,
//       scene: this.scene,
//       sizes: this.sizes //For measurement units in webgl
//     })
//   }

//   createCollections () {
//     this.collections = new Collections({
//       gl: this.gl,
//       scene: this.scene,
//       sizes: this.sizes, //For measurement units in webgl
//       transition: this.transition
//     })
//   }

//   createDetail () {
//     this.detail = new Detail({
//       gl: this.gl,
//       scene: this.scene,
//       sizes: this.sizes, //For measurement units in webgl
//       transition: this.transition
//     })
//   }

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
			gsap.fromTo(this.mesh.material.uniforms.uAlpha, {
				value: 0,
				duration: 0.2,
				ease: 'Power2.easeIn'
			}, {
				value: 1,
				duration: 0.2,
				ease: 'Power2.easeOut'
			})

			gsap.fromTo(this.mesh2.material.uniforms.uAlpha, {
				value: 0,
				duration: 0.2,
				ease: 'Power2.easeIn'
			}, {
				value: 1,
				duration: 0.2,
				ease: 'Power2.easeOut'
			})
		}

		if( template === 'about') {
			gsap.to(this.mesh.material.uniforms.uAlpha, {
				value: 0,
				duration: 0.2,
				ease: 'Power2.easeIn'
			})

			gsap.fromTo(this.mesh2.material.uniforms.uAlpha, {
				value: 0,
				duration: 0.2,
				ease: 'Power2.easeIn'
			}, {
				value: 1,
				duration: 0.2,
				ease: 'Power2.easeOut'
			})
		}

		if( template === 'work') {
			gsap.set(this.mesh.material.uniforms.uAlpha, {
				value: 1,
			})
			gsap.to(this.mesh.material.uniforms.uAlpha, {
				value: 1,
				duration: 0.2,
				ease: 'Power2.easeOut'
			})
			gsap.to(this.mesh2.material.uniforms.uAlpha, {
				value: 0,
				duration: 0.2,
				ease: 'Power2.easeIn'
			})
		}

		if( template === 'services') {
			gsap.to(this.mesh.material.uniforms.uAlpha, {
				value: 0,
				duration: 0.2,
				ease: 'Power2.easeIn'
			})

			gsap.to(this.mesh2.material.uniforms.uAlpha, {
				value: 0,
				duration: 0.2,
				ease: 'Power2.easeIn'
			})
		}else{
			gsap.set(this.mesh.material.uniforms.uAlpha, {
				value: 0,
			})
			gsap.set(this.mesh2.material.uniforms.uAlpha, {
				value: 0,
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

	/**
	 * Loop
	 */

	update(scroll) {
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
				this.mesh2.position.y = gsap.utils.interpolate(this.mesh.position.y,scroll*0.003-130, 0.1 )
			}
			else if(scroll = 0){
				this.mesh.position.y = -0.4
				this.mesh2.position.y = -150
			}
		}

		this.mesh.material.uniforms.uTime.value = this.clock.getElapsedTime();
		this.mesh2.material.uniforms.uTime.value = this.clock.getElapsedTime();

		if(this.processingSlider) {

			this.mesh.material.uniforms.uNoiseDensity.value = this.processingSlider.value;
		}
		if(this.colorSlider){
			this.mesh.material.uniforms.uColor.value = this.colorSlider.value;
			this.mesh2.material.uniforms.uColor.value = this.colorSlider.value;
		}
		
		this.renderer.render(this.scene, this.camera)
	}
}


