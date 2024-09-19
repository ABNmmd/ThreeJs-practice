import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


//rendrer
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

//camera
const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5);
camera.position.z = 4;
const scene = new THREE.Scene();

const orbitControl = new OrbitControls(camera, canvas);

const geometry = new THREE.IcosahedronGeometry(1, 12);
const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
const earth = new THREE.Mesh(geometry, material);



//lightning
const light = new THREE.DirectionalLight(0xFFFFFF, 3);
light.position.set(-1, 2, 4);


// adding to the scene
scene.add(earth);
scene.add(light);



function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
    
    earth.rotation.x = time * 0.8;
    earth.rotation.y = time * 0.8;

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