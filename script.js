import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


//rendrer
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

//camera
const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5);
camera.position.z = 3;
const scene = new THREE.Scene();

// orbit controle
const orbitControl = new OrbitControls(camera, canvas);


// meshs
const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 12);
const material = new THREE.MeshPhongMaterial({
    map: loader.load("./assets/earthlights1k.jpg"),
});
const earth = new THREE.Mesh(geometry, material);



//lightning
const hemLight = new THREE.HemisphereLight();
const light = new THREE.DirectionalLight(0xFFFFFF, 3);
light.position.set(-1, 2, 4);


// adding to the scene
scene.add(earth);
scene.add(light);
scene.add(hemLight);



function render(time) {
    time *= 0.0003;

    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
    
    earth.rotation.x = .1;
    earth.rotation.y = time;

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