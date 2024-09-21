import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


//rendrer
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

// texture loader
const loader = new THREE.TextureLoader();

//camera
const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5);
camera.position.z = 5;
const scene = new THREE.Scene();

// orbit controle
const orbitControl = new OrbitControls(camera, canvas);

//geometry
const geometry = new THREE.IcosahedronGeometry(1, 12);

const earthGrp = new THREE.Group();
earthGrp.rotation.z = -23.4 * Math.PI / 180;

//earth
const material = new THREE.MeshPhongMaterial({
    map: loader.load("./assets/earthmap1k.jpg"),
});

//night light
const nLight = new THREE.MeshBasicMaterial({
    map: loader.load("./assets/earthlights1k.jpg"),
    blending: THREE.AdditiveBlending,
});

// cloud
const cloudMat = new THREE.MeshStandardMaterial({
    map: loader.load("./assets/earthcloudmap.jpg"),
    blending: THREE.AdditiveBlending,
});

// meshs
const earth = new THREE.Mesh(geometry, material);
const nLightMesh = new THREE.Mesh(geometry, nLight);
const cloudMesh = new THREE.Mesh(geometry, cloudMat);
cloudMesh.scale.setScalar(1.003);

//lightning
const hemLight = new THREE.HemisphereLight();
const light = new THREE.DirectionalLight(0xFFFFFF, 3);
const dirLight = new THREE.DirectionalLight(0xFFFFFF);
dirLight.position.set(-2, 0.5, 1.5);


// adding to the scene
scene.add(earthGrp);
earthGrp.add(earth);
earthGrp.add(nLightMesh);
earthGrp.add(cloudMesh);
// scene.add(light);
// scene.add(hemLight);
scene.add(dirLight);



function render(time) {
    time *= 0.0003;

    if (resizeRendererToDisplaySize(renderer)) {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
    
    // earth.rotation.x = .1;
    earth.rotation.y = time;
    nLightMesh.rotation.y = time;
    cloudMesh.rotation.y = time;

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