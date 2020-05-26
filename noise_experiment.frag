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

float circle(vec2 pos, vec2 center, float r){
    if(length(pos-center)<=r) return 1.;
    return 0.;
}

float noise(float x){
    float i = floor(x);  // integer
    float f = fract(x);  // fraction
    return mix(rand(i), rand(i + 1.0), smoothstep(0.,1.,f));
}

void main(){
    vec2 pos = gl_FragCoord.xy / u_resolution.y;

    vec2 noise = vec2(noise(u_time),noise(noise(u_time)));

    float r = .1;
    
    vec3 color = vec3(circle(pos,noise,r));

    gl_FragColor = vec4(color,1.);
}