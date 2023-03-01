import * as nodemailer from 'nodemailer';
import * as SendGrid from 'nodemailer-sendgrid-transport';

export class NodeMailer {

    private static initializeTransport(){
        return nodemailer.createTransport(SendGrid({
            auth: {
                api_key: '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'
            }
        }))
    }

    static sendEmail(data:{to:[string], subject: string, html: string}): Promise<any>{
        return  NodeMailer.initializeTransport().sendMail({
            from: 'hemendralalawat30@gmail.com',
            to: data.to,
            subject: data.subject,
            html: data.html
          })
    }

}