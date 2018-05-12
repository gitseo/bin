/*
  struct t_lights_rays_color{
    int n;
    vec3d c;
    t_lights_rays_color():n(0),c(vec3d(0,0,0)){}
    vec3d avg()const{return !n?c:c*(1.0/n);}
    void add(const t_lights_rays_color&ref){n+=ref.n;c+=ref.c;}
  };
  #define LIST(F)F(version)F(size)F(x)F(y)F(raw_wins)
  #define F(var)int var;
  struct t_pix_info{LIST(F);t_lights_rays_color frag,only_details,simple_frag;real ms;};
  #undef F
  #undef LIST
*/
var parse_ray=(msg)=>{
  var buf=Buffer.from(msg,"binary");
  var ints='version,size,x,y,raw_wins';//readInt32LE
  var rc='int n;double r,g,b;';//readDoubleLE
  var rcs='frag,only_details,simple_frag';
  var pos=0;
  var out={};
  var read_rc=()=>{
    var out={};
    out.n=buf.readInt32LE(pos);pos+=4;
    pos+=4;// skip padding
    'r,g,b'.split(',').map(e=>{out[e]=buf.readDoubleLE(pos);pos+=8;});
    return out;
  }
  ints.split(',').map(e=>{out[e]=buf.readInt32LE(pos);pos+=4;});
  pos+=4;// skip padding
  rcs.split(',').map(e=>{out[e]=read_rc();});
  out.ms=buf.readDoubleLE(pos);pos+=8;
  return out;
  //struct t_pix_info{LIST(F);t_lights_rays_color frag,only_details,simple_frag;real ms;};
  //buf.readDoubleLE()
}