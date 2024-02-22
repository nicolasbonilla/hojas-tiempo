import ReportService from "../Services/ReportService.js"
import XlsxPopulate from "xlsx-populate"

export class Report {

    static async indexReportXlsxRange (req){    
    
        const result = await ReportService.indexReportXlsxRange(req.body)
        if(!result.status){
            return result
        }
        try {
            return await this.generateFileXlsx(result)
        } catch(error){
            return {"status":false,"message":"error al generar reporte excel"}
        }

    }

    static async generateFileXlsx(result){

        const { status, report } = result

        // reporte para pruebas
        let reportTest = [
            {
                Area: 'Innovación', // Área
                Name: 'ALISON JULIANNA MORALES ANGULO', // Nombre del colaborador
                Job_title: 'Líder de innovación', // Cargo del colaborador
                Project: 'INNOVACIÓN', // Nombre del proyecto
                cost_center: 'Axon Group', // Centro de costo
                Activity: 'Reuniones', // Nombre de la actividad
                Total_hours: '27',// TTotal
                Total: '299999.9997' // $Total
            }
        ]

        const workbook = await XlsxPopulate.fromBlankAsync()
        workbook.sheet(0).name("reporte")
        workbook.sheet(0).cell("A1").style({fill:"c6e0b4",fontSize:12,verticalAlignment:"center",horizontalAlignment:"left",border:true}).value("Área")
        workbook.sheet(0).cell("B1").style({fill:"c6e0b4",fontSize:12,verticalAlignment:"center",horizontalAlignment:"left",border:true}).value("Nombre del colaborador")
        workbook.sheet(0).cell("C1").style({fill:"c6e0b4",fontSize:12,verticalAlignment:"center",horizontalAlignment:"left",border:true}).value("Cargo del colaborador")
        workbook.sheet(0).cell("D1").style({fill:"c6e0b4",fontSize:12,verticalAlignment:"center",horizontalAlignment:"left",border:true}).value("Nombre del proyecto")
        workbook.sheet(0).cell("E1").style({fill:"c6e0b4",fontSize:12,verticalAlignment:"center",horizontalAlignment:"left",border:true}).value("Centro de costo")
        workbook.sheet(0).cell("F1").style({fill:"c6e0b4",fontSize:12,verticalAlignment:"center",horizontalAlignment:"left",border:true}).value("Nombre de la actividad")
        workbook.sheet(0).cell("G1").style({fill:"c6e0b4",fontSize:12,verticalAlignment:"center",horizontalAlignment:"left",border:true}).value("TTotal")
        workbook.sheet(0).cell("H1").style({fill:"c6e0b4",fontSize:12,verticalAlignment:"center",horizontalAlignment:"left",border:true}).value("CTotal")
        workbook.sheet(0).row(1).height(20)
        workbook.sheet(0).column("A").width(20)
        workbook.sheet(0).column("B").width(40)
        workbook.sheet(0).column("C").width(35)
        workbook.sheet(0).column("D").width(40)
        workbook.sheet(0).column("E").width(18)
        workbook.sheet(0).column("F").width(30)
        workbook.sheet(0).column("G").width(15)
        workbook.sheet(0).column("H").width(15)

        for (let index = 0; index < report.length; index++) {
            const element = report[index]
            workbook.sheet(0).cell(`A${index+2}`).value(element.Area)
            workbook.sheet(0).cell(`B${index+2}`).value(element.Name)
            workbook.sheet(0).cell(`C${index+2}`).value(element.Job_title)
            workbook.sheet(0).cell(`D${index+2}`).value(element.Project)
            workbook.sheet(0).cell(`E${index+2}`).value(element.cost_center)
            workbook.sheet(0).cell(`F${index+2}`).value(element.Activity)
            workbook.sheet(0).cell(`G${index+2}`).value(Number(element.Total_hours))
            workbook.sheet(0).cell(`H${index+2}`).value(Number(element.Total))
        }

        //return await workbook.outputAsync()
        return {"status":true,report:await workbook.outputAsync()}
    }

}




