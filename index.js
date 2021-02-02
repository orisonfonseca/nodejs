const express=require('express');
const app=express();
const https = require('https');


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.post('/machstatz1',(req,res)=>{
  
    //console.log(req.body.start_time);
    var obj={
      "shiftA" :{ "production_A_count" :0, "production_B_count" :0},
	    "shiftB" :{ "production_A_count" :0, "production_B_count" :0},
    	"shiftC" :{ "production_A_count" :0, "production_B_count" :0},

    }
    https.get('https://gitlab.com/-/snippets/2067888/raw/master/sample_json_1.json', (resp) => {
        var data = '';
      
        // A chunk of data has been received.
        resp.on('data', (chunk) => {
          data += chunk;
        });
      
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
         
         // console.log(req.body.start_time.slice(0,-16));
         console.log("now");
         let main = JSON.parse(data).filter((el,index)=>{
             return Number(el.time.slice(0,-15)) >= Number(req.body.start_time.slice(0,-16)) && 
                    Number(el.time.slice(0,-15)) <= Number(req.body.end_time.slice(0,-16));
           
          })
          //console.log(req.body.start_time.slice(5,-13));
          let main2 = main.filter((el2,index)=>{
            return Number(el2.time.slice(5,-12)) >= Number(req.body.start_time.slice(5,-13)) && 
                   Number(el2.time.slice(5,-12)) <= Number(req.body.end_time.slice(5,-13))
          })
          //console.log(req.body.start_time.slice(8,-10));
          let main3 = main2.filter((el3,index)=>{
              return Number(el3.time.slice(8,-9)) >= Number(req.body.start_time.slice(8,-10)) &&
                     Number(el3.time.slice(8,-9)) <= Number(req.body.end_time.slice(8,-10))
          })
        // let string = req.body.start_time.slice(11,-4);
         // console.log(string.replace(':', ''));
         var string = req.body.start_time.slice(11,-4);
            var str = string.replace(':', '');
            var string2 = req.body.end_time.slice(11,-4);
            var str2 = string2.replace(':', '');

         let main4 = main3.filter((el4,index)=>{
            let temp1=el4.time.slice(11,-3);
            let tem1=temp1.replace(':', '');
          //console.log(req.body.end_time);
          if(Number(req.body.start_time.slice(8,-10))===Number(req.body.end_time.slice(8,-10))){

            return Number(tem1) >= Number(str) && Number(tem1) <= Number(str2) 
          }
         
          else if(Number(req.body.end_time.slice(8,-10))-Number(req.body.start_time.slice(8,-10))==1){
    
            return Number(tem1) >= Number(str) && Number(tem1) <= 2359 &&
                   Number(tem1) >= 0 && Number(tem1) <= Number(str2)
          }
          else if(Number(req.body.end_time.slice(8,-10))-Number(req.body.start_time.slice(8,-10))>1){

           return Number(tem1) >= Number(str) && Number(tem1) <= 2359 &&
                  Number(el4.time.slice(8,-9)) >= Number(req.body.start_time.slice(8,-10))+1 &&
                  Number(el4.time.slice(8,-9)) <= Number(req.body.end_time.slice(8,-10))-1 &&
                  Number(tem1) >= 0000 && Number(tem1) <= Number(str2)
            
          }
         })
        //console.log(main4);
         main4.filter((el5,index)=>{
          let t1=el5.time.slice(11,-3);
          let t2=t1.replace(':', '');
          if(Number(t2)>=600 && Number(t2) <= 1359){
            if(el5.production_A==true && el5.production_B==true){
              obj.shiftA.production_A_count++;
              obj.shiftA.production_B_count++;
            }
            else if(el5.production_A==true && el5.production_B==false){
              obj.shiftA.production_A_count++;
            }
            else if(el5.production_A==false && el5.production_B==true){
              obj.shiftA.production_B_count++;
            }
            
          }
         else if(Number(t2)>=1400 && Number(t2) <= 1959){
            if(el5.production_A==true && el5.production_B==true){
              obj.shiftB.production_A_count++;
              obj.shiftB.production_B_count++;
            }
            else if(el5.production_A==true && el5.production_B==false){
              obj.shiftB.production_A_count++;
            }
            else if(el5.production_A==false && el5.production_B==true){
              obj.shiftB.production_B_count++;
            }
            
          }
          else if(Number(t2)>=2000 && Number(t2) <= 2359){
            if(el5.production_A==true && el5.production_B==true){
              obj.shiftC.production_A_count++;
              obj.shiftC.production_B_count++;
            }
            else if(el5.production_A==true && el5.production_B==false){
              obj.shiftC.production_A_count++;
            }
            else if(el5.production_A==false && el5.production_B==true){
              obj.shiftC.production_B_count++;
            }
            
          }
          else if(Number(t2)>=0 && Number(t2) <= 559){
            if(el5.production_A==true && el5.production_B==true){
              obj.shiftC.production_A_count++;
              obj.shiftC.production_B_count++;
            }
            else if(el5.production_A==true && el5.production_B==false){
              obj.shiftC.production_A_count++;
            }
            else if(el5.production_A==false && el5.production_B==true){
              obj.shiftC.production_B_count++;
            }
            
          }
         })
        
         res.status("200").json(obj);

        });
        
      
      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });

})

app.post('/machstatz3',(req,res)=>{
  https.get('https://gitlab.com/-/snippets/2067888/raw/master/sample_json_3.json', (resp) => {
    let data = '';
  
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
     // console.log(JSON.parse(data));
     let main = JSON.parse(data).filter((el,index)=>{
      return Number(el.time.slice(0,-15)) >= Number(req.body.start_time.slice(0,-16)) && 
             Number(el.time.slice(0,-15)) <= Number(req.body.end_time.slice(0,-16));
    
   })
   //console.log(req.body.start_time.slice(5,-13));
   let main2 = main.filter((el2,index)=>{
     return Number(el2.time.slice(5,-12)) >= Number(req.body.start_time.slice(5,-13)) && 
            Number(el2.time.slice(5,-12)) <= Number(req.body.end_time.slice(5,-13))
   })
   //console.log(req.body.start_time.slice(8,-10));
   let main3 = main2.filter((el3,index)=>{
       return Number(el3.time.slice(8,-9)) >= Number(req.body.start_time.slice(8,-10)) &&
              Number(el3.time.slice(8,-9)) <= Number(req.body.end_time.slice(8,-10))
   })
 // let string = req.body.start_time.slice(11,-4);
  // console.log(string.replace(':', ''));
  var string = req.body.start_time.slice(11,-4);
     var str = string.replace(':', '');
     var string2 = req.body.end_time.slice(11,-4);
     var str2 = string2.replace(':', '');

  let main4 = main3.filter((el4,index)=>{
     let temp1=el4.time.slice(11,-3);
     let tem1=temp1.replace(':', '');
  // console.log(str);
   if(Number(req.body.start_time.slice(8,-10))===Number(req.body.end_time.slice(8,-10))){

     return Number(tem1) >= Number(str) && Number(tem1) <= Number(str2)
   }
  
   else if(Number(req.body.end_time.slice(8,-10))-Number(req.body.start_time.slice(8,-10))==1){

     return Number(tem1) >= Number(str) && Number(tem1) <= 2359 &&
            Number(tem1) >= 0 && Number(tem1) <= Number(str2)
   }
   else if(Number(req.body.end_time.slice(8,-10))-Number(req.body.start_time.slice(8,-10))>1){

    return Number(tem1) >= Number(str) && Number(tem1) <= 2359 &&
           Number(el4.time.slice(8,-9)) >= Number(req.body.start_time.slice(8,-10))+1 &&
           Number(el4.time.slice(8,-9)) <= Number(req.body.end_time.slice(8,-10))-1 &&
           Number(tem1) >= 0000 && Number(tem1) <= Number(str2)
     
   }
  })
  //console.log(main4);
  let mac = main4.filter((el,index)=>{
    return el.id = Number(el.id.slice(4,5));
   })
  
   var mac2 = mac.sort(function (x,y) {
     return x.id - y.id ;
   })

   var mac3=[];
   for(let i=0;i<mac2.length;i++){
     mac3[i]=mac2[i].id;
   }

   var mac4 = mac3.filter((el,index)=>{
     return mac3.indexOf(el)===index;
   })
var obj=[];
   for(let i = 0;i<mac4.length;i++){
     var temp=[];
     var belt1=0;
     var belt2=0;
     var avg1=0;
     var avg2=0;
     var id=null;
     var d=[];
     temp=mac2.filter((el,index)=>{
       return el.id==mac4[i]
     })
     if(temp.length>1){
          for(let j=0;j<temp.length;j++){
                        if(temp[j].state==true){
                          
                          belt2=belt2+temp[j].belt2
                        }
                        else if(temp[j].state==false){
                          belt1=belt1+temp[j].belt1;
                        }

          }
          avg1=belt1/temp.length;
          avg2=belt2/temp.length;
          id=mac4[i];
          d={
            "id" : id, "avg_belt1" : avg1, "avg_belt2" :avg2
          }
          obj.push(d);
     }else{
       //console.log(temp[0].id);
      d={
        "id" : temp[0].id, "avg_belt1" : temp[0].belt1, "avg_belt2" :temp[0].belt2
      }
            obj.push(d)
     }
     
   }
   //console.log(obj);
   //console.log(mac2);
   res.status("200").json(obj);



  });
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
})

app.post('/machstatz2',(req,res)=>{
  https.get('https://gitlab.com/-/snippets/2067888/raw/master/sample_json_2.json', (resp) => {
    let data = '';
  
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      //console.log(JSON.parse(data));
      console.log("now");
         let main = JSON.parse(data).filter((el,index)=>{
             return Number(el.time.slice(0,-15)) >= Number(req.body.start_time.slice(0,-16)) && 
                    Number(el.time.slice(0,-15)) <= Number(req.body.end_time.slice(0,-16));
           
          })
          //console.log(req.body.start_time.slice(5,-13));
          let main2 = main.filter((el2,index)=>{
            return Number(el2.time.slice(5,-12)) >= Number(req.body.start_time.slice(5,-13)) && 
                   Number(el2.time.slice(5,-12)) <= Number(req.body.end_time.slice(5,-13))
          })
          //console.log(req.body.start_time.slice(8,-10));
          let main3 = main2.filter((el3,index)=>{
              return Number(el3.time.slice(8,-9)) >= Number(req.body.start_time.slice(8,-10)) &&
                     Number(el3.time.slice(8,-9)) <= Number(req.body.end_time.slice(8,-10))
          })
        // let string = req.body.start_time.slice(11,-4);
         // console.log(string.replace(':', ''));
         var string = req.body.start_time.slice(11,-4);
            var str = string.replace(':', '');
            var string2 = req.body.end_time.slice(11,-4);
            var str2 = string2.replace(':', '');

         let main4 = main3.filter((el4,index)=>{
            let temp1=el4.time.slice(11,-3);
            let tem1=temp1.replace(':', '');
          //console.log(req.body.end_time);
          if(Number(req.body.start_time.slice(8,-10))===Number(req.body.end_time.slice(8,-10))){

            return Number(tem1) >= Number(str) && Number(tem1) <= Number(str2) 
          }
         
          else if(Number(req.body.end_time.slice(8,-10))-Number(req.body.start_time.slice(8,-10))==1){
    
            return Number(tem1) >= Number(str) && Number(tem1) <= 2359 &&
                   Number(tem1) >= 0 && Number(tem1) <= Number(str2)
          }
          else if(Number(req.body.end_time.slice(8,-10))-Number(req.body.start_time.slice(8,-10))>1){

           return Number(tem1) >= Number(str) && Number(tem1) <= 2359 &&
                  Number(el4.time.slice(8,-9)) >= Number(req.body.start_time.slice(8,-10))+1 &&
                  Number(el4.time.slice(8,-9)) <= Number(req.body.end_time.slice(8,-10))-1 &&
                  Number(tem1) >= 0000 && Number(tem1) <= Number(str2)
            
          }
         })
         //console.log(main4);
         var run = 0;
         var down = 0;
         main4.filter((el,index)=>{
           if(el.runtime>1021){
             down = down + (el.runtime -1021);
             run = run + 1021;
           }
           else if(el.runtime<=1021){
            run = run + el.runtime;
           }
         })
         var hrs = ~~(run / 3600);
          var mins = ~~((run % 3600) / 60);
         var secs = ~~run % 60;  
         
         var hrs1 = ~~(down / 3600);
          var mins1 = ~~((down % 3600) / 60);
         var secs1 = ~~down % 60;  

         var utilisation = (run)/(run + down) * 100;
         var runtime = (hrs+"h"+" : "+mins+"m"+" : "+secs+"s").toString();
         var downtime = (hrs1+"h"+" : "+mins1+"m"+" : "+secs1+"s").toString();
         var obj={
          "runtime" : runtime,
          "downtime": downtime,
          "utilisation": utilisation
         }
         res.status("200").json(obj);

        });
        
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });

})

module.exports=app;



