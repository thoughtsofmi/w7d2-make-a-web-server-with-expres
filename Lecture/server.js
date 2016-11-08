// Libraries
var express = require('express')
var nunjucks = require('nunjucks')
var bodyParser = require('body-parser')
var multer = require('multer')
var moreRoutes = require('./more-routes')


//Setup
var port = process.env.PORT || 8080
var app = express()


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })
//var upload = multer({ dest: 'public/uploads/' })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

nunjucks.configure('views', {
    autoescape: true,//set up rule so we dont get hacked
    express: app
})

//routes
app.use('/api/v1', moreRoutes)



app.post('/photos', upload.single('photo'), (req, res)=>{
    res.render('photos.html', {
      photo: req.file.originalname,
      caption: req.body.caption
    })
})
// app.get('/', (request, response) => {
//     response.send('It works!')
// }) // this wins first because it is before public.

// app.get('/', (request, response) => {
//     // console.log(request)
//
//     response.send(request.query.test)
// })
app.get('/', (request, response) => {
    // console.log(request)
    if(request.query.api_token === '12345' && request.query.username ==='youngmi'){
        response.render('loggedin.html',{
            username: request.query.username,
            queryStuff: request.query,
            users:['Emily', 'Jessica', 'Lauren', 'Jin']
        })
    }
    else {
        response.render('loggedout.html')
    }
})



app.get('/api/users', (request, respond) => {
    var users = [
        {
            id:1,
            name: 'Joe'
        },
        {
            id:2,
            name: 'Nancy'
        }
    ]

    response.json(users)
})

app.use(express.static('public'))

//listen
app.listen(port)
console.log('Public Server http://localhost:8080:' + port)
console.log('Press CTRL+C To Exit')
