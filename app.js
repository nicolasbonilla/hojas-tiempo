import Config from './config/index.js'
import createError from 'http-errors'
import express from 'express'
import logger from 'morgan'
import cors from 'cors'

// ######### rutas importadas ##########
import default_router from './routes/Default_Router.js'
import aplicacion_router from './routes/Aplication_Router.js'
import users_router from './routes/Users_Router.js'
import projects_router from './routes/Projects_Router.js'
import activities_router from './routes/Activities_Router.js'
import hours_router from './routes/Hours_Router.js'
import area_router from './routes/Area_Router.js'
import clients_router from './routes/Clients_Router.js'

var app = express()
var _dirname = './' //ruta directorio actual

const _urlsf = ()=> Config.get('app','urlsf')

const _cors = cors({
  'methods': ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  'origin': '*',
  //'origin': _urlsf()
})

// view engine setup
app.set('views', './views')
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(_cors)
app.use(express.static(_dirname + '/public')) // define la carpeta

// ########### rutas definidas ###################
app.use('/', default_router)
app.use('/public', express.static('./public/')) // ruta estatica para recursos
app.use('/api/aplication', aplicacion_router)
app.use('/api/users', users_router)
app.use('/api/projects', projects_router)
app.use('/api/activities', activities_router)
app.use('/api/hours', hours_router)
app.use('/api/area', area_router)
app.use('/api/clients', clients_router)
//...api usuarios, api proyectos

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {

  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = Config.status === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error',{ "error": err })

})

export default app
