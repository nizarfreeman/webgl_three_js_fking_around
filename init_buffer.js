function initBuffers(gl)
{
    return {
        position: initPositionBuffer(gl),
        indices: initIndexBuffer(gl),
    };
}

// here we upload 24 vertices, since we're rendring a cube. A cube has 6 faces, 4 vertices to each. Each vertex is
// an (x, y, z) tripplet, going from +1 to -1 for each axe.
function initPositionBuffer(gl)
{
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const positions =
    [
        // Front face
        -1.0, -1.0,  1.0,
         1.0, -1.0,  1.0,
         1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,
        // Back face
        -1.0, -1.0, -1.0,
        -1.0,  1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0, -1.0, -1.0,
        // Top face
        -1.0,  1.0, -1.0,
        -1.0,  1.0,  1.0,
         1.0,  1.0,  1.0,
         1.0,  1.0, -1.0,
        // Bottom face
        -1.0, -1.0, -1.0,
         1.0, -1.0, -1.0,
         1.0, -1.0,  1.0,
        -1.0, -1.0,  1.0,
        // Right face
         1.0, -1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0,  1.0,  1.0,
         1.0, -1.0,  1.0,
        // Left face
        -1.0, -1.0, -1.0,
        -1.0, -1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0,  1.0, -1.0,
    ];

    // store as foats, the STATIC_DRAWN hints the gpu to store the data in high performance memory since it will be
    // used frequently
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    return positionBuffer;
}

function initIndexBuffer(gl)
{
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    // the need for the indices buffer is that, whithout it u can't draw anything ! 
    // vertices in our case are just simply the corners of the cube. indices serve the mean of how to connect them.
    // so (0, 1, 2) means basically take the vertices 0 1 2 respectivally and draw a triangle. one by one till u get
    // the shape u wanted. that's why triangles are the ultimate shape when it comes to rendering, u can basically
    // represent any shape and form through triangles.
    const indices =
    [
         0,  1,  2,    0,  2,  3,  // front
         4,  5,  6,    4,  6,  7,  // back
         8,  9, 10,    8, 10, 11,  // top
        12, 13, 14,   12, 14, 15,  // bottom
        16, 17, 18,   16, 18, 19,  // right
        20, 21, 22,   20, 22, 23,  // left
    ];

    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    return indexBuffer;
}

export { initBuffers };