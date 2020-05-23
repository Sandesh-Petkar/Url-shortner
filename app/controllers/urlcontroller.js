const Url = require('../models/url')
const useragent =  require('express-useragent')
const requestIp = require('request-ip')

module.exports.list = (req,res)=>{
    Url.find()
    .then((url)=>{
        res.json(url)
    })
    .catch((err)=>{
        res.json(err)
    })
}

module.exports.create = (req,res)=>{
    const body = req.body
    const url = new Url(body)
    url.save()
    .then((url)=>{
        res.json(url)
    })
    .catch((err)=>{
        res.json(err)
    })
}

module.exports.show = (req,res)=>{
    const id = req.params.id
    Url.findById(id)
    .then((url)=>{
        res.json(url)
    })
    .catch((err)=>{
        res.json(err)
    })
}

module.exports.update = (req,res)=>{
    const id = req.params.id
    const body = req.body
    Url.findByIdAndUpdate(id,body,{new:true})
    .then((url)=>{
        res.json(url)
    })
    .catch((err)=>{
        res.json(err)
    })
}

module.exports.destroy = (req,res)=>{
    const id = req.params.id
    Url.findByIdAndDelete(id)
    .then((url)=>{
        res.json(url)
    })
    .catch((err)=>{
        res.json(err)
    })
}

module.exports.redirect = (req,res)=>{
    const hash = req.params.hash
     const clientInfno = req.useragent
     console.log(clientInfo)
     const ipAddress = requestIp.getClientIp(req)
     const click = {
          ipAddress:ipAddress,
          browser:clientInfo.browser,
          platfrom:clientInfo.platfrom,
          device:clientInfo.isMobile?'Mobile':'Desktop'
          
     }
     Url.findOneAndUpdate({hashedUrl:hash},
        { $push:{clicks:click} },{new:true}) 
           .then((url)=>{
                console.log(url)
           })
           .catch((err)=>{
              console.log(err)
            })
     console.log(ipAddress)
     Url.findOne({hashedUrl:hash})
     .then((url)=>{
         res.redirect(url.originalUrl)
     })
     .catch((err)=>{
         res.json(err)
     })
    
    
}