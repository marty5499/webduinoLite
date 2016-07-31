function run(){
  console.log("update ok",Math.random());
  var i = false;
  var x = [12,13,15];
  var p = 0;
  setInterval(function(){
    if(p>=3) p=0;
    digitalWrite(x[p++%3],i=!i);
  },1000);

console.log('test done.');
}
