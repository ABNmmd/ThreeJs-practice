import * as THREE from 'three';

const renderer = new THREE.WebGLRenderer({antialias: true, canvas});

const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5);
const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0x44aa88});

const cube = new THREE.Mesh(geometry, material);

scene.add(cube);



renderer.render(scene, camera);