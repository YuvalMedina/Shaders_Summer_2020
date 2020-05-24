#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;  // Canvas size (width,height)
uniform float u_time;       // Time in seconds since load
uniform vec2 u_mouse;       // Mouse position

float rand(in vec2 pos){
    return fract(sin(dot(pos,
                vec2(12.9898,78.233)))
                *43758.5453123);
}

float rand(in float num){
    return pow(fract(sin(num)*43758.5453123),.5);
}

void main(){
    vec2 pos = gl_FragCoord.xy / u_resolution.y;
    
    float areas = 10.;
    pos *= areas;

    vec2 ipos = floor(pos);
    vec2 fpos = fract(pos);

    float color = rand(ipos);

    gl_FragColor = vec4(vec3(color),1.);
}