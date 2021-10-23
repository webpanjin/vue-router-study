export default {
  props:{
    to:{
      type:String,
      required:true 
    }
  },
  //= <a href="{{...}}"><slot name="default"></slot></a>
  render(h){
    return h('a',{domProps:{href:'#/'+this.to}},[this.$slots.default])
  }
}