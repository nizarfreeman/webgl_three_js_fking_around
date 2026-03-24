main();

// so this function basically takes two shaders, a vertex shader one, and a fragment shader one, and links
// em both to get a final GPU program
// the vertex shader is for handling points/positions
// the fragment shader is for handling pixels/colors
// together the became a program WebGL can actually run: shaderProgram

function initShaderProgram(gl, vsSource, fsSource)
{
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS))
    {
        alert(`Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`);
        return null;
    }
    return shaderProgram;
}

// this one takes the WebGl context, shader source n type, then creates and compiles the shader and returns it
function loadShader(gl, type, source)
{
    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    {
        alert(`An error occured compiling the shaders: ${gl.getShaderInfoLog(shader)}`);
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function main()
{
    const vsSource = `
        attribute vec4 aVertexPosition;
        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;
        
        void main()
        {
            gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        }
    `
    const fsSource = `
        void main()
        {
            gl_FragColor = vec(1.0, 1.0, 1.0, 1.0);
        }
    `

    const canvas = document.querySelector("#canvas_");
    const gl = canvas.getContext("webgl");

    if (gl == null)
    {
        alert("browser/machine ain't supporting");
        return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

    const programInfo = 
    {
        program: shaderProgram,
        attribLocations:
        {
            vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
        },
        uniformLocations:
        {
            projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix")
        },
    };
}