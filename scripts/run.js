const fbx = require('../index.js');

function print_node ( indent, node ) {
  console.log( ' '.repeat(indent) + '|-' + node.name + ` [${node.type}]` );
  node.children.forEach(child => {
    print_node(indent+1, child);
  });
}

let scene = fbx.load('./models/SamplePot.fbx');

scene.nodes.forEach(node => {
  print_node(0, node);
});

console.log(scene);

for ( let i = 0; i < scene.meshes.length; ++i ) {
  scene.meshes[i] = fbx.split(scene.meshes[i]);
}

scene.meshes.forEach(mesh => {
  mesh.indices = fbx.triangulatePolygons(mesh);
});

require('fs').writeFileSync('./tmp/output.json', JSON.stringify(scene, null, 2));
