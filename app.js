import Config from './config/index.js'
import createError from 'http-errors'
import express from 'express'
import logger from 'morgan'
import cors from 'cors'

// ######### rutas importadas ##########
import defaultRouter from './routes/DefaultRouter.js'
import aplicacionRouter from './routes/AplicationRouter.js'
import usersRouter from './routes/UsersRouter.js'
import projectsRouter from './routes/ProjectsRouter.js'
import activitiesRouter from './routes/ActivitiesRouter.js'
import hoursRouter from './routes/HoursRouter.js'
import areaRouter from './routes/AreaRouter.js'
import clientsRouter from './routes/ClientsRouter.js'
import jobsRouter from './routes/JobsRouter.js'
import teamsRouter from './routes/TeamRouter.js'
import reportRouter from './routes/ReportRouter.js'
import routineRouter from './routes/RoutineRouter.js'

var app = express()
var _dirname = './' //ruta directorio actual

const _urlsf = ()=> Config.get('app','urlsf')

const _cors = cors({
  'methods': ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  'origin': '*',
  //'origin': _urlsf()
})

// view engine setup
app.set('views','./views')
app.set('view engine','ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(_cors)
app.use(express.static(_dirname + '/public')) // define la carpeta

// ########### rutas definidas ###################
app.use('/', defaultRouter)
app.use('/public', express.static('./public/')) // ruta estatica para recursos
app.use('/api/aplication', aplicacionRouter)
app.use('/api/users', usersRouter)
app.use('/api/projects', projectsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/hours', hoursRouter)
app.use('/api/area', areaRouter)
app.use('/api/clients', clientsRouter)
app.use('/api/jobs', jobsRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/report', reportRouter)
app.use('/api/routine', routineRouter)

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
