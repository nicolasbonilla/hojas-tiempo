import ReportService from "../Services/ReportService.js"
import HolidayService from "../Services/HolidayService.js"
import XlsxPopulate from "xlsx-populate"
import ULuxon from "../utilities/luxon.js"
import Utilities from "../utilities/index.js"
import { DateTime } from "luxon"
import { enumLetters,enumMonthNumbers } from "../enums/index.js"
export class Report {

    static async ReportHoursXlsxRangeFull(req){
        const monthsRanges = ULuxon.getMonthsInRange(req.body)
        const holidaysResult = await HolidayService.indexHolidays(req.body.start)
        if(!holidaysResult.status){
            return holidaysResult
        }

        const _monthsRangesHours = []
        for (let index = 0; index < monthsRanges.length; index++) {
            _monthsRangesHours.push(ULuxon.getHoursInMonth(monthsRanges[index],holidaysResult.holidays))
        }
        
        let example_reports = [
            {
                Area: 'Innovación',
                ID: 1010245162,
                Name: 'ALISON JULIANNA MORALES ANGULO',
                Job_title: 'Líder de innovación',
                Code: '702',
                Project: 'AXON COMTRADE 2',
                cost_center: 'Software',
                Activity: 'Documentación',
                months:[
                    // representan a un filtro con tres meses selccionados
                    {"T":9,"V":45000},{"T":10,"V":50000},{"T":1,"V":5000}
                ]
            }
        ]

        let reports = {}

        for(const range of _monthsRangesHours){
            
            const {result,report} = await ReportService.ReportXlsxRange(range)
            
            for(let index = 0; index < report.length; index++){
                
                const _element = report[index]
                let currentElement = reports[`${_element.UserId}${_element.ProjectId}${_element.ActivityId}`]
                if(currentElement != undefined){
                    // si hay un registro debemos agregar el siguiente mes con su valor en horas
                    currentElement.months = [ ...currentElement.months, {"T":_element.Hours,"V": (_element.Salary/range.idealHours)*_element.Hours }]
                }else{

                    reports[`${_element.UserId}${_element.ProjectId}${_element.ActivityId}`] = {
                        Area: _element.Area,
                        ID: _element.ID,
                        Name: _element.Name,
                        JobTitle: _element.JobTitle ,
                        Code: _element.Code,
                        Project: _element.Project,
                        CostCenter: _element.CostCenter,
                        Activity: _element.Activity,
                        months:[{"T":_element.Hours,"V": (_element.Salary/range.idealHours)*_element.Hours }],
                    }

                }

            }

            // de cada mes
        }
        
        const _objectReport = {
            ranges: _monthsRangesHours,
            reports: Object.values(reports),
            start: req.body.start,
            end: req.body.end
        }
        
        try {
            //return {"status":false,"message":"respuesta intervenida"}
            return await this.generateFileXlsxReportInMonths(_objectReport)
        } catch(error){
            return {"status":false,"message":"error al generar reporte excel"}
        }

    }

    static async generateFileXlsxReportInMonths(_reports){
        const { ranges, reports, start, end } = _reports
        

        const workbook = await XlsxPopulate.fromBlankAsync()
        
        // nombre de la hoja 0
        workbook.sheet(0).name(`${start}_${end}`)

        // construcción cabecera ################################
        workbook.sheet(0).cell("A1").style({fill:"c6e0b4",fontSize:12,verticalAlignment:"center",horizontalAlignment:"left",border:true}).value("Área")
        workbook.sheet(0).cell("B1").style({fill:"c6e0b4",fontSize:12,verticalAlignment:"center",horizontalAlignment:"left",border:true}).value("Nombre del colaborador")
        workbook.sheet(0).cell("C1").style({fill:"c6e0b4",fontSize:12,verticalAlignment:"center",horizontalAlignment:"left",border:true}).value("C.C")
        workbook.sheet(0).cell("D1").style({fill:"c6e0b4",fontSize:12,verticalAlignment:"center",horizontalAlignment:"left",border:true}).value("Cargo del colaborador")
        workbook.sheet(0).cell("E1").style({fill:"c6e0b4",fontSize:12,verticalAlignment:"center",horizontalAlignment:"left",border:true}).value("Código del proyecto")
        workbook.sheet(0).cell("F1").style({fill:"c6e0b4",fontSize:12,verticalAlignment:"center",horizontalAlignment:"left",border:true}).value("Nombre del proyecto")
        workbook.sheet(0).cell("G1").style({fill:"c6e0b4",fontSize:12,verticalAlignment:"center",horizontalAlignment:"left",border:true}).value("Centro de costo")
        workbook.sheet(0).cell("H1").style({fill:"c6e0b4",fontSize:12,verticalAlignment:"center",horizontalAlignment:"left",border:true}).value("Nombre de la actividad")
        
        // varible control para la letra siguiente, se debe modificar cada que se añade una celda horizontal
        let latestLetter = "H"

        // se añaden las celdas cabecera según los meses seleccionados
        for(const item of ranges){
           
            const LetterHours = Utilities.getNextLetterColumn(latestLetter)
            // se modifica variable control de letra siguiente
            latestLetter = Utilities.getNextLetterColumn(LetterHours)
            const numberMonth = DateTime.fromISO(item.start).month
            workbook.sheet(0).cell(`${LetterHours}1`).style({fill:"c6e0b4",fontSize:12,verticalAlignment:"center",horizontalAlignment:"left",border:true}).value(`T${enumMonthNumbers[numberMonth].nameEs}(horas)`)
            workbook.sheet(0).cell(`${latestLetter}1`).style({fill:"c6e0b4",fontSize:12,verticalAlignment:"center",horizontalAlignment:"left",border:true}).value(`C${enumMonthNumbers[numberMonth].nameEs}(COP$)`)
        }

        // se agregan las celdas de totales despues de las celdas para meses
        latestLetter = Utilities.getNextLetterColumn(latestLetter)
        workbook.sheet(0).cell(`${latestLetter}1`).style({fill:"c6e0b4",fontSize:12,verticalAlignment:"center",horizontalAlignment:"left",border:true}).value("TTotal")
        latestLetter = Utilities.getNextLetterColumn(latestLetter)
        workbook.sheet(0).cell(`${latestLetter}1`).style({fill:"c6e0b4",fontSize:12,verticalAlignment:"center",horizontalAlignment:"left",border:true}).value("CTotal")
        
        // restablecemos letra siguiente para continuar con la construccíon del curepo
        latestLetter = "H"

        // ancho y altura de la cebecera
        workbook.sheet(0).row(1).height(20)
        workbook.sheet(0).column("A").width(18)
        workbook.sheet(0).column("B").width(40)
        workbook.sheet(0).column("C").width(25)
        workbook.sheet(0).column("D").width(30)
        workbook.sheet(0).column("E").width(15)
        workbook.sheet(0).column("F").width(30)
        workbook.sheet(0).column("G").width(25)
        workbook.sheet(0).column("H").width(30)

        // construcción cuerpo ################################

        // se construye una fila por cada registro en reporte
        for(let _index = 0; _index < reports.length; _index++){
            const element = reports[_index]
            workbook.sheet(0).cell(`A${_index+2}`).value(element.Area)
            workbook.sheet(0).cell(`B${_index+2}`).value(element.Name)
            workbook.sheet(0).cell(`C${_index+2}`).value(element.ID)
            workbook.sheet(0).cell(`D${_index+2}`).value(element.JobTitle)
            workbook.sheet(0).cell(`E${_index+2}`).value(element.Code)
            workbook.sheet(0).cell(`F${_index+2}`).value(element.Project)
            workbook.sheet(0).cell(`G${_index+2}`).value(element.CostCenter)
            workbook.sheet(0).cell(`H${_index+2}`).value(element.Activity)
   
            let addColumns = ranges.length

            // se añaden las celdas según los meses seleccionados y su valor
            for(let index=0;index < addColumns;index++){
                
                let letterValueT = Utilities.getNextLetterColumn(latestLetter)
                const valueT = element.months[index] || {"T":0}
                workbook.sheet(0).cell(`${letterValueT}${_index+2}`).value(valueT.T)
                latestLetter = Utilities.getNextLetterColumn(letterValueT)
                const valueV = element.months[index] || {"V":0}
                workbook.sheet(0).cell(`${latestLetter}${_index+2}`).value(valueV.V)

            }

            // se añaden las celdas para los totales
            let TTotaLetter = Utilities.getNextLetterColumn(latestLetter)
            const totalValueT = element.months.reduce((total,t)=> total+t.T,0)
            workbook.sheet(0).cell(`${TTotaLetter}${_index+2}`).value(totalValueT) 
            latestLetter = Utilities.getNextLetterColumn(TTotaLetter)
           
            const totalValueV = element.months.reduce((total,t)=> total+t.V,0)
            workbook.sheet(0).cell(`${latestLetter}${_index+2}`).value(totalValueV)
            latestLetter = "H"
        }

        return {"status":true,report:await workbook.outputAsync()}
    }

    static async ReportHoursXlsxRange(req){
        
        const holidays = [
            {"id":1,"date": "2024-01-01"},
            {"id":2,"date": "2024-01-08"},
            {"id":3,"date": "2024-03-25"},
            {"id":4,"date": "2024-03-28"},
            {"id":5,"date": "2024-03-29"},
            {"id":6,"date": "2024-03-31"},
            {"id":7,"date": "2024-05-01"},
            {"id":8,"date": "2024-05-13"},
            {"id":9,"date": "2024-06-03"},
            {"id":10,"date": "2024-06-10"},
            {"id":11,"date": "2024-07-01"},
            {"id":12,"date": "2024-07-20"},
            {"id":13,"date": "2024-08-07"},
            {"id":14,"date": "2024-08-19"},
            {"id":15,"date": "2024-10-14"},
            {"id":16,"date": "2024-11-04"},
            {"id":17,"date": "2024-11-11"},
            {"id":18,"date": "2024-12-08"},
            {"id":19,"date": "2024-12-25"}
        ]

        const dateCheckIn = DateTime.fromISO(req.body.start)
        const dateCheckOut = DateTime.fromISO(req.body.end)
        const diferenceDays = dateCheckOut.diff(dateCheckIn,["years","months","days"]).as("days")
       
        let diffDays = 0
        // en el primer ciclo no se añade un día porque el index esta en 0 por tanto sigue siendo el valor inicial del rango de fecha
        // se añade 1 a la variable diferenceDays porque si es el mismo dia el valor es 0, pero en todo caso se debe hacer un ciclo
        for(let index = 0; index < diferenceDays+1; index++){
            // validar si el dia no es sabado o domingo o festivo
            const newDate = dateCheckIn.plus({days:index})
            // 1 lunes - 7 domingo
            if(newDate.weekday < 6 && !holidays.some((h)=>h.date === newDate.toFormat("yyyy-MM-dd"))){
                diffDays++
            }
        }

        let hours = diffDays*9
        const result = await ReportService.ReportXlsxRange(req.body)
        
        if(!result.status){
            return result
        }
        try {
            return await this.generateReportHoursXlsx(result,req.body,hours)
        } catch(error){
            return {"status":false,"message":"error al generar reporte excel"}
        }

    }

    static async generateReportHoursXlsx(result,_range,hours){

        const { status, report } = result

        // reporte para pruebas
        let reportTest = [
            {
                Area: 'Innovación',
                ID: 1010245162,
                Name: 'ALISON JULIANNA MORALES ANGULO',
                Job_title: 'Líder de innovación',
                Code: '702',
                Project: 'AXON COMTRADE 2',
                cost_center: 'Software',
                Activity: 'Documentación',
                Total_hours: 27 ,// TTotal
                Salary: 2000000 // Salary
            }
        ]

        const workbook = await XlsxPopulate.fromBlankAsync()
        workbook.sheet(0).name(`${_range.start}_${_range.end}`)
        workbook.sheet(0).cell("A1").style({fill:"c6e0b4",fontSize:12,verticalAlignment:"center",horizontalAlignment:"left",border:true}).value("Área")
        workbook.sheet(0).cell("B1").style({fill:"c6e0b4",fontSize:12,verticalAlignment:"center",horizontalAlignment:"left",border:true}).value("Nombre del colaborador")
        workbook.sheet(0).cell("C1").style({fill:"c6e0b4",fontSize:12,verticalAlignment:"center",horizontalAlignment:"left",border:true}).value("C.C")
        workbook.sheet(0).cell("D1").style({fill:"c6e0b4",fontSize:12,verticalAlignment:"center",horizontalAlignment:"left",border:true}).value("Cargo del colaborador")
        workbook.sheet(0).cell("E1").style({fill:"c6e0b4",fontSize:12,verticalAlignment:"center",horizontalAlignment:"left",border:true}).value("Código del proyecto")
        workbook.sheet(0).cell("F1").style({fill:"c6e0b4",fontSize:12,verticalAlignment:"center",horizontalAlignment:"left",border:true}).value("Nombre del proyecto")
        workbook.sheet(0).cell("G1").style({fill:"c6e0b4",fontSize:12,verticalAlignment:"center",horizontalAlignment:"left",border:true}).value("Centro de costo")
        workbook.sheet(0).cell("H1").style({fill:"c6e0b4",fontSize:12,verticalAlignment:"center",horizontalAlignment:"left",border:true}).value("Nombre de la actividad")
        workbook.sheet(0).cell("I1").style({fill:"c6e0b4",fontSize:12,verticalAlignment:"center",horizontalAlignment:"left",border:true}).value("TTotal (horas)")
        workbook.sheet(0).cell("J1").style({fill:"c6e0b4",fontSize:12,verticalAlignment:"center",horizontalAlignment:"left",border:true}).value("CTotal")
        
        workbook.sheet(0).row(1).height(20)
        workbook.sheet(0).column("A").width(6)
        workbook.sheet(0).column("B").width(40)
        workbook.sheet(0).column("C").width(15)
        workbook.sheet(0).column("D").width(30)
        workbook.sheet(0).column("E").width(14)
        workbook.sheet(0).column("F").width(30)
        workbook.sheet(0).column("G").width(15)
        workbook.sheet(0).column("H").width(25)
        workbook.sheet(0).column("I").width(12)
        workbook.sheet(0).column("J").width(12)

        for(let index = 0; index < report.length; index++){
            const element = report[index]

            let valorHour = 0
            try {
                valorHour = element.Salary / hours
            } catch (error) {
                //
            }
            
            workbook.sheet(0).cell(`A${index+2}`).value(element.Area)
            workbook.sheet(0).cell(`B${index+2}`).value(element.Name)
            workbook.sheet(0).cell(`C${index+2}`).value(element.ID)
            workbook.sheet(0).cell(`D${index+2}`).value(element.Job_title)
            workbook.sheet(0).cell(`E${index+2}`).value(element.Code)
            workbook.sheet(0).cell(`F${index+2}`).value(element.Project)
            workbook.sheet(0).cell(`G${index+2}`).value(element.cost_center)
            workbook.sheet(0).cell(`H${index+2}`).value(element.Activity)
            workbook.sheet(0).cell(`I${index+2}`).value(Number(element.Total_hours))
            workbook.sheet(0).cell(`J${index+2}`).value(Number(valorHour*element.Total_hours))
        }

        //return await workbook.outputAsync()
        return {"status":true,report:await workbook.outputAsync()}
    }

}




