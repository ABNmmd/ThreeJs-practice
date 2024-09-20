import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


//rendrer
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

// texture loader
const loader = new THREE.TextureLoader();

//camera
const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5);
camera.position.z = 3;
const scene = new THREE.Scene();

// orbit controle
const orbitControl = new OrbitControls(camera, canvas);


const earthGrp = new THREE.Group();
earthGrp.rotation.z = -23.4 * Math.PI / 180;

//night light
const nLight = new THREE.MeshBasicMaterial({
    map: loader.load("./assets/earthlights1k.jpg"),
    Blending: THREE.AdditiveBlending,
})

// meshs
const geometry = new THREE.IcosahedronGeometry(1, 12);
const material = new THREE.MeshPhongMaterial({
    map: loader.load("./assets/earthmap1k.jpg"),
});
const earth = new THREE.Mesh(geometry, material);
const nLightMesh = new THREE.Mesh(geometry, nLight);
earthGrp.add(nLightMesh);

//lightning
const hemLight = new THREE.HemisphereLight();
const light = new THREE.DirectionalLight(0xFFFFFF, 3);
const dirLight = new THREE.DirectionalLight(0xFFFFFF);
dirLight.position.set(-2, 0.5, 1.5);


// adding to the scene
earthGrp.add(earth)
scene.add(earthGrp);
// scene.add(light);
// scene.add(hemLight);
scene.add(dirLight);



function render(time) {
    time *= 0.0003;

    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
    
    // earth.rotation.x = .1;
    earthGrp.rotation.y = time;

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

requestAnimationFrame(render);