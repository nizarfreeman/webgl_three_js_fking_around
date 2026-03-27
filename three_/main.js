import * as THREE from './node_modules/three/build/three.module.js';

const scene = new THREE.Scene();
//fov, aspect ratio, planes
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set( 0, 0, 10 );
camera.lookAt( 0, 0, 0 );
const renderer = new THREE.WebGLRenderer();

// add a rendered and append an implicit canvas in the html.
renderer.setSize(window.innerWidth, window.innerHeight); // the canvas will cover the whole scree
document.body.appendChild(renderer.domElement);

// declare a cube.
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
const obj1 = new THREE.Mesh(geometry, material);
obj1.position.set(6, -6, 0);

// declare a rectangle.
const geometry5 = new THREE.BoxGeometry(2, 1, 1);
const material5 = new THREE.MeshBasicMaterial({color: 0x00ff00});
const obj5 = new THREE.Mesh(geometry5, material5);
obj5.position.set(-6, -6, 0);

// base squared pyramid
const geometry2 = new THREE.ConeGeometry(1, 2, 4);
const material2 = new THREE.MeshBasicMaterial({color: 0x00ff00});
const obj2 = new THREE.Mesh(geometry2, material2);
obj2.position.set(-6, 6, 0);

// cone
const geometry4 = new THREE.ConeGeometry(1, 2, 64);
const material4 = new THREE.MeshBasicMaterial({color: 0x00ff00});
const obj4 = new THREE.Mesh(geometry4, material4);
obj4.position.set(6, 6, 0);

// sphere
const geometry3 = new THREE.SphereGeometry(3, 64, 64);
const loader = new THREE.TextureLoader();
const texture = loader.load('earthmap1k.jpg');
//const material3 = new THREE.MeshBasicMaterial({color: 0xBEE0CC});
const material3 = new THREE.MeshBasicMaterial({map: texture});
const obj3 = new THREE.Mesh(geometry3, material3);

// add and move the cam out to see it, since all objects gets rendered at the origin by default
scene.add(obj2);
scene.add(obj1);
scene.add(obj3);
scene.add(obj4);
scene.add(obj5);

// rendering loop
// function animate(time)
// {
//     renderer.render(scene, camera);
// }
// renderer.setAnimationLoop(animate);

// rendering loop with animation
function animate(time)
{
    obj1.rotation.x = time / 2000;
    obj1.rotation.y = time / 1000;

    obj2.rotation.x = time / 2000;
    obj2.rotation.y = time / 1000;

    //obj3.rotation.x = time / 2000;
    obj3.rotation.y = time / 1000;

    obj4.rotation.x = time / 2000;
    obj4.rotation.y = time / 1000;

    obj5.rotation.x = time / 2000;
    obj5.rotation.y = time / 1000;
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
