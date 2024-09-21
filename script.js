import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


//rendrer
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

// texture loader
const loader = new THREE.TextureLoader();

//camera
const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5);
camera.position.z = 5;

//scene
const scene = new THREE.Scene();

// orbit controle
const orbitControl = new OrbitControls(camera, canvas);

//geometry
const geometry = new THREE.IcosahedronGeometry(1, 12);

//earth group
const earthGrp = new THREE.Group();
earthGrp.rotation.z = -23.4 * Math.PI / 180;

//earth
const material = new THREE.MeshPhongMaterial({
    map: loader.load("./assets/00_earthmap1k.jpg"),
    specularMap: loader.load("./textures/02_earthspec1k.jpg"),
    bumpMap: loader.load("./textures/01_earthbump1k.jpg"),
    bumpScale: 0.04,
});

//night light
const nLight = new THREE.MeshBasicMaterial({
    map: loader.load("./assets/03_earthlights1k.jpg"),
    blending: THREE.AdditiveBlending,
});

// cloud
const cloudMat = new THREE.MeshStandardMaterial({
    map: loader.load("./assets/04_earthcloudmap.jpg"),
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending,
    alphaMap: loader.load('./assets/05_earthcloudmaptrans.jpg'),
});

// meshs
const earth = new THREE.Mesh(geometry, material);
const nLightMesh = new THREE.Mesh(geometry, nLight);
const cloudMesh = new THREE.Mesh(geometry, cloudMat);
cloudMesh.scale.setScalar(1.007);

//lightning
// const hemLight = new THREE.HemisphereLight();
// const light = new THREE.DirectionalLight(0xFFFFFF, 3);
const dirLight = new THREE.DirectionalLight(0xFFFFFF, 2.0);
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

    earth.rotation.y = time;
    nLightMesh.rotation.y = time;
    cloudMesh.rotation.y = time;

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
requestAnimationFrame(render);

function resizeRendererToDisplaySize(renderer) {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}
